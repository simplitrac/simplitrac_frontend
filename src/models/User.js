import Transaction from "./Transaction.js";
import Category from "./Category.js";

class User {
    constructor(data) {
        if(data instanceof User){
            Object.assign(this, data)
        } else {
            this.user_id = data?.uid;
            this.access_token = data?.accessToken;
            this.email = data?.email;
            this.first_name = data?.displayName.split(" ")[0];
            this.last_name = data?.displayName.split(" ").slice(1).join(" ");
            this.created_at = data?.metadata?.createdAt || new Date().getTime();
            this.last_login = data?.metadata?.lastLoginAt || new Date().getTime();
            this.admin = null;
            this.transactions = [];
            this.categories = [];
        }
    }

    getCreatedAtString() {
        return new Date(this.created_at).toString();
    }

    getLastLoginString() {
        return new Date(this.last_login).toString();
    }

    isNewUser() {
        // const endPoint = import.meta.env.VITE_PROD_GET_USER_ENDPOINT
        // const init = {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Accept: "application/json",
        //     }
        // };
        //
        // const url = `${endPoint}?user_id=${this.user_id}`;
        //
        // try {
        //     let response;
        //     fetch(url, init)
        //         .then(res => response = res.json())
        //     return response?.length === 0 || response?.length === undefined
        // } catch (error) {
        //     console.error("Error checking if new user:", error);
        //     return false;
        // }
        return this.categories?.length === 0 || this.categories?.length === undefined
    }

    serialize() {
        return {
            user_id: this.user_id,
            access_token: this.access_token,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            created_at: this.created_at,
            last_login: this.last_login,
            admin: this.admin,
            transactions: this.transactions.map(transaction => transaction.serialize()),
            categories: this.categories.map(category => category.serialize())
        };
    }

    toString(){
        return JSON.stringify(this.serialize())
    }

    addTransaction(transaction) {
        if (transaction instanceof Transaction) {
            this.transactions.push(transaction);
        } else {
            console.error('Invalid transaction provided:', transaction);
        }
    }

    updateFirebase(){
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.serialize())
        };
        const endPoint = import.meta.env.VITE_PROD_UPDATE_USER_ENDPOINT
        let result;
        fetch(endPoint, init)
            .then( res => {
                result = res.json()
            })
        return result
    }
}

export default User;
