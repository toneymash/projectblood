// controllers/hospitalRequestController.js - Using ES modules syntax
import HospitalRequest from '../models/HospitalRequest.js';

export const handleHospitalRequest = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        
        // Check for required fields based on your database schema
        const { hospitalName, bloodType, quantity } = req.body;
        
        if (!hospitalName) {
            return res.status(400).json({ status: 'BAD_REQUEST', message: 'Hospital name is required.' });
        }
        
        const documentPath = req.file ? `/uploads/${req.file.filename}` : null;
        
        // Prepare location data if available
        let latitude = null;
        let longitude = null;
        
        if (req.body.location) {
            try {
                const location = JSON.parse(req.body.location);
                latitude = location.latitude || null;
                longitude = location.longitude || null;
            } catch (e) {
                console.warn("Could not parse location:", e);
            }
        }
        
        // Create hospital request with matching field names
        const hospitalRequest = await HospitalRequest.create({
            hospitalName: req.body.hospitalName,
            registrationNumber: req.body.registrationNumber,
            contactPerson: req.body.contactPerson,
            phone: req.body.phone,
            email: req.body.email,
            bloodType: req.body.bloodType,
            quantity: req.body.quantity,
            urgency: req.body.urgency,
            reason: req.body.reason,
            dateNeeded: req.body.dateNeeded,
            documentPath,
            latitude,
            longitude
        });
        
        res.status(201).json({ 
            status: 'SUCCESS', 
            message: 'Request submitted successfully', 
            data: hospitalRequest 
        });
    } catch (error) {
        console.error("Hospital request error:", error);
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};