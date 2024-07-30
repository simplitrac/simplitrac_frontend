import {useContext, useEffect, useRef, useState} from "react";
import { useForm, Controller } from 'react-hook-form';
import { AppContext } from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const ExpensesForm = () => {
    const { user, ocrData, setOcrData, setServerResponse } = useContext(AppContext);
    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [vendorInput, setVendorInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const catSelectRef = useRef("");
    const vendSelectRef = useRef("")

    const {
        control,
        handleSubmit,
        setValue,
        watch
    } = useForm({
        defaultValues: {
            vendor: 'Select Vendor',
            category: 'Select Category',
            date: new Date().toISOString().split('T')[0],
            total: '',
        }
    });

    const toProperCase = (name) => {
        if (!name) return;
        const lower = name.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    const getListOfVendors = () => {
        if (user.transactions.length !== 0) {
            const newSet = new Set(["Select Vendor", ...user.transactions.map(transaction => toProperCase(transaction.vendor))]);
            setVendors([...newSet]);
        } else {
            setVendors(["Select Vendor"]);
        }
    };

    const getListOfCategories = () => {
        if (user.categories.length !== 0) {
            const newSet = new Set(["Select Category", ...user.categories.map(category => toProperCase(category.name))]);
            setCategories([...newSet]);
        } else {
            setCategories(["Select Category"]);
        }
    };

    const vendorBlur = (e) => {
        const newVendor = e.target.value;
        const newOCR = new Transaction(ocrData);
        newOCR.vendor = newVendor;
        setOcrData(newOCR);
        setVendors(prevVendors => [...new Set([...prevVendors, newVendor])]);
        setVendorInput("");
        setValue('vendor', newVendor); // Set the form value to the new vendor
    };

    const categoryBlur = (e) => {
        if (e.target.value !== "") {
            const newCat = e.target.value;
            const newOCR = new Transaction(ocrData);
            newOCR.category = { id: "", name: newCat };
            setOcrData(newOCR);
            setCategories(prevCategories => [...new Set([...prevCategories, newCat])]);
            setCategoryInput("");
            setValue('category', newCat); // Set the form value to the new category
        }
    };

    useEffect(() => {
        if (ocrData.isEmpty()) {
            getListOfVendors();
            getListOfCategories();
        }
    }, [catSelectRef.current, vendSelectRef.current]);

    const onSubmit = async (data) => {
        const userWithUpdates = new User(user);

        const transaction = new Transaction(ocrData);
        transaction.created_at = data.date;
        transaction.vendor = data.vendor;
        transaction.amount = data.total;
        transaction.category_id = data.category;

        userWithUpdates.transactions.push(transaction);

        const result = await user.updateFirebase();
        
        if (result instanceof User) {
            setServerResponse('User Successfully Updated');
            setUser(result);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Date</label>
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => <input type="date" {...field} />}
                />
            </div>
            <div>
                <label>Vendor</label>
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
                                        field.onChange('');
                                    } else {
                                        field.onChange(value);
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
                            {field.value === '' && (
                                <input
                                    type="text"
                                    value={vendorInput}
                                    onChange={(e) => {
                                        setVendorInput(e.target.value);
                                    }}
                                    onBlur={vendorBlur}
                                />
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label>Amount</label>
                <Controller
                    name="total"
                    control={control}
                    render={({ field }) =>
                        <input
                            type="number"
                            inputMode={"numeric"}
                            step="0.01" {...field} />}
                />
            </div>
            <div>
                <label>Category</label>
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
                                        field.onChange('');
                                    } else {
                                        field.onChange(value);
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
                            {field.value === '' && (
                                <input
                                    type="text"
                                    value={categoryInput}
                                    onChange={(e) => {
                                        setCategoryInput(e.target.value);
                                    }}
                                    onBlur={categoryBlur}
                                />
                            )}
                        </div>
                    )}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ExpensesForm;
