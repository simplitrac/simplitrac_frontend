import { auth , signOut} from "../config/initializeFirestore.js";
import {AppContext} from "../context/AppContext.jsx";
import {useContext} from "react";

const Logout = () => {

    const { setScreen, setUser, resetAppState } = useContext(AppContext);

    const logOut = async () => {
        try {
            await signOut(auth);
            resetAppState()
        } catch (err) {
            console.error('Error signing out: ', err);
        }
    }

    return (
        <button onClick={logOut}>Logout</button>
    );
}

export default Logout;
