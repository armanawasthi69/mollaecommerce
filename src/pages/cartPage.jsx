import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Banner from '../comopnents/banner'
import { useDispatch, useSelector } from 'react-redux'
import { Decrement, DeleteToCart, Increment } from '../redux/slice/cartslice'

export default function CartPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Carts = useSelector((store) => store.cart.value)
    const totalPrice = Carts.reduce((curr,ele)=>curr+ele.price*ele.quantity,0)
    function removeItem(id) {
        dispatch(DeleteToCart(id))
    }

    return (
        <>
            <main className="main">
                <Banner />
                <div className="page-content">
                    <div className="cart">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9">
                                    <table className="table table-cart table-mobile">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Carts && Carts?.map((ele, indx) => (
                                                <tr key={indx}>
                                                    <td className="product-col">
                                                        <div className="product">
                                                            <figure className="product-media">
                                                                <a href="#">
                                                                    <img
                                                                        src={ele.thumbnail}
                                                                        alt="Product image"
                                                                    />
                                                                </a>
                                                            </figure>
                                                            <h3 className="product-title">
                                                                <a href="#">{ele.title}</a>
                                                            </h3>
                                                            {/* End .product-title */}
                                                        </div>
                                                        {/* End .product */}
                                                    </td>
                                                    <td className="price-col">₹{ele.price}</td>
                                                    <td className="quantity-col">
                                                        <div className="cart-product-quantity d-flex justify-content-center" style={{ gap: "5px" }}>
                                                            <button onClick={() => { dispatch(Decrement(ele.id)) }} className='border-0'>-</button>
                                                            <input
                                                                type="text"
                                                                className="form-control p-2"
                                                                value={ele.quantity}
                                                            />
                                                            <button onClick={() => { dispatch(Increment(ele.id)) }} className='border-0'>+</button>
                                                        </div>
                                                        {/* End .cart-product-quantity */}
                                                    </td>
                                                    <td className="total-col">₹{ele.price*ele.quantity}</td>
                                                    <td className="remove-col">
                                                        <button className="btn-remove" onClick={() => { removeItem(ele.id) }}>
                                                            <i className="icon-close" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* End .table table-wishlist */}
                                    <div className="cart-bottom">
                                        <div className="cart-discount">
                                            <form action="#">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required=""
                                                        placeholder="coupon code"
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            className="btn btn-outline-primary-2"
                                                            type="submit"
                                                        >
                                                            <i className="icon-long-arrow-right" />
                                                        </button>
                                                    </div>
                                                    {/* .End .input-group-append */}
                                                </div>
                                                {/* End .input-group */}
                                            </form>
                                        </div>
                                        {/* End .cart-discount */}
                                        <a href="#" className="btn btn-outline-dark-2">
                                            <span>UPDATE CART</span>
                                            <i className="icon-refresh" />
                                        </a>
                                    </div>
                                    {/* End .cart-bottom */}
                                </div>
                                {/* End .col-lg-9 */}
                                <aside className="col-lg-3">
                                    <div className="summary summary-cart">
                                        <h3 className="summary-title">Cart Total</h3>
                                        {/* End .summary-title */}
                                        <table className="table table-summary">
                                            <tbody>
                                                <tr className="summary-subtotal">
                                                    <td>Subtotal:</td>
                                                    <td>₹{totalPrice}</td>
                                                </tr>
                                                {/* End .summary-subtotal */}
                                                <tr className="summary-shipping">
                                                    <td>Shipping:</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                <tr className="summary-shipping-row">
                                                    <td>
                                                        <div className="custom-control custom-radio">
                                                            <input
                                                                type="radio"
                                                                id="free-shipping"
                                                                name="shipping"
                                                                className="custom-control-input"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="free-shipping"
                                                            >
                                                                Free Shipping
                                                            </label>
                                                        </div>
                                                        {/* End .custom-control */}
                                                    </td>
                                                    <td>₹0.00</td>
                                                </tr>
                                                {/* End .summary-shipping-row */}
                                                <tr className="summary-shipping-row">
                                                    <td>
                                                        <div className="custom-control custom-radio">
                                                            <input
                                                                type="radio"
                                                                id="standart-shipping"
                                                                name="shipping"
                                                                className="custom-control-input"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="standart-shipping"
                                                            >
                                                                Standart:
                                                            </label>
                                                        </div>
                                                        {/* End .custom-control */}
                                                    </td>
                                                    <td>₹0.00</td>
                                                </tr>
                                                {/* End .summary-shipping-row */}
                                                <tr className="summary-shipping-row">
                                                    <td>
                                                        <div className="custom-control custom-radio">
                                                            <input
                                                                type="radio"
                                                                id="express-shipping"
                                                                name="shipping"
                                                                className="custom-control-input"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="express-shipping"
                                                            >
                                                                Express:
                                                            </label>
                                                        </div>
                                                        {/* End .custom-control */}
                                                    </td>
                                                    <td>₹0.00</td>
                                                </tr>
                                                {/* End .summary-shipping-row */}
                                                <tr className="summary-shipping-estimate">
                                                    <td>
                                                        Estimate for Your Country
                                                        <br /> <a href="dashboard.html">Change address</a>
                                                    </td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                {/* End .summary-shipping-estimate */}
                                                <tr className="summary-total">
                                                    <td>Total:</td>
                                                    <td>₹{totalPrice}</td>
                                                </tr>
                                                {/* End .summary-total */}
                                            </tbody>
                                        </table>
                                        {/* End .table table-summary */}
                                        <Link
                                            to="/checkout"
                                            className="btn btn-outline-primary-2 btn-order btn-block"
                                        >
                                            PROCEED TO CHECKOUT
                                        </Link>
                                    </div>
                                    {/* End .summary */}
                                    <button
                                        onClick={()=>{navigate(-2)}}
                                        className="btn btn-outline-dark-2 btn-block mb-3"
                                    >
                                        <span>CONTINUE SHOPPING</span>
                                        <i className="icon-refresh" />
                                    </button>
                                </aside>
                                {/* End .col-lg-3 */}
                            </div>
                            {/* End .row */}
                        </div>
                        {/* End .container */}
                    </div>
                    {/* End .cart */}
                </div>
                {/* End .page-content */}
            </main>
            {/* End .main */}
        </>
    )
}
