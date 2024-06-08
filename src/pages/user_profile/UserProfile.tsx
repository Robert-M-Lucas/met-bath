import {useParams} from "react-router-dom";
import {FullscreenCenter} from "../../components/FullscreenCenter.tsx";
import {faker} from "@faker-js/faker";
import _404Page from "../404/404.tsx";
import {QRCodeSVG} from "qrcode.react";


function UserProfile() {
    const { id } = useParams();

    if (id === undefined || Number.isNaN(parseInt(id))) {
        return <_404Page/>;
    }

    faker.seed(parseInt(id));

    const [firstname, lastname] = [faker.person.firstName(), faker.person.lastName()];

    return (<>
        <FullscreenCenter>
            <div className="card" style={{width: "30rem"}}>
                <div className="card-header">
                    <h5 className="card-title">{firstname} {lastname} - {faker.person.jobTitle()}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{faker.internet.email({
                        firstName: firstname,
                        lastName: lastname
                    }).toLowerCase()}</h6>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <h6 className="card-subtitle mb-2 text-body-secondary">Location</h6>
                        <p className="card-text">{faker.location.city()}, {faker.location.country()}</p>
                    </li>
                    <li className="list-group-item">
                        <h6 className="card-subtitle mb-2 text-body-secondary">About</h6>
                        <p className="card-text">{faker.lorem.paragraph(6)}</p>
                    </li>
                </ul>
                <QRCodeSVG value={"https://met-bath.web.app/users/" + id} className="card-img-bottom"
                           style={{padding: "10px"}}/>
            </div>

        </FullscreenCenter>
    </>);
}

export default UserProfile;