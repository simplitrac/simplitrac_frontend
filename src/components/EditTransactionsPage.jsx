import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../context/AppContext.jsx";
import { useForm, Controller } from 'react-hook-form';
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const EditTransactionsPage = () => {
    const { user, setUser, setScreen, setServerResponse } = useContext(AppContext);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (user && user.transactions) {
            setTransactions(user.transactions);
        }
        if (user && user.categories) {
            // Ensure we have a "Select Category" option
            setCategories(["Select Category", ...user.categories.map(cat => cat.category_name)]);
        }
    }, [user]);

    const { control, handleSubmit, watch } = useForm(
        // {
        //     defaultValues: {
        //         vendor: 'Select Vendor',
        //         category: 'Select Category',
        //         date: new Date().toISOString().split('T')[0],
        //         total: '',
        //     }
        // }
    );

    const getCategoryByCategoryId = (catId) => {
        return user.categories.find( category => category.categoryId === catId)
    }

    const onSubmit = async (data) => {
        const updatedTransactions = transactions.map((transaction, index) => {
            const updatedTransaction = new Transaction(transaction);
            updatedTransaction.vendor = data[`vendor-${index}`];
            updatedTransaction.amount = parseFloat(data[`amount-${index}`]);
            updatedTransaction.category = { name: data[`category-${index}`] };
            updatedTransaction.createdAt = data[`date-${index}`];
            return updatedTransaction;
        });

        const updatedUser = new User(user);
        updatedUser.transactions = updatedTransactions;

        const result = await updatedUser.updateFirebase();
        
        if (result instanceof User) {
            setUser(result);
            setServerResponse('Transactions Successfully Updated');
            setScreen('landing');
        }
    };

    const handleCancel = () => {
        setScreen('landing');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit Transactions</h2>
            {transactions.map((transaction, index) => (
                <div key={transaction.transactionId} className="transaction-edit-row">
                    <label>Date</label>
                    <Controller
                        name={`date-${index}`}
                        control={control}
                        defaultValue={transaction.createdAt}
                        render={({field}) => <input type="date" {...field} />}
                    />
                    <label>Vendor</label>
                    <Controller
                        name={`vendor-${index}`}
                        control={control}
                        defaultValue={transaction.vendor}
                        render={({field}) => <input type="text" {...field} />}
                    />
                    <label>Amount</label>
                    <Controller
                        name={`amount-${index}`}
                        control={control}
                        defaultValue={transaction.amount}
                        render={({field}) => <input type="number" step="0.01" {...field} />}
                    />
                    <label>Category</label>
                    <Controller
                        name={`category-${index}`}
                        control={control}
                        defaultValue={transaction.category?.category_name || "Select Category"}
                        render={({ field }) => (
                            <select {...field}>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </div>
            ))}
            <div className="edit-buttons">
                <button type="submit" className="custom-button">Save Changes</button>
                <button type="button" className="custom-button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EditTransactionsPage;