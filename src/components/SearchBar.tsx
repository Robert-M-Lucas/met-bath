import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOptions } from "../pages/search/SearchPage";
import { LanguageContext } from "../main";

export function SearchBar() {
    const [searchVal, setSearchVal] = useState<string>("");
    const navigate = useNavigate();
    const {translation: t} = useContext(LanguageContext)!;

    const search = (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
        e.bubbles = false;

        navigate(new SearchOptions(searchVal).toURL());
    };

    return <form className="w-100 mb-3" role="search" onSubmit={search}>
        <div className="input-group">
            <input type="search" onChange={(e) => { setSearchVal(e.currentTarget.value); }} className="form-control" placeholder={ t.SEARCH_PEOPLE_ELLIPSES } aria-label="Search"/>
            <button className="btn btn-outline-success" role="submit">{ t.SEARCH_LINK }</button>
        </div>
    </form>;
}