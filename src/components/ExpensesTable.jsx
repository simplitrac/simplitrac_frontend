import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, Box, Text, Spinner } from "@chakra-ui/react";
import CreatableSelect from 'react-select/creatable';
import { AppContext } from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Updating from "./Updating.jsx";

const ExpensesForm = () => {
    const { user, formData, setFormData, setUser, ocrData, setOcrData, setServerResponse, isUpdating, setIsUpdating } = useContext(AppContext);
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

    useEffect(() => {
        setVendors(user.returnVendorList().map(vendor => ({ value: vendor, label: vendor })));
        setCategories(user.categories.map(cat => ({ value: toProperCase(cat.category_name), label: toProperCase(cat.category_name) })));

        if (formData) {
            const listOfValues = formData.returnNonEmptyValues();
            listOfValues.forEach(([key, value]) => {
                setValue(key, value);
            });
            setFormData(null);
        }
    }, [user, formData, setValue]);

    const onSubmit = async (data) => {
        if (Object.keys(errors).length > 0) {
            alert("Please fill in all the inputs properly");
            return;
        }

        setIsUpdating(true);

        const transaction = new Transaction(ocrData);
        transaction.createdAt = data.date;
        transaction.vendor = data.vendor;
        transaction.amount = data.amount;
        transaction.category_name = data.category;

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
                borderColor: '#CBD5E0',
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
                    rules={{ required: 'Please select a vendor' }}
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}
                            options={vendors}
                            placeholder="Select or type a vendor..."
                            isClearable
                            isSearchable
                            styles={customSelectStyles}
                            onChange={(selectedOption) => {
                                const newValue = selectedOption?.value || '';
                                field.onChange(newValue);
                                if (newValue && !vendors.some(v => v.value === newValue)) {
                                    setVendors([...vendors, { value: newValue, label: newValue }]);
                                }
                            }}
                            value={vendors.find(v => v.value === field.value) || null}
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
                    rules={{ required: 'Please select a category' }}
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}
                            options={categories}
                            placeholder="Select or type a category..."
                            isClearable
                            isSearchable
                            styles={customSelectStyles}
                            onChange={(selectedOption) => {
                                const newValue = selectedOption?.value || '';
                                field.onChange(newValue);
                                if (newValue && !categories.some(c => c.value === newValue)) {
                                    setCategories([...categories, { value: newValue, label: newValue }]);
                                }
                            }}
                            value={categories.find(c => c.value === field.value) || null}
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

            <Button type="submit" colorScheme="teal" width="full">
                {isUpdating ? <Spinner size="sm" /> : 'Submit'}
            </Button>
        </Box>
    );
};

export default ExpensesForm;
