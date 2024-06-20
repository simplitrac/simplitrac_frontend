import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

const DateField = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
    return (
      <Form.Control
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    );
  };
export default DateField;