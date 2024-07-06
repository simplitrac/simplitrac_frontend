import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Form , Button , Modal} from 'react-bootstrap';


const CostField = () => {
    const [show, setShow] = useState(false);
    const [cost, setCost] = useState('');
  
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  
    const handleButtonClick = (value) => {
      setCost(prevCost => prevCost + value);
    };
  
    const handleClear = () => setCost('');
  
    return (
      <>
        <Form.Control
          type="text"
          value={cost}
          onClick={handleShow}
          readOnly
        />
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Enter Cost</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="number-pad">
              <div className="display">{cost}</div>
              <div className="buttons">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."].map((num) => (
                  <Button key={num} onClick={() => handleButtonClick(num.toString())}>{num}</Button>
                ))}
                <Button variant="danger" onClick={handleClear}>Clear</Button>
                <Button variant="success" onClick={handleClose}>OK</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };
export default CostField;