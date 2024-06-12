import {useNavigate} from "react-router-dom";
import { Header } from "../../components/header/Header";


function IndexPage() {
    const navigate = useNavigate();
    const onclick = () => {
        const id = Math.floor(Math.random() * 1_000_000_000) + 1;
        navigate("/fakeuser/" + id);
    };

    return (<>
        <Header header_state="Home"/>
        <button type="button" className="btn btn-outline-primary" onClick={onclick}>Random Fake User</button>
    </>);
}

export default IndexPage;