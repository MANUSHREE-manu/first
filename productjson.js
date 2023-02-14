import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import Brand from './brand';
import Category from './category';
import Nav from "./nav";

const Projson=()=>{
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
    const getproduct = () => {
        const url = "http://localhost:1234/product";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //alert(data.length)
                updatepdetail(data)
                //updateproid(data.productid);
            })
    }
    return(
        <Nav/>

    )
};
export default Projson;
