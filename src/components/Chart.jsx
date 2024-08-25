// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
// import BackButton from "./BackButton.jsx";
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
// import React, {useEffect, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
// import './App.css';


import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from "firebase/auth";
import './App.css';
import { auth } from './firebase';

const App = () => {
  const [userId, setUserId] = useState("");

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
};

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


