import React,{useState,useEffect} from 'react';
import {Link,useParams,useNavigate} from 'react-router-dom';

import Nav from './nav';


const Pedit=()=>{
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
  

    const{productid}=useParams();
const navigate=useNavigate();
   

         //brand
    const getbran = () => {

        fetch("https://www.medicalplanet.in/webapi/Brand/getall")
            .then(response => response.json())
            .then(data => {
                setbrand(data);

            })
    }
    //category

    const getCat = () => {
        fetch("https://www.medicalplanet.in/webapi/Category/getall")
            .then(response => response.json())
            .then(data => {
                setcategory(data);

            })
    }
      const update=()=>{
        let input = {
            productname: productname,
            categoryid: categoryid,
            brandid: brandid,
            price: price,
          quantity: quantity,
          photo: photo,
            details: detail,
            vendorid: venderid,
            offer: offer,
            active: active,
            id: productid
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Product/update', requestOptions)
            .then(response => response.text())
            .then(data => {
                updatepdetail(data);
            });
    navigate("/product")
      }
const Edit = () => {
        let input = { "id": productid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Product/edit', requestOptions)
            .then(response => response.json())
            .then(data => {
                pickproductName(data.productname);
                pickcatid(data.categoryid);
                pickbid(data.brandid);
                pickPrice(data.price);
                pickQua(data.quantity);
                pickPhoto(data.photo);
                pickDetail(data.details);
                pickVender(data.vendorid);
                pickOffer(data.offer);
                pickActive(data.active);
                console.log(data);
                
                
            });

    }
useEffect(()=>{
getCat();
getbran();
Edit();
    },[1]);

    return(
<>
<Nav/>
<div className='container mt-2 text-center offset-4'>
    <div className='row text-center'>
  <div className='col-lg-5 text-center'>
  <div className="card m-1  offset-8 shadow">

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
            <select className="form-select" onChange={obj=>pickcatid(obj.target.value)} value={categoryid}>
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
        <button onClick={update} className='btn btn-primary text-center mt-1  p-2'>UPDATE</button>
    </div>
</div>
</div>
  </div>
    </div>

    </div> 
</>
 )   
}
export default Pedit;