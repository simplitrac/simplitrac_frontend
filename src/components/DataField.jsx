import {useState} from "react";
import {Form} from "react-bootstrap";

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

export default DateField
