import {signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import {auth} from "../../utils/firebase";
import { useRouter } from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import react from "react";
export default function Login(){
    const Route=useRouter();
    const [user,loading]=useAuthState(auth);
    //Sign in with Google
    const googleProvider= new GoogleAuthProvider();
    const GoogleLogin=async ()=>{
        try{
            const result =await signInWithPopup(auth,googleProvider);
            Route.push("/");
        }
        catch(error){
            console.log(error);
        }
    }
    react.useEffect(()=>{
        if(user){
            Route.push("/");
        }
    },[user])
    return (
        <div>
            <h2>Join Today</h2>
            <div>
                <h3>Sign in with one of the providers.</h3>
                <button onClick={GoogleLogin}>Sign in with Google</button>
            </div>
        </div>
    )
}