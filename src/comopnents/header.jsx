import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { fetchApi } from '../webServices/getWay'
import { apiUrls } from '../webServices/webUrls'
import { useSelector } from 'react-redux'

export default function Header() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const carts = useSelector((store) => store.cart.value)
    const [categories, setCategories] = useState([]);
    const [loginData, setLoginData] = useState(false)


    // get all categories from api function
    async function getCate() {
        let data = await fetchApi(apiUrls.getAllCategories)
        if (data) {
            setCategories(data)
        }
    }

    useEffect(() => {
        getCate()
    }, [])


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            setLoginData(user)
        } else {
            setLoginData(false)
        }
    }, [pathname])

    // logout function 

    function logOut() {
        localStorage.removeItem("user")
        navigate("/")
    }

    return (
        <>
            <header className="header header-7">
                <div className="header-top">
                    <div className="container-fluid">
                        {/* End .header-left */}
                        <div className="header-right">
                            <ul className="top-menu py-3">
                                <li>
                                    <Link to="#">Links</Link>
                                    <ul>
                                        <li>
                                            <Link to="/wishlist">
                                                <i className="icon-heart-o" />
                                                My Wishlist <span>(3)</span>
                                            </Link>
                                        </li>
                                        <li>
                                            {loginData ? <Link to="/my-account" data-toggle="modal">
                                                <i className="icon-user" />
                                                {loginData?.firstName}
                                            </Link>
                                                : <a href="#signin-modal" data-toggle="modal">
                                                    <i className="icon-user" />
                                                    Login
                                                </a>
                                            }
                                        </li>
                                        {loginData ? <li>
                                            <button onClick={logOut} className='btn btn-danger'>Log Out</button>
                                        </li> : null}
                                    </ul>
                                </li>
                            </ul>
                            {/* End .top-menu */}
                        </div>
                        {/* End .header-right */}
                    </div>
                    {/* End .container-fluid */}
                </div>
                {/* End .header-top */}
                <div className="header-middle sticky-header">
                    <div className="container-fluid">
                        <div className="header-left">
                            <button className="mobile-menu-toggler">
                                <span className="sr-only">Toggle mobile menu</span>
                                <i className="icon-bars" />
                            </button>
                            <Link to="/" className="logo">
                                <img
                                    src="assets/images/demos/demo-7/logo.png"
                                    alt="Molla Logo"
                                    width={105}
                                    height={25}
                                />
                            </Link>
                            <nav className="main-nav">
                                <ul className="menu sf-arrows">
                                    <li className="megamenu-container active">
                                        <Link to="/" className="sf-with-ul">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/shop" className="sf-with-ul">
                                            Shop
                                        </Link>
                                        <div className="megamenu megamenu-md">
                                            <div className="row no-gutters">
                                                <div className="col-md-8">
                                                    <div className="menu-col">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="menu-title">Shop with sidebar</div>
                                                                {/* End .menu-title */}
                                                                <ul>
                                                                    <li>
                                                                        <Link to="category-list.html">Shop List</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="category-2cols.html">
                                                                            Shop Grid 2 Columns
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="category.html">Shop Grid 3 Columns</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="category-4cols.html">
                                                                            Shop Grid 4 Columns
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="category-market.html">
                                                                            <span>
                                                                                Shop Market
                                                                                <span className="tip tip-new">New</span>
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                                <div className="menu-title">Shop no sidebar</div>
                                                                {/* End .menu-title */}
                                                                <ul>
                                                                    <li>
                                                                        <Link to="category-boxed.html">
                                                                            <span>
                                                                                Shop Boxed No Sidebar
                                                                                <span className="tip tip-hot">Hot</span>
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="category-fullwidth.html">
                                                                            Shop Fullwidth No Sidebar
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            {/* End .col-md-6 */}
                                                            <div className="col-md-6">
                                                                <div className="menu-title">Product Category</div>
                                                                {/* End .menu-title */}
                                                                <ul>
                                                                    <li>
                                                                        <Link to="product-category-boxed.html">
                                                                            Product Category Boxed
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="product-category-fullwidth.html">
                                                                            <span>
                                                                                Product Category Fullwidth
                                                                                <span className="tip tip-new">New</span>
                                                                            </span>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                                <div className="menu-title">Shop Pages</div>
                                                                {/* End .menu-title */}
                                                                <ul>
                                                                    <li>
                                                                        <Link to="cart.html">Cart</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="checkout.html">Checkout</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="wishlist.html">Wishlist</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="dashboard.html">My Account</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to="#">Lookbook</Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            {/* End .col-md-6 */}
                                                        </div>
                                                        {/* End .row */}
                                                    </div>
                                                    {/* End .menu-col */}
                                                </div>
                                                {/* End .col-md-8 */}
                                                <div className="col-md-4">
                                                    <div className="banner banner-overlay">
                                                        <Link to="category.html" className="banner banner-menu">
                                                            <img
                                                                src="assets/images/menu/banner-1.jpg"
                                                                alt="Banner"
                                                            />
                                                            <div className="banner-content banner-content-top">
                                                                <div className="banner-title text-white">
                                                                    Last <br />
                                                                    Chance
                                                                    <br />
                                                                    <span>
                                                                        <strong>Sale</strong>
                                                                    </span>
                                                                </div>
                                                                {/* End .banner-title */}
                                                            </div>
                                                            {/* End .banner-content */}
                                                        </Link>
                                                    </div>
                                                    {/* End .banner banner-overlay */}
                                                </div>
                                                {/* End .col-md-4 */}
                                            </div>
                                            {/* End .row */}
                                        </div>
                                        {/* End .megamenu megamenu-md */}
                                    </li>
                                    <li>
                                        <Link to="/about">
                                            About
                                        </Link>
                                        {/* <ul>
                                            <li>
                                                <Link to="about.html" className="sf-with-ul">
                                                    About
                                                </Link>
                                                <ul>
                                                    <li>
                                                        <Link to="about.html">About 01</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="about-2.html">About 02</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="contact.html" className="sf-with-ul">
                                                    Contact
                                                </Link>
                                                <ul>
                                                    <li>
                                                        <Link to="contact.html">Contact 01</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="contact-2.html">Contact 02</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="login.html">Login</Link>
                                            </li>
                                            <li>
                                                <Link to="faq.html">FAQs</Link>
                                            </li>
                                            <li>
                                                <Link to="404.html">Error 404</Link>
                                            </li>
                                            <li>
                                                <Link to="coming-soon.html">Coming Soon</Link>
                                            </li>
                                        </ul> */}
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            Contact
                                        </Link>
                                        {/* <ul>
                                            <li>
                                                <Link to="blog.html">Classic</Link>
                                            </li>
                                            <li>
                                                <Link to="blog-listing.html">Listing</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Grid</Link>
                                                <ul>
                                                    <li>
                                                        <Link to="blog-grid-2cols.html">Grid 2 columns</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="blog-grid-3cols.html">Grid 3 columns</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="blog-grid-4cols.html">Grid 4 columns</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="blog-grid-sidebar.html">Grid sidebar</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="#">Masonry</Link>
                                                <ul>
                                                    <li>
                                                        <Link to="blog-masonry-2cols.html">Masonry 2 columns</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="blog-masonry-3cols.html">Masonry 3 columns</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="blog-masonry-4cols.html">Masonry 4 columns</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="blog-masonry-sidebar.html">Masonry sidebar</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="#">Mask</Link>
                                                <ul>
                                                    <li>
                                                        <Link to="blog-mask-grid.html">Blog mask grid</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="blog-mask-masonry.html">Blog mask masonry</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="#">Single Post</Link>
                                                <ul>
                                                    <li>
                                                        <Link to="single.html">Default with sidebar</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="single-fullwidth.html">Fullwidth no sidebar</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="single-fullwidth-sidebar.html">
                                                            Fullwidth with sidebar
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul> */}
                                    </li>
                                    <li>
                                        <Link to="/shop" className="sf-with-ul">
                                            Categories
                                        </Link>
                                        <ul>
                                            {categories && categories.map((ele, indx) => (
                                                <li key={indx}>
                                                    <Link to={`/${ele.slug}`}>{ele.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                                {/* End .menu */}
                            </nav>
                            {/* End .main-nav */}
                        </div>
                        {/* End .header-left */}
                        <div className="header-right">
                            <div className="header-search header-search-extended header-search-visible">
                                <Link to="#" className="search-toggle" role="button">
                                    <i className="icon-search" />
                                </Link>
                                <form onSubmit={(e) => { e.preventDefault() }}>
                                    <div className="header-search-wrapper search-wrapper-wide">
                                        <label htmlFor="q" className="sr-only">
                                            Search
                                        </label>
                                        <input
                                            type="search"
                                            className="form-control"
                                            name="q"
                                            id="q"
                                            placeholder="Search product ..."
                                            required=""
                                        />
                                        <button className="btn btn-primary" type="submit">
                                            <i className="icon-search" />
                                        </button>
                                    </div>
                                    {/* End .header-search-wrapper */}
                                </form>
                            </div>
                            {/* End .header-search */}
                            <div className="dropdown cart-dropdown">
                                <Link
                                    to="#"
                                    className="dropdown-toggle"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    data-display="static"
                                >
                                    <i className="icon-shopping-cart" />
                                    {carts?.length ? <span className="cart-count">{carts.length}</span> : null}
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-cart-products">
                                        {carts && carts.slice(0, 2)?.map((ele, indx) => (
                                            <div className="product">
                                                <div className="product-cart-details">
                                                    <h4 className="product-title">
                                                        <Link to="product.html">
                                                            {ele.title}
                                                        </Link>
                                                    </h4>
                                                    <span className="cart-product-info">
                                                        <span className="cart-product-qty">1</span>x ${ele.price}
                                                    </span>
                                                </div>
                                                {/* End .product-cart-details */}
                                                <figure className="product-image-container">
                                                    <Link to="product.html" className="product-image">
                                                        <img
                                                            src={ele.thumbnail}
                                                            alt="product"
                                                        />
                                                    </Link>
                                                </figure>
                                                <Link to="#" className="btn-remove" title="Remove Product">
                                                    <i className="icon-close" />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    {/* End .cart-product */}
                                    {/* <div className="dropdown-cart-total">
                                        <span>Total</span>
                                        <span className="cart-total-price">$160.00</span>
                                    </div> */}
                                    {/* End .dropdown-cart-total */}
                                    <div className="dropdown-cart-action">
                                        <Link to="/cart" className="btn btn-primary">
                                            View Cart
                                        </Link>
                                        <Link to="/checkout" className="btn btn-outline-primary-2">
                                            <span>Checkout</span>
                                            <i className="icon-long-arrow-right" />
                                        </Link>
                                    </div>
                                    {/* End .dropdown-cart-total */}
                                </div>
                                {/* End .dropdown-menu */}
                            </div>
                            {/* End .cart-dropdown */}
                        </div>
                        {/* End .header-right */}
                    </div>
                    {/* End .container-fluid */}
                </div>
                {/* End .header-middle */}
            </header>
            {/* End .header */}
        </>
    )
}
