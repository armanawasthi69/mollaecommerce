import React from 'react'
import { addToCart } from '../redux/slice/cartslice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ProductCard({ data, cardSize }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const carts = useSelector((store) => store.cart.value)
    // add to card function
    function SaveToCart(product) {
        product.quantity = 1
        dispatch(addToCart(product))
        toast.success("added To cart")
    }

    return (
        <>
            <div className={`col-6 ${cardSize ? cardSize : "col-md-4 col-lg-4"}`}>
                <div className="product product-7 text-center">
                    <figure className="product-media">
                        <Link to={`/product/${data.id}`} className="product-image">
                            <img
                                src={data?.thumbnail}
                                alt="Product image"
                                className="product-image"
                                width={100}
                                loading='lazy'
                            />
                        </Link>
                        <div className="product-action-vertical">
                            <a
                                href="#"
                                className="btn-product-icon btn-wishlist btn-expandable"
                            >
                                <span>add to wishlist</span>
                            </a>
                            <a
                                href="popup/quickView.html"
                                className="btn-product-icon btn-quickview"
                                title="Quick view"
                            >
                                <span>Quick view</span>
                            </a>
                            <a
                                href="#"
                                className="btn-product-icon btn-compare"
                                title="Compare"
                            >
                                <span>Compare</span>
                            </a>
                        </div>
                        {/* End .product-action-vertical */}
                        <div className="product-action">
                            {carts && carts.filter((ele) => ele.id === data.id).length ?
                                <button onClick={() => { navigate("/cart") }} className="btn-product btn-cart border-0">
                                    <span>already in cart</span>
                                </button> :
                                <button onClick={() => { SaveToCart(data) }} className="btn-product btn-cart border-0">
                                    <span>add to cart</span>
                                </button>
                            }
                        </div>
                        {/* End .product-action */}
                    </figure>
                    {/* End .product-media */}
                    <div className="product-body">
                        <div className="product-cat">
                            <a href="#">{data.category}</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                            <a href="product.html">
                                {data.title}
                            </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">₹{data.price}</div>
                        {/* End .product-price */}
                        <div className="product-nav product-nav-thumbs">
                            {data.images?.map((item, idx) => (
                                <a href="#" className="active" key={idx}>
                                    <img
                                        src={item}
                                        alt="product desc"
                                    />
                                </a>
                            ))}
                        </div>
                        {/* End .product-nav */}
                    </div>
                    {/* End .product-body */}
                </div>
                {/* End .product */}
            </div>
        </>
    )
}
