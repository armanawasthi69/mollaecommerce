import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrum({ path }) {

    let paths = path.replace("/", "").split("/")

    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        {paths && paths.map((ele, index) => (
                            <li className={`${ele === path.replace("/", "") ? "breadcrumb-item active" : "breadcrumb-item"}`} aria-current="page" key={index}>
                                {ele}
                            </li>
                        ))}
                    </ol>
                </div>
                {/* End .container */}
            </nav>
            {/* End .breadcrumb-nav */}
        </>
    )
}
