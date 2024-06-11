import {useParams} from "react-router-dom";
import _404Page from "../404/404.tsx";
import {QRCodeSVG} from "qrcode.react";
import { UserProfile } from "../../util/user.ts";
import { BusinessCard } from "../../components/business_card/BusinessCard.tsx";
import IndexPage from "../index/IndexPage.tsx";
import { faker } from "@faker-js/faker";
import { Header } from "../../components/header/Header.tsx";

function UserProfilePage() {
    const { id } = useParams();

    if (id === undefined || Number.isNaN(parseInt(id)) || parseInt(id) < 0) {
        return <_404Page/>;
    }

    const idn = parseInt(id);

    faker.seed(idn);
    const sex = faker.number.int({min: 0, max: 1});
    const user_profile = UserProfile.fake_from_id(idn, (sex == 0 ? "male" : "female"));
    faker.seed(idn);

    return (<>
        <Header/>
        <div style={{height: "6rem"}}></div>
        <div className="d-flex justify-content-between align-items-center">
            <div className="flex-grow-1" style={{height: "1px", background: "rgba(0, 0, 0, 0.176)"}}></div>
                <BusinessCard user_profile={user_profile}/>
            <div className="flex-grow-1" style={{height: "1px", background: "rgba(0, 0, 0, 0.176)"}}></div>
        </div>
        <div style={{height: "1rem"}}></div>
        <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-end" style={{flex: 1}}>
                <img src={"https://randomuser.me/api/portraits/" + (sex == 0 ? "men" : "women") + "/" + faker.number.int({min: 0, max: 99}) + ".jpg"} style={{width: "200px", height: "200px", marginRight: "3rem", borderRadius: "50%"}}></img>
            </div>
            <div className="d-block" style={{maxWidth: "800px"}}>
                {user_profile.data.about ? 
                <>
                    <h1 style={{marginTop: "6rem"}}>About</h1>
                    <p style={{whiteSpace: "pre-wrap"}}>{user_profile.data.about}</p>
                </> :
                <></>
                }
            </div>
            <div className="d-flex" style={{flex: 1}}></div>
        </div>
        <QRCodeSVG value={"https://met-bath.web.app/user/" + id} className="card-img-bottom" style={{padding: "10px", width: "200px", height: "200px"}}/>
        <IndexPage/>
    </>);
}

export default UserProfilePage;