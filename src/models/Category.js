import { v4 as uuidv4 } from 'uuid';

class Category{
    constructor(data){
        this.id = data.id;
        this.name = data.name;
    }

    serialize(){
        return {
            id: this.id,
            name: this.name
        };
    }

    toString(){
        return JSON.stringify(this.serialize());
    }
}

export default Category;