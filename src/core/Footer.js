import Contact from "./Contact";

const Footer = () => {
    return (
        <div className="p-4 text-center mt-5 bg-light" style={{backgroundColor: "#FF5733"}}>
            <div className="row">
                <div className="col-lg-4">
                    <h5>About Us</h5>
                    <p>We provide a platform to authors where they can share their thoughts and knowledge.</p>
                </div>
                <div className="col-lg-4">
                    <h5>Contact</h5>
                    <Contact/>
                </div>
                <div className="col-lg-4">
                    <h5>Top Posts</h5>
                </div>
            </div>
        </div>
    );
}

export default Footer;