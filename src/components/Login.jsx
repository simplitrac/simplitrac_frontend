// Copied this from:
// https://blog.bitsrc.io/firebase-authentication-with-react-for-beginners-implementing-email-password-and-google-sign-in-e62d9094e22
import { auth , googleProvider} from "../config/initializeFirestore.js";
import {
    // createUserWithEmailAndPassword,
    signInWithPopup, signOut } from "firebase/auth";

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
            const user = result.user;
            setUser(user)
            console.log(result)
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