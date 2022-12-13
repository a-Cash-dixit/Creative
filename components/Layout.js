import Nav from "./Nav";
export default function Layout({children}){
    return (
        <div style={{width:"40%",margin:"auto",borderRadius:"10%"}}>
            <Nav />
            <main>{children}</main>
        </div>
    )
}