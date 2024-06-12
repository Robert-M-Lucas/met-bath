import {useParams} from "react-router-dom";
import _404Page from "../404/404.tsx";
import { UserProfile } from "../../util/user_profile.ts";
import { faker } from "@faker-js/faker";
import { ProfilePage } from "./ProfilePage.tsx";

export function FakeUserProfilePage() {
    const { id } = useParams();

    if (id === undefined || Number.isNaN(parseInt(id)) || parseInt(id) < 0) {
        return <_404Page/>;
    }

    const idn = parseInt(id);

    faker.seed(idn);
    const sex = faker.number.int({min: 0, max: 1});
    const user_profile = UserProfile.fakeFromId(idn, (sex == 0 ? "male" : "female"));

    return <ProfilePage user_profile={user_profile}/>;
}