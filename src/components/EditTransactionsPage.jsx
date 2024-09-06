import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from "../context/AppContext.jsx";
import { useForm, Controller } from 'react-hook-form';
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import BackButton from "./BackButton.jsx";
import '../App.css';
import { Button } from "@chakra-ui/react";

const EditTransactionsPage = () => {
    const { user, setUser, setScreen, setServerResponse } = useContext(AppContext);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [deletedTransactions, setDeletedTransactions] = useState([]);

    useEffect(() => {
        if (user && user.transactions) {
            setTransactions(user.transactions);
        }
        if (user && user.categories) {
            // Ensure we have a "Select Category" option
            setCategories(["Select Category", ...user.categories.map(cat => cat.category_name)]);
        }
    }, [user])

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
        return user.categories.find(category => category.categoryId === catId)
    }

    const toProperCase = (string) => {
        if (string === undefined) return
        return string.charAt(0).toUpperCase() + string.slice(1);
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

        const result = await updatedUser.deleteTransactions();

        if (result instanceof User) {
            setUser(result);
            setServerResponse('Transactions Successfully Updated');
            localStorage.clear()
            localStorage.setItem('user', result)
            setScreen('landing');
        }
    };

    const handleCancel = () => {
        setScreen('landing');
    };

    const handleDelete = async (transactionId) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            const updatedTransactions = transactions.filter(t => t.transactionId !== transactionId);
            setTransactions(updatedTransactions);
            setDeletedTransactions()

            const updatedUser = new User(user);
            updatedUser.transactions = updatedTransactions;
            const result = await updatedUser.updateFirebase();

            if (result instanceof User) {
                setUser(result);
                setServerResponse('Transaction Successfully Deleted');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-buttons">
            <div className="edit-left-button">
                <Button type="button" className="custom-button" style={{backgroundColor: '#415a77',width:"80px", padding: "12px 20px"}} onClick={handleCancel}>Cancel</Button>
                <Button type="button" className="custom-button" style={{backgroundColor: '#415a77',width:"80px", padding: "12px 20px"}} onClick={handleCancel}>Back</Button>
            </div>
            <div className="edit-right-button">
                <Button type="submit" className="custom-button" style={{backgroundColor: '#415a77',width:"130px", padding: "12px 20px"}}>Save Changes</Button>
            </div>
        </div>
        <h1 style={{textAlign: 'center', margin: '0px 0 30px 0'}}><b>Edit Transactions</b></h1>
        
        <table className="edit-table" style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Vendor</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={transaction.transactionId}>
                        <td>
                            <Controller
                                name={`date-${index}`}
                                control={control}
                                defaultValue={transaction.createdAt}
                                render={({ field }) => <input type="date" {...field} />}
                            />
                        </td>
                        <td>
                            <Controller
                                name={`vendor-${index}`}
                                control={control}
                                defaultValue={transaction.vendor}
                                render={({ field }) => <input type="text" {...field} />}
                            />
                        </td>
                        <td>
                            <Controller
                                name={`amount-${index}`}
                                control={control}
                                defaultValue={transaction.amount}
                                render={({ field }) => <input type="number" step="0.01" {...field} />}
                            />
                        </td>
                        <td>
                            <Controller
                                name={`category-${index}`}
                                control={control}
                                defaultValue={transaction.category_name || "Select Category"}
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
                        </td>
                        <td>
                            <Button
                                type="button"
                                className="custom-button delete-button"
                                onClick={() => handleDelete(transaction.transactionId)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </form>
);
};

export default EditTransactionsPage;

