import { db,auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { arrayUnion, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import react from "react";
import Message from "../components/Message";
import { toast } from "react-toastify";
export default function Comments(){
    const [comment,setComment]=react.useState("");
    const [comments,setallComments]=react.useState([]);
    const router=useRouter();
    const routeData=router.query;
    //console.log(routeData);
    const submitComment=async ()=>{
        if(!auth.currentUser){
            return router.push("/auth/login");
        }
        if(!comment || comment.length==0){
            toast.error("Don't leave an empty comment 😐",{
                position:toast.POSITION.TOP_CENTER,
                autoClose:1500,
            });
            return;
        }
        const docRef=doc(db,"posts",routeData.id);
        await updateDoc(docRef,{
            comments:arrayUnion({
                description:comment,
                avatar:auth.currentUser.photoURL,
                username:auth.currentUser.displayName,
                time:Timestamp.now()
            })
        });
        setComment("");
    }
    //get comments
    const getComments=async()=>{
        const docRef=doc(db,"posts",routeData.id);
        const unsubscribe=onSnapshot(docRef,(snapshot)=>{
            setallComments(snapshot.data().comments);
        });
        return unsubscribe;
    }
    react.useEffect(()=>{
        getComments();
    },[]);
    return (
        <div>
            <Message {...routeData}></Message>
            <div style={{display:"flex",height:"2rem"}}>
                  <input style={{flex:"8",background:"#14171A",color:"#E1E8ED",fontFamily:"cursive"}} onChange={(e)=>setComment(e.target.value)} value={comment} placeholder="Type a comment..." type="text" />
                  <button style={{background:"#1DA1F2",color:"#E1E8ED",border:"none",cursor:"pointer"}} onClick={submitComment}>Submit</button>
            </div>
            <div>
                {comments && comments.map(ele=>{
                    return(
                        <Message key={ele.time} {...ele}>

                        </Message>
                    )
                })}
            </div>
        </div>
    )
}