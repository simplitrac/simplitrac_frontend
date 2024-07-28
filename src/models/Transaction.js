import { v4 as uuidv4 } from 'uuid';

class Transaction {
    /**
     * Represents a financial transaction with various attributes.
     *
     * @param {Object|string} [data] - The data to initialize the transaction, typically from an object or a JSON string.
     */
    constructor(data = {}) {
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (error) {
                console.error('Invalid JSON string provided:', error);
                data = {};
            }
        }
        if (data instanceof Transaction){
            Object.assign(this, data)
        } else {
            this.transactionId = data.transaction_id || this.#generateUUID();
            this.createdAt = data.created_at || null;
            this.amount = data.amount || null;
            this.vendor = data.vendor || null;
            this.category_id = data.category_id || null;
            this.category_name = data.category_name || null;
            this.pictureId = data.pictureId || null;
            this.isSuccessful = data.isSuccessful || null;
        }
<<<<<<< HEAD
        this.transactionId = data.transactionId || this.#generateUUID();
        this.createdAt = data.createdAt || null;
        this.amount = data.amount || null;
        this.vendor = data.vendor || null;
        this.category_name= data.category_name || null;
        this.category_id= data.category_id || null;
        this.pictureId = data.pictureId || null;
        this.isSuccessful = data.isSuccessful || null;
=======

>>>>>>> 6e27bb9 (updates)
    }

    #generateUUID() {
        // Simple UUID generator
        return uuidv4()
    }

    isEmpty(){
<<<<<<< HEAD
        return this.vendor === null && this.amount === null && this.createdAt === null && this.category_id === null && this.category_name === null
    }

    isNotComplete(){
        return this.vendor === null || this.amount === null || this.createdAt === null || this.category_id === null || this.category_name === null
=======
        return this.vendor === null && this.amount === null && this.createdAt === null && this.category_name === null
>>>>>>> 6e27bb9 (updates)
    }

    serialize() {
        return {
            transactionId: this.transactionId,
            createdAt: this.createdAt,
            amount: this.amount,
            vendor: this.vendor,
<<<<<<< HEAD
            category_name: this.category_name,
            category_id: this.category_id,
=======
            category_id: this.category_id,
            category_name: this.category_name,
>>>>>>> 6e27bb9 (updates)
            pictureId: this.pictureId,
            isSuccessful: this.isSuccessful,
        };
    }

    toString(){
        return JSON.stringify(this.serialize());
    }
}

export default Transaction;