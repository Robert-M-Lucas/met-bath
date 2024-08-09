import { Link } from "react-router-dom";

type HeightUnit = 'px' | 'rem' | 'vh';
type HeightProp = `${number}${HeightUnit}` | "0";

interface Props {
    margin?: HeightProp;
    white?: boolean;
}

export function Footer({margin = "0", white = false}: Props) {
    const color = white ? "#BABABA" : "#696969";

    return <footer style={{marginTop: margin, color: color}}>
        <hr className="my-0 w-100"/>

        <div style={{padding: "2.5rem 0"}}>
            <ul className="nav justify-content-center pt-0 mt-0 pb-3 mb-3">
                <li className="nav-item"><Link to="/" className="nav-link px-2 py-0" style={{color: color}}>Home</Link></li>
                <li className="nav-item"><Link to="/preferences" className="nav-link px-2 py-0" style={{color: color}}>Preferences</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link px-2 py-0" style={{color: color}} onClick={() => window.scrollTo(0, 0)}>
                    Top
                </Link></li>
            </ul>
            <p className="text-center mb-0" style={{color: color}}>Robert Lucas © 2024</p>
        </div>
    </footer>;
}