
import { Table,} from 'react-bootstrap';

import DateField from "./DateField.jsx";
import DynamicDropdown from "./DynamicDropdown.jsx";
import CostField from "./CostField.jsx"
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";

// ExpensesTable Component
const ExpensesTable = () => {
  const {user, ocrData} = useContext(AppContext);
  const [vendors, setVendors] = useState(null);
  const [categories, setCategories ] = useState(null);

  const getListOfVendors = () =>{
    if (user.transactions.length !== 0){
      setVendors(["Select Vendor", ... user.transactions.map(transaction => transaction.vendor?.name)]);
    } else {
      setVendors(["Select Vendor"])
    }
  }

  const getListOfCategories = () =>{
    if (user.categories.length !== 0){
      setCategories(["Select Category", ...user.categories.map(category => category.name)])
    }else {
      setCategories(["Select Category"])
    }
  }

  const setOptions = (type, list) => {
    if(list?.length === 1){
      if(type === 'categories' && list.length < user.categories.length){
        getListOfCategories()
        return
      } else if (type === 'vendors' && list.length < user.transactions.length){
        getListOfVendors()
        return
      }
    }
    return {
      type,
      list
    }
  }

  useEffect(() => {
    if(ocrData.isEmpty()){
      getListOfVendors()
    } else {
      setVendors([ocrData.vendor])
    }

    if(!categories){
      getListOfCategories()
    }

  }, [ocrData])

  return (
    <Table bordered>

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
          <td><DynamicDropdown options={setOptions("vendors", vendors) }/></td>
        </tr>
        <tr>
          <td>Total</td>
          <td><CostField /></td>
        </tr>
        <tr>
          <td>Category</td>
          <td><DynamicDropdown options={ setOptions("categories", categories) } /></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ExpensesTable;