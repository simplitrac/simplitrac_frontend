import {useContext, useEffect, useRef, useState} from "react";
import { useForm, Controller} from 'react-hook-form';
import { AppContext } from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import FormData from '../models/FormData.js'

const ExpensesForm = () => {
    const { user, formData, setFormData, setUser, ocrData, setOcrData, setServerResponse } = useContext(AppContext);
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
        watch,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            vendor: 'Select Vendor',
            category: 'Select Category',
            date: new Date().toISOString().split('T')[0],
            amount: '',
        }
    });

    const toProperCase = (name) => {
        if (!name) return;
        const lower = name.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    const getListOfVendors = () => {
        if (user.transactions.length !== 0) {
            const newSet = new Set(["Select vendor", ...user.returnVendorList()]);
            setVendors([...newSet]);
            // return newSet
        } else {
            setVendors(["Select Vendor"]);
        }

    };

    const getListOfCategories = () => {
        if (user.categories.length !== 0) {
            const newSet = new Set(["Select category", ...user.categories.map(category => toProperCase(category.category_name))]);
            setCategories([...newSet]);
            // return newSet
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
        setValue('vendor', newVendor);
    }; 

    const categoryBlur = (e) => {
        if (e.target.value !== "") {
            const newCat = e.target.value;
            const newOCR = new Transaction(ocrData);
            newOCR.category_name = newCat;
            setOcrData(newOCR);
            setCategories(prevCategories => [...new Set([...prevCategories, newCat])]);
            setCategoryInput("");
            setValue('category', newCat);
        }
    };

    useEffect(() => {
        if (ocrData.isEmpty()) {
            getListOfVendors();
            getListOfCategories();
        }
        if(!formData) return;

        const listOfValues = formData.returnNonEmptyValues()
        let refreshVendors, refreshCats = true;

        if(listOfValues.length){
            for(const entry of listOfValues){
                const key = entry[0];
                const value = entry[1]


                switch (key){
                    case "vendor":
                        setVendors([...user.returnVendorList(), value])
                        catSelectRef.current = toProperCase(value)
                        setValue(key, value)
                        refreshVendors = false
                        break;
                    case "category":
                        user.addCategory(value)
                        setCategories([...user.returnCategoryList()])
                        vendSelectRef.current = toProperCase(value)
                        setValue(key, value)
                        refreshCats = false
                        break;
                    default:
                        setValue(key, value)
                        break;
                }
            }
            setFormData()
            refreshVendors ? getListOfVendors() : null;
            refreshCats ? getListOfCategories() : null;
        }

    }, [catSelectRef.current, vendSelectRef.current, user, formData]);

    const onSubmit = async (data) => {
        if (Object.keys(errors).length > 0) {
        // (errors.amount || errors.vendor || errors.category) {
            alert("Please fill in all the inputs properly");
            return;
        }
        const userWithUpdates = new User(user);

        const transaction = new Transaction(ocrData);
        transaction.created_at = data.date;
        transaction.vendor = data.vendor;
        transaction.amount = data.amount;
        transaction.category_name = data.category;

        userWithUpdates.transactions.push(transaction);

        const result = await user.updateFirebase();
        
        if (result instanceof User) {
            setServerResponse('User Successfully Updated');
            setUser(result);
            reset({
                vendor: 'Select Vendor',
                category: 'Select Category',
                date: new Date().toISOString().split('T')[0],
                amount: '',
            })
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
                    rules={{
                        required: 'Please select a vendor',
                        validate: value => (value === 'Select vendor' || value === '') ? 'Please select a vendor' : true //this might be missing some parts in callback, set validsate to select vendor and set to reference, not to a variable. 
                    }}
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
                            {(field.value === '' || field.value === 'Select vendor' || field.value === 'Other (specify below)') && (
                                <>
                                    <input
                                        id="vendor"
                                        type="text"
                                        value={vendorInput}
                                        onChange={(e) => {
                                            setVendorInput(e.target.value);
                                        }}
                                        onBlur={(e) => {
                                            vendorBlur(e);
                                            field.onBlur(); 
                                        }}
                                    />
                                    {errors.vendor && (
                                        <span role="alert" style={{ color: 'red'}}>
                                            {errors.vendor.message}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                <Controller
                    name="amount"
                    control={control}
                    rules={{
                        required: 'Please enter a valid number',
                        validate: value => {
                            if(isNaN(value)) {
                                // return 'Please enter a valid number';
                        }
                        return true;
                    }
                    }}
                    render={({ field }) =>
                        <input
                            id="amount"
                            type="number"
                            inputMode={"numeric"}
                            step="0.01" {...field} />}
                            />
                        {errors.amount && (
                            <span role="alert" style={{ color: 'red'}}>
                                {errors.amount.message}
                            </span>
                        )}         
                 </div>
            <div>
                <label>Category</label>
                <Controller
                    name="category"
                    control={control}
                    rules={{
                        required: 'Please select a category',
                        validate: value => (value === 'Select category' || value === '' || value === 'Other (specify below)' || value === 'Select Category') ? 'Please select a category' : true

                    }}
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
                            {(field.value === ''  || field.value === 'Select category' || field.value === 'Select Category' || field.value ==='Other (specify below)') && (
                                <>
                                <input
                                    id="category"
                                    type="text"
                                    value={categoryInput}
                                    onChange={(e) => {
                                        setCategoryInput(e.target.value);
                                    }}
                                    onBlur={categoryBlur}
                                />
                                {errors.category && (
                                    <span role="alert" style={{ color: 'red'}}>
                                        {errors.category.message}
                                    </span>
                                )}
                            </>
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
