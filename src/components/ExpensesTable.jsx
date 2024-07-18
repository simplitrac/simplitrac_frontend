import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Table } from 'react-bootstrap';
import { AppContext } from "../context/AppContext.jsx";

const ExpensesTable = () => {
  const { user, ocrData } = useContext(AppContext);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendorInput, setVendorInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');

  const {
    control,
    handleSubmit,
    setValue,
    watch
  } = useForm();

  const getListOfVendors = () => {
    if (user.transactions.length !== 0) {
      setVendors(["Select Vendor", ...user.transactions.map(transaction => transaction.vendor?.name)]);
    } else {
      setVendors(["Select Vendor"]);
    }
  };

  const getListOfCategories = () => {
    if (user.categories.length !== 0) {
      setCategories(["Select Category", ...user.categories.map(category => category.name)]);
    } else {
      setCategories(["Select Category"]);
    }
  };

  useEffect(() => {
    if (ocrData.isEmpty()) {
      getListOfVendors();
    } else {
      setVendors([ocrData.vendor]);
    }

    if (!categories.length) {
      getListOfCategories();
    }
  }, [ocrData]);

  const onSubmit = data => {
    console.log(data);
  };

  const vendorValue = watch('vendor');
  const categoryValue = watch('category');

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table bordered>
          <tbody>
          <tr>
            <td>Date</td>
            <td>
              <Controller
                  name="date"
                  control={control}
                  render={({ field }) => <input type="date" {...field} />}
              />
            </td>
          </tr>
          <tr>
            <td>Vendor</td>
            <td>
              <Controller
                  name="vendor"
                  control={control}
                  render={({ field }) => (
                      <div>
                        <select
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === 'other') {
                                setValue('vendor', '');
                              } else {
                                setValue('vendor', value);
                              }
                            }}
                        >
                          {vendors.map(vendor => (
                              <option key={vendor} value={vendor}>
                                {vendor}
                              </option>
                          ))}
                          <option value="other">Other (specify below)</option>
                        </select>
                        {vendorValue === 'other' && (
                            <input
                                type="text"
                                value={vendorInput}
                                onChange={(e) => {
                                  setVendorInput(e.target.value);
                                  setValue('vendor', e.target.value);
                                }}
                            />
                        )}
                      </div>
                  )}
              />
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td>
              <Controller
                  name="total"
                  control={control}
                  render={({ field }) => <input type="number" step="0.01" {...field} />}
              />
            </td>
          </tr>
          <tr>
            <td>Category</td>
            <td>
              <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                      <div>
                        <select
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === 'other') {
                                setValue('category', '');
                              } else {
                                setValue('category', value);
                              }
                            }}
                        >
                          {categories.map(category => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                          ))}
                          <option value="other">Other (specify below)</option>
                        </select>
                        {categoryValue === 'other' && (
                            <input
                                type="text"
                                value={categoryInput}
                                onChange={(e) => {
                                  setCategoryInput(e.target.value);
                                  setValue('category', e.target.value);
                                }}
                            />
                        )}
                      </div>
                  )}
              />
            </td>
          </tr>
          </tbody>
        </Table>
        <button type="submit">Submit</button>
      </form>
  );
};

export default ExpensesTable;
