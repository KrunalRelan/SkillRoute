import React,{useRef} from 'react';

//comp
import BasicModal from '../Dashboard/BasicModal';
import FileManagerCalendar from './Calendar/FileManagerCalendar';
import { IMAGES, SVGICON } from '../Dashboard/Content';

const listingBlog = [
    {title:'History', subtitle:'Class VI-B', image:IMAGES.avat1, color:'schedule-card'},
    {title:'History', subtitle:'Class XII-A', image:IMAGES.avat2, color:'schedule-card-1'},
    {title:'Culture', subtitle:'Class XI-A', image:IMAGES.avat3, color:'schedule-card-2'},
    {title:'Tense', subtitle:'Class VII-B', image:IMAGES.avat4, color:'schedule-card-3'}
];

const HomeCalendar = () =>{
    const childRef = useRef();
    return(
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="row">                        
                        <div className="col-xl-12">
                            <div className="page-titles">
                                <div className="d-flex align-items-center">
                                    <h2 className="heading">Calendar</h2>   
                                </div>
                                <div>
                                    <button className="btn btn-primary light me-2">Today<span>(14)</span></button>
                                    <button className="btn btn-primary ms-1" onClick={() => childRef.current.openModal()}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z" fill="#FCFCFC"/>
                                            <path d="M16.3498 11.0251H12.9748V7.65009C12.9748 7.12509 12.5248 6.67509 11.9998 6.67509C11.4748 6.67509 11.0248 7.12509 11.0248 7.65009V11.0251H7.6498C7.1248 11.0251 6.6748 11.4751 6.6748 12.0001C6.6748 12.5251 7.1248 12.9751 7.6498 12.9751H11.0248V16.3501C11.0248 16.8751 11.4748 17.3251 11.9998 17.3251C12.5248 17.3251 12.9748 16.8751 12.9748 16.3501V12.9751H16.3498C16.8748 12.9751 17.3248 12.5251 17.3248 12.0001C17.3248 11.4751 16.8748 11.0251 16.3498 11.0251Z" fill="#FCFCFC"/>
                                        </svg> New Schedule 
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="col-xl-9">
                            <div className="card">
                                <div className="card-body">
                                    <div id="calendar" className="app-fullcalendar"><FileManagerCalendar /></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="heading">Schedule Details</h3>
                                            <p className="mb-0">Thursday, 25th July , 2023</p>
                                        </div>
                                    </div>
                                </div>
                                {listingBlog.map((data, ind)=>(
                                    <div className="col-xl-12 col-sm-6" key={ind}>
                                        <div className={`card ${data.color}`}>
                                            <div className="card-body">
                                                <h4 className="mb-0">{data.title}</h4>
                                                <p>{data.subtitle}</p>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <ul>
                                                            <li className="mb-2">
                                                                {SVGICON.calndar}
                                                                July 20, 2023
                                                            </li>
                                                            <li>
                                                                {SVGICON.watch}
                                                                09.00 - 10.00 AM
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <img src={data.image} className="avatar avatar-lg" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>	                           
                                    </div>    
                                
                                ))}
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
            <BasicModal ref={childRef} />
        </>
    )
}

export default HomeCalendar;