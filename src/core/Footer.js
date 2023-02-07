
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
                    <a href="mailto:ravimahar5695@gmail.com" className="text-decoration-none"><i class="fa-solid fa-envelope"></i> ravimahar5695@gmail.com</a><br/>
                    <a href="tel:8503016814" className="text-decoration-none"><i class="fa-solid fa-phone"></i> 8503016814</a>
                </div>
                <div className="col-lg-4">
                    <h5>Top Posts</h5>
                </div>
            </div>
        </div>
    );
}

export default Footer;