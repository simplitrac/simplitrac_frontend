import React, { useEffect, useState, useContext } from 'react';
import BackButton from "./BackButton.jsx";
import { auth, onAuthStateChanged } from "../config/initializeFirestore.js";
import '../App.css';
import HamburgerMenuEdit from "./HamburgerMenuEdit.jsx";
import { AppContext } from '../context/AppContext.jsx';
import ExpenseChartJoyride from './ExpenseChartJoyride.jsx';
import HomeButton from './HomeButton.jsx';



function App() {
  const {runChartTour, setRunChartTour} = useContext(AppContext);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email); // capture email
      } else {
        setUserId("");
        setUserEmail("");
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
  }, []);

  return (
    <div className="App" style={{ marginTop: '2rem' }}>
      <HomeButton/>
      <ExpenseChartJoyride />
      <HamburgerMenuEdit />
      <LookerStudioChart dimensions={dimensions} userEmail={userEmail} />
      <BackButton />
    </div>
  );
}

const LookerStudioChart = ({ dimensions, userEmail }) => {
  const reportUrl = `https://lookerstudio.google.com/embed/reporting/ae330055-31b8-4e65-a1a9-f0bbd1cda92f/page/p_7bf8d7cckd`;

  const adminURL = 'https://lookerstudio.google.com/embed/reporting/d14d5e13-0ab5-4a40-8e70-4af6a00c6825/page/p_w1nuazavkd';

  const admins = import.meta.env.VITE_ADMINS?.split(',') || []; // retrieve admin from .env

  const isAdmin = admins.includes(userEmail); // check if the user is an admin

  const mobile = dimensions.width <= 550;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: mobile ? '100%' : '80%',
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
        src={isAdmin ? adminURL : reportUrl} // conditional rendering based on admin 
        style={iframeStyle}
        allowFullScreen  
      />
    </div>
  );
};


export default App;