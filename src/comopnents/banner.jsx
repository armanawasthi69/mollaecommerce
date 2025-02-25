import React from 'react'
import Breadcrum from './breadcrum'
import { useLocation } from 'react-router-dom'

export default function Banner() {
    const {pathname} = useLocation();
    
    return (
        <>
            <div
                className="page-header text-center"
                style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
            >
                <div className="container">
                    <h1 className="page-title text-capitalize">
                        {pathname.replace("/","")}<span>{pathname.replace("/","")}</span>
                    </h1>
                </div>
                {/* End .container */}
            </div>
            {/* End .page-header */}
            <Breadcrum path={pathname}/>
        </>
    )
}
