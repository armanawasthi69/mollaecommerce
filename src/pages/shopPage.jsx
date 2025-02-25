import React, { useCallback, useEffect, useState } from 'react'
import Banner from '../comopnents/banner'
import { Link } from 'react-router-dom'
import { apiUrls } from '../webServices/webUrls'
import {fetchApi, PostApi} from '../webServices/getWay';
import ProductCard from '../comopnents/productCard';
import { PageCount } from '../utils/helper';
import { Spinner } from 'react-bootstrap';

export default function ShopPage() {
    let user = JSON.parse(localStorage.getItem("user"))
    const [cardSize, setCardSize] = useState("col-md-4 col-lg-4");
    const [products, setProducts] = useState([]);
    const [filterProd, setFilterProd] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [perPageItem, setPerPageItem] = useState(12)
    const [pageNumber, setPageNumber] = useState(1)
    const pagination = PageCount((filterProd.length ? filterProd : products)?.length, perPageItem)

    // data facting from api function
    async function fetchData() {
        let data = await fetchApi(apiUrls.otherProductApi)
        if (data) {
            console.log(data);
            setProducts(data.products)
        }

        let category = await fetchApi(apiUrls.getAllcategoriesList)
        if (category) {
            console.log(category);
            setAllCategories(category)
        }

    }

    //for filter products function
    function filterProduct(e) {
        const { checked, value } = e.target

        if (checked) {
            setSelectedCategory([...selectedCategory, value])
        } else {
            let filt = selectedCategory.filter((ele) => ele !== value)
            setSelectedCategory(filt)
        }

    }

    // pagination next button function
    function nextBtn() {
        if (pagination.length > pageNumber) {
            setPageNumber(pageNumber + 1)
        }
    }


    // pagination previous button function
    function preBtn() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    // clear filter from products
    function clearFilter() {
        setFilterProd([])
    }


    // for api calling function call
    useEffect(() => {
        fetchData()
    }, [])


    // for every click render filter proccess
    useEffect(() => {
        let data = products.filter((ele) => {
            if (selectedCategory.includes(ele.category)) {
                return ele
            }
        })
        setFilterProd(data)
    }, [selectedCategory])

    return (
        <>

            <main className="main">
                <Banner />
                {/* End .breadcrumb-nav */}
                <div className="page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="toolbox">
                                    <div className="toolbox-left">
                                        <div className="toolbox-info">
                                            Showing <span>{perPageItem * pageNumber} of {products && products.length}</span> Products
                                        </div>
                                        {/* End .toolbox-info */}
                                    </div>
                                    {/* End .toolbox-left */}
                                    <div className="toolbox-right">
                                        <div className="toolbox-sort">
                                            <label htmlFor="sortby">Sort by:</label>
                                            <div className="select-custom">
                                                <select name="sortby" id="sortby" className="form-control" defaultValue={"popularity"}>
                                                    <option value="popularity">
                                                        Most Popular
                                                    </option>
                                                    <option value="rating">Most Rated</option>
                                                    <option value="date">Date</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* End .toolbox-sort */}
                                        <div className="toolbox-layout">
                                            <Link onClick={() => { setCardSize("col-md-12 col-lg-12") }} className="btn-layout">
                                                <svg width={16} height={10}>
                                                    <rect x={0} y={0} width={4} height={4} />
                                                    <rect x={6} y={0} width={10} height={4} />
                                                    <rect x={0} y={6} width={4} height={4} />
                                                    <rect x={6} y={6} width={10} height={4} />
                                                </svg>
                                            </Link>
                                            <Link onClick={() => { setCardSize("col-md-6 col-lg-6") }} className="btn-layout">
                                                <svg width={10} height={10}>
                                                    <rect x={0} y={0} width={4} height={4} />
                                                    <rect x={6} y={0} width={4} height={4} />
                                                    <rect x={0} y={6} width={4} height={4} />
                                                    <rect x={6} y={6} width={4} height={4} />
                                                </svg>
                                            </Link>
                                            <Link onClick={() => { setCardSize("col-md-4 col-lg-4") }} className="btn-layout">
                                                <svg width={16} height={10}>
                                                    <rect x={0} y={0} width={4} height={4} />
                                                    <rect x={6} y={0} width={4} height={4} />
                                                    <rect x={12} y={0} width={4} height={4} />
                                                    <rect x={0} y={6} width={4} height={4} />
                                                    <rect x={6} y={6} width={4} height={4} />
                                                    <rect x={12} y={6} width={4} height={4} />
                                                </svg>
                                            </Link>
                                            <Link onClick={() => { setCardSize("col-md-3 col-lg-3") }} className="btn-layout">
                                                <svg width={22} height={10}>
                                                    <rect x={0} y={0} width={4} height={4} />
                                                    <rect x={6} y={0} width={4} height={4} />
                                                    <rect x={12} y={0} width={4} height={4} />
                                                    <rect x={18} y={0} width={4} height={4} />
                                                    <rect x={0} y={6} width={4} height={4} />
                                                    <rect x={6} y={6} width={4} height={4} />
                                                    <rect x={12} y={6} width={4} height={4} />
                                                    <rect x={18} y={6} width={4} height={4} />
                                                </svg>
                                            </Link>
                                        </div>
                                        {/* End .toolbox-layout */}
                                    </div>
                                    {/* End .toolbox-right */}
                                </div>
                                {/* End .toolbox */}
                                <div className="products mb-3">
                                    <div className="row justify-content-center">
                                        {(filterProd.length ? filterProd : products)?.slice(pageNumber < 1 ? 0 : (pageNumber - 1) * perPageItem, perPageItem * pageNumber).map((ele, ind) => (
                                            <ProductCard data={ele} key={ind} cardSize={cardSize} />
                                        ))}
                                        {products.length ? null : <Spinner animation="border" variant="primary" size='xxl' className='p-5 mt-5' />}
                                    </div>
                                    {/* End .row */}
                                </div>
                                {/* End .products */}
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className={pageNumber === 1 ? "page-item disabled" : "page-item"}>
                                            <button
                                                className="page-link page-link-prev"
                                                onClick={preBtn}
                                            >
                                                <span aria-hidden="true">
                                                    <i className="icon-long-arrow-left" />
                                                </span>
                                                Prev
                                            </button>
                                        </li>
                                        {pagination && pagination?.map((ele, indx) => (
                                            <li className={`${ele === pageNumber - 1 ? "page-item active" : "page-item"}`} aria-current="page" key={indx}>
                                                <button onClick={() => { setPageNumber(ele + 1) }} className="page-link">
                                                    {ele + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className="page-item-total">of {pagination?.length}</li>
                                        <li className={pageNumber === pagination.length ? "page-item disabled" : "page-item"}>
                                            < button
                                                className="page-link page-link-next"
                                                onClick={nextBtn}
                                            >
                                                Next
                                                <span>
                                                    <i className="icon-long-arrow-right" />
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            {/* End .col-lg-9 */}
                            <aside className="col-lg-3 order-lg-first">
                                <div className="sidebar sidebar-shop">
                                    <div className="widget widget-clean" >
                                        <label>Filters:</label>
                                        <button className="sidebar-filter-clear" onClick={clearFilter}>
                                            Clean All
                                        </button>
                                    </div>
                                    {/* End .widget widget-clean */}
                                    <div className="widget widget-collapsible">
                                        <h3 className="widget-title">
                                            <a
                                                data-toggle="collapse"
                                                href="#widget-1"
                                                role="button"
                                                aria-expanded="true"
                                                aria-controls="widget-1"
                                            >
                                                Category
                                            </a>
                                        </h3>
                                        {/* End .widget-title */}
                                        <div className="collapse show" id="widget-1">
                                            <div className="widget-body">
                                                <div className="filter-items filter-items-count">
                                                    {allCategories && allCategories.map((ele, indx) => (
                                                        <div className="filter-item" key={indx}>
                                                            <div className="custom-control custom-checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id={`cat-${indx}`}
                                                                    value={ele}
                                                                    onChange={filterProduct}
                                                                />
                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor={`cat-${indx}`}
                                                                >
                                                                    {ele}
                                                                </label>
                                                            </div>
                                                            {/* End .custom-checkbox */}
                                                            {/* <span className="item-count">3</span> */}
                                                        </div>
                                                    ))}
                                                    {/* End .filter-item */}
                                                </div>
                                                {/* End .filter-items */}
                                            </div>
                                            {/* End .widget-body */}
                                        </div>
                                        {/* End .collapse */}
                                    </div>
                                    {/* End .widget */}
                                    <div className="widget widget-collapsible">
                                        <h3 className="widget-title">
                                            <a
                                                data-toggle="collapse"
                                                href="#widget-2"
                                                role="button"
                                                aria-expanded="true"
                                                aria-controls="widget-2"
                                            >
                                                Size
                                            </a>
                                        </h3>
                                        {/* End .widget-title */}
                                        <div className="collapse show" id="widget-2">
                                            <div className="widget-body">
                                                <div className="filter-items">
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="size-1"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="size-1"
                                                            >
                                                                XS
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="size-2"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="size-2"
                                                            >
                                                                S
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                defaultChecked=""
                                                                id="size-3"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="size-3"
                                                            >
                                                                M
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                defaultChecked=""
                                                                id="size-4"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="size-4"
                                                            >
                                                                L
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="size-5"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="size-5"
                                                            >
                                                                XL
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="size-6"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="size-6"
                                                            >
                                                                XXL
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                </div>
                                                {/* End .filter-items */}
                                            </div>
                                            {/* End .widget-body */}
                                        </div>
                                        {/* End .collapse */}
                                    </div>
                                    {/* End .widget */}
                                    <div className="widget widget-collapsible">
                                        <h3 className="widget-title">
                                            <a
                                                data-toggle="collapse"
                                                href="#widget-3"
                                                role="button"
                                                aria-expanded="true"
                                                aria-controls="widget-3"
                                            >
                                                Colour
                                            </a>
                                        </h3>
                                        {/* End .widget-title */}
                                        <div className="collapse show" id="widget-3">
                                            <div className="widget-body">
                                                <div className="filter-colors">
                                                    <a href="#" style={{ background: "#b87145" }}>
                                                        <span className="sr-only">Color Name</span>
                                                    </a>
                                                    <a href="#" style={{ background: "#f0c04a" }}>
                                                        <span className="sr-only">Color Name</span>
                                                    </a>
                                                    <a href="#" style={{ background: "#333333" }}>
                                                        <span className="sr-only">Color Name</span>
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="selected"
                                                        style={{ background: "#cc3333" }}
                                                    >
                                                        <span className="sr-only">Color Name</span>
                                                    </a>
                                                    <a href="#" style={{ background: "#3399cc" }}>
                                                        <span className="sr-only">Color Name</span>
                                                    </a>
                                                    <a href="#" style={{ background: "#669933" }}>
                                                        <span className="sr-only">Color Name</span>
                                                    </a>
                                                    <a href="#" style={{ background: "#f2719c" }}>
                                                        <span className="sr-only">Color Name</span>
                                                    </a>
                                                    <a href="#" style={{ background: "#ebebeb" }}>
                                                        <span className="sr-only">Color Name</span>
                                                    </a>
                                                </div>
                                                {/* End .filter-colors */}
                                            </div>
                                            {/* End .widget-body */}
                                        </div>
                                        {/* End .collapse */}
                                    </div>
                                    {/* End .widget */}
                                    <div className="widget widget-collapsible">
                                        <h3 className="widget-title">
                                            <a
                                                data-toggle="collapse"
                                                href="#widget-4"
                                                role="button"
                                                aria-expanded="true"
                                                aria-controls="widget-4"
                                            >
                                                Brand
                                            </a>
                                        </h3>
                                        {/* End .widget-title */}
                                        <div className="collapse show" id="widget-4">
                                            <div className="widget-body">
                                                <div className="filter-items">
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="brand-1"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="brand-1"
                                                            >
                                                                Next
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="brand-2"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="brand-2"
                                                            >
                                                                River Island
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="brand-3"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="brand-3"
                                                            >
                                                                Geox
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="brand-4"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="brand-4"
                                                            >
                                                                New Balance
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="brand-5"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="brand-5"
                                                            >
                                                                UGG
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="brand-6"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="brand-6"
                                                            >
                                                                F&amp;F
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                    <div className="filter-item">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="brand-7"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="brand-7"
                                                            >
                                                                Nike
                                                            </label>
                                                        </div>
                                                        {/* End .custom-checkbox */}
                                                    </div>
                                                    {/* End .filter-item */}
                                                </div>
                                                {/* End .filter-items */}
                                            </div>
                                            {/* End .widget-body */}
                                        </div>
                                        {/* End .collapse */}
                                    </div>
                                    {/* End .widget */}
                                    <div className="widget widget-collapsible">
                                        <h3 className="widget-title">
                                            <a
                                                data-toggle="collapse"
                                                href="#widget-5"
                                                role="button"
                                                aria-expanded="true"
                                                aria-controls="widget-5"
                                            >
                                                Price
                                            </a>
                                        </h3>
                                        {/* End .widget-title */}
                                        <div className="collapse show" id="widget-5">
                                            <div className="widget-body">
                                                <div className="filter-price">
                                                    <div className="filter-price-text">
                                                        Price Range:
                                                        <span id="filter-price-range" />
                                                    </div>
                                                    {/* End .filter-price-text */}
                                                    <div id="price-slider" />
                                                    {/* End #price-slider */}
                                                </div>
                                                {/* End .filter-price */}
                                            </div>
                                            {/* End .widget-body */}
                                        </div>
                                        {/* End .collapse */}
                                    </div>
                                    {/* End .widget */}
                                </div>
                                {/* End .sidebar sidebar-shop */}
                            </aside>
                            {/* End .col-lg-3 */}
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
