const BloodRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchRequests = async () => {
        setLoading(true);
        try {
          const response = await fetch("http://localhost:4000/api/requests");
          const data = await response.json();
          setRequests(data);
        } catch (err) {
          setError("Failed to load requests.");
        } finally {
          setLoading(false);
        }
      };
      fetchRequests();
    }, []);
  
    const updateRequest = async (id, status) => {
      try {
        const response = await fetch(`http://localhost:4000/api/requests/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });
        const updatedRequest = await response.json();
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? updatedRequest : request
          )
        );
      } catch (err) {
        setError("Failed to update the request.");
      }
    };
  
    return (
      <SectionCard title="Blood Requests">
        {loading ? (
          <p>Loading requests...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {requests.map((request) => (
              <li key={request.id} className="mb-2">
                <div>
                  <p>Hospital: {request.hospitalName}</p>
                  <p>Blood Type: {request.bloodType}</p>
                  <p>Urgency: {request.urgency}</p>
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
      </SectionCard>
    );
  };
  