import React from 'react';
import { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";
import Category from './category';
import Edit from './bedit';
import Product from './product';
import Nav from './nav';
const PER_PAGE=4;

const Brand = () => {
    const [brandn,pickBname] = useState("");
    const [details,pickDetails] = useState("");
    const [active, pickActive] = useState("");
    const[branddetails,updateDetails]=useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate=useNavigate();
   
    let[keyword,picksearch]=useState("");
    

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(Brand.length / PER_PAGE);
    
    const save = () => {
        let input = {
            "brandname": brandn,
            "details": details,
            "active": active,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Brand/save', requestOptions)
            .then(response => response.text())
            .then(data => {

                toast(`${brandn} 👍added successfully!`)
               
                swal({
                    title: "Good job!",
                    text: "saved successfully!",
                    icon: "success",
                  });
                  pickBname("");
                  pickDetails("");
                  pickActive("");
            });
    }
    const getbrand = () => {
        const url = "https://www.medicalplanet.in/webapi/Brand/getall";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                updateDetails(data);
                
            })

    }
    const handlesearch=()=>{
        picksearch(keyword.target.value);
    }

    const Delete=(brandid)=>{
        let input={"id":brandid};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Brand/deleteone', requestOptions)
        .then(response => response.text())
        .then(data =>{
            getbrand();
           // updateDetails(data);
           toast(`${brandid} 😍 Deleted Successfully!`)
        
           //swal("Good job!", "deleted successfully!", "success");
           swal({
           // title: "Good job!",
            text: "Deleted successfully!",
            icon: "warning",
          });

            //alert(data);
        });
    }
 
 
    
    useEffect(() => {
        getbrand();
    }, [1]);

     const addEventListener=()=>(keydown, event) =>{
    };

    return (
        <>
        <Nav/>
        <div className=' container  mt-3 text-center'>    
            <div className='row text-center'>
                <div className='col-lg-2 offset-9' align="right">
<form className='d-flex'>
    <input type="text" onChange={obj=>picksearch(obj.target.value)} className="form control m-2 p-1" placeholder='Search'/>
   
</form>
                </div>
                <div className='col-lg-5'>
                   
                    <div className='card align-items-stretch shadow'>
                    
                        <div className='card-header'>
                            <h3>Brand Details</h3>
                        </div>
                        <div className='card-body'>
                            <div className='row m-1 p-1'>
                                <div className='col-lg-4'>
                                    <label>Brand Name:</label>
                                </div>
                                <div className='col-lg-8'>
                                    
                                <input type="text" name="bname" id="1" className='form-control' onChange={obj => pickBname(obj.target.value)} value={brandn} 
                                 />
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col-lg-4'>
                                    <label>Brand Details:</label>
                                </div>
                                <div className='col-lg-8'>
                                    <textarea className='form-control' name="detail" id="2" onChange={obj => pickDetails(obj.target.value)} value={details}></textarea>
                                </div>
                            </div>

                            <div className='row m-1 p-1'>
                                <div className='col-lg-4'>
                                    <label>Active:</label>
                                </div>
                                <div className='col-lg-8'>
                                    <select className='form-select'  name="active" id="3" onChange={obj => pickActive(obj.target.value)} value={active}>
                                        <option></option>
                                        <option>YES</option>
                                        <option>NO</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button onClick={save} className='btn btn-primary text-center m-2 p-2'>SUBMIT</button>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-7'>
                    <div className='card shadow'>
                        <div className='card-header'>
                            <h3 className='text-center'>Brand Details</h3>
                        </div>

                        <table className='table table-bordered hover'>
                            <thead className='bg-dark text-white thead-dark'>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Details</th>
                                    <th>Active</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                         <tbody>
                            {
                                branddetails.slice(offset, offset + PER_PAGE).filter((temp)=>{if(keyword === ""){
                                    return temp;
                                } else if (temp.brandname.toLowerCase().includes(keyword.toLowerCase())||temp.brandid.toString().includes(keyword.toString())){
                                    return temp;
                            }}).map((binfo,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{binfo.brandid}</td>
                                            <td>{binfo.brandname}</td>
                                            <td>{binfo.details}</td>
                                            <td>{binfo.active}</td>
                                            <td>
                                                <button className='btn btn-primary text-dark m-1 p-1'  onClick={Delete.bind(this,binfo.brandid)}><i className='fa fa-trash'></i></button>
                                            <Link className='btn btn-warning text-center m-1 p-1' to={`/bedit/${binfo.brandid}`}><i className='fa fa-edit'></i>
                                            
                                            </Link>
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


<ToastContainer 
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        </div>
        </>

    )
};
export default Brand;