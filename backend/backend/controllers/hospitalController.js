import Hospital from "../models/Hospital.js";

// Create a new hospital
export const createHospital = async (req, res) => {
  try {
    const { Name, Location, Contact } = req.body;
    const newHospital = await Hospital.create({ Name, Location, Contact });
    res.status(201).json({ message: "Hospital created successfully", data: newHospital });
  } catch (error) {
    res.status(500).json({ message: "Error creating hospital", error: error.message });
  }
};

// Get all hospitals
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.findAll();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hospitals", error: error.message });
  }
};

// Get a single hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findByPk(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hospital", error: error.message });
  }
};

// Update a hospital
export const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByPk(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });

    await hospital.update(req.body);
    res.status(200).json({ message: "Hospital updated successfully", data: hospital });
  } catch (error) {
    res.status(500).json({ message: "Error updating hospital", error: error.message });
  }
};

// Delete a hospital
export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByPk(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });

    await hospital.destroy();
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hospital", error: error.message });
  }
};
