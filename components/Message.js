export default function Message({ children, avatar, username, description,timestamp }) {
  //console.log(timestamp.toDate().toLocaleTimeString());
  const currentMonth=new Date().getMonth();
  const currentYear=new Date().getFullYear();
  const currentDay=new Date().getDate();
  const dayCreated=timestamp.toDate().getDate();
  const monthCreated=timestamp.toDate().getMonth();
  const yearCreated=timestamp.toDate().getFullYear();
  const v=["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];
  let ans;
  if(!(currentDay==dayCreated && currentMonth==monthCreated && currentYear==yearCreated)){
    ans=v[monthCreated] +" "+ dayCreated.toString(); 
  }
  else{
    let hc=timestamp.toDate().getHours();
    let mc=timestamp.toDate().getMinutes();
    let sc=timestamp.toDate().getSeconds();
    //let h=(new Date().getHours()+24)%12 || 12;
    let h=new Date().getHours();
    let m=new Date().getMinutes();
    let s=new Date().getSeconds();
    //console.log(h,m,s);
    if(h>hc){
      ans=h-hc;
      ans=ans.toString()+"h";
    }
    else if(m>mc){
      ans=m-mc;
      ans=ans.toString()+"m";
    }
    else{
      ans=s-sc;
      ans=ans.toString()+"s";
    }
  }
  //console.log(ans);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#243447",
        border:"0.2px solid gray",
        padding:"1%"
      }}
    >
      <div style={{ display: "flex" }}>
        <img
          style={{
            flex: "1",
            width: "8%",
            height: "50%",
            borderRadius: "100%",
          }}
          src={avatar}
        ></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "14",
            paddingLeft: "0.7rem",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#E1E8ED",
              fontWeight: "700",
              fontFamily: "cursive",
            }}
          >
            {username} {ans}
          </div>
          <div
            style={{
              wordBreak: "break-all",
              color: "#F5F8FA",
              fontFamily: "sans-serif",
            }}
          >
            {description}
          </div>
          <div style={{ display: "flex", justifyContent:"space-between",maxWidth:"20%",marginTop:"0.7rem"}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

