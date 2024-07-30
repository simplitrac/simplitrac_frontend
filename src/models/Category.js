import { v4 as uuidv4 } from 'uuid';

class Category{
    constructor(data){
        this.category_id = data.category_id;
        this.category_name = data.category_name;
    }

    serialize(){
        return {
            category_id: this.category_id,
            category_name: this.category_name
        };
    }

    toString(){
        return JSON.stringify(this.serialize());
    }
}

export default Category;