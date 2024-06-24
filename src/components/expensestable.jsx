
import { Table,} from 'react-bootstrap';

import DateField from "./DataField.jsx";
import DynamicDropdown from "./DynamicDropdown.jsx";
import CostField from "./CostField.jsx"

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