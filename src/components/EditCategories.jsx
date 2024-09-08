import { useContext } from "react";
import { AppContext } from "../context/AppContext";


const EditCategories = () => {
    const { user, setUser, setIsUpdating, setServerResponse } = useContext(AppContext)
    
    const handleDeleteCategory = async (user, categoryId) => {

        if (window.confirm("Are you sure you want to delete this category?")) {

            setIsUpdating(true);
            const result = await user.deleteCategory(categoryId);

            if (result instanceof User) {
                setUser(result);
                setServerResponse('Category Successfully Deleted');
            } else {
                setServerResponse('Failed to delete category');
            }
            setIsUpdating(false);
        }
    }


    return (
        <div className="categories-list">
            <h3>Your Categories</h3>
            <ul className="category-list">
                {user.categories.map((category) => (
                    <li key={category.category_id} className="category-item">
                        <span>{category.category_name}</span>
                        <button
                            className="delete-button custom-button"
                            // onClick={() => handleDeleteCategory(category.category_id)}
                            onClick={() => handleDeleteCategory(user, category.category_id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EditCategories;
