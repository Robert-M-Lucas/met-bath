import "./styles.scss"
import howItWorksImg from "./assets/img/how_it_works.png";

export function NewIndexPage() {
    // console.log(useContext(LanguageContext));
    // const {translation} = useContext(LanguageContext)!;
    return <>
    <header className="homepage-start-background">
        <div className="container px-4 px-lg-5 h-100">
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                <div className="col-lg-8 align-self-end">
                    <h1 className="text-white font-weight-bold">Easy Digital Business Profile Exchange</h1>
                </div>
                <div className="col-lg-8 align-self-baseline">
                    <p className="text-white mb-5">Connecting with others!</p>
                    <a className="btn btn-primary btn-xl" href="#about">Find Out More</a>
                </div>
            </div>
        </div>
    </header>

    <section className="page-section" id="about">
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-lg-8 text-center">
                    <h2 className="text-white mt-0">How It Works</h2>
                    <hr className="divider divider-light" />
                    <a className="btn btn-light btn-xl" href="#howitworks">Get Started</a>
                </div>
            </div>
        </div>
    </section>

    <section className="page-section" id="howitworks">
        <div className="container px-5 px-lg-5">
            <h2 className="text-center mt-0">Create your profile and connect with others!</h2>
            <hr className="divider" />
            <img src={howItWorksImg} alt="How It Works" className="img-fluid center-image" width="500" height="300"/>
        </div>
    </section>

    <section className="page-section" id="tryitout">
        <div className="container px-5 px-lg-5">
            <div className="row gx-1 gx-lg-1 justify-content-center">
                <h2 className="text-center mt-0">Test It Out!</h2>
                <hr className="divider" />
                <a className="btn btn-primary btn-sm" href="https://met-bath.web.app/">Link to Our Webapp</a>
            </div>
        </div>
    </section>

    <section className="page-section" id="appstore">
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-lg-8 text-center">
                    <h2 className="text-white mt-0">Available for mobile</h2>
                    <hr className="divider divider-light" />
                    <p className="text-white-75 mb-4">The app is now available on Apple App Store</p>
                    <a className="btn btn-light btn-xl" href="https://apps.apple.com/gb/app/met/id6502574325?ref=met.pikapod.net">Download</a>
                </div>
            </div>
        </div>
    </section>

    <section className="page-section" id="contact">
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-lg-8 col-xl-6 text-center">
                    <h2 className="mt-0">Contact Us</h2>
                    <hr className="divider" />
                    <p className="text-muted mb-5">Ready to work with us?</p>
                </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-lg-4 text-center mb-5 mb-lg-0">
                    <div>Seiko Yonemata</div>
                    <div>米又　成航　（よねまた　せいこう）</div>
                    <div>LinkedIn: <a href="https://www.linkedin.com/in/seiko-yonemata-566b41225">Seiko Yonemata</a></div>
                    <hr/>
                    <div>UK: +44 78 3085 6797</div>
                    <div>日本　Japan: 090-4104-4182</div>
                    <hr/>
                    <div>Email: <a href="mailto:seiko.total@gmail.com">seiko.total@gmail.com</a></div>
                </div>
            </div>
        </div>
    </section>
    <footer className="bg-light py-5">
        <div className="container px-4 px-lg-5"><div className="small text-center text-muted">Copyright &copy; 2023 - Company Name</div></div>
    </footer></>;
}