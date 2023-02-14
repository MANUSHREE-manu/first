import React from "react";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Product from "./product";
import { Link } from "react-router-dom";
import Nav from "./nav";
const Category = () => {

    const [cdetails, updatecdetail] = useState([]);
   // const [pdetail, updatepdetails] = useState([]);
    const [cname, pickcname] = useState("");
    const [type, picktype] = useState("");
    const [details, pickDetails] = useState("");
    const [url, pickurl] = useState("");
    const [pid, pickid] = useState("");
    const [active, pickActive] = useState("");
    let [keyword, picksearch] = useState("");
    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    let [pcid, updateCat] = useState(0)
   
const handlePageClick = ({ selected: selectedpage }) => {
        setCurrentPage(selectedpage);

    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(Category.length / PER_PAGE);

    const getCategory = () => {

        let input = { "pid": pcid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(input)
        };
        fetch("https://www.medicalplanet.in/webapi/Category/getchild", requestOptions)
            .then(response => response.json())
            .then(data => {
                //alert(data);
                // console.log(data.length);
                updatecdetail(data);
            });
    }


    const save = () => {
        let input = {
            "categoryname": cname,
            "categorydetails": details,
            "url": url,
            "pid": pid,
            "active": active,
            "type": type,

        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Category/save', requestOptions)
            .then(response => response.text())
            .then(data => {
                alert(data);

            });
    }

    const Delete = (catid) => {
        let input = { "id": catid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Category/deleteone', requestOptions)
            .then(response => response.text())
            .then(data => {

                // alert(data);
                alert(catid + "" + "deleted successfully");
                getCategory();
            });
    }
    const[parent,pickParent]=useState([]);
    const getparent = () => {
        const url = "https://www.medicalplanet.in/webapi/Category/getparent";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //  alert(data.length)
                pickParent(data)
                updateCat(data.catid);
               // updatepdetails(data);
                
            })
    }
    useEffect(() => {
        getCategory();
        getparent();
    }, [true]);
    return (
        <>
        <Nav/>
                <div className="container mt-3">
          
            <div className="row mt-1 p-1">
                <div className="col-lg-4">
                    <div className="card align-items-stretch shadow">
                        <div className="card-header">
                            <h3 className="text-center text-primary">Category</h3>
                        </div>
                        <div className="card-body">
                            <div className="row mt-1 p-1">
                                <div className="col-lg-4">
                                    <label>Select Category:</label>
                                </div>
                                <div className="col-lg-8">
                                    <select className="form-select" >
                                        
                                        {
                                            parent.map((parent, index) => {
                                                return (
                                                        <option key={index} value={parent.catid} >{parent.categoryname}</option>
                                                        )
                                            })
                                        }

                                    </select>
                                    
                                </div>
                            </div>
                            <div className="row mt-1 p-1">
                                <div className="col-lg-4">
                                    <label>parent Name:</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" onChange={obj => pickcname(obj.target.value)} value={cname} />

                                </div>
                            </div>
                            <div className="row mt-1 p-1">
                                <div className="col-lg-4">
                                    <label>Details:</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" onChange={obj => pickDetails(obj.target.value)} value={details} />
                                </div>
                            </div>
                            <div className="row mt-1 p-1">
                                <div className="col-lg-4">
                                    <label>PID:</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" onChange={obj => pickid(obj.target.value)} value={pid} />
                                </div>
                            </div>

                            <div className="row mt-1 p-1">
                                <div className="col-lg-4">
                                    <label>URL</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" onChange={obj => pickurl(obj.target.value)} value={url} />
                                </div>
                            </div>

                            <div className="row mt-1 p-1">
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
                            <div className="row mt-1 p-1">
                                <div className="col-lg-4">
                                    <label>Type</label>
                                </div>
                                <div className="col-lg-8">
                                    <select className="form-select" onChange={obj => picktype(obj.target.value)} value={type}>

                                        <option>P</option>
                                        <option>D</option>
                                        <option>L</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-center">
                                <button onClick={save} className='btn btn-primary text-center m-2 p-2'>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className='card shadow'>
                        <div className='card-header'>
                          <div className="row">
                          <div className="col-lg-3">
                                <select onClick={getCategory} className="form-select" onChange={obj=>updateCat(obj.target.value)} >
                                    <option>Parent Category</option>
                                    {
                                        parent.map((pinfo, index) => {
                                            return (
                                            

                                                    <option key={index} value={pinfo.catid} >{pinfo.categoryname}</option>
                                                
                                            );
                                        })
                                    }

                                </select>
                            </div>
                          <div className="col-lg-5">
                          <h3 className="text-center text-primary">Category Details</h3>
                          </div>
                          </div>
                            
                        </div>
                        <table className='table table-bordered hover'>
                            <thead className='bg-dark text-white thead-dark'>
                                <tr>

                                    <th>Catid</th>
                                    <th>PID</th>
                                    <th>Parent Name</th>
                                    <th>details</th>
                                    <th>URL</th>

                                    <th>Active</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cdetails.slice(offset, offset + PER_PAGE).filter((temp) => {
                                        if (keyword === "") {
                                            return temp;
                                        } else if (temp.cname.toLowerCase().includes(keyword.toLowerCase()) || temp.catid.toString().includes(keyword.toString())) {
                                            return temp;
                                        }
                                    }).map((cinfo, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{cinfo.catid}</td>
                                                <td>{cinfo.parent}</td>
                                                <td>{cinfo.categoryname}</td>
                                                <td>{cinfo.categorydetails}</td>
                                                <td>{cinfo.url}</td>

                                                <td>{cinfo.active}</td>
                                                <td>{cinfo.type}</td>
                                                <td>
                                                    <button className='btn btn-danger text-dark m-1 p-1' onClick={Delete.bind(this, cinfo.catid)}><i className='fa fa-trash'></i></button>
                                                    <button className='btn btn-warning text-dark m-1 p-1'><i className='fa fa-edit'></i></button>

                                                </td>
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
                                pageCount={4}
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
        </>
    )
};
export default Category;