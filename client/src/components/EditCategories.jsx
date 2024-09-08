import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import User from "../models/User.js";
import { Heading, Box, List, ListItem, HStack, Button, Text } from "@chakra-ui/react";
import { SettingsBackupRestoreRounded } from "@mui/icons-material";


const EditCategories = () => {
    const { user, setUser, setServerResponse, setIsUpdating, setScreen } = useContext(AppContext)

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
        <Box w="100%">
            <Heading as="h3" size="lg" mb={4}>
                Your Categories
            </Heading>
            <List spacing={3}>
                {user.categories.map((category) => (
                    <ListItem key={category.category_id}>
                        <HStack justify="space-between">
                            <Text>{category.category_name}</Text>
                            <Button colorScheme="red" onClick={() => handleDeleteCategory(user, category.category_id)}>
                                Delete
                            </Button>
                        </HStack>
                    </ListItem>
                ))}
            </List>
            <Button onClick={setScreen('landing')}
            >Done</Button>
        </Box>
    )
}

export default EditCategories;
