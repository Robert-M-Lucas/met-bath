import { Result } from "@badrap/result";
import qs from "qs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { BusinessCard } from "../../components/business_card/BusinessCard";
import { UserProfile } from "../../util/user_profile";
import { SearchBar } from "../../components/SearchBar";
import { Footer } from "../../components/Footer";

export class SearchOptions {
    search: string

    constructor(searchTerm: string) {
        this.search = searchTerm;
    }

    toURL(): string {
        return "/search/" + qs.stringify({
            search: this.search
        });
    }

    static fromURL(url: string): Result<SearchOptions> {
        const data = qs.parse(url);

        let search;
        if (data.search) {
            search = new SearchOptions(data.search.toString());
            delete data.search;
        }
        else {
            return Result.err(Error("No search term given"));
        }
        
        if (Object.keys(data).length !== 0) {
            return Result.err(Error("Unrecognised search option '" + Object.keys(data)[0] + "'"));
        }

        return Result.ok(search);
    }
}

export function SearchPage() {
    const { s } = useParams();
    const navigate = useNavigate();

    if (!s) {
        navigate("/others");
        return;
    }

    const p = SearchOptions.fromURL(s);

    const contents = p.unwrap(
        (val) => <h1>Search: {val.search}</h1>,
        (err) => <h1>Error: {err.message}</h1>
    );

    return <>
        <Header show_search_bar={false} header_state="Others"/>
        <div className="w-100 d-flex justify-content-center mt-4">
            <div>
                <SearchBar/>

                {contents}
                <div className="row mb-4">
                    <div className="col-6">
                        <Link to="/fakeuser/0" className="text-decoration-none">
                            <BusinessCard enable_click={false} can_connect={false} user_profile={UserProfile.fakeFromId(0)}/>
                        </Link>
                    </div>
                    <div className="col-6">
                    <Link to="/fakeuser/1" className="text-decoration-none">
                            <BusinessCard enable_click={false} can_connect={false} user_profile={UserProfile.fakeFromId(1)}/>
                        </Link>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-6">
                        <Link to="/fakeuser/2" className="text-decoration-none">
                            <BusinessCard enable_click={false} can_connect={false} user_profile={UserProfile.fakeFromId(2)}/>
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to="/fakeuser/3" className="text-decoration-none">
                            <BusinessCard enable_click={false} can_connect={false} user_profile={UserProfile.fakeFromId(3)}/>
                        </Link>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-6">
                        <Link to="/fakeuser/4" className="text-decoration-none">
                            <BusinessCard enable_click={false} can_connect={false} user_profile={UserProfile.fakeFromId(4)}/>
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link to="/fakeuser/5" className="text-decoration-none">
                            <BusinessCard enable_click={false} can_connect={false} user_profile={UserProfile.fakeFromId(5)}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>;
}