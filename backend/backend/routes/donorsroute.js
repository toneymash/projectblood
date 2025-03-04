import express from 'express';
import { createDonor, getAllDonors, getDonorById, updateDonor, deleteDonor } from '../controllers/donorscontroller.js';

const router = express.Router();

router.get('/', getAllDonors); // Get all donors
router.get('/:id', getDonorById); // Get a single donor by ID
router.post('/', createDonor); // Create a new donor
router.put('/:id', updateDonor); // Update a donor by ID
router.delete('/:id', deleteDonor); // Delete a donor by ID

export default router;
