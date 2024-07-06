import React, {useContext, useEffect, useState} from "react";
import { Form, InputGroup } from "react-bootstrap";
import {AppContext} from "../context/AppContext.jsx";

const DynamicDropdown = (props) => {
    const {user} = useContext(AppContext)
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [customOption, setCustomOption] = useState("");
    const [initialLoad, setInitialLoad] = useState(true);

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

    useEffect(() => {
        if (initialLoad){
            setOptions(props.options);
            setSelectedOption(props.options[0])
            setInitialLoad(false)
        } else {
            if(customOption !== ""){
                setCustomOption("")
            }
        }
    }, [ options, selectedOption]);

    return (
        <InputGroup>
            <Form.Control as="select" value={selectedOption} onChange={handleSelectChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
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
