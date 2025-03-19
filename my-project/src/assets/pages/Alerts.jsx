const Alerts = () => {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900">Blood Donation Alerts</h1>
        <p className="mt-2 text-gray-700">
          Stay updated with urgent blood donation requests, upcoming donation drives, and important notifications.
        </p>
  
        <div className="mt-4 space-y-4">
          <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-md shadow">
            <h2 className="text-lg font-semibold text-red-700">Urgent Blood Needed</h2>
            <p className="text-gray-600">
              A hospital near you requires blood type O+ for emergency surgery. Can you donate?
            </p>
          </div>
  
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-md shadow">
            <h2 className="text-lg font-semibold text-blue-700">Upcoming Donation Drive</h2>
            <p className="text-gray-600">
              Join our next blood donation camp on March 25th at Nyeri General Hospital.
            </p>
          </div>
  
          <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md shadow">
            <h2 className="text-lg font-semibold text-green-700">Thank You for Donating!</h2>
            <p className="text-gray-600">
              Your recent donation has helped save lives. We appreciate your contribution!
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Alerts;
  