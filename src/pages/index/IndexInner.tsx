import { useContext } from "react";
import { LanguageContext } from "../../main";
import {Helmet} from 'react-helmet';
import "./IndexStyle.scss"
import { ArrowDownSquare, ArrowUpSquare } from "react-bootstrap-icons";
import { faker } from "@faker-js/faker";

export default function IndexInner() {
    const {translation: t} = useContext(LanguageContext)!;

    return <>
        {/* MAIN */}
        <Helmet>
            <style>{'body { background-color: #333333; box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5); min-height: 100vh}'}</style>
        </Helmet>
        <div className="w-100 text-center text-white" style={{position: "absolute", top: "50%", transform: "translate(0, -50%)",}}>
            <h1 style={{fontSize: "70px"}}><b>{t.MET_MAIN_TEXT}</b></h1>
            <p style={{fontSize: "35px"}}>{t.MET_MAIN_TAGLINE}</p>
        </div>
        <div className="text-center text-white w-100" style={{position: "absolute", bottom: "30px"}}>
            <a href="#about" className="text-white"><ArrowDownSquare style={{width: "40px", height: "40px"}}/></a>
        </div>
        <div className="d-flex flex-column" style={{minHeight: "100vh", width: "100vw"}}>
            {/* ABOUT */}
            <section id="about" className="d-flex justify-content-center" style={{width: "100vw"}}>
                <div className="text-center text-white" style={{marginTop: "100px", maxWidth: "800px"}}>
                    <h1 style={{fontSize: "50px"}}>{t.ABOUT_US}</h1>
                    <p style={{whiteSpace: "pre-line", textAlign: "justify"}}>
                        {
                            [... Array(3)].map(() => {
                                return faker.lorem.paragraph(15);
                            }).join("\n\n")
                        }
                    </p>
                </div>
            </section>

            <div className="text-center text-white w-100 mt-auto mb-5">
                <a href="#main" className="text-white"><ArrowUpSquare style={{width: "40px", height: "40px"}}/></a>
            </div>
        </div>
        
    </>;
}