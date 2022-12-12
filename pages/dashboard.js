import {auth} from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import react from "react";
export default function Dashboard(){
    const route=useRouter();
    const [user,loading]=useAuthState(auth);  
    //see if user is locked
    const getData=async()=>{
        if(loading){
            return;
        }
        if(!user){
            route.push("/auth/login");
        }
    }
    //get users data
    react.useEffect(()=>{
        getData();
    },[user,loading]);
    return (
        <div>
            <h1>Your Posts</h1>
            <div>Posts</div>
            <button onClick={()=>auth.signOut()}>Sign Out</button>
        </div>
    )
}