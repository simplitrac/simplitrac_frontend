import React, { useEffect, useState } from 'react';
import BackButton from "./BackButton.jsx";
import { auth, onAuthStateChanged } from "../config/initializeFirestore.js";
import '../App.css';

function App() {
  const [userId, setUserId] = useState("");
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  // const auth = getAuth(); // this was breaking the page

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });

    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }

    window.addEventListener('resize', handleResize);
    
    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [auth]);

  return (
    <div className="App">
      <h1>SimpliTrac</h1>
      <LookerStudioChart dimensions={dimensions} />
      <BackButton />
    </div>
  );
}

const LookerStudioChart = ({ dimensions }) => {
  const reportUrl = `https://lookerstudio.google.com/embed/reporting/ae330055-31b8-4e65-a1a9-f0bbd1cda92f/page/p_7bf8d7cckd`;

  const mobile = dimensions.width <= 550;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: mobile ? '50%' : '80%',
    height: `${dimensions.height - 200}px`,
    margin: '0 auto',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const iframeStyle = {
    width: '100%',
    height: '80%',
    border: 'none',
  };
  
  return (
    <div style={containerStyle}>
      <iframe 
        id="report-frame" 
        src={reportUrl} 
        style={iframeStyle}
        allowFullScreen  
      />
    </div>
  );
};

export default App;