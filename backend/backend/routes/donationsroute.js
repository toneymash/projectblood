import express from 'express';
import { createDonation, getAllDonations, getDonationById, updateDonation, deleteDonation } from '../controllers/donationcontroller.js';

const router = express.Router();

router.get('/', getAllDonations); // Get all donations
router.get('/:id', getDonationById); // Get a single donation by ID
router.post('/', createDonation); // Create a new donation
router.put('/:id', updateDonation); // Update a donation by ID
router.delete('/:id', deleteDonation); // Delete a donation by ID

export default router;
