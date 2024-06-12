import { BusinessCard } from "../../components/business_card/BusinessCard";
import { Header } from "../../components/header/Header";
import { UserProfile } from "../../util/user_profile";

interface Props {
    user_profile: UserProfile
}

export function ProfilePage({ user_profile }: Props) {
    return (<>
        <Header header_state="Others"/>
        <div style={{height: "6rem"}}></div>
        <div className="d-flex justify-content-between align-items-center">
            <div className="flex-grow-1" style={{height: "1px", background: "rgba(0, 0, 0, 0.176)"}}></div>
                <BusinessCard user_profile={user_profile}/>
            <div className="flex-grow-1" style={{height: "1px", background: "rgba(0, 0, 0, 0.176)"}}></div>
        </div>
        <div style={{height: "1rem"}}></div>
        <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-end" style={{flex: 1}}>
                <img src={"https://randomuser.me/api/portraits/men/10.jpg"} style={{width: "200px", height: "200px", marginRight: "3rem", borderRadius: "50%"}}></img>
            </div>
            <div className="d-block" style={{maxWidth: "800px", minWidth: "800px"}}>
                {user_profile.data.about &&
                <>
                    <h1 style={{marginTop: "6rem"}}>About</h1>
                    <p style={{whiteSpace: "pre-wrap"}}>{user_profile.data.about}</p>
                </>}
            </div>
            <div className="d-flex" style={{flex: 1}}></div>
        </div>
    </>);
}