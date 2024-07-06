import {useContext} from "react";
import {Form} from "react-bootstrap";
import {AppContext} from "../context/AppContext.jsx";

const DateField = () => {
    const {ocrData, setOcrData} = useContext(AppContext);
    const date = ocrData?.date ?? new Date().toISOString().split('T')[0]

    const updateDate = (date) => {
        ocrData.date = date
        setOcrData(ocrData)
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
