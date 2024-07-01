import Transaction from "./Transaction.js";
import Category from "./Category.js";

class User {
    constructor(googleAuth) {
        this.user_id = googleAuth.uid;
        this.access_token = googleAuth.accessToken;
        this.email = googleAuth.email;
        this.first_name = googleAuth.displayName.split(" ")[0];
        this.last_name = googleAuth.displayName.split(" ").slice(1).join(" ");
        this.created_at = googleAuth.metadata?.createdAt || new Date().getTime();
        this.last_login = googleAuth.metadata?.lastLoginAt || new Date().getTime();
        this.admin = null;
        this.transactions = [];
        this.categories = [];
    }

    getCreatedAtString() {
        return new Date(this.created_at).toString();
    }

    getLastLoginString() {
        return new Date(this.last_login).toString();
    }

    isNewUser() {
        const url = import.meta.env.VITE_DEV_GET_USER_ENDPOINT
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }; // Specify your init object here

        try {
            let response;
            fetch(url, init)
                .then(res => response = res.json())
            return response.ok; // Return true if the response is ok, otherwise false
        } catch (error) {
            console.error("Error checking if new user:", error);
            return false;
        }
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
}

export default User;
