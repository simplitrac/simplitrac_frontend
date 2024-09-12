import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, Box, Text, Spinner } from "@chakra-ui/react";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { AppContext } from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Updating from "./Updating.jsx";
import ExpenseChartJoyride from "./ExpenseChartJoyride.jsx";

const ExpensesForm = () => {
    const { user, formData, setFormData, setUser, ocrData, setOcrData, serverResponse, setServerResponse, isUpdating, setIsUpdating } = useContext(AppContext);
    const [vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);

    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            vendor: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
            amount: '',
        }
    });

    const toProperCase = (name) => {
        if (!name) return '';
        const lower = name.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    const createOption = (label) => ({
        label,
        value: label.toLowerCase(),
    });


    useEffect(() => {
        setVendors(user.returnVendorList().map(vendor => ({ value: vendor, label: vendor })));
        setCategories(user.categories.map(cat => ({ value: toProperCase(cat.category_name), label: toProperCase(cat.category_name) })));
    }, [user]);

    useEffect(() => {
        if(formData){
            const listOfValues = formData.returnNonEmptyValues();

            listOfValues.forEach(([key, value]) => {
                if(key.toLowerCase().includes("category")) {
                    const valueFromOCR = createOption(value)
                    setCategories(categories => [...categories, valueFromOCR])
                    setValue('category', valueFromOCR);
                } else if(key.toLowerCase().includes("vendor")) {
                    const valueFromOCR = createOption(value)
                    setVendors(vendors => [...vendors, valueFromOCR])
                    setValue('vendor', valueFromOCR);
                } else if (key.toLowerCase().includes("date")){
                    setValue("date", value)
                } else {
                    setValue(key, value);
                }
            });
            setFormData(null);
        }
    }, [formData, setFormData]);

    const onSubmit = async (data) => {
        if (Object.keys(errors).length > 0) {
            alert("Please fill in all the inputs properly");
            return;
        }

        setIsUpdating(true);

        const transaction = new Transaction(ocrData);
        transaction.createdAt = data.date;
        transaction.vendor = data.vendor.value;
        transaction.amount = data.amount;
        transaction.category_name = data.category.value;

        const updatedUser = new User(user);
        updatedUser.transactions.push(transaction);
        updatedUser.addCategory(data.category);

        const result = await updatedUser.updateFirebase();

        if (result instanceof User) {
            setServerResponse('User Successfully Updated');
            setUser(result);
            reset({
                vendor: '',
                category: '',
                date: new Date().toISOString().split('T')[0],
                amount: '',
            });
            setOcrData(new Transaction());
        }
        setIsUpdating(false);
    };

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            borderColor: '#E2E8F0',
            boxShadow: 'none',
            _hover: {
                borderColor: '#999993',
                background: '#999993'
            },
            minHeight: '40px',
            fontSize: '1rem',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#A0AEC0',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#2D3748',
        }),
        input: (provided) => ({
            ...provided,
            color: '#2D3748',
        }),
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="500px" mx="auto">
          < ExpenseChartJoyride />

            {isUpdating && <Updating />} {/* Show overlay when isUpdating is true */}
            <FormControl mb={4} isInvalid={errors.date}>
                <FormLabel>Date</FormLabel>
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => <Input type="date" {...field} />}
                />
            </FormControl>

            <FormControl mb={4} isInvalid={errors.vendor}>
                <FormLabel>Vendor</FormLabel>
                <Controller
                    name="vendor"
                    control={control}
                    defaultValue={null}  // This prevents react-hook-form from initializing with an empty string
                    rules={{ required: 'Please select a vendor' }}
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}  // Apply all form controls from react-hook-form to the select
                            options={vendors}
                            placeholder="Select or type a vendor..."
                            isClearable
                            isSearchable
                            styles={customSelectStyles}

                            // Handle creating a new vendor option
                            onCreateOption={(inputValue) => {
                                const newOption = { value: inputValue.toLowerCase(), label: inputValue };

                                // Add the new vendor to the list
                                setVendors(prevVendors => [...prevVendors, newOption]);

                                // Update the form state with the new vendor
                                field.onChange(newOption);
                                setValue('vendor', newOption);  // Sync the form state
                            }}

                            // Handle selecting an existing vendor
                            onChange={(selectedOption) => {
                                field.onChange(selectedOption);  // Set the whole option
                                setValue('vendor', selectedOption);  // Sync with react-hook-form
                            }}

                            // Ensure the correct value format is being passed
                            value={field.value && field.value.value ? field.value : null}
                        />
                    )}
                />
                {errors.vendor && <Text color="red.500">{errors.vendor.message}</Text>}
            </FormControl>


            <FormControl mb={4} isInvalid={errors.category}>
                <FormLabel>Category</FormLabel>
                <Controller
                    name="category"
                    control={control}
                    defaultValue={null}  // This prevents react-hook-form from initializing with an empty string
                    rules={{ required: 'Please select a category' }}
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}  // Apply all form controls from react-hook-form to the select
                            options={categories}
                            placeholder="Select or type a category..."
                            isClearable
                            isSearchable
                            styles={customSelectStyles}
                            onCreateOption={(inputValue) => {
                                const newOption = { value: inputValue, label: inputValue };
                                setCategories(prevCategories => [...prevCategories, newOption]);
                                field.onChange(newOption);
                                setValue('category', newOption);
                            }}
                            onChange={(selectedOption) => {
                                field.onChange(selectedOption);  // Set the whole option
                                setValue('category', selectedOption);  // Sync with react-hook-form
                            }}
                            value={field.value && field.value.value ? field.value : null}  // Ensure that field.value is properly formatted as an object
                        />
                    )}
                />
                {errors.category && <Text color="red.500">{errors.category.message}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.amount}>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <Controller
                    name="amount"
                    control={control}
                    rules={{
                        required: 'Please enter a valid amount. Enter a number without the "$" sign',
                        validate: value => {
                            const numberChecker = /^-?\d*(\.\d*)?$/;
                            return numberChecker.test(value) ? true : 'Please enter a valid amount. Enter a number without the "$" sign';
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Input type="text" {...field} />
                            {error && <Text color="red.500">{error.message}</Text>}
                        </>
                    )}
                />
            </FormControl>

            <Button type="submit" background="#415a77" width="full">
                {isUpdating ? <Spinner size="sm" /> : 'Submit'}
            </Button>
        </Box>
    );
};

export default ExpensesForm;
