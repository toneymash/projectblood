import BloodRequest from "../models/BloodRequest.js";


// Create a new blood request
export const createRequest = async (req, res) => {
  try {
    const { HospitalID, BloodType, UnitsRequired, RequestDate, Status } = req.body;
    const newRequest = await BloodRequest.create({ HospitalID, BloodType, UnitsRequired, RequestDate, Status });
    res.status(201).json({ message: "Blood request created successfully", data: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Error creating request", error: error.message });
  }
};

// Get all blood requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving requests", error: error.message });
  }
};

// Get a single blood request by ID
export const getRequestById = async (req, res) => {
  try {
    const request = await BloodRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving request", error: error.message });
  }
};

// Update a blood request
export const updateRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.update(req.body);
    res.status(200).json({ message: "Request updated successfully", data: request });
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error: error.message });
  }
};

// Delete a blood request
export const deleteRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.destroy();
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting request", error: error.message });
  }
};
