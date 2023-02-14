import React,{useState,useEffect} from 'react';
import { useParams,useNavigate} from 'react-router-dom';

const Edit=()=>{
    const [brandn,pickBname] = useState("");
    const [details,pickDetails] = useState("");
    const [active, pickActive] = useState("");
    const[branddetails,updateDetails]=useState([]);
 
    const[id,pickid]=useState("");

    const{brandid}=useParams();
    const navigate=useNavigate();

    const bedit=()=>{
        let input={ "id":brandid};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Brand/edit', requestOptions)
        .then(response => response.json())
        .then(data =>{
            pickBname(data.brandname);
            pickDetails(data.details);
            pickActive(data.active);
            //alert(data);
           // console.log(data);
        });
    }
    const update=()=>{
        let input={
			brandname:brandn,
			details:details,
			active:active,
            id:brandid
			
		};
		const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input)
		};
		fetch('https://www.medicalplanet.in/webapi/Brand/update', requestOptions)
		.then(response => response.text())
		.then(data => {
			updateDetails(data);
		});
        navigate('/')
    }
    useEffect(() => {
        bedit();
    }, [1]);
return(
    <div className=' container  mt-3 text-center'>
    <div className='row text-center'>
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
                                        <option>No</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button  onClick={update} className='btn btn-primary text-center m-2 p-2'>Update</button>
                           
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
)
};
export default Edit;
