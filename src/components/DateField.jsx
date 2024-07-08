import {useContext, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {AppContext} from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";

const DateField = () => {
    const {ocrData, setOcrData} = useContext(AppContext);
    const [date, setDate] = useState(null);

    useEffect(() => {
        if(!date){
            const newDate = ocrData?.date ?? new Date().toISOString().split('T')[0]
            setDate(newDate)
            const tr = new Transaction(ocrData)
            tr.createdAt = newDate
            setOcrData(tr)
        }
    }, [])

    const updateDate = (date) => {
        const newOCR = new Transaction(ocrData)
        newOCR.createdAt = date;
        setOcrData(newOCR)
        setDate(date)
    }

    return (
        <Form.Control
            type="date"
            value={date}
            onChange={(e) => updateDate(e.target.value)}
        />
    );
};

export default DateField
