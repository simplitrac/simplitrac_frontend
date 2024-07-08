import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from "../config/initializeFirestore";
import '../App.css';
import BackButton from "./BackButton.jsx";

// Main Chart component
const Chart = () => {
  const [userId, setUserId] = useState(""); // State to store the user ID

  // useEffect hook to handle authentication state changes
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set user ID if user is logged in
        setUserId(user.uid);
      } else {
        // Clear user ID if user is logged out
        setUserId("");
      }
    });
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>SimpliTrac</h1>
      {/* Display LookerStudioChart if user is logged in, otherwise prompt to log in */}
      {userId ? <LookerStudioChart userId={userId} /> : <p>Please log in to see your data.</p>}
      {/* Back button component */}
      <BackButton />
    </div>
  );
};

// LookerStudioChart component to display embedded Looker Studio report
const LookerStudioChart = ({ userId }) => {
  // Construct report URL with user ID parameter
  const reportUrl = `https://lookerstudio.google.com/embed/reporting/ae330055-31b8-4e65-a1a9-f0bbd1cda92f/page/87O5D?params={"userId":"${userId}"}`;

  return (
    <div className="report-container">
      <iframe 
        id="report-frame" 
        width="100%" 
        height="600" 
        src={reportUrl} 
        style={{ border: 0 }} 
        allowFullScreen 
      />
    </div>
  );
};

export default Chart;
