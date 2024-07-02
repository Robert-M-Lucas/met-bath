import { useContext } from "react";
import { Header } from "../../components/header/Header";
import { NewIndexPage } from "../index_new/NewIndexPage";
import { LanguageContext } from "../../main";

function IndexPage() {
    // const navigate = useNavigate();
    // const onclick = () => {
    //     const id = Math.floor(Math.random() * 1_000_000_000) + 1;
    //     navigate("/fakeuser/" + id);
    // };

    const {translation: t} = useContext(LanguageContext)!;

    return (<>
        <Header header_state="Home"/>
        <h1>{t.INDEX_PAGE_NAME}</h1>
    </>);
}

export default IndexPage;