import React, { useEffect, useState } from 'react'
import Banner from '../comopnents/banner'
import { Link, useParams } from 'react-router-dom'
import { apiUrls } from '../webServices/webUrls'
import {fetchApi} from '../webServices/getWay';
import ProductCard from '../comopnents/productCard';
import { PageCount } from '../utils/helper';
import { Spinner } from 'react-bootstrap';

export default function CategoryPage() {
    const {slug} = useParams();
    const [cardSize, setCardSize] = useState("col-md-4 col-lg-4");
    const [products, setProducts] = useState([]);
    const [filterProd, setFilterProd] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [perPageItem, setPerPageItem] = useState(12)
    const [pageNumber, setPageNumber] = useState(1)
    const pagination = PageCount((filterProd.length ? filterProd : products)?.length, perPageItem)

    // data facting from api function
    async function fetchData() {
        let data = await fetchApi(`${apiUrls.getProductByCategory}/${slug}`)
        if (data) {
            console.log(data);
            setProducts(data.products)
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
    }, [slug])


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
                            <div className="col-lg-12">
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
