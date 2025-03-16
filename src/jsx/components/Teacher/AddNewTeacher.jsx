import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import  DatePicker  from "react-datepicker";
import { IMAGES } from '../Dashboard/Content';

const AddNewtrainer = () => {
    const [file, setFile] = useState(null)
    const fileHandler = (e) => {       
        setFile(e.target.files[0]);		
    }
    const RemoveFile = () =>{
        setFile(null)
    }

    const [startDate, setStartDate] = useState(new Date());	
    const [startDate2, setStartDate2] = useState(new Date());	
    const [startDate3, setStartDate3] = useState(new Date());	
	const onChange = (date) => {		
		setStartDate(date);		
	};
	const onChange2 = (date) => {		
		setStartDate2(date);		
	};
	const onChange3 = (date) => {		
		setStartDate3(date);		
	};
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Personal Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-6 col-sm-6">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label text-primary">First Name<span className="required">*</span></label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="James" />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput3" className="form-label text-primary">Email<span className="required">*</span></label>
                                        <input type="email" className="form-control" id="exampleFormControlInput3" placeholder="hello@example.com" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label text-primary">Address<span className="required">*</span></label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput10" className="form-label">Date of Birth<span className="required">*</span></label>  
                                        <div style={{display:'grid'}}>
                                            <DatePicker 
                                                className="form-control"
                                                selected={startDate}
                                                onChange={onChange}	
                                            />
                                        </div>                                      
                                    </div>                                      
                                </div>
                                <div className="col-xl-6 col-sm-6">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput4" className="form-label text-primary">Last Name<span className="required">*</span></label>
                                        <input type="text" className="form-control" id="exampleFormControlInput4" placeholder="Lee" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput6" className="form-label text-primary">Phone Number<span className="required">*</span></label>
                                        <input type="number" className="form-control" id="exampleFormControlInput6" placeholder="+123456789" />
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label text-primary">Photo<span className="required">*</span></label>
                                        <div className="avatar-upload">
                                            <div className="avatar-preview">
                                                <div id="imagePreview"                                                     
                                                    style={{backgroundImage: file ? "url(" + URL.createObjectURL(file) + ")" : "url(" + IMAGES.noimage +")" }}
                                                > </div>
                                            </div>
                                            <div className="change-btn mt-1">
                                                <input type='file' className="form-control d-none"  onChange={fileHandler} id="imageUpload"  accept=".png, .jpg, .jpeg" />
                                                <label htmlFor="imageUpload" className="dlab-upload mb-0 btn btn-primary btn-sm"  >Choose File</label>
                                                <Link to={"#"} className="btn btn-danger light remove-img ms-2 btn-sm" onClick={RemoveFile}>Remove</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput8" className="form-label text-primary">Place of Birth<span className="required">*</span></label>
                                        <input type="text" className="form-control" id="exampleFormControlInput8" placeholder="USA" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Education</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-6 col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput9" className="form-label text-primary">University <span className="required">*</span></label>
                                    <input type="text" className="form-control" id="exampleFormControlInput9" placeholder="University of Oxford" />
                                </div>
                                <div className="mb-3">
                                    <div className="mb-3">                                        
                                        <label className="form-label text-primary">Start & End Date<span className="required">*</span></label>
                                        <div className="d-flex">                                            
                                            <div>
                                                <DatePicker 
                                                    className="form-control"
                                                    selected={startDate2}
                                                    onChange={onChange2}	
                                                />
                                            </div>                                             
                                            
                                            
                                                <DatePicker 
                                                    className="form-control ms-3"
                                                    selected={startDate3}
                                                    onChange={onChange3}	
                                                />
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput14" className="form-label text-primary">Degree<span className="required">*</span></label>
                                    <input type="text" className="form-control" id="exampleFormControlInput14" placeholder="B.Tech" />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput13" className="form-label text-primary">City<span className="required">*</span></label>
                                    <input type="number" className="form-control" id="exampleFormControlInput13" placeholder="USA" />
                                </div>
                            </div>
                        </div>
                        <div className="float-end">
                            <button className="btn btn-outline-primary me-3">Save as Draft</button>
                            <button className="btn btn-primary" type="button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default AddNewtrainer;