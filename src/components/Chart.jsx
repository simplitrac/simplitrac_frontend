// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
// import BackButton from "./BackButton.jsx";
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
// import React, {useEffect, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
// import './App.css';


import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from "../config/initializeFirestore";
import '../App.css';

const Chart = () => {
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
      {userId && <LookerStudioChart userId={userId} />}
    </div>
  );
};

const LookerStudioChart = ({ userId }) => {
  const reportUrl = `https://lookerstudio.google.com/embed/reporting/ae330055-31b8-4e65-a1a9-f0bbd1cda92f/page/87O5D?params={"userId":"${userId}"}`;

  return (
    <div className="report-container">
      <iframe 
        id="report-frame" 
        width="600" 
        height="400" 
        src={reportUrl} 
        style={{ border: 0 }} 
        allowFullScreen 
      />
    </div>
  );
};

export default Chart;


