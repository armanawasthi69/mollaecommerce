import React from 'react'
import { addToCart } from '../redux/slice/cartslice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosClient from '../webServices/getWay'
import { apiUrls } from '../webServices/webUrls'

export default function ProductCard({ data, cardSize }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const carts = useSelector((store) => store.cart.value)
    // add to card function
    async function SaveToCart(id) {
        try {
            let res = await axiosClient.post(apiUrls.addToCartApi, { product: id }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.status) {
                dispatch(addToCart(res.data.data))
                toast.success("added To cart")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <div className={`col-6 ${cardSize ? cardSize : "col-md-4 col-lg-4"}`}>
                <div className="product product-7 text-center">
                    <figure className="product-media">
                        <Link to={`/product/${data._id}`} className="product-image">
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
                            {carts && carts.filter((ele) => ele?.products?._id === data._id)?.length ?
                                <button onClick={() => { navigate("/cart") }} className="btn-product btn-cart border-0">
                                    <span>already in cart</span>
                                </button> :
                                <button onClick={() => { SaveToCart(data._id) }} className="btn-product btn-cart border-0">
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
                                {data.prod_name}
                            </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price text-secondary p-0 m-0">₹{data.price}</div>
                        <del className="text-dark">Discount ₹{data.discount}</del>
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
