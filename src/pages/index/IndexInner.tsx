import { useContext } from "react";
import { LanguageContext } from "../../main";
import {Helmet} from 'react-helmet';
import "./IndexStyle.scss"
import { ArrowDownSquare, ArrowUpSquare } from "react-bootstrap-icons";

export default function IndexInner() {
    const {translation: t} = useContext(LanguageContext)!;

    return <>
        {/* MAIN */}
        <Helmet>
            <style>{'body { background-color: #333333; box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5); min-height: 100vh}'}</style>
        </Helmet>
        <div className="w-100 text-center text-white" style={{position: "absolute", top: "50%", transform: "translate(0, -50%)",}}>
            <h1 style={{fontSize: "70px"}}><b>The Digital Businesscard Platform</b></h1>
            <p style={{fontSize: "35px"}}>Some tag line a business student would come up with</p>
        </div>
        <div className="text-center text-white w-100" style={{position: "absolute", bottom: "30px"}}>
            <a href="#about" className="text-white"><ArrowDownSquare style={{width: "40px", height: "40px"}}/></a>
        </div>
        <div className="d-flex flex-column" style={{minHeight: "100vh", width: "100vw"}}>
            {/* ABOUT */}
            <section id="about">
                <div className="text-center text-white" style={{marginTop: "200px"}}>
                    <h1>About Us</h1>
                </div>
            </section>

            <div className="text-center text-white w-100 mt-auto mb-5">
                <a href="#main" className="text-white"><ArrowUpSquare style={{width: "40px", height: "40px"}}/></a>
            </div>
        </div>
        
    </>;
}