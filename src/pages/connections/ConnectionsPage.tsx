import { useContext, useState } from "react";
import { Header } from "../../components/header/Header";
import { LanguageContext } from "../../main";
import { getAllUserConnections, getUserProfile, removeUserConnection, UserProfile } from "../../util/user_profile";
import { auth } from "../../util/firebase";
import { DashLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function ConnectionsPage() {
    const {translation: t} = useContext(LanguageContext)!;
    const navigate = useNavigate();
    const [connections, setConnections] = useState<UserProfile[] | null | undefined>(undefined);

    auth.onAuthStateChanged(async () => {
        if (connections === undefined && auth.currentUser) {
            setConnections(null);

            let conns: UserProfile[] = [];
            const c = await getAllUserConnections(auth.currentUser.uid);

            for (let i = 0; i < c.length; i++) {
                conns.push((await getUserProfile(c[i]))!);
            }

            setConnections(conns);
        }
    });

    auth.authStateReady().then(async () => {
        if (auth.currentUser === null) {
            navigate("/");
            return;
        }
    });

    return (<>
        <Header header_state="Connections"/>
        <div className="w-100">
            <div className="container text-center mt-5">
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">{t.FIRST_NAME_LABEL}</th>
                        <th scope="col">{t.SURNAME_LABEL}</th>
                        <th scope="col">{t.USERNAME_LABEL}</th>
                        <th scope="col">{t.REMOVE_CONNECTION_LABEL}</th>
                    </tr>
                </thead>
                <tbody>
                    { connections && auth.currentUser &&
                        connections.map((c, i) => {
                            return <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{c.data.firstname}</td>
                                <td>{c.data.surname}</td>
                                <td>{c.data.alias}</td>
                                <td>
                                    <button className="btn btn-outline-danger" role="submit" onClick={async () => {
                                        await removeUserConnection(auth.currentUser!.uid, c.docname);
                                        setConnections(undefined);
                                    }}><DashLg/></button>
                                </td>
                            </tr>
                        })!
                    }
                </tbody>
                </table>
            </div>
        </div>
    </>);
}

export default ConnectionsPage;