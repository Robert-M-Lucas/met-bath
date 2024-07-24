import { useContext, useState } from "react";
import { Header } from "../../components/header/Header";
import { LanguageContext } from "../../main";
import { getAllUserConnections, getUserProfile, UserProfile } from "../../util/user_profile";
import { auth } from "../../util/firebase";

function ConnectionsPage() {
    // const {translation: t} = useContext(LanguageContext)!;
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

    return (<>
        <Header header_state="Connections"/>
        <div className="w-100">
            <div className="container text-center mt-5">
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Username</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    { connections && 
                        connections.map((c, i) => {
                            return <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{c.data.firstname}</td>
                                <td>{c.data.surname}</td>
                                <td>{c.data.alias}</td>
                                <td>Remove</td>
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