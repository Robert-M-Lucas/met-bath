import {useParams} from "react-router-dom";
import _404Page from "../404/404.tsx";
import { UserProfile, getUserProfile, getUserProfileByAlias } from "../../util/user_profile.ts";
import { ProfilePage } from "./ProfilePage.tsx";
import { useState } from "react";
import { Header } from "../../components/header/Header.tsx";
import { Loading } from "../../components/Loading.tsx";

interface Props {
    username_mode?: boolean
}

export function UserProfilePage({ username_mode }: Props) {
    const { id } = useParams();

    const [userProfile, setUserProfile] = useState<UserProfile | undefined | null>(null);
    
    
    if (id === undefined) {
        return <_404Page/>;
    }

    if (!userProfile) {
        if (username_mode) {
            getUserProfileByAlias(id).then((profile) => {
                setUserProfile(profile);
            });
        }
        else {
            getUserProfile(id).then((profile) => {
                setUserProfile(profile);
                if (profile !== undefined) {
                    window.history.replaceState(null, "", "/user/" + profile.data.alias)
                }
            });
        }
    }

    if (userProfile === null) {
        return <>
            <Header/>
            <Loading/>
        </>;
    }
    else if (userProfile === undefined) {
        return <>
            <Header/>
            <h1>User does not exist</h1>
        </>;
    }
    else {
        return <ProfilePage user_profile={userProfile}/>;
    }
}
