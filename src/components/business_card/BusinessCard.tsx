import { Color, UserProfile } from "../../util/user";
import * as Icon from 'react-bootstrap-icons';

interface Props {
    user_profile: UserProfile
}

export function BusinessCard({ user_profile }: Props) {
    const CARD_ASPECT_RATIO = 1.65;
    const HEIGHT = 300;
    const WIDTH = HEIGHT * CARD_ASPECT_RATIO;

    const foreground = user_profile.data.card_foreground ?? {r: 0, g: 0, b: 0}; 
    const secondary = user_profile.data.card_secondary ?? {r: 128, g: 128, b: 128};
    const background = user_profile.data.card_background ?? {r: 255, g: 255, b: 255}; 

    const col_to_string = (rgb: Color): string => {
        return `rgb(${rgb.r},${rgb.g},${rgb.b})`
    }

    const greyed_string = col_to_string(secondary);
    const grey_button_css = {
        "--bs-btn-color": greyed_string,
        "--bs-btn-border-color": greyed_string,
        "--bs-btn-hover-bg": greyed_string,
        "--bs-btn-hover-border-color": greyed_string,
        "--bs-btn-active-bg": greyed_string,
        "--bs-btn-active-border-color": greyed_string,
        "--bs-btn-disabled-color": greyed_string,
        "--bs-btn-disabled-border-color": greyed_string
    } as React.CSSProperties;

    return <>
        <div className="card" style={{width: `${WIDTH}px`, height: `${HEIGHT}px`, background: col_to_string(background), color: col_to_string(foreground), borderRadius: 0}}>
            <div className="card-body d-flex justify-content-between flex-column" style={{padding: "2rem"}}>
                <div>
                    <h2 className="card-title" style={{color: col_to_string(foreground)}}>{user_profile.data.firstname} {user_profile.data.surname}</h2>
                    {user_profile.data.company ? 
                    <h6 className="card-subtitle mb-2" style={{color: col_to_string(secondary)}}>{user_profile.data.job_title} • {user_profile.data.company}</h6> :
                    <h6 className="card-subtitle mb-2" style={{color: col_to_string(secondary)}}>{user_profile.data.job_title}</h6>
                    }
                    <hr style={{color: col_to_string(secondary)}}/>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        {user_profile.data.phone ? <p className="mb-0" style={{color: col_to_string(secondary)}}>Tel: {user_profile.data.phone}</p> : <></>}
                        <p className="mb-0" style={{color: col_to_string(secondary)}}>Mail: {user_profile.data.email}</p>
                        {user_profile.data.website ? <p className="mb-0" style={{color: col_to_string(secondary)}}>Web: <a href={user_profile.full_url()} className="text-decoration-none">{user_profile.simple_url()}</a></p> : <></>}
                        {user_profile.data.location ? <p className="mb-0" style={{color: col_to_string(secondary)}}>Location: {user_profile.data.location}</p> : <></>}
                    </div>
                    <div className="d-flex align-items-end">
                        <button className="btn btn-outline-secondary d-flex align-items-center p-2" style={grey_button_css}><Icon.ShareFill/></button>
                    </div>
                </div>
            </div>
        </div>
    </>;
}