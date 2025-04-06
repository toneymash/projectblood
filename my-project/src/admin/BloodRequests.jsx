import React, { useState, useEffect } from 'react';

const BloodRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Dummy data for testing
        const dummyRequests = [
            {
                id: 1,
                hospitalName: "Hospital A",
                bloodType: "O+",
                urgency: "High"
            },
            {
                id: 2,
                hospitalName: "Hospital B",
                bloodType: "A-",
                urgency: "Medium"
            },
            {
                id: 3,
                hospitalName: "Hospital C",
                bloodType: "B+",
                urgency: "Low"
            }
        ];

        // Set the dummy data
        setRequests(dummyRequests);
    }, []);  // No need for fetching, just set dummy data once on mount

    const updateRequest = (id, status) => {
        // Update the request status locally
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status } : request
            )
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Blood Requests</h2>
            {loading ? (
                <p>Loading requests...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {requests.map((request) => (
                        <li key={request.id} className="mb-2">
                            <div>
                                <p><strong>Hospital:</strong> {request.hospitalName}</p>
                                <p><strong>Blood Type:</strong> {request.bloodType}</p>
                                <p><strong>Urgency:</strong> {request.urgency}</p>
                                <button
                                    onClick={() => updateRequest(request.id, "completed")}
                                    className="text-blue-500 hover:underline"
                                >
                                    Mark as Completed
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BloodRequests;
