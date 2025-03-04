import { Donations } from '../models/donations.js';

// Create a new donation
export const createDonation = async (req, res) => {
    try {
        const { donor_id, request_id, date, units_donated } = req.body;

        const donation = await Donations.create({
            donor_id,
            request_id,
            date,
            units_donated
        });

        res.status(201).json({ message: 'Donation created successfully', donation });
    } catch (error) {
        console.error('Error creating donation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all donations
export const getAllDonations = async (req, res) => {
    try {
        const donations = await Donations.findAll();
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single donation by ID
export const getDonationById = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donations.findByPk(id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json(donation);
    } catch (error) {
        console.error('Error fetching donation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a donation by ID
export const updateDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const { donor_id, request_id, date, units_donated } = req.body;

        const donation = await Donations.findByPk(id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        await donation.update({
            donor_id,
            request_id,
            date,
            units_donated
        });

        res.status(200).json({ message: 'Donation updated successfully', donation });
    } catch (error) {
        console.error('Error updating donation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a donation by ID
export const deleteDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donations.findByPk(id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        await donation.destroy();
        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (error) {
        console.error('Error deleting donation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
