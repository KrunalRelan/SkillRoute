import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import BasicModal from '../Dashboard/BasicModal';

//images
import pic3 from './../../../assets/images/contacts/pic-333.jpg';
import pic4 from './../../../assets/images/contacts/pic444.jpg';
import pic5 from './../../../assets/images/contacts/pic555.jpg';
import pic6 from './../../../assets/images/contacts/pic666.jpg';
import course1 from './../../../assets/images/coures/1.jpg';
import course2 from './../../../assets/images/coures/2.jpg';
import course3 from './../../../assets/images/coures/3.jpg';
import course4 from './../../../assets/images/coures/4.jpg';
import course5 from './../../../assets/images/coures/5.jpg';
import course6 from './../../../assets/images/coures/6.jpg';
import course7 from './../../../assets/images/coures/7.jpg';
import course8 from './../../../assets/images/coures/8.jpg';
import course9 from './../../../assets/images/coures/9.jpg';
import big from './../../../assets/images/coures/9.png';
import { SVGICON } from '../Dashboard/Content';

const DzImage = ({ image }) => {
    return (
        <div className="dz-media">
            <img src={image} alt="" />
        </div>
    )
}

const chatList = [
    { image1: course2, title1: 'Product Team (32)', time1: '10.12', image2: course5, title2: 'Design Team (32)', time2: '11.20' },
    { image1: course3, title1: 'Tony Soap', time1: '10.20', image2: course6, title2: 'Tony Soap', time2: '11.30' },
    { image1: course4, title1: 'Karen Hope', time1: '10.50', image2: course7, title2: 'Karen Hope', time2: '11.45', change: 'active' }
];

const FileChat = () => {
    const childRef = useRef();
    return (
        <>
            <div className="row gx-0">
                <div className="col-xl-3 col-xxl-4 col-md-5 chat-left-area">
                    <div className="card dlab-scroll chat-sidebar rounded-0 mb-0">
                        <div className="card-body">
                            <div className="message-box d-flex align-items-center justify-content-between border-0">
                                <div className="input-group search-area">
                                    <input type="text" className="form-control" placeholder="Search here..." />
                                    <span className="input-group-text">
                                        <Link to={"#"}>
                                            {SVGICON.search}
                                        </Link>
                                    </span>
                                </div>
                                <button className="add btn btn-primary " onClick={() => childRef.current.openModal()}>
                                    {SVGICON.plus}
                                </button>
                            </div>
                            <div className="chat-people">
                                <div className="d-flex justify-content-between">
                                    <h4 className="m-0 fs-18 font-w600">Contacts</h4>
                                    <Link to={"#"}>View All</Link>
                                </div>
                                <ul className="d-flex align-items-center justify-content-between mt-2 contact-list">
                                    <li><img src={pic3} alt="" /></li>
                                    <li><img src={pic4} alt="" /></li>
                                    <li><img src={pic5} alt="" /></li>
                                    <li><img src={pic6} alt="" /></li>
                                    <li><img src={pic3} alt="" /></li>
                                    <li><img src={pic4} alt="" /></li>
                                </ul>
                            </div>

                            {/* <!-- ---chat-tabs-- --> */}
                            <div className="chat-tabs">
                                <h4>Groups</h4>
                                <div className="course-details-tab style-2">
                                    <ul>
                                        {chatList.map((item, ind) => (
                                            <li className={`chat-bx  ${item.change}`} key={ind}>
                                                <div className="chat-img">
                                                    <img src={item.image1} alt="" />
                                                </div>
                                                <div className="mid-info">
                                                    <h4 className="name">{item.title1}</h4>
                                                    <span>Lorem ipsum dolor sit amet.</span>
                                                </div>
                                                <div className="right-info">
                                                    <p>{item.time1} PM</p>

                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                            {/* <!-- ---/chat-tabs-- -->
                            <!-- ---chat-tabs-- --> */}
                            <div className="chat-tabs">
                                <h4>Chats</h4>
                                <div className="course-details-tab style-2">
                                    <ul>
                                        {chatList.map((item, ind) => (
                                            <li className={`chat-bx chats ${item.change}`} key={ind}>
                                                <div className="chat-img">
                                                    <img src={item.image2} alt="" />
                                                </div>
                                                <div className="mid-info">
                                                    <h4 className="name">{item.title2}</h4>
                                                    <span>Lorem ipsum dolor sit amet.</span>
                                                </div>
                                                <div className="right-info">
                                                    <p>{item.time2} PM</p>
                                                </div>
                                            </li>
                                        ))}

                                    </ul>

                                </div>
                            </div>
                            {/* <!-- ---chat-tabs-- --> */}
                            <Link to={"#"} className="btn btn-primary light btn-rounded btn-block"> View More</Link>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-xxl-8 col-md-7 chat-mid-area bg-white">
                    <div className="message-box style-1 d-flex align-items-center ">
                        <img src={course1} alt="" />
                        <div className="ms-2 ms-sm-3  flex-1">
                            <h4>Jordan</h4>
                            <span>
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="8" fill="#4CBC9A"></circle>
                                </svg>
                                {" "}Online
                            </span>
                        </div>
                        <div className="chat-hamburger ms-auto">
                            <div className="chat-toggle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <rect x="0" y="0" width="24" height="24"></rect>
                                        <rect fill="#008ddd" x="4" y="4" width="7" height="7" rx="1.5"></rect>
                                        <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#666666" opacity="0.8"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="videos-player">
                                <Link to={"#"} className="videos-btn">
                                    <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.9997 8H3.99967C2.52691 8 1.33301 9.19391 1.33301 10.6667V21.3333C1.33301 22.8061 2.52691 24 3.99967 24H19.9997C21.4724 24 22.6663 22.8061 22.6663 21.3333V10.6667C22.6663 9.19391 21.4724 8 19.9997 8Z" stroke="#A098AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M30.666 9.33325V22.6666L22.666 15.9999L30.666 9.33325Z" stroke="#A098AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </Link>
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
                    </div>
                    <div className="chart-content">
                        <div className="chat-box-area dlab-scroll" id="chartBox">
                            <div className="media my-4">
                                <DzImage image={course8} />
                                <div className="message-received w-auto">
                                    <h5>Jordan</h5>
                                    <div>
                                        <p className="mb-2">
                                            Hello Nella!
                                        </p>
                                    </div>
                                    <div >
                                        <p className="mb-2">
                                            Can you arrange schedule for next meeting?
                                        </p>
                                        <span className="fs-14">12:45 PM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="media mb-4 justify-content-end align-items-start">
                                <div className="message-sent w-auto me-2">
                                    <h5>Natasha</h5>
                                    <div>
                                        <p className="mb-2">
                                            Hello Karen!
                                        </p>
                                        <span className="fs-12">9.30 AM</span>
                                    </div>
                                    <div>
                                        <p className="mb-2">
                                            Okay, I’ll arrange it soon. i noftify you when it’s done
                                        </p>
                                        <span className="fs-12">9.30 AM</span>
                                    </div>
                                </div>
                                <DzImage image={course9} />
                            </div>
                            <div className="media mb-4 justify-content-end align-items-start">
                                <div className="message-sent me-2">
                                    <h5>Natasha</h5>
                                    <div>
                                        <p className="mb-2">
                                            Okay, I’ll arrange it soon. i noftify you when it’s done
                                            <br />
                                            +91-235 2574 2566
                                            <br />
                                            kk Sharma
                                            <br />
                                            pan card eeer2063i
                                        </p>
                                        <span className="fs-12">9.30 AM</span>
                                    </div>
                                </div>
                                <DzImage image={course9} />
                            </div>
                            <div className="media my-4">
                                <DzImage image={course8} />
                                <div className="message-received w-auto">
                                    <h5>Jordan</h5>
                                    <div>
                                        <p className="mb-2">
                                            Hello Nella!
                                        </p>
                                    </div>
                                    <div >
                                        <p className="mb-2">
                                            Can you arrange schedule for next meeting?
                                        </p>
                                        <DzImage image={big} />
                                        <span className="fs-14">12:45 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="type-massage">
                            <div className="input-group">
                                <textarea className="form-control" placeholder="message..."></textarea>
                                <div className="input-group-append">
                                    <button type="button" className="btn share-btn">
                                        <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.3251 34.2002C13.0909 34.1974 11.8852 33.8294 10.86 33.1424C9.83471 32.4555 9.03576 31.4804 8.56385 30.3401C8.09194 29.1997 7.96819 27.9452 8.20821 26.7346C8.44823 25.5241 9.04126 24.4117 9.91256 23.5377L20.5126 12.9252C20.8614 12.5763 21.2755 12.2996 21.7313 12.1108C22.187 11.9221 22.6755 11.8249 23.1688 11.8249C23.6621 11.8249 24.1506 11.9221 24.6064 12.1108C25.0621 12.2996 25.4762 12.5763 25.8251 12.9252C26.1739 13.274 26.4506 13.6881 26.6394 14.1439C26.8282 14.5996 26.9253 15.0881 26.9253 15.5814C26.9253 16.0747 26.8282 16.5632 26.6394 17.019C26.4506 17.4747 26.1739 17.8888 25.8251 18.2377L15.2126 28.8377C15.1005 28.9685 14.9626 29.0748 14.8075 29.1498C14.6524 29.2248 14.4835 29.267 14.3114 29.2736C14.1392 29.2803 13.9676 29.2513 13.8072 29.1884C13.6468 29.1256 13.5011 29.0303 13.3792 28.9085C13.2574 28.7866 13.1621 28.641 13.0993 28.4806C13.0364 28.3201 13.0074 28.1485 13.0141 27.9763C13.0207 27.8042 13.0629 27.6353 13.1379 27.4802C13.2129 27.3251 13.3192 27.1872 13.4501 27.0752L24.0501 16.4627C24.2548 16.2235 24.3619 15.9159 24.3497 15.6013C24.3375 15.2867 24.2071 14.9883 23.9845 14.7657C23.7619 14.5431 23.4635 14.4127 23.1489 14.4005C22.8343 14.3884 22.5267 14.4954 22.2876 14.7002L11.6751 25.3002C10.9706 26.0046 10.5748 26.9601 10.5748 27.9564C10.5748 28.9527 10.9706 29.9082 11.6751 30.6127C12.3795 31.3171 13.335 31.7129 14.3313 31.7129C15.3276 31.7129 16.2831 31.3171 16.9876 30.6127L27.5876 20.0002C28.726 18.8214 29.356 17.2426 29.3418 15.6039C29.3275 13.9652 28.6702 12.3976 27.5114 11.2388C26.3526 10.08 24.785 9.42268 23.1463 9.40844C21.5076 9.3942 19.9288 10.0242 18.7501 11.1627L12.5626 17.4127C12.3284 17.6455 12.0115 17.7761 11.6813 17.7761C11.3511 17.7761 11.0343 17.6455 10.8001 17.4127C10.6829 17.2964 10.5899 17.1582 10.5264 17.0059C10.463 16.8535 10.4303 16.6902 10.4303 16.5252C10.4303 16.3601 10.463 16.1968 10.5264 16.0444C10.5899 15.8921 10.6829 15.7539 10.8001 15.6377L16.9876 9.38765C18.6286 7.74663 20.8543 6.82471 23.1751 6.82471C25.4958 6.82471 27.7215 7.74663 29.3626 9.38765C31.0036 11.0287 31.9255 13.2544 31.9255 15.5752C31.9255 17.8959 31.0036 20.1216 29.3626 21.7627L18.7501 32.3752C18.1686 32.9552 17.4785 33.4149 16.7192 33.728C15.9599 34.0412 15.1464 34.2016 14.3251 34.2002Z" fill="#01A3FF" />
                                        </svg>
                                    </button>                                    
                                    <button type="button" className="btn btn-primary rounded text-white">
                                        <svg className="me-1" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.466 0.0554752L0.96597 6.80548C0.816794 6.8708 0.692728 6.98259 0.612274 7.12419C0.53182 7.26578 0.499288 7.42958 0.519529 7.59117C0.53977 7.75276 0.6117 7.90348 0.724592 8.02085C0.837484 8.13822 0.98529 8.21596 1.14597 8.24248L9.14097 9.35923L10.2577 17.3542C10.2807 17.5174 10.3567 17.6685 10.4741 17.7841C10.5915 17.8997 10.7437 17.9735 10.9072 17.994C10.9381 17.9978 10.9691 17.9998 11.0002 18C11.149 17.9999 11.2944 17.9556 11.418 17.8727C11.5415 17.7897 11.6376 17.6719 11.694 17.5342L18.444 1.03423C18.4967 0.897557 18.5087 0.748508 18.4784 0.60517C18.4481 0.461832 18.3769 0.330368 18.2733 0.226735C18.1698 0.123102 18.0384 0.0517551 17.8951 0.0213547C17.7517 -0.0090457 17.6027 0.00280736 17.466 0.0554752ZM11.3587 14.3925L10.5502 8.59048C10.5275 8.42922 10.453 8.27973 10.3379 8.16459C10.2227 8.04944 10.0732 7.9749 9.91197 7.95223L4.10772 7.14148L16.3792 2.12098L11.3587 14.3925Z" fill="#FCFCFC" />
                                        </svg>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <BasicModal ref={childRef} />
        </>
    )
}
export default FileChat;