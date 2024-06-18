// import React from 'react';

// import './App.css';
// // import SearchIcon from './search.svg';
// import TableComponent from './tables';

// const App = () => {
    // return (
    //     <div className="App">
    //       <h1>SimpliTrac</h1>
    //       <TableComponent />
    //     </div>
    //   );
// }

// export default App;

import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
import './App.css';
import {} from '../components/'

const App = () => {

  const [user, userState] = useState()
  const [receipt, receiptState] = userState()

  useEffect(() => {





  }, [user]);












  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h1 className="text-center">
            SimpliTrac
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ExpensesTable />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-around">
          <Button variant="primary">Expense</Button>
          <Button variant="primary">Camera</Button>
          <Button variant="primary">Chart</Button>
        </Col>
      </Row>
    </Container>
  );
};

const ExpensesTable = () => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Expenses</th>
          <th>Userfields</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Date</td>
          <td><DateField /></td>
        </tr>
        <tr>
          <td>Item</td>
          <td><DynamicDropdown options={["Food", "Gas", "Paper"]} /></td>
        </tr>
        <tr>
          <td>Retailer</td>
          <td><DynamicDropdown options={["ShopRite", "Sunoco", "Staples"]} /></td>
        </tr>
        <tr>
          <td>Cost</td>
          <td><CostField /></td>
        </tr>
        <tr>
          <td>Category</td>
          <td><DynamicDropdown options={["Food & Entertainment", "Travel Expense", "Office Supplies"]} /></td>
        </tr>
      </tbody>
    </Table>
  );
};

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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
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

export default App;
