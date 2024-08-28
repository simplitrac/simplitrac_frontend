import { useContext, useEffect, useRef, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { AppContext } from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import FormData from '../models/FormData.js';
import '../App.css';
import Updating from "./Updating.jsx";

const ExpensesForm = () => {
    // ... (rest of your existing code)

    const [filteredVendors, setFilteredVendors] = useState(vendors);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [showVendorDropdown, setShowVendorDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    // ... (rest of your functions: vendorBlur, categoryBlur, getListOfVendors, getListOfCategories, onSubmit) ...

    // Filtering functions (modified to consider isSearchable)
    const filterVendors = () => {
        const filtered = vendors.filter(vendor => {
            // Check if the vendor is searchable and matches the input
            return vendor.isSearchable &&
                vendor.toLowerCase().includes(vendorInput.toLowerCase());
        });
        setFilteredVendors(filtered);
    };

    const filterCategories = () => {
        const filtered = categories.filter(category => {
            // Check if the category is searchable and matches the input
            return category.isSearchable &&
                category.toLowerCase().includes(categoryInput.toLowerCase());
        });
        setFilteredCategories(filtered);
    };

    useEffect(() => {
        filterVendors();
        filterCategories();
    }, [vendorInput, categoryInput, vendors, categories]);

    // ... (rest of your return statement / JSX) ...
};

export default ExpensesForm;