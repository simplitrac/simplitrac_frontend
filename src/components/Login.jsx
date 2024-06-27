// Copied this from:
// https://blog.bitsrc.io/firebase-authentication-with-react-for-beginners-implementing-email-password-and-google-sign-in-e62d9094e22
import { auth , googleProvider} from "../config/initializeFirestore.js";
import {
    // createUserWithEmailAndPassword,
    signInWithPopup, signOut } from "firebase/auth";
import User from "../models/User.js";

export const Login = (props) => {
    const setScreen = props.setScreen
    const setUser = props.setUser
    //
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email);
    // const signIn = async () => {
    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //     } catch (err){
    //         console.error(err);
    //     }
    // };
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth,googleProvider);
            const user = new User(result.user);
            await createNewUser(user)
            setUser(user)
            setScreen("landing")
        } catch (err){
            console.error(err);
        }
    };
    const logOut = async () => {
        try {
            const result = await signOut(auth);
            console.log(result)
        } catch (err){
            console.error(err);
        }
    };


    async function createNewUser(user){
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user)
        };
        // In order to run locally, you need to change the endpoint to your local endpoint:
        // This should be in your .env file
        const endpoint = import.meta.env.VITE_PROD_CREATE_USER_ENDPOINT
        const result = await fetch(endpoint, init)
        console.log(result)
    }

    return (
        <div>
            {/*<input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />*/}
            {/*<input*/}
            {/*    type="password"*/}
            {/*    placeholder="Password.."*/}
            {/*    onChange={(e) => setPassword(e.target.value)}*/}
            {/*/>*/}
            {/*<button onClick={signIn}> Signin</button>*/}
            <button onClick={signInWithGoogle}> Signin with Google</button>
            <button onClick={logOut}> logOut</button>
            {/*<button onClick={signInWithGoogle}> Signin with Google</button>*/}
            {/*<button onClick={logOut}> logOut</button>*/}
        </div>
    );
};

export default Login