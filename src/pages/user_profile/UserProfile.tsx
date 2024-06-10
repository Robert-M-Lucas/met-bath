import {useParams} from "react-router-dom";
import {FullscreenCenter} from "../../components/FullscreenCenter.tsx";
import {faker} from "@faker-js/faker";
import _404Page from "../404/404.tsx";
import {QRCodeSVG} from "qrcode.react";
import strftime from "strftime";


function UserProfile() {
    const { id } = useParams();

    if (id === undefined || Number.isNaN(parseInt(id)) || parseInt(id) < 0) {
        return <_404Page/>;
    }

    const idn = parseInt(id);

    faker.seed(idn);

    const [firstname, lastname] = [faker.person.firstName(), faker.person.lastName()];

    const past_experience_count = (idn % 3) + 2

    const experience = [...Array(past_experience_count)].map(
        () => <>
                <p className="mb-0 fs-5"><b>{faker.person.jobTitle()}</b> at {faker.company.name()}</p>
                <p className="text-muted card-text">{strftime("%m/%Y", faker.date.past())} to {strftime("%m/%Y", faker.date.past())}</p>
        </>
    );

    return (<>
        <FullscreenCenter>
            <div className="card" style={{width: "60rem"}}>
                <div className="card-header">
                    <h4 className="card-title mb-0">{firstname} {lastname}</h4>
                    <h5 className="card-title">{faker.person.jobTitle()} at {faker.company.name()}</h5>
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
                    <li className="list-group-item">
                        <h6 className="card-subtitle mb-2 text-body-secondary">Experience</h6>
                        {experience}
                    </li>
                    <li className="list-group-item">
                        <h6 className="card-subtitle mb-2 text-body-secondary">Quote</h6>
                        <blockquote className="blockquote mb-0">
                            <p>{faker.lorem.sentence()}</p>
                            <footer className="blockquote-footer"><cite
                                title="Author">{faker.person.firstName()} {faker.person.lastName()}</cite></footer>
                        </blockquote>
                    </li>
                </ul>
                <QRCodeSVG value={"https://met-bath.web.app/user/" + id} className="card-img-bottom"
                           style={{padding: "10px"}}/>
            </div>

        </FullscreenCenter>
    </>);
}

export default UserProfile;