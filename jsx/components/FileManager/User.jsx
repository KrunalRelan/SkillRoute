import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Modal } from 'react-bootstrap';

import profile from './../../../assets/images/profile.svg';
import location from './../../../assets/images/svg/location.svg';
import phone from './../../../assets/images/svg/phone.svg';
import email from './../../../assets/images/svg/email.svg';

//images

import BasicModal from '../Dashboard/BasicModal';
import { IMAGES, SVGICON } from '../Dashboard/Content';

const basicDetail = [
    { title: 'Parents', subtitle: 'Justin Hope', image: profile },
    { title: 'Address', subtitle: 'Jakarta, Indonesia', image: location },
    { title: 'Phone', subtitle: '+12 345 6789 0', image: phone },
    { title: 'Email', subtitle: 'Historia@mail.com', image: email },
];

const contactList = [
    { id: '1', image: IMAGES.profilepic1, title: 'Samanta William', subtitle: 'Class VIII-A', },
    { id: '2', image: IMAGES.profilepic2, title: 'Tony Soap', subtitle: 'Class XII-B', },
    { id: '3', image: IMAGES.profilepic3, title: 'Karen Hope', subtitle: 'Class IX-A', },
    { id: '4', image: IMAGES.profilepic4, title: 'Jordan Nico', subtitle: 'Class VII-A', },
    { id: '5', image: IMAGES.profilepic5, title: 'Nadila Adja', subtitle: 'Class VI-C', },
];

const User = () => {
    const childRef = useRef();
    const [addList, setAddList] = useState(contactList);
    const [load, setload] = useState(false);

    const AddMoreData = () => {
        setload(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * addList.length);
            const randomItem = addList[randomIndex];
            setAddList(prevArray => [...prevArray, randomItem]);
            setload(false);
        }, 1000);
    };
    const [message, setMessage] = useState(false);
    return (
        <>
            <div className="row">
                <div className="col-xl-9">
                    <div className="card h-auto">
                        <div className="card-header p-0">
                            <div className="user-bg w-100">
                                <div className="user-svg">
                                    <svg width="261" height="109" viewBox="0 0 261 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect y="0.6521" width="261" height="275.13" rx="130.5" fill="#FCC43E" />
                                    </svg>
                                </div>
                                <div className="user-svg-1">
                                    <svg width="261" height="63" viewBox="0 0 261 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="261" height="275.13" rx="130.5" fill="#FB7D5B" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="user">
                                    <div className="user-media">
                                        <img src={IMAGES.avat10} alt="" className="avatar avatar-xxl" />
                                    </div>
                                    <div>
                                        <h2 className="mb-0">Nabila Azalea</h2>
                                        <p className="text-primary">Admin</p>
                                    </div>
                                </div>
                                <Dropdown className="custom-dropdown">
                                    <Dropdown.Toggle as="div" className="i-false btn sharp tp-btn ">
                                        {SVGICON.dots}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-end" align="end">
                                        <Dropdown.Item>Option 1</Dropdown.Item>
                                        <Dropdown.Item>Option 2</Dropdown.Item>
                                        <Dropdown.Item>Option 3</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="row mt-2">
                                {basicDetail.map((item, ind) => (
                                    <div className="col-xl-3 col-xxl-6 col-sm-6" key={ind}>
                                        <ul className="student-details">
                                            <li className="me-2">
                                                <Link to={"#"} className="icon-box bg-secondary">
                                                    <img src={item.image} alt="" />
                                                </Link>
                                            </li>
                                            <li>
                                                <span>{item.title}:</span>
                                                <h5 className="mb-0">{item.subtitle}</h5>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header border-0 pb-0 d-block">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <h3 className="heading">Contacts</h3>
                                            <span>You have <span className="font-w600">50</span> contacts</span>
                                        </div>
                                        <button type="button" className="icon-box icon-box-sm bg-primary border-0" onClick={() => childRef.current.openModal()}>
                                            {SVGICON.plus}
                                        </button>
                                    </div>
                                    <div className="input-group user-search-area flex-nowrap">
                                        <span className="input-group-text" id="addon-wrapping-1">
                                            {SVGICON.search}
                                        </span>
                                        <input type="text" className="form-control ps-0" placeholder="Contacts" aria-label="Username" />
                                    </div>
                                </div>
                                <div className="card-body height450 dlab-scroll pt-0 pb-0">
                                    <div className="contacts-list" id="RecentActivityContent">
                                        {contactList.map((data, ind) => (
                                            <div className="d-flex justify-content-between mb-3 mt-3 pb-3 user border-bottom" key={ind}>
                                                <div className="d-flex align-items-center">
                                                    <img src={data.image} alt="" className="avatar" />
                                                    <div className="ms-3">
                                                        <h5 className="mb-1"><Link to={"/app-profile"}>{data.title}</Link></h5>
                                                        <span className="fs-14 text-muted">{data.subtitle}</span>
                                                    </div>
                                                </div>
                                                <div className="icon-box st-box ms-auto">
                                                    <Link to={"#"}>
                                                        {SVGICON.message}
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-footer border-0 pt-0">
                                    <div className="text-center border-0 pt-3">
                                        <Link to={"#"}
                                            className="btn btn-block btn-primary light btn-rounded dz-load-more" id="RecentActivity"
                                        >
                                            View More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12">
                            <div className="card">
                                <div className="card-header d-block border-0 pb-0 ">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h3 className="heading">Messages</h3>
                                            <span>You have <span className="font-w600">10 New</span> Messages</span>
                                        </div>
                                        <button type="button" className="icon-box icon-box-sm bg-primary border-0"
                                            onClick={() => setMessage(true)}
                                        >
                                            {SVGICON.plus}
                                        </button>
                                    </div>
                                    <div className="input-group user-search-area flex-nowrap">
                                        <span className="input-group-text" id="addon-wrapping">
                                            {SVGICON.search}
                                        </span>
                                        <input type="text" className="form-control ps-0" placeholder="Search here..." />
                                    </div>
                                </div>
                                <div className="card-body height450 dlab-scroll py-0">
                                    <div className="contacts-list" id="RecentMessagesContent">
                                        {addList.map((data, ind) => (
                                            <div className="d-flex justify-content-between mb-3 mt-3 border-bottom pb-3" key={ind}>
                                                <div className="d-flex align-items-center">
                                                    <img src={data.image} alt="" className="avatar" />
                                                    <div className="ms-3">
                                                        <h5 className="mb-1"><Link to={"/email-inbox"}>{data.title}</Link></h5>
                                                        <span className="fs-14 text-muted text-wrap">Lorem ipsum dolor sit amet...</span>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <span className="d-block mb-1">12:45 PM</span>
                                                    <span className="badge badge-secondary rounded-circle">2</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-footer border-0 pt-0">
                                    <div className="text-center border-0 pt-3">
                                        <Link to={"#"} onClick={AddMoreData}
                                            className="btn btn-block btn-primary light btn-rounded dz-load-more"
                                        >
                                            View More {load && <i className="fa fa-refresh"></i>}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="card bg-primary plan-bx h-auto">
                        <div className="card-body">
                            <ul className="d-flex align-items-baseline justify-content-between mb-3">
                                <li className="plan-svg">
                                    <svg width="85" height="228" viewBox="0 0 85 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="100" height="294" rx="50" fill="#FCC43E" />
                                    </svg>
                                </li>
                                <li className="plan-svg-1">
                                    <svg width="100" height="180" viewBox="0 0 100 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="100" height="294" rx="50" fill="#FB7D5B" />
                                    </svg>

                                </li>
                                <li className="text-white">Your Plan<h3 className="text-white">Free</h3></li>
                                <li>
                                    <Dropdown className="custom-dropdown">
                                        <Dropdown.Toggle as="div" className="i-false btn sharp tp-btn ">
                                            {SVGICON.dots}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu-end" align="end">
                                            <Dropdown.Item>Option 1</Dropdown.Item>
                                            <Dropdown.Item>Option 2</Dropdown.Item>
                                            <Dropdown.Item>Option 3</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </ul>
                            <ul className="food-recipe text-white">
                                <li>
                                    <span className="text-white">50 GB Storage</span>
                                </li>
                                <li>
                                    <span className="text-white">Limited Features</span>
                                </li>
                            </ul>
                            <p className="text-white w-75">Upgrade to Premium Plan to get more Features </p>

                            <button className="btn btn-light btn-sm">Upgrade Plan</button>
                        </div>
                    </div>
                    <div className="card h-auto">
                        <div className="card-header border-0 pb-0">
                            <h3 className="heading mb-0">Lastest Activity</h3>
                        </div>
                        <div className="card-body pt-0">
                            <div className="dz-scroll">
                                <ul className="timeline-active">
                                    <li className="d-flex timeline-list">
                                        <div className="dz-media">
                                            <img src={IMAGES.profile14} alt="" className="avatar avatar-sm" />
                                        </div>
                                        <div className="panel">
                                            <a className="timeline-panel text-muted d-flex align-items-center mb-0" href="#">
                                                <span><strong className="">Karen Hope</strong> moved task <strong className="text-secondary font-w500">“User Research“</strong>from On Progress to Done </span>

                                            </a>
                                            <span className="time py-0">Monday, June 31 2020</span>
                                        </div>
                                    </li>
                                    <li className="d-flex timeline-list">
                                        <div className="dz-media">
                                            <img src={IMAGES.profile18} alt="" className="avatar avatar-sm" />
                                        </div>
                                        <div className="panel">
                                            <a className="timeline-panel text-muted d-flex align-items-center mb-0" href="#">
                                                <span><strong>Samantha William </strong>add new<strong className="text-primary"> 4 </strong>attached files on task<strong className="text-warning fonr-w500">“Photo’s Assets“</strong></span>

                                            </a>
                                            <span className="time py-0">Monday, June 31 2020</span>

                                        </div>
                                    </li>
                                    <li className="d-flex timeline-list">
                                        <div className="dz-media">
                                            <img src={IMAGES.profile19} alt="" className="avatar avatar-sm" />
                                        </div>
                                        <div className="panel">
                                            <a className="timeline-panel text-muted d-flex align-items-center mb-0" href="#">
                                                <span className="mb-0" ><strong>Samantha William </strong> add 4 files on  Frize <strong className="text-danger font-w500">Projects </strong></span>
                                            </a>
                                            <span className="time py-0">Monday, June 31 2020</span>
                                        </div>

                                    </li>
                                    <li className="d-flex pb-0">
                                        <div className="dz-media">
                                            <img src={IMAGES.profile18} alt="" className="avatar avatar-sm" />
                                        </div>
                                        <div className="panel">
                                            <a className="timeline-panel text-muted d-flex align-items-center mb-0" href="#">
                                                <span className="mb-0" ><strong>Samantha William </strong> Created new <strong className="text-danger font-w500">Task</strong></span>
                                            </a>
                                            <span className="time py-0">Monday, June 31 2020</span>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BasicModal ref={childRef} />
            <Modal id="exampleModal-1" show={message} onHide={setMessage} centered>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel-1">New Message</h1>
                    <button type="button" className="btn-close" onClick={() => setMessage(false)}></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput7" className="form-label">Fisrt Name</label>
                                <input type="text" className="form-control" id="exampleFormControlInput7" placeholder="Samanta" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput8" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="exampleFormControlInput8" placeholder="William" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" onClick={() => setMessage(false)}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </Modal>

        </>

    )
}
export default User;