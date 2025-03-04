import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import log from '../utils/logger.js';

dotenv.config();

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    timezone: '+03:00',
    logging: true,
    pool: {
        max: 20,
        min: 2,
        acquire: 60000,
        idle: 30000,
    },
    dialectOptions: {
        connectTimeout: 60000,
    },
});

sequelize.sync({ alter: false });

const authenticate = async () => {
    try {
        await sequelize.authenticate();
        log.info('Connected to the database');
    } catch (error) {
        log.error('Unable to connect to the database:', error);
    }
};

authenticate();

const closeSequelizeConnection = async () => {
    try {
        await sequelize.close();
        log.info('Database connection closed gracefully');
    } catch (error) {
        log.error('Error closing the database connection:', error);
    }
};

const handleExit = async (signal) => {
    log.info(`${signal} received: closing database connection`);
    await closeSequelizeConnection();
    process.exit(0);
};

process.on('SIGINT', () => handleExit('SIGINT'));
process.on('SIGTERM', () => handleExit('SIGTERM'));
process.on('exit', closeSequelizeConnection);