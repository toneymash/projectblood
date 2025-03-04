import { Donors } from '../models/donors.js';

// Create a new donor
export const createDonor = async (req, res) => {
    try {
        const { user_id, blood_type, address, last_donation_date } = req.body;

        const donor = await Donors.create({
            user_id,
            blood_type,
            address,
            last_donation_date
        });

        res.status(201).json({ message: 'Donor created successfully', donor });
    } catch (error) {
        console.error('Error creating donor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all donors
export const getAllDonors = async (req, res) => {
    try {
        const donors = await Donors.findAll();
        res.status(200).json(donors);
    } catch (error) {
        console.error('Error fetching donors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single donor by ID
export const getDonorById = async (req, res) => {
    try {
        const { id } = req.params;
        const donor = await Donors.findByPk(id);

        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        res.status(200).json(donor);
    } catch (error) {
        console.error('Error fetching donor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a donor by ID
export const updateDonor = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, blood_type, address, last_donation_date } = req.body;

        const donor = await Donors.findByPk(id);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        await donor.update({
            user_id,
            blood_type,
            address,
            last_donation_date
        });

        res.status(200).json({ message: 'Donor updated successfully', donor });
    } catch (error) {
        console.error('Error updating donor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a donor by ID
export const deleteDonor = async (req, res) => {
    try {
        const { id } = req.params;
        const donor = await Donors.findByPk(id);

        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        await donor.destroy();
        res.status(200).json({ message: 'Donor deleted successfully' });
    } catch (error) {
        console.error('Error deleting donor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
