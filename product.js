import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Brand from './brand';
import Category from './category';
import Nav from './nav';
import ReactPaginate from 'react-paginate';
import Pedit from './proedit';
import pdit from './pedit';
import Projson from './productjson';

const Product = () => {
    const [pdetail, updatepdetail] = useState([]);
    const [brand, setbrand] = useState([]);
    const [category, setcategory] = useState([]);
    //  const[proid,pickproid]=useState("");
    const [productname, pickproductName] = useState("");
    const [categoryid, pickcatid] = useState("");
    const [brandid, pickbid] = useState("");
    const [price, pickPrice] = useState("");
    const [quantity, pickQua] = useState("");
    const [photo, pickPhoto] = useState("");
    const [detail, pickDetail] = useState("");
    const [venderid, pickVender] = useState("");
    const [offer, pickOffer] = useState("");
    const [active, pickActive] = useState("");
    const PER_PAGE = "5";
    const [currentPage, setCurrentPage] = useState(0);
    const [keyword, pickkey] = useState("");
    let [proid, updateproid] = useState(0);

    const handlePageClick = ({ selected: selectedpage }) => {
        setCurrentPage(selectedpage);

    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(Category.length / PER_PAGE);

    //brand
    const getbrand = () => {
        let input = { productid: brandid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };

        fetch("https://www.medicalplanet.in/webapi/Brand/getall", requestOptions)
            .then(response => response.json())
            .then(data => {
                setbrand(data);

            })
    }
    //category

    const getCategory = () => {
        let input = { productid: categoryid }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };

        fetch("https://www.medicalplanet.in/webapi/Category/getall", requestOptions)
            .then(response => response.json())
            .then(data => {
                setcategory(data);

            })
    }


    //product

    const getproduct = () => {
        const url = "https://www.medicalplanet.in/webapi/Product/getall";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //alert(data.length)
                updatepdetail(data)
                //updateproid(data.productid);
            })
    }
    const save = () => {
        let input = {
            "productname": productname,
            "categoryid": categoryid,
            "brandid": brandid,
            "price": price,
            "quantity": quantity,
            "photo": photo,
            "details": detail,
            "vendorid": venderid,
            "offer": offer,
            "active": active
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Product/save', requestOptions)
            .then(response => response.text())
            .then(data => {
                alert(data);
                alert("save successfully!");
                getproduct();
            });
    }
    const Delete = (productid) => {
        let input = { "id": productid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Product/deleteone', requestOptions)
            .then(response => response.text())
            .then(data => {
                alert(data);
                getproduct();
            });
    }


    useEffect(() => {
        getproduct();
        getCategory();
        getbrand();
    }, [true]);

    return (
        <>
            <Nav />
            <div className='container-fluid mt-1'>
                <div className='row mt-0'>
                    <div className='col-lg-12 d-flex'>
                        <div className="card col-lg-3 m-1 shadow">

                            <div className="card-header">
                                <h5 className="text-center text-primary"> Add Product</h5>
                            </div>
                            <div className="card-body pt-1 m-0">
                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Product Name:</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input type="text" className="form-control" onChange={obj => pickproductName(obj.target.value)} value={productname} />

                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Category</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <select className="form-select" onChange={obj => pickcatid(obj.target.value)} value={categoryid}>
                                            <option>Select Category</option>
                                            {
                                                category.map((binfo, index) => {
                                                    return (
                                                        <option key={index} value={binfo.catid}>{binfo.categoryname}</option>
                                                    )
                                                })
                                            }

                                        </select>

                                    </div>

                                </div>
                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Brand ID</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <select className="form-select" onChange={obj => pickbid(obj.target.value)} value={brandid} >
                                            <option>Select Brand</option>
                                            {
                                                brand.map((binfo, index) => {
                                                    return (
                                                        <option key={index} value={binfo.brandid}>{binfo.brandname}</option>
                                                    )
                                                })
                                            }

                                        </select>

                                    </div>

                                </div>
                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Price</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input type="number" className="form-control" onChange={obj => pickPrice(obj.target.value)} value={price} />

                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Quantity</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input type="number" className="form-control" onChange={obj => pickQua(obj.target.value)} value={quantity} />
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Photo</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input type="text" className="form-control" onChange={obj => pickPhoto(obj.target.value)} value={photo} />
                                    </div>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Details</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input type="text" className="form-control" onChange={obj => pickDetail(obj.target.value)} value={detail} />
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Vender ID</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <select className='form-select'>
                                            <option>1</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Offer</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input type="number" className="form-control" onChange={obj => pickOffer(obj.target.value)} value={offer} />
                                    </div>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-lg-4">
                                        <label>Active</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <select className="form-select" onChange={obj => pickActive(obj.target.value)} value={active}>

                                            <option>YES</option>
                                            <option>NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button onClick={save} className='btn btn-primary text-center mt-1  p-2'>SUBMIT</button>
                                </div>
                            </div>
                        </div>


                        <div className='col-lg-9 mt-1'>
                            <div className='card shadow'>
                                <div className='card-header'>
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                            <select className="form-select" onClick={getproduct}>
                                                <option>Product</option>
                                                {
                                                    pdetail.map((pname, index) => {
                                                        return (
                                                            <option key={index} value={pname.productid}>{pname.productname}</option>
                                                        )
                                                    })
                                                }

                                            </select>

                                        </div>
                                        <div className='col-lg-5'>
                                            <h3 className="text-center text-primary">Product Details</h3>
                                        </div>
                                    </div>



                                    <table className='table table-bordered hover'>
                                        <thead className='bg-dark text-white thead-dark'>
                                            <tr>
                                                <th>Product Id</th>
                                                <th>Product Name</th>
                                                <th>Cat ID</th>
                                                <th>Brand ID</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Photo</th>
                                                <th>Details</th>
                                                <th>Vender ID</th>
                                                <th>Offer</th>
                                                <th>Active</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pdetail.slice(offset, offset + PER_PAGE).filter((temp) => {
                                                    if (keyword === "") {
                                                        return temp;
                                                    } else if (temp.cname.toLowerCase().includes(keyword.toLowerCase()) || temp.catid.toString().includes(keyword.toString())) {
                                                        return temp;
                                                    }
                                                }).map((pinfo, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{pinfo.productid}</td>
                                                            <td>{pinfo.productname}</td>
                                                            <td>{pinfo.categoryid}</td>
                                                            <td>{pinfo.brandid}</td>
                                                            <td>{pinfo.price}</td>
                                                            <td>{pinfo.quantity}</td>
                                                            <td><img src={pinfo.photo} width="50" height="50" /></td>
                                                            <td>{pinfo.details}</td>
                                                            <td>{pinfo.vendorid}</td>
                                                            <td>{pinfo.offer}</td>
                                                            <td>{pinfo.active}</td>
                                                            <td><button onClick={Delete.bind(this, pinfo.productid)} className='btn btn-danger text-dark m-1 p-1'><i className='fa fa-trash'></i></button>
                                                                <Link to={`/proedit/${pinfo.productid}`} className='btn btn-warning text-dark m-1 p-1'><i className='fa fa-edit'></i></Link></td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </table>
                                    <div className="mb-2 mt-2">
                                        <ReactPaginate
                                            previousLabel={"Previous"}
                                            nextLabel={"Next"}
                                            breakLabel={"..."}
                                            pageCount={5}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={3}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination  justify-content-center"}
                                            pageClassName={"page-item "}
                                            pageLinkClassName={"page-link"}
                                            previousClassName={"page-item"}
                                            previousLinkClassName={"page-link"}
                                            nextClassName={"page-item"}
                                            nextLinkClassName={"page-link"}
                                            breakClassName={"page-item"}
                                            breakLinkClassName={"page-link"}
                                            activeClassName={"active primary"}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Product;