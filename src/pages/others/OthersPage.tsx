import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { SearchBar } from "../../components/SearchBar";
import { BusinessCard } from "../../components/business_card/BusinessCard";
import { Nav } from "react-bootstrap";
import { useContext } from "react";
import { LanguageContext } from "../../main";
import { UserProfile } from "../../util/user_profile";
import { Footer } from "../../components/Footer";


export function OthersPage() {
    const {translation: t} = useContext(LanguageContext)!;

    return <>
        <Header show_search_bar={false} header_state="Others"/>
        <div className="w-100 d-flex justify-content-center mt-4">
            <div>
                <SearchBar/>
                <h1>{ t.YOU_MIGHT_KNOW }:</h1>
                <div className="row mb-4">
                    <div className="col-6">
                        <Nav.Link as={Link} to="/fakeuser/0" className="text-decoration-none">
                            <BusinessCard can_connect={false} enable_click={false} user_profile={UserProfile.fakeFromId(0)}/>
                        </Nav.Link>
                    </div>
                    <div className="col-6">
                        <Link to="/fakeuser/1" className="text-decoration-none">
                            <BusinessCard can_connect={false} enable_click={false} user_profile={UserProfile.fakeFromId(1)}/>
                        </Link>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-6">
                        <Link to="/fakeuser/2" className="text-decoration-none">
                            <BusinessCard can_connect={false} enable_click={false} user_profile={UserProfile.fakeFromId(2)}/>
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to="/fakeuser/3" className="text-decoration-none">
                            <BusinessCard can_connect={false} enable_click={false} user_profile={UserProfile.fakeFromId(3)}/>
                        </Link>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-6">
                        <Link to="/fakeuser/4" className="text-decoration-none">
                            <BusinessCard can_connect={false} enable_click={false} user_profile={UserProfile.fakeFromId(4)}/>
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to="/fakeuser/5" className="text-decoration-none">
                            <BusinessCard can_connect={false} enable_click={false} user_profile={UserProfile.fakeFromId(5)}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
}