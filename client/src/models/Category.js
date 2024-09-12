import { v4 as uuidv4 } from 'uuid';

class Category{
    constructor(data){
        if(data instanceof Object){
            this.category_id = data.category_id;
            if(data.value) {
                this.category_name = data.value.toLowerCase();
            } else {
                this.category_name = data.category_name.toLowerCase();
            }
        } else if(data instanceof Category){
            Object.assign(this, data);
        } else {
            this.category_name = data;
            this.category_id = "";
        }
    }

    serialize(){
        return {
            category_id: this.category_id,
            category_name: this.category_name.toLowerCase()
        };
    }

    toString(){
        return JSON.stringify(this.serialize());
    }
}

export default Category;