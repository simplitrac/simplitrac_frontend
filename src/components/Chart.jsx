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
      {userId && <LookerStudioChart userId={userId} />}
    </div>
  );
};

const LookerStudioChart = ({ userId }) => {
  const reportUrl = `https://lookerstudio.google.com/embed/reporting/1bf3befc-bd02-43b9-a217-cd1f35ddda0a/page/EO64D?user_id=${userId}`;

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

export default App;


