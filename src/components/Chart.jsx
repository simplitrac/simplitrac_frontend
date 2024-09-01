import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from "../config/initializeFirestore.js";
import '../App.css';


function App() {
  const [userId, setUserId] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>SimpliTrac</h1>
      <LookerStudioChart user_email={userEmail} />
      <BackButton />
      {userId && <LookerStudioChart userId={userId} />}
    </div>
  );
}

// LookerStudioChart component to display embedded Looker Studio report
const LookerStudioChart = ({ user_email }) => {
  const reportUrl = `https://lookerstudio.google.com/embed/reporting/ae330055-31b8-4e65-a1a9-f0bbd1cda92f/page/87O5D?params=${encodeURIComponent(`{"user_email": "${user_email}","filter": {"user_email": "${user_email}"} }`)}`;

  const mobile = window.innerWidth <= 550
  const iframeStyle = {
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    display: 'inline-flex', 
    width: '100%',
    height: mobile ? '350px' : '1000px', 
  };
  useEffect(() => {
    console.log(`Report URL: ${reportUrl}`);
  }, [reportUrl]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',  }}>
      <iframe 
        id="report-frame" 
        src={reportUrl} 
        style= {iframeStyle}
        allowFullScreen  
      />
    </div>
  );
};

export default App;