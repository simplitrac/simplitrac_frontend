import React, {useState} from "react";
import {Form} from "react-bootstrap";

const DynamicDropdown = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <Form.Control as="select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </Form.Control>
    );
};

export default DynamicDropdown