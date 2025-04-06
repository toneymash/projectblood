import { useState } from 'react';
import { Bell, Calendar, Heart, AlertCircle, MapPin, X } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Urgent Blood Needed',
      message: 'A hospital near you requires blood type O+ for emergency surgery. Can you donate?',
      location: 'Kenyatta National Hospital',
      timePosted: '10 minutes ago',
      icon: AlertCircle
    },
    {
      id: 2,
      type: 'upcoming',
      title: 'Upcoming Donation Drive',
      message: 'Join our next blood donation camp on March 25th at Nyeri General Hospital.',
      location: 'Nyeri General Hospital',
      timePosted: '2 hours ago',
      icon: Calendar
    },
    {
      id: 3,
      type: 'success',
      title: 'Thank You for Donating!',
      message: 'Your recent donation has helped save lives. We appreciate your contribution!',
      impact: '3 lives saved',
      timePosted: '1 day ago',
      icon: Heart
    }
  ]);

  const [notification, setNotification] = useState(true);

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const toggleNotifications = () => {
    setNotification(!notification);
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'urgent':
        return {
          border: 'border-red-500',
          bg: 'bg-red-50',
          text: 'text-red-700',
          icon: 'text-red-500'
        };
      case 'upcoming':
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          icon: 'text-blue-500'
        };
      case 'success':
        return {
          border: 'border-green-500',
          bg: 'bg-green-50',
          text: 'text-green-700',
          icon: 'text-green-500'
        };
      default:
        return {
          border: 'border-gray-500',
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          icon: 'text-gray-500'
        };
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900">Blood Donation Alerts</h1>
        </div>
        <button
          onClick={toggleNotifications}
          className={`p-2 rounded-full ${notification ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
        >
          <Bell className="h-6 w-6" />
        </button>
      </div>

      <p className="mt-3 text-gray-700">
        Stay updated with urgent blood donation requests, upcoming donation drives, and important notifications.
      </p>

      <div className="mt-6 space-y-4">
        {alerts.length === 0 ? (
          <div className="p-6 text-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No active alerts at the moment.</p>
          </div>
        ) : (
          alerts.map(alert => {
            const styles = getAlertStyles(alert.type);
            return (
              <div
                key={alert.id}
                className={`p-4 border-l-4 ${styles.border} ${styles.bg} rounded-md shadow-md relative transition-all hover:shadow-lg`}
              >
                <div className="flex items-start">
                  <div className={`mr-3 ${styles.icon}`}>
                    <alert.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h2 className={`text-lg font-semibold ${styles.text}`}>{alert.title}</h2>
                      <span className="text-xs text-gray-500">{alert.timePosted}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{alert.message}</p>

                    {alert.location && (
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{alert.location}</span>
                      </div>
                    )}

                    {alert.impact && (
                      <div className="mt-2 text-sm font-medium text-green-600">
                        {alert.impact}
                      </div>
                    )}

                    {alert.type === 'urgent' && (
                      <div className="mt-3">
                        <button className="mr-3 px-4 py-1 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition-colors">
                          Respond Now
                        </button>
                        <button className="px-4 py-1 border border-gray-300 text-sm rounded-full hover:bg-gray-100 transition-colors">
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center">
          <Heart className="h-4 w-4 mr-2" />
          Donate Now
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
          See All Alerts
        </button>
      </div>
    </div>
  );
};

export default Alerts;