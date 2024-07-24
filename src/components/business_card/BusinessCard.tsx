import { UserProfile } from "../../util/user_profile";
import { Color, ColorToCode } from "../../util/util";
import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { LanguageContext } from "../../main";

interface Props {
    user_profile: UserProfile,
    enable_click: boolean
}

export function BusinessCard({ user_profile, enable_click }: Props) {
    const {translation: t} = useContext(LanguageContext)!;

    const CARD_ASPECT_RATIO = 1.65;
    const HEIGHT = 300;
    const WIDTH = HEIGHT * CARD_ASPECT_RATIO;

    const foreground = user_profile.data.card_foreground ?? UserProfile.defaultForeground(); 
    const secondary = user_profile.data.card_secondary ?? UserProfile.defaultSecondary();
    const background = user_profile.data.card_background ?? UserProfile.defaultBackground();

    // const navigate = useNavigate();

    const col_to_string = (rgb: Color): string => {
        return `rgb(${rgb.r},${rgb.g},${rgb.b})`
    }

    // const greyed_string = col_to_string(secondary);
    // const grey_button_css = {
    //     "--bs-btn-color": greyed_string,
    //     "--bs-btn-border-color": greyed_string,
    //     "--bs-btn-hover-bg": greyed_string,
    //     "--bs-btn-hover-border-color": greyed_string,
    //     "--bs-btn-active-bg": greyed_string,
    //     "--bs-btn-active-border-color": greyed_string,
    //     "--bs-btn-disabled-color": greyed_string,
    //     "--bs-btn-disabled-border-color": greyed_string
    // } as React.CSSProperties;

    const cardOnClick = enable_click ? () => { window.open("/uid/" + user_profile.docname + "/card", "_blank") } : undefined;

    return <>
        <div className="card" style={{width: `${WIDTH}px`, height: `${HEIGHT}px`, background: col_to_string(background), color: col_to_string(foreground), borderRadius: 0}}>
            <div className="card-body d-flex justify-content-between flex-column" style={{padding: "2rem"}} onClick={cardOnClick}>
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
                        {user_profile.data.phone && <p className="mb-0" style={{color: col_to_string(secondary)}}>{ t.TEL_LABEL }: {user_profile.data.phone}</p>}
                        {user_profile.data.email && <p className="mb-0" style={{color: col_to_string(secondary)}}>{ t.MAIL_LABEL }: {user_profile.data.email}</p>}
                        {user_profile.data.website && <p className="mb-0" style={{color: col_to_string(secondary)}}>{ t.WEB_LABEL }: <a onClick={ () => window.open(user_profile.fullUrl(), "_blank") } target="_blank" className="text-decoration-none">{user_profile.simpleUrl()}</a></p>}
                        {user_profile.data.location && <p className="mb-0" style={{color: col_to_string(secondary)}}>{ t.LOCATION_LABEL }: {user_profile.data.location}</p>}
                    </div>
                    <QRCodeSVG 
                        value={"https://met-bath.web.app/uid/" + user_profile.docname} 
                        bgColor={ColorToCode(user_profile.data.card_background)} 
                        fgColor={ColorToCode(user_profile.data.card_secondary)}
                    />
                    {/* <div className="d-flex align-items-end">
                        <a target="_blank" href={"/uid/" + user_profile.docname + "/card"}><button className="btn btn-outline-secondary d-flex align-items-center p-2" style={grey_button_css}><Icon.ShareFill/></button></a>
                    </div> */}
                </div>
            </div>
        </div>
    </>;
}