import React from "react";

const TrackingPosture = () => {
  // Replace 'YOUR_TRACKING_APP_URL' with the actual URL of your posture tracking application
  const trackingAppUrl = "YOUR_TRACKING_APP_URL";

  return (
    <div className="ml-[20%]">
      <div className=" bg-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Posture Tracking with OpenCV</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <a className="text-3xl " href="C:\Users\aman\Documents\Dev_Code\Sangरक्षण\openCv integration\posenet-demo-ml5js\public\PostureDetection.html">Click Here to track posture</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">How it Works</h2>
            <p className="text-gray-600">
              This page uses OpenCV for posture tracking. The embedded iframe
              connects to our tracking application, which analyzes your movements
              in real-time.
            </p>
            {/* Add more information or instructions */}
          </div>
        </div>
      </div>

      {/* Additional content or sections can be added here */}
    </div>
  );
};

export default TrackingPosture;
