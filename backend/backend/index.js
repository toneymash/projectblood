import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import multer from 'multer';
import ip from 'ip';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import logger from './utils/logger.js';
import donorsRoutes from './routes/donorsroute.js';
import donationsRoutes from './routes/donationsroute.js';
import bloodRequestRoutes from './routes/bloodRequestRoutes.js';
import hospitalRoutes from "./routes/hospitalRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const upload = multer();

// Load environment variables
dotenv.config();
process.env.JWT_SECRET = process.env.JWT_SECRET || 'ILSzu94vNszyF+Dr0+27ZscBZievseRSQmbWzEF5AWI=';
const port = process.env.PORT || 4000;

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Add security headers

// ✅ Configure CORS with explicit settings
app.use(cors({
  origin: '*', // Adjust this for security in production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // Allow credentials (cookies, authorization headers)
}));

// ✅ Handle preflight requests explicitly
app.options('*', cors());

app.use(express.static('public'));

// Request tracking middleware
app.use((req, res, next) => {
  const requestId = uuidv4();
  const ipAddress = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const startTime = Date.now();

  req.requestId = requestId;

  logger.info(`Request ID: ${requestId}, IP: ${ipAddress}, User Agent: ${userAgent} ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info(`Request ID: ${requestId}, Duration: ${duration}ms`);
  });

  next();
});

// Routes
app.get('/api/', (req, res) =>
  res.send({
    code: 200,
    status: 'OK',
    message: 'API, v3.0.0 - All Systems Go'
  })
);

app.use('/api/donors', donorsRoutes);
app.use('/api/donations', donationsRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/users", userRoutes);

app.all('/api/*', (req, res) =>
  res.status(404).send({
    code: 404,
    status: 'NOT_FOUND',
    message: 'Route does not exist on the server'
  })
);

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error(`Request ID: ${req.requestId} ${req.method} ${req.originalUrl}, ${error.message}`);

  res.status(error.status || 500).send({
    code: error.status || 500,
    status: error.message || 'INTERNAL_SERVER_ERROR',
    data: error.data || "Unexpected error occurred, please try again later."
  });
});

// Start the server
logger.info('Connecting to the database');
sequelize.sync({ alter: false }).then(() => {
  app.listen(port, () => {
    logger.info(`Server running on: http://${ip.address()}:${port}`);
  });
}).catch((err) => {
  logger.error(err);
  process.exit(1);
});
