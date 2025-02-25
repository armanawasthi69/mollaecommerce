import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Breadcrum from '../comopnents/breadcrum'

export default function NotFoundPage() {
    const {pathname} = useLocation()
    return (
        <>
            <main className="main">
                <Breadcrum path={pathname}/>
                {/* End .breadcrumb-nav */}
                <div
                    className="error-content text-center"
                    style={{ backgroundImage: "url(assets/images/backgrounds/error-bg.jpg)" }}
                >
                    <div className="container">
                        <h1 className="error-title">Not Found 404</h1>
                        {/* End .error-title */}
                        <p>We are sorry, the page you've requested is not available.</p>
                        <Link
                            to="/"
                            className="btn btn-outline-primary-2 btn-minwidth-lg"
                        >
                            <span>BACK TO HOMEPAGE</span>
                            <i className="icon-long-arrow-right" />
                        </Link>
                    </div>
                    {/* End .container */}
                </div>
                {/* End .error-content text-center */}
            </main>
            {/* End .main */}
        </>
    )
}
