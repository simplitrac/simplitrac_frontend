import Category from "./Category.js";
import Transaction from "./Transaction.js";

class User {

    // static environment = import.meta.env.DEVELOPMENT.toLowerCase() === "true" ?
    //     import.meta.env.VITE_DEV_UPDATE_USER_ENDPOINT :
    //     import.meta.env.VITE_PROD_UPDATE_USER_ENDPOINT

    constructor(data) {
        if(data instanceof User){
            Object.assign(this, data);
        } else {
            this.user_id = data?.uid ?? data.user_id;
            this.access_token = data?.accessToken;
            this.email = data?.email;
            if(data?.displayName){
                this.first_name = data?.displayName.split(" ")[0];
                this.last_name = data?.displayName.split(" ").slice(1).join(" ");
            } else {
                this.first_name = data?.first_name;
                this.last_name = data?.last_name;
            }

            this.created_at = data?.metadata?.createdAt || new Date().getTime();
            this.last_login = data?.metadata?.lastLoginAt || new Date().getTime();
            this.admin = null;
            this.transactions = data.transactions?.map(transaction => new Transaction(transaction)) || [];
            this.categories = data.categories?.map(category => new Category(category)) || [];
        }
    }

    getCreatedAtString() {
        return new Date(this.created_at).toString();
    }

    getLastLoginString() {
        return new Date(this.last_login).toString();
    }

    isNewUser() {
        return this.categories?.length === 0 || this.categories?.length === undefined;
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

    addCategory(catName){
        this.categories.push(new Category(catName))
    }

    toString() {
        return JSON.stringify(this.serialize());
    }

    addTransaction(transaction) {
        if (transaction instanceof Transaction) {
            this.transactions.push(transaction);
        } else {
            console.error('Invalid transaction provided:', transaction);
        }
    }

    returnCategoryList(){
       return [...new Set(["Select category", ...this.categories.map(category => toProperCase(category.category_name))])];
    }

    returnVendorList(){
         return [...new Set(["Select vendor", ...this.transactions.map(transaction => toProperCase(transaction.vendor))])];
    }

    async updateFirebase(){
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.serialize())
        };
        const endPoint = `${import.meta.env.VITE_PROD_UPDATE_USER_ENDPOINT}/?user_id=${this.user_id}`;
        const response = await fetch(endPoint, init);
        let result;
        result = await response.text();


        return new User(JSON.parse(result));
    }

    static async getUserFromFirestore(user_id){
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };
        const endPoint = `${import.meta.env.VITE_PROD_GET_USER_ENDPOINT}?user_id=${user_id}`;

        try {
            const res = await fetch(endPoint, init);
            const json = await res.json();
            if (json instanceof Object) {
                return new User(json);
            } else {
                return new User();
            }
        } catch (e) {
            console.log(e);
            return new User();
        }
    }
}

function toProperCase(name){
    if (!name) return;
    const lower = name.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
};


export default User;
