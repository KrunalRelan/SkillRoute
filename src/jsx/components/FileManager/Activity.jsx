import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//images

import { IMAGES } from '../Dashboard/Content';

function Dzmedia({ image }) {
    return (
        <>
            <Link to={"#"}>
                <img src={image} alt="" />
            </Link>
        </>
    )
}


const Activity = () => {    
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div >
                        <div className="card activity">
                            <div className="card-body pt-0">
                                <div id="DZ_W_TimeLine11" className="widget-timeline style-3 ">
                                    <h4 className="mt-3">Today</h4>
                                    <ul className="timeline-active style-1">
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <div className="dz-media">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="2" width="12" height="12" rx="6" fill="white" stroke="#4D44B5" strokeWidth="4" />
                                                </svg>
                                            </div>
                                            <div className="panel">
                                                <p className="time">Monday, June 31 2023</p>
                                                <a className="timeline-panel text-muted d-flex align-items-center" href="#">
                                                    <span><strong className="text-primary">Karen Hope</strong> has created new task at <strong className="text-secondary font-w500">HIstory Lesson</strong> </span>

                                                </a>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-baseline timeline-list">

                                            <div className="dz-media">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="2" width="12" height="12" rx="6" fill="white" stroke="#4D44B5" strokeWidth="4" />
                                                </svg>
                                            </div>
                                            <div className="panel">
                                                <p className="time">Monday, June 31 2023</p>
                                                <a className="timeline-panel text-muted d-flex align-items-center" href="#">
                                                    <span><strong className="text-secondary font-w500">[REMINDER] </strong> Due date of <strong className="text-secondary font-w500">Science Homework task will be coming</strong></span>

                                                </a>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <div className="dz-media">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="2" width="12" height="12" rx="6" fill="white" stroke="#4D44B5" strokeWidth="4" />
                                                </svg>
                                            </div>
                                            <div className="panel">
                                                <p className="time">Monday, June 31 2023</p>
                                                <a className="timeline-panel text-muted d-flex align-items-center" href="#">
                                                    <span ><strong className="text-primary">Tony Soap </strong> commented at <strong className="text-secondary font-w500"> Science Homework </strong></span>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <div className="dz-media">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="2" width="12" height="12" rx="6" fill="white" stroke="#4D44B5" strokeWidth="4" />
                                                </svg>
                                            </div>
                                            <div className="panel">
                                                <p className="time">Monday, June 31 2020</p>
                                                <Link to={"#"} className="timeline-panel text-muted d-flex align-items-center">
                                                    <span className="mb-2 d-block"><strong className="text-primary">Samantha William </strong> add 4 files on  <strong className="text-primary font-w500"> Art Class </strong></span>
                                                </Link>
                                                <div className="modulel flex-wrap">
                                                    <Dzmedia image={IMAGES.activity1} />
                                                    <Dzmedia image={IMAGES.activity2} />
                                                    <Dzmedia image={IMAGES.activity3} />
                                                    <Dzmedia image={IMAGES.activity4} />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-baseline last-timeline">
                                            <div className="dz-media">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="2" width="12" height="12" rx="6" fill="white" stroke="#4D44B5" strokeWidth="4" />
                                                </svg>
                                            </div>
                                            <div className="panel">
                                                <p className="time">Monday, June 31 2023</p>
                                                <a className="timeline-panel text-muted d-flex align-items-center" href="#">
                                                    <span ><strong className="text-primary">You</strong> has moved <strong className="text-success font-w500">“Biology Homework” </strong> task to Done</span>
                                                </a>

                                            </div>

                                        </li>
                                    </ul>
                                    <h4 className="mt-3">Yesterday</h4>
                                    <ul className="timeline-active style-1">
                                        <li className="d-flex align-items-baseline timeline-list">
                                            <div className="dz-media">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="2" width="12" height="12" rx="6" fill="white" stroke="#4D44B5" strokeWidth="4" />
                                                </svg>
                                            </div>
                                            <div className="panel">
                                                <p className="time">Monday, June 31 2020</p>
                                                <a className="timeline-panel text-muted d-flex align-items-center" href="#">
                                                    <span ><strong className="text-primary">Johnny Ahmad </strong>  mentioned you at <strong className="text-warning font-w500"> Art Class  Homework</strong></span>
                                                </a>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-baseline last-timeline">
                                            <div className="dz-media">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="2" y="2" width="12" height="12" rx="6" fill="white" stroke="#4D44B5" strokeWidth="4" />
                                                </svg>
                                            </div>
                                            <div className="panel">
                                                <p className="time">Monday, June 31 2020</p>
                                                <a className="timeline-panel text-muted d-flex align-items-center" href="#">
                                                    <span><strong className="text-primary">Nadila Adja  </strong> mentioned you at <strong className="text-primary font-w600">Programming Homework</strong> </span>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>

    )
}
export default Activity;