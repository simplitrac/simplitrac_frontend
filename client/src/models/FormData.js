import Transaction from "./Transaction.js";

class FormData {

    constructor(data) {
        if(data instanceof Transaction){
            this.vendor = data.vendor
            this.amount = data.amount;
            this.category_name = data.category_name;
            this.created_at = data.created_at;
        } else {
            this.vendor = "";
            this.created_at = "";
            this.amount = "";
            this.category_name = "";
        }

    }

    returnNonEmptyValues() {
        // return Object.entries(this).filter((entry, index) => {
        //     if(entry[index] !== null && entry[index] !== undefined && entry[index] !== ""){
        //         console.log(entry[index])
        //     }
        // })
        return Object.entries(this).filter((entry, index) => entry[index - 1] !== null && entry[index - 1] !== undefined && entry[index - 1] !== "")
    }

}

export default FormData