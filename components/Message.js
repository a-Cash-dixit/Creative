export default function Message({children,avatar,username,description}){
    return (
        <div>
            <div>
            <img src={avatar} ></img>
                <h2>{username}</h2>
            </div>
            <div>
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}