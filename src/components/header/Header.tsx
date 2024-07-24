import { FormEvent, useContext, useEffect, useState } from "react";
import { signInWithGoogle } from "../../util/authentication";
import { auth } from "../../util/firebase";
import "./Header.scss";
import { User } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../util/user_profile";
import { SearchOptions } from "../../pages/search/SearchPage";
import { LanguageContext } from "../../main";
import { EN_TRANSLATIONS, JP_TRANSLATIONS } from "../../translations/translations";

export type HeaderState = "Home" | "Others" | "You" | "Preferences";

interface Props {
    show_search_bar?: boolean,
    header_state?: HeaderState,
}

export function Header({ show_search_bar, header_state }: Props) {
    const {translation: t, setTranslation} = useContext(LanguageContext)!;

    const show_search = show_search_bar ?? true;

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!auth.currentUser?.uid);
    // displayName is optional, an account may not have a displayName but is logged in
    const [displayName, setDisplayName] = useState<string | null | undefined>(auth.currentUser?.displayName);

    const [searchVal, setSearchVal] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(async (user: User | null) => {
            setIsLoggedIn(!!user?.uid);
            setDisplayName(user?.displayName);

            if (user !== null) {
                const profile = await getUserProfile(user.uid);
                if (profile === undefined) {
                    navigate("/preferences");
                }
            }
        });
    }, []);

    const login_click = async () => {
        await signInWithGoogle();
    };

    const logout_click = async () => {
        await auth.signOut();
        navigate("/");
    };

    const search = (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
        e.bubbles = false;

        navigate(new SearchOptions(searchVal).toURL());
    };

    const setJapanese = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        setTranslation(JP_TRANSLATIONS);
        return false;
    };

    const setEnglish = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        setTranslation(EN_TRANSLATIONS);
        return false;
    }

    let youLink;
    if (auth.currentUser) {
        youLink = "/uid/" + auth.currentUser!.uid;
    }
    else {
        youLink = "";
    }

    return <header className="p-3 text-bg-dark">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                {/* <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
                </a> */}
                <h3 className="mb-0 me-5">{t.MET_NAME}</h3>
        
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className={"nav-link px-2 " + (header_state == "Home" ? "text-secondary" : "text-white")}>{t.HOME_PAGE_LINK}</Link></li>
                    <li><Link to="/others" className={"nav-link px-2 " + (header_state == "Others" ? "text-secondary" : "text-white")}>{t.OTHERS_PAGE_LINK}</Link></li>

                    <li><Link to={youLink} className={"nav-link px-2 " + (header_state == "You" ? "text-secondary" : "text-white")}>{t.YOU_PAGE_LINK}</Link></li>
                    <li><Link to="/preferences" className={"nav-link px-2 " + (header_state == "Preferences" ? "text-secondary" : "text-white")}>{t.PREFERENCES_PAGE_LINK}</Link></li>
                    { t.self == "en" ? 
                        <li><a href="#" onClick={setJapanese} className={"nav-link px-2 text-white"}>日本語 Japanese</a></li>
                        :
                        <li><a href="#" onClick={setEnglish} className={"nav-link px-2 text-white"}>English 英語</a></li>
                    }
                </ul>
        
                {show_search &&
                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={search}>
                    <input type="search" onChange={(e) => { setSearchVal(e.currentTarget.value); }} id="headerSearch" className="form-control text-bg-dark" placeholder={t.SEARCH_PEOPLE_ELLIPSES} aria-label="Search"/>
                </form>}
                
            
                <div className="text-end d-flex align-items-center">
                    {displayName && <span className="pb-0 mb-0">{displayName}</span>}
                    <div style={{width: "10px"}}></div>
                    {isLoggedIn ? 
                    <button type="button" className="btn btn-outline-secondary" onClick={logout_click}>{t.LOGOUT_LINK}</button> :
                    <button type="button" className="btn btn-primary" onClick={login_click}>{t.LOGIN_OR_SIGNUP_LINK}</button>
                    }
                </div>
            </div>
        </div>
   </header>;
}