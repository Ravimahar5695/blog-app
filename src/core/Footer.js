import Contact from "./Contact";

const Footer = () => {
    return (
        <div className="p-4 text-center text-light mt-5 bg-success">
            <div className="row">
                <div className="col-lg-4 mb-4">
                    <h5>About Us</h5>
                    <p>We provide a platform to authors where they can share their thoughts and knowledge.</p>
                </div>
                <div className="col-lg-4 mb-4">
                    <h5>Contact</h5>
                    <Contact/>
                </div>
                <div className="col-lg-4">
                    <h5>Reach me at</h5>
                    <p><a href="mailto:ravimahar5695@gmail.com" className="text-light text-decoration-none">ravimahar5695@gmail.com</a></p>
                    <p><a href="tel:8503016814" className="text-light text-decoration-none">8503016814</a></p>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <span className="rounded-circle bg-primary m-1 d-flex justify-content-center align-items-center" style={{width: "40px", height: "40px"}}>
                            <a href="https://www.facebook.com/ravimahar5695" className="text-light p-2">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                        </span>
                        <span className="rounded-circle bg-danger m-1 d-flex justify-content-center align-items-center" style={{width: "40px", height: "40px"}}>
                            <a href="https://www.instagram.com/ravimahar5695" className="text-light p-2">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </span>
                        <span className="rounded-circle bg-info m-1 d-flex justify-content-center align-items-center" style={{width: "40px", height: "40px"}}>
                            <a href="https://www.twitter.com/ravimahar5695" className="text-light p-2">
                                <i class="fa-brands fa-twitter"></i>
                            </a>
                        </span>
                        <span className="rounded-circle bg-primary m-1 d-flex justify-content-center align-items-center" style={{width: "40px", height: "40px"}}>
                            <a href="https://www.linkedin.com/in/ravimahar5695" className="text-light p-2">
                                <i class="fa-brands fa-linkedin-in"></i>
                            </a>
                        </span>
                        <span className="rounded-circle bg-dark m-1 d-flex justify-content-center align-items-center" style={{width: "40px", height: "40px"}}>
                            <a href="https://www.github.com/Ravimahar5695" className="text-light p-2">
                                <i class="fa-brands fa-github"></i>
                            </a>
                        </span>
                    </div>
                    <p>©Ravi Mahar</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;