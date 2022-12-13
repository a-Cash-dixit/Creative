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
        <div style={{background:"orange",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h2 style={{color:"brown",fontFamily:"monospace"}}>Join Today</h2>
            <div style={{display:"flex",flexDirection:"column",padding:"2%"}}>
                <h3 style={{color:"brown",fontFamily:"monospace"}}>Sign in with one of the providers.</h3>
                <button style={{color:"brown",background:"khaki",border:"none",fontSize:"16px",cursor:"pointer",fontFamily:"monospace"}} onClick={GoogleLogin}>Sign in with Google</button>
            </div>
        </div>
    )
}