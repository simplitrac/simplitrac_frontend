import { useContext, useEffect, useState } from "react";
import {
    Box,
    Container,
    Heading,
    Image,
    VStack,
    HStack,
    Button,
    Text,
    List,
    ListItem,
} from "@chakra-ui/react";
import ExpensesTable from "./ExpensesTable.jsx";
import CategoryModal from "./CategoryModal.jsx";
import SignOut from "./SignOut.jsx";
import { AppContext } from "../context/AppContext.jsx";
import OCRModal from "./OCRModal.jsx";
import User from "../models/User.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import {AchievementProvider, useAchievement} from "react-achievements";
import achievementConfig from "../config/achievementConfig.js";
import JoyrideTour from "./JoyRideTour.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";

const LandingComponent = () => {
    const { setScreen, ocrData, serverResponse, setServerResponse, user, setUser, setIsUpdating, renderNewScreen, categoriesSelected, setCategoriesSelected, showCategories, setShowCategories, runTour, setRunTour } = useContext(AppContext);
    const {setMetrics} = useAchievement();
    // const [showCategories, setShowCategories] = useState(false);
    // const [runTour, setRunTour] = useState(false);
    useEffect(() => {
        if (user.isNewUser && user.isNewUser() && categoriesSelected) {
            setRunTour(true);
        }
    }, [user, categoriesSelected]);


    useEffect(() => {
        setUser(user)
        setMetrics({
            categories: user.categories,
            transactions: user.transactions
        })
    }, [serverResponse]);


    return (
        // <AchievementProvider config={achievementConfig} initialState={user.serialize()} badgesButtonPosition={'top-right'}>
            <Container maxW="container.xl" py={4}>
                <HamburgerMenu setRunTour={setRunTour} />
                <Box>
                    <JoyrideTour run={runTour} setRun={setRunTour} />
                    {user.first_name && (
                        <>
                            {user.isNewUser() && <CategoryModal />}
                            {ocrData && <OCRModal />}
                            {serverResponse && <ConfirmationModal />}
                        </>
                    )}
                </Box>
                <VStack spacing={8}>
                    <HStack justify="center">
                        {/*<Image src={logo} alt="SimpliTrac Logo" boxSize="300px" borderRadius="full" />*/}
                    </HStack>
                    <ExpensesTable />
                    <HStack spacing={4}>
                        <Button 
                            width="100%"
                            data-tour="scan-receipt"
                            background="#415a77"
                            onClick={() => renderNewScreen("camera")}>Scan Receipt</Button>
                        <Button
                            width="100%"
                            data-tour="edit-transactions"
                            background="#415a77"
                            onClick={() => renderNewScreen("edit")}>Edit Transactions</Button>
                    </HStack>

                </VStack>
            </Container>
        // </AchievementProvider>
    );
};

export default LandingComponent;
