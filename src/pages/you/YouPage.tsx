import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { Header } from "../../components/header/Header";
import { auth } from "../../util/firebase";
import { useNavigate } from "react-router-dom";
import { UserProfile, getUserProfile, setUserProfileF } from "../../util/user_profile";
import { BusinessCard } from "../../components/business_card/BusinessCard";
import { ChromePicker, ColorResult } from "react-color";
import React from "react";
import { CodeToColor, ColorToCode } from "../../util/util";


export function YouPage() {
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState<UserProfile>(UserProfile.empty());
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        auth.authStateReady().then(async () => {
            if (auth.currentUser === null) {
                navigate("/");
                return;
            }
    
            await getUserProfile(auth.currentUser.uid).then((profile) => {
                if (profile !== undefined) {
                    setUserProfile(profile);
                    console.log("here");
                }
            });
        });
    }, []);
    
    const ne = (s: string): string | undefined => {
        if (s === "") {
            return undefined;
        }
        return s;
    }

    const f = (fi: (val: string) => void) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            fi(e.target.value);
            setUserProfile(userProfile);
            forceUpdate();
        };
    }

    
    const cardPreview = BusinessCard({user_profile: userProfile});

    const updateAlias = (val: string) => { userProfile.data.alias = val; }
    const updateFirstName = (val: string) => { userProfile.data.firstname = val; }
    const updateMiddleNames = (val: string) => { userProfile.data.middle_names = ne(val); }
    const updateSurname = (val: string) => { userProfile.data.surname = val; }
    const updateJobTitle = (val: string) => { userProfile.data.job_title = val; }
    const updateEmail = (val: string) => { userProfile.data.email = ne(val); }
    const updateLocation = (val: string) => { userProfile.data.location = val; }
    const updateCompany = (val: string) => { userProfile.data.company = ne(val); }
    const updatePhoneNumber = (val: string) => { userProfile.data.phone = ne(val); }
    const updateWebsite = (val: string) => { userProfile.data.website = ne(val); }
    const updateAbout = (e: ChangeEvent<HTMLTextAreaElement>) => { 
        userProfile.data.about = ne(e.target.value);
        setUserProfile(userProfile);
        forceUpdate();
    }

    const updateForegroundColor = (c: ColorResult) => {
        userProfile.data.card_foreground = CodeToColor(c.hex.toLowerCase())!;
        setUserProfile(userProfile);
        forceUpdate();
    }

    const updateSecondaryColor = (c: ColorResult) => {
        userProfile.data.card_secondary = CodeToColor(c.hex.toLowerCase())!;
        setUserProfile(userProfile);
        forceUpdate();
    }

    const updateBackgroundColor = (c: ColorResult) => {
        userProfile.data.card_background = CodeToColor(c.hex.toLowerCase())!;
        setUserProfile(userProfile);
        forceUpdate();
    }

    const resetColors = () => {
        userProfile.data.card_foreground = UserProfile.defaultForeground();
        userProfile.data.card_secondary = UserProfile.defaultSecondary();
        userProfile.data.card_background = UserProfile.defaultBackground();
        setUserProfile(userProfile);
        forceUpdate();
    }

    const saveChanges = async () => {
        await setUserProfileF(auth.currentUser!.uid, userProfile);
        navigate("/uid/" + auth.currentUser!.uid);
    }

    return <>
        <Header header_state="You"/>
        <div className="container pt-3">
            <h1>Profile creation page</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input value={userProfile.data.alias ?? ""} onChange={f(updateAlias)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Required - alphanumeric and underscores"></input>
                    <div id="emailHelp" className="form-text">This is the unique, user-readable name by which people can find you</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                    <input value={userProfile.data.firstname ?? ""} onChange={f(updateFirstName)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Required - alphabetic"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Middle Name(s)</label>
                    <input value={userProfile.data.middle_names ?? ""} onChange={f(updateMiddleNames)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Optional - alphabetic and spaces"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Surname</label>
                    <input value={userProfile.data.surname ?? ""} onChange={f(updateSurname)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Required - alphabetic"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Job Title</label>
                    <input value={userProfile.data.job_title ?? ""} onChange={f(updateJobTitle)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Required - alphabetic and spaces"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input value={userProfile.data.email ?? ""} onChange={f(updateEmail)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Optional - valid email"/>
                    <div id="emailHelp" className="form-text">Contact email shown on your profile</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Location</label>
                    <input value={userProfile.data.location ?? ""} onChange={f(updateLocation)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Optional - alphanumeric"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Company</label>
                    <input value={userProfile.data.company ?? ""} onChange={f(updateCompany)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Optional - alphanumeric"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                    <input value={userProfile.data.phone ?? ""} onChange={f(updatePhoneNumber)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Optional - alphanumeric and spaces"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Website</label>
                    <input value={userProfile.data.website ?? ""} onChange={f(updateWebsite)} type="email" className="form-control" id="exampleInputEmail1" placeholder="Optional - valid website"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">About</label>
                    <textarea value={userProfile.data.about ?? ""} onChange={updateAbout} className="form-control" id="exampleInputEmail1" placeholder="Optional - alphanumeric and spaces"/>
                    <div id="emailHelp" className="form-text">Some extra information about you - not shown on your card</div>
                </div>
                <div className="mb-3">
                    <div className="row pb-4">
                        <div className="col d-flex justify-content-center">
                            <div className="text-center">
                                <p>Card foreground colour</p>
                                <ColorPicker onChange={updateForegroundColor} color={ColorToCode(userProfile.data.card_foreground ?? UserProfile.defaultForeground())}/>
                            </div>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <div className="text-center">
                                <p>Card secondary colour</p>
                                <ColorPicker onChange={updateSecondaryColor} color={ColorToCode(userProfile.data.card_secondary ?? UserProfile.defaultSecondary())}/>
                            </div>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <div className="text-center">
                                <p>Card background colour</p>
                                <ColorPicker onChange={updateBackgroundColor} color={ColorToCode(userProfile.data.card_background ?? UserProfile.defaultBackground())}/>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-outline-danger w-100" type="button" onClick={resetColors}>Reset Colours</button>
                </div>

                <p>Card preview:</p>
                {cardPreview}

                <br/>

                <button className="btn btn-outline-success" type="button" onClick={saveChanges}>Save</button>
            </form>
            <div className="mb-5"></div>
        </div>
    </>
}

interface ColorPickerProps {
    onChange: (c: ColorResult) => void,
    color: string
}

class ColorPicker extends React.Component<ColorPickerProps> {
    constructor(props: ColorPickerProps) {
        super(props);
    }
  
    handleChangeComplete = (color: ColorResult) => {
      this.setState({ background: color.hex });
      const { onChange } = this.props;
      onChange(color);
    };

    setColour(colour: string) {
        this.setState(() => ({
            background: colour
        }));
    }
  
    render() {
      return (
        <ChromePicker
          color={ this.props.color }
          onChangeComplete={ this.handleChangeComplete }
          disableAlpha
        />
      );
    }
  }