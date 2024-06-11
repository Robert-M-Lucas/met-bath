import { useParams } from "react-router-dom";
import { BusinessCard } from "../../components/business_card/BusinessCard";
import { FullscreenCenter } from "../../components/FullscreenCenter";
import { UserProfile } from "../../util/user";
import _404Page from "../404/404";


export function BusinessCardPage() {
    const { id } = useParams();

    if (id === undefined || Number.isNaN(parseInt(id)) || parseInt(id) < 0) {
        return <_404Page/>;
    }

    const idn = parseInt(id);

    const user_profile = UserProfile.fake_from_id(idn);

    return <>
        <FullscreenCenter>
            <BusinessCard user_profile={user_profile}/>
        </FullscreenCenter>
    </>
}