import { FormEvent, useEffect, useState } from "react";
import { signInWithGoogle } from "../../util/authentication";
import { auth } from "../../util/firebase";
import "./Header.scss";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../util/user_profile";
import { SearchOptions } from "../../pages/search/SearchPage";

type HeaderState = "Home" | "Others" | "You" | "Preferences";

interface Props {
    show_search_bar?: boolean,
    header_state?: HeaderState,
}

export function Header({ show_search_bar, header_state }: Props) {
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
                    navigate("/you");
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

    return <header className="p-3 text-bg-dark">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                {/* <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
                </a> */}
                <h3 className="mb-0 me-5">MET</h3>
        
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className={"nav-link px-2 " + (header_state == "Home" ? "text-secondary" : "text-white")}>Home</a></li>
                    <li><a href="/others" className={"nav-link px-2 " + (header_state == "Others" ? "text-secondary" : "text-white")}>Others</a></li>
                    <li><a href="/you" className={"nav-link px-2 " + (header_state == "You" ? "text-secondary" : "text-white")}>You</a></li>
                    <li><a href="/preferences" className={"nav-link px-2 " + (header_state == "Preferences" ? "text-secondary" : "text-white")}>Preferences</a></li>
                </ul>
        
                {show_search &&
                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={search}>
                    <input type="search" onChange={(e) => { setSearchVal(e.currentTarget.value); }} id="headerSearch" className="form-control text-bg-dark" placeholder="Search people..." aria-label="Search"/>
                </form>}
                
            
                <div className="text-end d-flex align-items-center">
                    {displayName && <span className="pb-0 mb-0">{displayName}</span>}
                    <div style={{width: "10px"}}></div>
                    {isLoggedIn ? 
                    <button type="button" className="btn btn-outline-secondary" onClick={logout_click}>Logout</button> :
                    <button type="button" className="btn btn-primary" onClick={login_click}>Login/Signup</button>
                    }
                </div>
            </div>
        </div>
   </header>;
}