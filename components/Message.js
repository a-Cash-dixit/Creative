export default function Message({ children, avatar, username, description }) {
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
            {username}
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
          <div style={{ display: "flex", justifyContent:"space-between",maxWidth:"37%",marginTop:"0.7rem"}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div style={{ background: "#243447", display: "flex",flexDirection:"column",marginBottom:"0.15%" }}>
      <div style={{ display:"flex",alignItems:"center"}}>
        <img
          src={avatar}
          style={{
            width:"8%",
            borderRadius: "100%",
          }}
        ></img>
        <div>
          <h2 style={{color:"#E1E8ED",fontFamily:"monospace"}}>{username}</h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          color: "#F5F8FA",
          wordBreak:"break-all",
          fontFamily:"monospace",
          marginLeft:"1px"
        }}
      >
        <p>{description}</p>
      </div>
      <div style={{display:"flex",justifyContent:"space-around",width:"12%"}}>
      {children}
      </div>
    </div> */
}
