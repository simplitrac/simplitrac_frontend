import React, {useContext, useEffect, useState} from "react";
import { Form, InputGroup } from "react-bootstrap";
import {AppContext} from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";
import { v4 as uuidv4 } from 'uuid';

const DynamicDropdown = (props) => {
    const {ocrData, setOcrData} = useContext(AppContext)
    const [options, setOptions] = useState(props.options)
    const [selectedOption, setSelectedOption] = useState(null);
    const [customOption, setCustomOption] = useState("");

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        if (value !== "Custom") {
            setCustomOption("");
        }
    };

    const handleCustomBlur = (e) => {
        if(e.target.value !== "") {
            const newOptions = {
                type: options.type,
                list: [...options.list, e.target.value]
            }
            setOptions(newOptions)
            setCustomOption(e.target.value)
            setSelectedOption(e.target.value)

            const newOCR = new Transaction(ocrData)
            if (options.type === "vendors") {
                newOCR.vendor = {
                    id: uuidv4(),
                    name: e.target.value
                }
            } else if (options.type === "categories") {
                newOCR.category = {
                    id: uuidv4(),
                    name: e.target.value
                }
            }
            setOcrData(newOCR)
        }
    }

    const mapOptions = (opts) => {

    //     if (!opts.list) return null;
    //
    //     return opts.list.map((option, index) => {
    //         if (option instanceof Object) {
    //             return (
    //                 <option key={index} value={option}>
    //                     {option.name}
    //                 </option>
    //             );
    //         }
    //         return (
    //             <option key={index} value={option}>
    //                 {option}
    //             </option>
    //         );
    //     });
    // };
        if(!opts.list) return

        return (opts.list.map((option, index) => (
            <option key={index} value={option}>{option}</option>
        )))
    }

    useEffect(() => {
        // if(!props.options?.list){
        //
        // }

        if(options?.list){
            setOptions(options);
            setSelectedOption(selectedOption ?? options.list[0]);
        } else if (props.options?.list){
            setOptions(props.options);
            setSelectedOption(selectedOption ?? props.options.list[0]);
        }
    }, [props.options]);

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
