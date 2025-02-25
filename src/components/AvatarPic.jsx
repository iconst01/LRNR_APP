import dogFace from "../assets/dogFace.svg"

export default function AvatarPic() {
    return (
        <div id="avatarPic">
          <img src={dogFace} width="60px" alt="" style={{marginRight: "0.5rem", marginTop: "0.5rem"}}/>
        </div>
        
    )
}
