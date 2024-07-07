
import { Table,} from 'react-bootstrap';

import DateField from "./DateField.jsx";
import DynamicDropdown from "./DynamicDropdown.jsx";
import CostField from "./CostField.jsx"
import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext.jsx";

// ExpensesTable Component
const ExpensesTable = () => {
  const {user, ocrData} = useContext(AppContext);

  const getListOfVendors = () =>{
    let vendors = [];
    if (user.transactions.length !== 0){
      vendors = user.transactions.map(transaction => transaction.vendor);
      return vendors;
    }
  }

  const getListOfCategories = () =>{
    let categories = [];
    if (user.categories.length !== 0){
      categories = user.categories.map(category => category.name);
      return categories;
    }
  }

  useEffect(() => {

  }, [user, ocrData]);



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
        {/*<tr>*/}
        {/*  <td>Item</td>*/}
        {/*  <td><DynamicDropdown /></td>*/}
        {/*</tr>*/}
        <tr>
          <td>Vendor</td>
          <td><DynamicDropdown options={getListOfVendors() ?? ["Choose Vendor"] }/></td>
        </tr>
        <tr>
          <td>Total</td>
          <td><CostField amount={ocrData?.amount}/></td>
        </tr>
        <tr>
          <td>Category</td>
          <td><DynamicDropdown options={ getListOfCategories() ?? ["Select Category"]} /></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ExpensesTable;