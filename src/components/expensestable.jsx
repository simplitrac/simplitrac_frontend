// import React from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import {Form, Buttom, Modal, Table} from 'react-bootstrap';
// import DateField from './datetime';
// import CostField from './costfield';
// import DynamicDropdown from './dropdownmenu';


// const ExpensesTable = () => {
//     return (
//       <Table bordered>
//         <thead>
//           <tr>
//             <th>Expenses</th>
//             <th>Userfields</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Date</td>
//             <td><DateField /></td>
//           </tr>
//           <tr>
//             <td>Item</td>
//             <td><DynamicDropdown options={["Food", "Gas", "Paper"]} /></td>
//           </tr>
//           <tr>
//             <td>Retailer</td>
//             <td><DynamicDropdown options={["ShopRite", "Sunoco", "Staples"]} /></td>
//           </tr>
//           <tr>
//             <td>Cost</td>
//             <td><CostField /></td>
//           </tr>
//           <tr>
//             <td>Category</td>
//             <td><DynamicDropdown options={["Food & Entertainment", "Travel Expense", "Office Supplies"]} /></td>
//           </tr>
//         </tbody>
//       </Table>
//     );
//   };

// export default ExpensesTable;

import React, { useState } from 'react';
import { Table, Form, Button, Modal, Container, Row, Col } from 'react-bootstrap';


// DateField Component
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

// DynamicDropdown Component
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

// CostField Component
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

// ExpensesTable Component
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

export default ExpensesTable;