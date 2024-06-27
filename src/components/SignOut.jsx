import { auth , signOut} from "../config/initializeFirestore.js";
import {AppContext} from "../context/AppContext.jsx";
import {useContext} from "react";

const Logout = () => {

    const { setScreen, setUser } = useContext(AppContext);

    const logOut = async () => {
        try {
            await signOut(auth);
            setScreen("login")
            setUser(null)
        } catch (err) {
            console.error('Error signing out: ', err);
        }
    }

    return (
        <button onClick={logOut}>Logout</button>
    );
}

export default Logout;
