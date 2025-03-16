import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { Dropdown, Modal} from 'react-bootstrap';
import Swal from "sweetalert2";
import {nanoid} from 'nanoid';
import { IMAGES } from '../Dashboard/Content';

const CardListBlog = [
	{ 
		id:1, image: IMAGES.contact1,  Post:"trainer", 
		Cust_Name: "Munaroh Steffani", Subject:"Mathematics"
	},
	{ 
		id:2, image: IMAGES.contact2,  Post:"trainer", 
		Cust_Name: "Geovanny Anderson", 	Subject:"Science " 
	},
	{ 
		id:3, image: IMAGES.contact3, Post:"trainer", 
		Cust_Name: "Louis Ali", Subject:"English" 
	},
	{ 
		id:4, image: IMAGES.contact4, Post:"trainer", 
		Cust_Name: "Marquezz", Subject:"History" 
	},
	{ 
		id:5, image: IMAGES.contact5, Post:"trainer", 
		Cust_Name: "Richard ", Subject:"Biology" 
	},
	{ 
		id:6, image: IMAGES.contact6, Post:"trainer", 
		Cust_Name: "Andrew Stevano",  Subject:"Music"
	},
	{ 
		id:7, image: IMAGES.contact7, Post:"trainer", 
		Cust_Name: "Cathenna ",  Subject:"Literature"
	},
	{ 
		id:8, image: IMAGES.contact8, Post:"trainer", 
		Cust_Name: "Hrisovalantis ",  	Subject:"Psychology"
	},
    { 
		id:9, image: IMAGES.contact9, Post:"trainer", 
		Cust_Name: "Louis Ali", Subject:"English" 
	},
	{ 
		id:10, image: IMAGES.contact10, Post:"trainer", 
		Cust_Name: "Marquezz", Subject:"History" 
	},
	{ 
		id:11, image: IMAGES.contact11, Post:"trainer", 
		Cust_Name: "Richard ", Subject:"Biology" 
	},
	{ 
		id:12, image: IMAGES.contact12, Post:"trainer", 
		Cust_Name: "Andrew Stevano",  Subject:"Music"
	}, 
];

const trainers = () => {
    const [postModal, setPostModal] = useState(false);
    const [contacts, setContacts] = useState(CardListBlog);
    // delete data  
    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];    
        const index = contacts.findIndex((contact)=> contact.id === contactId);
        newContacts.splice(index, 1);
        setContacts(newContacts);
    }
    
    //Add data 
    const [addFormData, setAddFormData ] = useState({       
        Post:'',
        Cust_Name:'',
        Subject:'',
		image:'',
    }); 
    
    // Add contact function
    const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
    
     //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        var error = false;
		var errorMsg = '';
        if(addFormData.Post === ""){
            error = true;
			errorMsg = 'Please fill post';
        }else if(addFormData.Cust_Name === ""){
            error = true;
			errorMsg = 'Please fill name.';
        }
        else if(addFormData.Subject === ""){
            error = true;
			errorMsg = 'Please fill Subject';
        }
        if(!error){
            const newContact = {
                id: nanoid(),                
                Post:  addFormData.Post,
                Cust_Name:  addFormData.Cust_Name ,
                Subject:  addFormData.Subject,
				image: addFormData.image,
            };
            const newContacts = [...contacts, newContact];
            setContacts(newContacts);
            setPostModal(false);            
            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: "Successfully Added",                        
            })
            addFormData.Cust_Name = addFormData.Subject = addFormData.Post = '';                     
        }else{			
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorMsg, 
            })
		}
    }; 
    
    
    const [editModal, setEditModal] = useState(false);
    
    // Edit function editable page loop
    const [editContactId, setEditContactId] = useState(null);
   
    // Edit function button click to edit
    const handleEditClick = ( event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);
        const formValues = {           
            Post: contact.Post,
            Cust_Name: contact.Cust_Name,
            Subject: contact.Subject,
			image: contact.image,
        }
        setEditFormData(formValues);
        setEditModal(true);
    };
    
    
    // edit  data  
    const [editFormData, setEditFormData] = useState({       
        Post:'',
        Cust_Name:'',
        Subject:'',
		image:'',
    })
    
    //update data function
    const handleEditFormChange = (event) => {
        event.preventDefault();   
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };
    
    // edit form data submit
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContact = {
            id: editContactId,
            Post: editFormData.Post,
            Cust_Name: editFormData.Cust_Name,
            Subject: editFormData.Subject,
			image: editFormData.image,
        }
        const newContacts = [...contacts];
        const index = contacts.findIndex((contact)=> contact.id === editContactId);
        newContacts[index] = editedContact;
        setContacts(newContacts);
        setEditContactId(null);
        setEditModal(false);    
    }
    
	//For Image upload in ListBlog
	const [file, setFile] = React.useState(null)
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
		setTimeout(function(){
			var src = document.getElementById("saveImageFile").getAttribute("src");
			addFormData.image = src; 
		}, 200);
    }
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="page-title flex-wrap">
                    <div className="input-group search-area mb-md-0 mb-3">
                        <input type="text" className="form-control" placeholder="Search here..." />
                        <span className="input-group-text"><Link to={"#"}>
                            <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z" fill="#01A3FF"/>
                            </svg>
                        </Link>
                        </span>
                    </div>
                    <div className='d-flex'>
                        <Dropdown className='drop-select me-3'>
                            <Dropdown.Toggle as="div" className='drop-select-btn '>
                                Newest 
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Newest</Dropdown.Item>
                                <Dropdown.Item>Oldest</Dropdown.Item>
                                <Dropdown.Item>Recent</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button type="button" className="btn btn-primary" 
                            onClick={()=> setPostModal(true)}
                        >
                            + New trainer
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-xl-12">
                <div className="row">
                    {contacts.map((contact, index)=>(
                        <div className="col-xl-3 col-lg-4 col-sm-6" key={index}>
                            <div className="card contact_list text-center">
                                <div className="card-body">
                                    <div className="user-content">
                                        <div className="user-info">
                                            <div className="user-img">
                                                <img src={contact.image} alt="" className="avatar avatar-xl" />
                                            </div>
                                            <div className="user-details">
                                                <h4 className="user-name mb-0">{contact.Cust_Name}</h4>
                                                <p>{contact.Post}</p>
                                            </div>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle as="div" className="btn sharp btn-light i-false" >
                                                <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0012 0.359985C11.6543 0.359985 11.3109 0.428302 10.9904 0.561035C10.67 0.693767 10.3788 0.888317 10.1335 1.13358C9.88829 1.37883 9.69374 1.67 9.56101 1.99044C9.42828 2.31089 9.35996 2.65434 9.35996 3.00119C9.35996 3.34803 9.42828 3.69148 9.56101 4.01193C9.69374 4.33237 9.88829 4.62354 10.1335 4.8688C10.3788 5.11405 10.67 5.3086 10.9904 5.44134C11.3109 5.57407 11.6543 5.64239 12.0012 5.64239C12.7017 5.64223 13.3734 5.36381 13.8686 4.86837C14.3638 4.37294 14.6419 3.70108 14.6418 3.00059C14.6416 2.3001 14.3632 1.62836 13.8677 1.13315C13.3723 0.637942 12.7004 0.359826 12 0.359985H12.0012ZM3.60116 0.359985C3.25431 0.359985 2.91086 0.428302 2.59042 0.561035C2.26997 0.693767 1.97881 0.888317 1.73355 1.13358C1.48829 1.37883 1.29374 1.67 1.16101 1.99044C1.02828 2.31089 0.959961 2.65434 0.959961 3.00119C0.959961 3.34803 1.02828 3.69148 1.16101 4.01193C1.29374 4.33237 1.48829 4.62354 1.73355 4.8688C1.97881 5.11405 2.26997 5.3086 2.59042 5.44134C2.91086 5.57407 3.25431 5.64239 3.60116 5.64239C4.30165 5.64223 4.97339 5.36381 5.4686 4.86837C5.9638 4.37294 6.24192 3.70108 6.24176 3.00059C6.2416 2.3001 5.96318 1.62836 5.46775 1.13315C4.97231 0.637942 4.30045 0.359826 3.59996 0.359985H3.60116ZM20.4012 0.359985C20.0543 0.359985 19.7109 0.428302 19.3904 0.561035C19.07 0.693767 18.7788 0.888317 18.5336 1.13358C18.2883 1.37883 18.0937 1.67 17.961 1.99044C17.8283 2.31089 17.76 2.65434 17.76 3.00119C17.76 3.34803 17.8283 3.69148 17.961 4.01193C18.0937 4.33237 18.2883 4.62354 18.5336 4.8688C18.7788 5.11405 19.07 5.3086 19.3904 5.44134C19.7109 5.57407 20.0543 5.64239 20.4012 5.64239C21.1017 5.64223 21.7734 5.36381 22.2686 4.86837C22.7638 4.37294 23.0419 3.70108 23.0418 3.00059C23.0416 2.3001 22.7632 1.62836 22.2677 1.13315C21.7723 0.637942 21.1005 0.359826 20.4 0.359985H20.4012Z" fill="#A098AE"/>
                                                </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" align={'end'}>
                                                <Dropdown.Item onClick={(event) => handleEditClick(event, contact)}>Edit</Dropdown.Item>
                                                <Dropdown.Item className='text-danger'
                                                    onClick={()=>handleDeleteClick(contact.id)}
                                                >Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="contact-icon">
                                        <span className="badge badge-success light">{contact.Subject}</span>
                                        <span className="badge badge-secondary light mx-2">Science</span> 
                                        <span className="badge badge-danger light">Art</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Link to={"/app-profile"} className="btn  btn-primary btn-sm w-50 me-2"><i className="fa-solid fa-user me-2"></i>Profile</Link>
                                        <Link to={"/chat"} className="btn  btn-secondary btn-sm w-50"><i className="fa-sharp fa-regular fa-envelope me-2"></i>Chat</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="table-pagenation teach">
                    <small>Showing <span>1-12</span> from <span> 24</span> data</small>
                    <nav>
                        <ul className="pagination pagination-gutter pagination-primary no-bg">
                            <li className="page-item page-indicator">
                                <Link to={"#"} className="page-link">
                                    <i className="fa-solid fa-chevron-left"></i>
                                </Link>
                            </li>
                            <li className="page-item active"><Link to={"#"} className="page-link">1</Link></li>
                            <li className="page-item "><Link to={"#"} className="page-link">2</Link></li>
                            <li className="page-item page-indicator">
                                <Link to={"#"} className="page-link"><i className="fa-solid fa-chevron-right"></i></Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <Modal className="modal fade"  show={postModal} onHide={setPostModal} centered>
                <form>
                    <div className="modal-header">
                        <h4 className="modal-title fs-20">Add Task</h4>
                        <button type="button" className="btn-close" onClick={()=> setPostModal(false)} data-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">                        
                        <div className="add-contact-box">
                            <div className="add-contact-content">
                                <div className="image-placeholder">	
                                    <div className="avatar-edit">
                                        <input type="file" onChange={fileHandler} id="imageUpload" /> 					
                                        <label htmlFor="imageUpload" name='' ></label>
                                    </div>
                                    <div className="avatar-preview">
                                        <div id="imagePreview">
                                            <img id="saveImageFile" src={file? URL.createObjectURL(file) : IMAGES.noimage} 
                                                alt={file? file.name : null}
                                            />
                                        </div>
                                    </div>
                                </div> 
                                <div className="form-group mb-3">
                                    <label className="text-black font-w500">Name</label>
                                    <div className="contact-occupation">
                                        <input type="text"   autocomplete="off"
                                            onChange={handleAddFormChange}
                                            name="Cust_Name" required="required"
                                            className="form-control" placeholder="name" 
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="text-black font-w500">Post</label>
                                    <div className="contact-name">
                                        <input type="text"  className="form-control"  autocomplete="off"
                                            name="Post" required="required"
                                            onChange={handleAddFormChange}
                                            placeholder="post"
                                        />
                                        <span className="validation-text"></span>
                                    </div>
                                </div> 
                                <div className="form-group mb-3">
                                    <label className="text-black font-w500">Subject</label>
                                    <div className="contact-occupation">
                                        <input type="text"  autocomplete="off"
                                            name="Subject" required="required"
                                            onChange={handleAddFormChange}
                                            className="form-control" placeholder="subject" 
                                        />
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>Add</button>  
                        <button type="button" onClick={()=> setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
                    </div>
                </form>
            </Modal>
            <Modal className="modal fade"  show={editModal} onHide={setEditModal} centered>              
                <form >
                    <div className="modal-header">
                        <h4 className="modal-title fs-20">Edit Task</h4>
                        <button type="button" className="btn-close" onClick={()=> setEditModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="add-contact-box">
                            <div className="add-contact-content">                               
                                <div className="form-group mb-3">
                                    <label className="text-black font-w500">Post</label>
                                    <div className="contact-name">
                                        <input type="text"  className="form-control"  autocomplete="off"
                                            name="Post" required="required"
                                            value={editFormData.Post}
                                            onChange={handleEditFormChange}
                                        />
                                        <span className="validation-text"></span>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="text-black font-w500">Name</label>
                                    <div className="contact-occupation">
                                        <input type="text"   autocomplete="off"
                                            value={editFormData.Cust_Name}
                                            onChange={handleEditFormChange}
                                            name="Cust_Name" required="required"
                                            className="form-control" placeholder="name" 
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="text-black font-w500">Subject</label>
                                    <div className="contact-occupation">
                                        <input type="text"  autocomplete="off"
                                            name="Subject" required="required"
                                            value={editFormData.Subject}
                                            onChange={handleEditFormChange}
                                            className="form-control" placeholder="Subject" 
                                        />
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={handleEditFormSubmit}>Save</button>  
                        <button type="button" onClick={()=> setEditModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
                    </div>
                </form>  
            </Modal>
        </div>
    );
};

export default trainers;