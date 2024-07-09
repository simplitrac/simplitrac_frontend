import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from "../config/initializeFirestore";
import '../App.css';
import BackButton from "./BackButton.jsx";

// Main Chart component
const Chart = () => {
  const [userEmail, setUserEmail] = useState(""); // State to store the user email

  // useEffect hook to handle authentication state changes
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set user email if user is logged in
        setUserEmail(user.email);
        console.log(`User Email set: ${user.email}`);
      } else {
        // Clear user email if user is logged out
        setUserEmail("");
        console.log("No user is signed in");
      }
    });
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>SimpliTrac</h1>
      {userEmail ? <LookerStudioChart user_email={userEmail} /> : <p>Please Enter in an Expense.</p>}
      <BackButton />
    </div>
  );
};

// LookerStudioChart component to display embedded Looker Studio report
const LookerStudioChart = ({ user_email }) => {
  const reportUrl = `https://lookerstudio.google.com/embed/reporting/ae330055-31b8-4e65-a1a9-f0bbd1cda92f/page/87O5D?params=${encodeURIComponent(`{"user_email": "${user_email}","filter": {"user_email": "${user_email}"} }`)}`;

  useEffect(() => {
    console.log(`Report URL: ${reportUrl}`);
  }, [reportUrl]);

  return (
    <div className="report-container">
      <iframe 
        id="report-frame" 
        width="900" 
        height="600" 
        src={reportUrl} 
        style={{ border: 0 }} 
        allowFullScreen 
      />
    </div>
  );
};

export default Chart;
