import Request from "../models/Request.js";
import Hospital from "../models/Hospital.js";

// Create a new request
export const createRequest = async (req, res) => {
  try {
    const { HospitalID, BloodType, UnitsRequired, RequestDate, Status } = req.body;
    const newRequest = await Request.create({ HospitalID, BloodType, UnitsRequired, RequestDate, Status });
    res.status(201).json({ message: "Request created successfully", data: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Error creating request", error: error.message });
  }
};

// Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({
      include: { model: Hospital, attributes: ["Name", "Location", "Contact"] }, // Include Hospital details
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving requests", error: error.message });
  }
};

// Get a single request by ID
export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id, {
      include: { model: Hospital, attributes: ["Name", "Location", "Contact"] },
    });
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving request", error: error.message });
  }
};

// Update a request
export const updateRequest = async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.update(req.body);
    res.status(200).json({ message: "Request updated successfully", data: request });
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error: error.message });
  }
};

// Delete a request
export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    await request.destroy();
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting request", error: error.message });
  }
};
