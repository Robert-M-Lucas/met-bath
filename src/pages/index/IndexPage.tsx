import {useNavigate} from "react-router-dom";


function IndexPage() {
    const navigate = useNavigate();
    const onclick = () => {
        const id = Math.floor(Math.random() * 1_000_000_000) + 1;
        navigate("/user/" + id);
    };

    return (<>
        <h1>Index</h1>
        <button type="button" className="btn btn-outline-primary" onClick={onclick}>Random User</button>
    </>);
}

export default IndexPage;