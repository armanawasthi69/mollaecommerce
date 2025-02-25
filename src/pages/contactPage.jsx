import React from 'react'
import Banner from '../comopnents/banner'

export default function ContactPage() {
    return (
        <>
            <main className="main">
                <Banner/>
                {/* End .breadcrumb-nav */}
                <div className="page-content">
                    <div id="map" className="mb-5" />
                    {/* End #map */}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="contact-box text-center">
                                    <h3>Office</h3>
                                    <address>
                                        1 New York Plaza, New York, <br />
                                        NY 10004, USA
                                    </address>
                                </div>
                                {/* End .contact-box */}
                            </div>
                            {/* End .col-md-4 */}
                            <div className="col-md-4">
                                <div className="contact-box text-center">
                                    <h3>Start a Conversation</h3>
                                    <div>
                                        <a href="mailto:#">info@Molla.com</a>
                                    </div>
                                    <div>
                                        <a href="tel:#">+1 987-876-6543</a>,{" "}
                                        <a href="tel:#">+1 987-976-1234</a>
                                    </div>
                                </div>
                                {/* End .contact-box */}
                            </div>
                            {/* End .col-md-4 */}
                            <div className="col-md-4">
                                <div className="contact-box text-center">
                                    <h3>Social</h3>
                                    <div className="social-icons social-icons-color justify-content-center">
                                        <a
                                            href="#"
                                            className="social-icon social-facebook"
                                            title="Facebook"
                                            target="_blank"
                                        >
                                            <i className="icon-facebook-f" />
                                        </a>
                                        <a
                                            href="#"
                                            className="social-icon social-twitter"
                                            title="Twitter"
                                            target="_blank"
                                        >
                                            <i className="icon-twitter" />
                                        </a>
                                        <a
                                            href="#"
                                            className="social-icon social-instagram"
                                            title="Instagram"
                                            target="_blank"
                                        >
                                            <i className="icon-instagram" />
                                        </a>
                                        <a
                                            href="#"
                                            className="social-icon social-youtube"
                                            title="Youtube"
                                            target="_blank"
                                        >
                                            <i className="icon-youtube" />
                                        </a>
                                        <a
                                            href="#"
                                            className="social-icon social-pinterest"
                                            title="Pinterest"
                                            target="_blank"
                                        >
                                            <i className="icon-pinterest" />
                                        </a>
                                    </div>
                                    {/* End .soial-icons */}
                                </div>
                                {/* End .contact-box */}
                            </div>
                            {/* End .col-md-4 */}
                        </div>
                        {/* End .row */}
                        <hr className="mt-3 mb-5 mt-md-1" />
                        <div className="touch-container row justify-content-center">
                            <div className="col-md-9 col-lg-7">
                                <div className="text-center">
                                    <h2 className="title mb-1">Get In Touch</h2>
                                    {/* End .title mb-2 */}
                                    <p className="lead text-primary">
                                        We collaborate with ambitious brands and people; we’d love to
                                        build something great together.
                                    </p>
                                    {/* End .lead text-primary */}
                                    <p className="mb-3">
                                        Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                                        dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                                        dapibus eu, fermentum et, dapibus sed, urna.
                                    </p>
                                </div>
                                {/* End .text-center */}
                                <form action="#" className="contact-form mb-2">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label htmlFor="cname" className="sr-only">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cname"
                                                placeholder="Name *"
                                                required=""
                                            />
                                        </div>
                                        {/* End .col-sm-4 */}
                                        <div className="col-sm-4">
                                            <label htmlFor="cemail" className="sr-only">
                                                Name
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="cemail"
                                                placeholder="Email *"
                                                required=""
                                            />
                                        </div>
                                        {/* End .col-sm-4 */}
                                        <div className="col-sm-4">
                                            <label htmlFor="cphone" className="sr-only">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="cphone"
                                                placeholder="Phone"
                                            />
                                        </div>
                                        {/* End .col-sm-4 */}
                                    </div>
                                    {/* End .row */}
                                    <label htmlFor="csubject" className="sr-only">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="csubject"
                                        placeholder="Subject"
                                    />
                                    <label htmlFor="cmessage" className="sr-only">
                                        Message
                                    </label>
                                    <textarea
                                        className="form-control"
                                        cols={30}
                                        rows={4}
                                        id="cmessage"
                                        required=""
                                        placeholder="Message *"
                                        defaultValue={""}
                                    />
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-primary-2 btn-minwidth-sm"
                                        >
                                            <span>SUBMIT</span>
                                            <i className="icon-long-arrow-right" />
                                        </button>
                                    </div>
                                    {/* End .text-center */}
                                </form>
                                {/* End .contact-form */}
                            </div>
                            {/* End .col-md-9 col-lg-7 */}
                        </div>
                        {/* End .row */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .page-content */}
            </main>
            {/* End .main */}
        </>
    )
}
