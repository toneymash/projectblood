// routes/hospitalRequestRoutes.js
import express from 'express';
import HospitalRequest from '../models/HospitalRequest.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = './public/uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname) || '.pdf';
        cb(null, `hospital-doc-${uniqueSuffix}${extension}`);
    }
});

// File filter to accept only certain file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, JPG, PNG, DOC and DOCX files are allowed.'), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter
}).single('document'); // IMPORTANT: This name must match the field name in your form

// Create new hospital blood request with better error handling
router.post('/', (req, res) => {
    // Use upload as middleware with error handling
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred during upload
            console.error("Multer error:", err);
            return res.status(400).json({
                status: 'ERROR',
                message: `File upload error: ${err.message}`
            });
        } else if (err) {
            // An unknown error occurred
            console.error("Unknown upload error:", err);
            return res.status(400).json({
                status: 'ERROR',
                message: `Upload error: ${err.message}`
            });
        }

        try {
            // Log received data for debugging
            console.log("Received file:", req.file);
            console.log("Received body:", req.body);

            // Check if file was uploaded
            if (!req.file) {
                return res.status(400).json({
                    status: 'ERROR',
                    message: 'Hospital document is required'
                });
            }

            // Extract form data
            const {
                hospitalName,
                registrationNumber,
                contactPerson,
                phone,
                email,
                bloodType,
                quantity,
                urgency,
                reason,
                dateNeeded,
                latitude,
                longitude
            } = req.body;

            // Validate required fields
            if (!hospitalName || !bloodType || !quantity || !contactPerson) {
                return res.status(400).json({
                    status: 'ERROR',
                    message: 'Missing required fields'
                });
            }

            // Create document path
            const documentPath = `/uploads/${req.file.filename}`;

            // Create hospital request record
            // NOTE: Field names must match your database model
            const hospitalRequest = await HospitalRequest.create({
                hospitalName,
                registrationNumber,
                contactPerson,
                phone,
                email,
                bloodType,       // If your model uses a different field name, adjust accordingly
                quantity,        // If your model uses a different field name, adjust accordingly
                urgency,
                reason,
                dateNeeded,
                documentPath,    // Path to the uploaded file
                latitude: parseFloat(latitude) || null,
                longitude: parseFloat(longitude) || null,
                status: 'Pending' // Default status
            });

            res.status(201).json({
                status: 'SUCCESS',
                message: 'Request submitted successfully',
                data: hospitalRequest
            });
        } catch (error) {
            console.error("Hospital request creation error:", error);
            res.status(500).json({
                status: 'ERROR',
                message: `Database error: ${error.message}`
            });
        }
    });
});

// Get all hospital blood requests
router.get('/', async (req, res) => {
    try {
        const requests = await HospitalRequest.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            status: 'SUCCESS',
            data: requests
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: err.message
        });
    }
});

// Get hospital request by ID
router.get('/:id', async (req, res) => {
    try {
        const request = await HospitalRequest.findByPk(req.params.id);

        if (!request) {
            return res.status(404).json({
                status: 'NOT_FOUND',
                message: 'Hospital request not found'
            });
        }

        res.status(200).json({
            status: 'SUCCESS',
            data: request
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: err.message
        });
    }
});

export default router;