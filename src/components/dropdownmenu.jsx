import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

const DynamicDropdown = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
  
    return (
      <Form.Control
        as="select"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
    );
  };
export default DynamicDropdown;  