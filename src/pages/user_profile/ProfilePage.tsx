import { BusinessCard } from "../../components/business_card/BusinessCard";
import { Footer } from "../../components/Footer";
import { Header, HeaderState } from "../../components/header/Header";
import { auth } from "../../util/firebase";
import { UserProfile } from "../../util/user_profile";

interface Props {
    user_profile: UserProfile,
}

export function ProfilePage({ user_profile }: Props) {
    let headerState: HeaderState;
    if (auth.currentUser && user_profile.docname === auth.currentUser.uid) {
        headerState = "You";
    }
    else {
        headerState = "Others";
    }

    return (<>
        <Header header_state={headerState}/>
        <div style={{minHeight: "90vh"}}>
            <div style={{height: "6rem"}}></div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="flex-grow-1" style={{height: "1px", background: "rgba(0, 0, 0, 0.176)"}}></div>
                    <BusinessCard user_profile={user_profile} enable_click={true} can_connect={true}/>
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
        </div>
        <Footer/>
    </>);
}