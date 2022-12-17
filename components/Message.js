export default function Message({ children, avatar, username, description }) {
  return (
    <div style={{ background: "#243447", display: "flex" }}>
      <div style={{ width: "5%", padding: "3%" }}>
        <img
          src={avatar}
          style={{
            height: "45%",
            width: "130%",
            borderRadius: "100%",
            marginTop: "5%",
          }}
        ></img>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          margin:"0",
        }}
      >
        <div>
          <h2>{username}</h2>
        </div>
        <div style={{margin:"0px"}}>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
