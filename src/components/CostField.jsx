import {useContext, useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Form , Button , Modal} from 'react-bootstrap';
import {AppContext} from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";


const CostField = (props) => {
    const {ocrData, setOcrData} = useContext(AppContext)
    const [amount, setAmount] = useState(props.amount);

    const handleBlur = (e) => {
        const amount = e.target.value;
        const newOCR = new Transaction(ocrData)
        newOCR.amount = amount;
        setOcrData(newOCR)
    }
  
    return (
      <>
        <Form.Control
          value={amount}
          placeholder="Total amount spent..."
          inputMode="numeric"
          // onClick={handleShow}
          // readOnly
            onBlur={handleBlur}
        />
  
        {/*<Modal show={show} onHide={handleClose} centered>*/}
        {/*  <Modal.Header closeButton>*/}
        {/*    <Modal.Title>Enter Cost</Modal.Title>*/}
        {/*  </Modal.Header>*/}
        {/*  <Modal.Body>*/}
        {/*    <div className="number-pad">*/}
        {/*      <div className="display">{cost}</div>*/}
        {/*      <div className="buttons">*/}
        {/*        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."].map((num) => (*/}
        {/*          <Button key={num} onClick={() => handleButtonClick(num.toString())}>{num}</Button>*/}
        {/*        ))}*/}
        {/*        <Button variant="danger" onClick={handleClear}>Clear</Button>*/}
        {/*        <Button variant="success" onClick={handleClose}>OK</Button>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Modal.Body>*/}
        {/*</Modal>*/}
      </>
    );
  };
export default CostField;