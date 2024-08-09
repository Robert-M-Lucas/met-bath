import { Footer } from "../../components/Footer";
import { Header } from "../../components/header/Header";
import IndexInner from "./IndexInner";

function IndexPage() {
    // const navigate = useNavigate();
    // const onclick = () => {
    //     const id = Math.floor(Math.random() * 1_000_000_000) + 1;
    //     navigate("/fakeuser/" + id);
    // };

    return (<>
        <section id="main"></section>
        <div className="d-flex" style={{height: "100vh"}}>
            <div className="d-block w-100">
                <Header header_state="Home"/>
            </div>
        </div>
        <IndexInner/>
        <Footer white={true}/>
    </>);
}

export default IndexPage;