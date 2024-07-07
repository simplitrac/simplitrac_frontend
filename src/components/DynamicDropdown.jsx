import React, {useContext, useEffect, useState} from "react";
import { Form, InputGroup } from "react-bootstrap";
import {AppContext} from "../context/AppContext.jsx";

const DynamicDropdown = (props) => {
    const [options, setOptions] = useState(props.options)
    const [selectedOption, setSelectedOption] = useState(props.options[0]);
    const [customOption, setCustomOption] = useState("");

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        if (value !== "Custom") {
            setCustomOption("");
        }
    };

    const handleCustomBlur = (e) => {
        if(e.target.value !== ""){
            setOptions([...options, e.target.value])
            setCustomOption(e.target.value)
            setSelectedOption(e.target.value)
        }
    }

    const mapOptions = (opts) => {
        return (opts.map((option, index) => (
            <option key={index} value={option}>{option}</option>
        )))
    }

    return (
        <InputGroup>
            <Form.Control as="select" value={selectedOption} onChange={handleSelectChange}>
                {mapOptions(options)}
                <option value="Custom">Custom...</option>
            </Form.Control>
            {selectedOption === "Custom" && (
                <Form.Control
                    type="text"
                    defaultValue={customOption}
                    onBlur={handleCustomBlur}
                    placeholder="Enter custom option"
                />
            )}
        </InputGroup>
    );
};

export default DynamicDropdown;
