const Support = () => {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Need Help? We're Here for You!</h1>
        <p className="text-gray-700">If you have any questions or need assistance with blood donation, feel free to reach out to us.</p>
        
        <div className="border p-4 rounded-md bg-gray-100">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p>Email: <a href="mailto:support@blooddonation.org" className="text-blue-500">support@blooddonation.org</a></p>
          <p>Phone: <a href="tel:+1234567890" className="text-blue-500">+123 456 7890</a></p>
        </div>
        
        <div className="border p-4 rounded-md bg-gray-100">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          <ul className="list-disc pl-5">
            <li>Who can donate blood?</li>
            <li>How often can I donate blood?</li>
            <li>What should I do before and after donating?</li>
          </ul>
        </div>
        
        <div className="border p-4 rounded-md bg-gray-100">
          <h2 className="text-lg font-semibold">Send Us a Message</h2>
          <input type="text" placeholder="Your Name" className="w-full border p-2 rounded-md mb-2" />
          <textarea placeholder="Your Message" className="w-full border p-2 rounded-md mb-2"></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        </div>
      </div>
    );
  };
  
  export default Support;
  