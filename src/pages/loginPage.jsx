import React, { useState } from 'react'
import Breadcrum from '../comopnents/breadcrum'
import { useLocation, useNavigate } from 'react-router-dom'
import { PostApi } from '../webServices/getWay'
import { apiUrls } from '../webServices/webUrls'
import { Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"

export default function LoginPage() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // login user function ----
    async function LoginUser(event) {
        setIsLoading(true);
        event.preventDefault()
        let usrLogin = await PostApi(apiUrls.loginUser, user)
        if (Object.hasOwn(usrLogin, "message")) {
            setIsLoading(false)
            toast.error(usrLogin.message)
            return;
        }
        localStorage.setItem("user", JSON.stringify(usrLogin))
        setIsLoading(false)
        toast.success("user Login suceess")
        navigate(-1)
    }
    // end -----


    // register user function

    function registerUser(data) {
        console.log(data);

    }


    return (
        <>
            <main className="main">
                <Breadcrum path={pathname} />
                {/* End .breadcrumb-nav */}
                <div
                    className="login-page bg-image pt-6 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
                    style={{
                        backgroundImage: 'url("assets/images/backgrounds/login-bg.jpg")'
                    }}
                >
                    <div className="container">
                        <div className="form-box">
                            <div className="form-tab">
                                <ul className="nav nav-pills nav-fill" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="signin-tab-2"
                                            data-toggle="tab"
                                            href="#signin-2"
                                            role="tab"
                                            aria-controls="signin-2"
                                            aria-selected="true"
                                        >
                                            Sign In
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="register-tab-2"
                                            data-toggle="tab"
                                            href="#register-2"
                                            role="tab"
                                            aria-controls="register-2"
                                            aria-selected="false"
                                        >
                                            Sign Up
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div
                                        className="tab-pane fade show active"
                                        id="signin-2"
                                        role="tabpanel"
                                        aria-labelledby="signin-tab-2"
                                    >
                                        <form onSubmit={LoginUser}>
                                            <div className="form-group">
                                                <label htmlFor="singin-email-2">
                                                    Username or email address *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="singin-email-2"
                                                    name="singin-email"
                                                    required=""
                                                    onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
                                                />
                                            </div>
                                            {/* End .form-group */}
                                            <div className="form-group">
                                                <label htmlFor="singin-password-2">Password *</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="singin-password-2"
                                                    name="singin-password"
                                                    required=""
                                                    onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                                                />
                                            </div>
                                            {/* End .form-group */}
                                            <div className="form-footer">
                                                {isLoading ?
                                                    <Spinner animation="border" variant="primary" size='lg' className='loader1' />
                                                    : <button type="submit" className="btn btn-outline-primary-2">
                                                        <span>SIGN IN</span>
                                                        <i className="icon-long-arrow-right" />
                                                    </button>}
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="signin-remember-2"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="signin-remember-2"
                                                    >
                                                        Remember Me
                                                    </label>
                                                </div>
                                                {/* End .custom-checkbox */}
                                                <a href="#" className="forgot-link">
                                                    Forgot Your Password?
                                                </a>
                                            </div>
                                            {/* End .form-footer */}
                                        </form>
                                        <div className="form-choice">
                                            <p className="text-center">or sign in with</p>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <a href="#" className="btn btn-login btn-g">
                                                        <i className="icon-google" />
                                                        Login With Google
                                                    </a>
                                                </div>
                                                {/* End .col-6 */}
                                                <div className="col-sm-6">
                                                    <a href="#" className="btn btn-login btn-f">
                                                        <i className="icon-facebook-f" />
                                                        Login With Facebook
                                                    </a>
                                                </div>
                                                {/* End .col-6 */}
                                            </div>
                                            {/* End .row */}
                                        </div>
                                        {/* End .form-choice */}
                                    </div>
                                    {/* .End .tab-pane */}
                                    <div
                                        className="tab-pane fade"
                                        id="register-2"
                                        role="tabpanel"
                                        aria-labelledby="register-tab-2"
                                    >
                                        <form onSubmit={handleSubmit(registerUser)}>
                                            <div className="form-group">
                                                <label htmlFor="firstName">
                                                    Your First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="firstName"
                                                    {...register("firstName", {
                                                        required: "first Name is Required",
                                                        pattern: /^[A-Za-z]+$/i
                                                    })}
                                                />
                                                <p role="alert" className='text-danger'>{errors.firstName?.message}</p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="lastName">
                                                    Your Last Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="lastName"
                                                    {...register("lastName", {
                                                        required: "lastName is Required",
                                                        pattern: /^[A-Za-z]+$/i
                                                    })}
                                                />
                                                 <p role="alert" className='text-danger'>{errors.lastName?.message}</p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="age">
                                                    Your Age *
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="age"
                                                    {...register("age", {
                                                        required: "age is Required",
                                                        min: 18,
                                                        max: 99
                                                    })}
                                                />
                                                 <p role="alert" className='text-danger'>{errors.age?.message}</p>
                                            </div>
                                            {/* End .form-group */}
                                            <div className="form-group">
                                                <label htmlFor="password-2">Password *</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="register-password-2"
                                                    name="password"
                                                    {...register("password", {
                                                        required: "password is required"
                                                    })}
                                                />
                                                 <p role="alert" className='text-danger'>{errors.password?.message}</p>
                                            </div>
                                            {/* End .form-group */}
                                            <div className="form-footer">
                                                <button type="submit" className="btn btn-outline-primary-2">
                                                    <span>SIGN UP</span>
                                                    <i className="icon-long-arrow-right" />
                                                </button>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="register-policy-2"
                                                        required=""
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="register-policy-2"
                                                    >
                                                        I agree to the <a href="#">privacy policy</a> *
                                                    </label>
                                                </div>
                                                {/* End .custom-checkbox */}
                                            </div>
                                            {/* End .form-footer */}
                                        </form>
                                        <div className="form-choice">
                                            <p className="text-center">or sign in with</p>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <a href="#" className="btn btn-login btn-g">
                                                        <i className="icon-google" />
                                                        Login With Google
                                                    </a>
                                                </div>
                                                {/* End .col-6 */}
                                                <div className="col-sm-6">
                                                    <a href="#" className="btn btn-login  btn-f">
                                                        <i className="icon-facebook-f" />
                                                        Login With Facebook
                                                    </a>
                                                </div>
                                                {/* End .col-6 */}
                                            </div>
                                            {/* End .row */}
                                        </div>
                                        {/* End .form-choice */}
                                    </div>
                                    {/* .End .tab-pane */}
                                </div>
                                {/* End .tab-content */}
                            </div>
                            {/* End .form-tab */}
                        </div>
                        {/* End .form-box */}
                    </div>
                    {/* End .container */}
                </div>
                {/* End .login-page section-bg */}
            </main>
            {/* End .main */}
        </>
    )
}
