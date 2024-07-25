import { useContext } from "react";
import { Header } from "../../components/header/Header";
import { LanguageContext } from "../../main";
import { FullscreenCenter } from "../../components/FullscreenCenter";

function IndexPage() {
    // const navigate = useNavigate();
    // const onclick = () => {
    //     const id = Math.floor(Math.random() * 1_000_000_000) + 1;
    //     navigate("/fakeuser/" + id);
    // };

    const {translation: t} = useContext(LanguageContext)!;

    return (<>
        <Header header_state="Home"/>
        <FullscreenCenter>
            <h1>{t.INDEX_PAGE_NAME}</h1>
        </FullscreenCenter>
    </>);
}

export default IndexPage;