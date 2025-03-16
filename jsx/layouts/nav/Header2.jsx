import React, { useState, useEffect, useContext, useRef } from "react";

import { Link } from "react-router-dom";
/// Scroll
import { Dropdown } from "react-bootstrap";

import LogoutPage from './Logout';

/// Image
import profile from "../../../assets/images/user.jpg";
import avatar from "../../../assets/images/avatar/1.jpg";
import avatar2 from "../../../assets/images/avatar/2.jpg";
import avatar3 from "../../../assets/images/avatar/3.jpg";
import avatar4 from "../../../assets/images/avatar/4.jpg";
import { ThemeContext } from "../../../context/ThemeContext";

const searchList = [
	{ image: avatar, title: 'Benjamin' },
	{ image: avatar2, title: 'Oliver' },
	{ image: avatar3, title: 'Lucas' },
	{ image: avatar4, title: 'Harry' },
	{ image: avatar2, title: 'Oliver' },
	{ image: avatar4, title: 'Harry' },
	{ image: avatar, title: 'Benjamin' },
	{ image: avatar3, title: 'Lucas' },
];

export function SideBarAdd() {
	setTimeout(() => {
		let walletopen = document.querySelector(".wallet-open");
		if (walletopen.classList.contains('active')) {
			walletopen.classList.remove("active");
		} else {
			walletopen.classList.add("active");
		}
	}, 200);
}

const Header2 = ({ onNote }) => {
	const { background, changeBackground } = useContext(ThemeContext);
	const handleThemeMode = () => {
		if (background.value === 'dark') {
			changeBackground({ value: "light", label: "Light" });
		} else {
			changeBackground({ value: "dark", label: "Dark" });
		}
	}

	//For header fixed 
	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []);
	//end

	const fullscreenRef = useRef(null);
	const EnterFullScreen = () => {
		if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {

			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
		else { /* exit fullscreen */
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
		}
	};

	var path = window.location.pathname.split("/");
	var name = path[path.length - 1].split("-");
	var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
	var finalName = filterName.includes("app")
		? filterName.filter((f) => f !== "app")
		: filterName.includes("ui")
			? filterName.filter((f) => f !== "ui")
			: filterName.includes("uc")
				? filterName.filter((f) => f !== "uc")
				: filterName.includes("basic")
					? filterName.filter((f) => f !== "basic")
					: filterName.includes("jquery")
						? filterName.filter((f) => f !== "jquery")
						: filterName.includes("table")
							? filterName.filter((f) => f !== "table")
							: filterName.includes("page")
								? filterName.filter((f) => f !== "page")
								: filterName.includes("email")
									? filterName.filter((f) => f !== "email")
									: filterName.includes("ecom")
										? filterName.filter((f) => f !== "ecom")
										: filterName.includes("chart")
											? filterName.filter((f) => f !== "chart")
											: filterName.includes("editor")
												? filterName.filter((f) => f !== "editor")
												: filterName;


	return (
		<div className={`header ${headerFix ? "sticky" : ""}`}>
			<div className="header-content">
				<nav className="navbar navbar-expand">
					<div className="collapse navbar-collapse justify-content-between">
						<div className="header-left">
							<div
								className="dashboard_bar"
								style={{ textTransform: "capitalize" }}
							>
								{finalName.join(" ").length === 0
									? "Dashboard"
									: finalName.join(" ") === "dashboard dark"
										? "Dashboard"
										: finalName.join(" ")}
							</div>
						</div>
						<ul className="navbar-nav header-right">
							<Dropdown as="li" className="nav-item notification_dropdown search-area-header">
								<Dropdown.Toggle as="div" className="nav-link i-false">
									<svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M27.6 25.8L22 20.2C23.3 18.5 24.1 16.4 24.1 14.1C24.1 8.60001 19.6 4.10001 14.1 4.10001C8.6 4.10001 4 8.60001 4 14.1C4 19.6 8.5 24.1 14 24.1C16.3 24.1 18.5 23.3 20.2 21.9L25.8 27.5C26 27.7 26.4 27.9 26.7 27.9C27 27.9 27.3 27.8 27.6 27.5C28.1 27.1 28.1 26.3 27.6 25.8ZM6.5 14.1C6.5 10 9.9 6.60001 14 6.60001C18.1 6.60001 21.5 10 21.5 14.1C21.5 18.2 18.1 21.6 14 21.6C9.9 21.6 6.5 18.3 6.5 14.1Z" fill="#A098AE" />
									</svg>
								</Dropdown.Toggle>
								<Dropdown.Menu className="dropdown-menu-end p-0 rounded" align={'end'}>
									<div className="card mb-0">
										<div className="card-body px-0">
											<div className="px-3">
												<div className="input-group search-area w-100">
													<input type="text" className="form-control" placeholder="Search here..." />
													<span className="input-group-text"><Link to={"#"}>
														<svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z" fill="#01A3FF"></path>
														</svg>
													</Link></span>
												</div>
												<h6 className="my-2 mt-3">Recently Searched:</h6>
											</div>
											<div className="dlab-scroll px-3 mt-3 height300">
												{searchList.map((item, index) => (
													<ul className="d-flex align-items-center mb-3" key={index}>
														<li>
															<img src={item.image} className="avatar avatar-sm" alt="" />
															<Link to={"#"} className="ms-2">{item.title}</Link>
														</li>
														<li className="ms-auto"><i className="fa-solid fa-trash"></i></li>
													</ul>
												))}
											</div>
										</div>
									</div>
								</Dropdown.Menu>
							</Dropdown>
							<li className="nav-item dropdown notification_dropdown">
								<Link to={"#"} className="nav-link  menu-wallet"
									onClick={SideBarAdd}
								>
									<svg id="Layer_2" enableBackground="new 0 0 512 512" height="18" viewBox="0 0 512 512" width="18" xmlns="http://www.w3.org/2000/svg"><g><path d="m174 240h-108c-36.393 0-66-29.607-66-66v-108c0-36.393 29.607-66 66-66h108c36.393 0 66 29.607 66 66v108c0 36.393-29.607 66-66 66zm-108-208c-18.748 0-34 15.252-34 34v108c0 18.748 15.252 34 34 34h108c18.748 0 34-15.252 34-34v-108c0-18.748-15.252-34-34-34z" /><path d="m446 240h-108c-36.393 0-66-29.607-66-66v-108c0-36.393 29.607-66 66-66h108c36.393 0 66 29.607 66 66v108c0 36.393-29.607 66-66 66zm-108-208c-18.748 0-34 15.252-34 34v108c0 18.748 15.252 34 34 34h108c18.748 0 34-15.252 34-34v-108c0-18.748-15.252-34-34-34z" /><path d="m392 512c-66.168 0-120-53.832-120-120s53.832-120 120-120 120 53.832 120 120-53.832 120-120 120zm0-208c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88z" /><path d="m174 512h-108c-36.393 0-66-29.607-66-66v-108c0-36.393 29.607-66 66-66h108c36.393 0 66 29.607 66 66v108c0 36.393-29.607 66-66 66zm-108-208c-18.748 0-34 15.252-34 34v108c0 18.748 15.252 34 34 34h108c18.748 0 34-15.252 34-34v-108c0-18.748-15.252-34-34-34z" /></g></svg>
								</Link>
							</li>
							<li className="nav-item dropdown notification_dropdown">
								<Link to={"#"} className={`nav-link bell dz-theme-mode ${background.value === "dark" ? "active" : ""}`}
									onClick={() => handleThemeMode()}
								>
									<i id="icon-light-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
									</i>
									<i id="icon-dark-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
									</i>
								</Link>
							</li>
							<li className="nav-item dropdown notification_dropdown">
								<Link to={"#"} className="nav-link bell dz-fullscreen"
									ref={fullscreenRef}
									onClick={EnterFullScreen}
								>
									<svg id="icon-full-1" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" style={{ strokeDasharray: "37, 57", strokeDashoffset: "0" }}></path></svg>
									<svg id="icon-minimize-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="A098AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" style={{ strokeDasharray: "37, 57", strokeDashoffset: "0" }}></path></svg>
								</Link>
							</li>
							<Dropdown as="li" className="nav-item dropdown notification_dropdown ">
								<Dropdown.Toggle variant="" as="a" className="nav-link bell bell-link i-false c-pointer nav-action" onClick={() => onNote()}>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A098AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
								</Dropdown.Toggle>
							</Dropdown>
							<Dropdown as="li" className="nav-item bell-icon blink notification_dropdown">
								<Dropdown.Toggle className="nav-link i-false c-pointer" variant="" as="a">
									<svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M25.3677 18.9391V9.86768C25.3677 4.70215 21.1655 0.5 16 0.5C10.8345 0.5 6.63232 4.70215 6.63232 9.86768V18.9397C4.96704 19.4224 3.73828 20.9544 3.73828 22.8374C3.73828 25.0386 5.5293 26.8296 7.73096 26.8296H11.377V26.877C11.377 29.4263 13.4507 31.5 16 31.5C18.5493 31.5 20.6231 29.4263 20.6231 26.8769V26.8296H24.2691C26.4707 26.8296 28.2617 25.0386 28.2617 22.7583C28.2617 20.9406 27.033 19.4198 25.3677 18.9391ZM9.63232 9.86768C9.63232 6.35645 12.4888 3.5 16 3.5C19.5112 3.5 22.3677 6.35645 22.3677 9.86768V18.7661H9.63232V9.86768ZM17.6231 26.8769C17.6231 27.772 16.895 28.5 16 28.5C15.105 28.5 14.377 27.772 14.377 26.8769V26.8296H17.623V26.8769H17.6231ZM24.269 23.8296H7.73096C7.1836 23.8296 6.73828 23.3843 6.73828 22.7583C6.73828 22.2114 7.18359 21.7661 7.73096 21.7661H24.2691C24.8164 21.7661 25.2617 22.2114 25.2617 22.8374C25.2617 23.3843 24.8164 23.8296 24.269 23.8296Z" fill="#A098AE" />
									</svg>
								</Dropdown.Toggle>
								<Dropdown.Menu align="end" className="dropdown-menu mt-2 dropdown-menu-end of-visible">
									<div className="dropdown-header">
										<h4 className="title mb-0">Notification</h4>
										<Link to={"#"} className="d-none"><i className="flaticon-381-settings-6"></i></Link>
									</div>
									<div id="DZ_W_Notification1" className="widget-media dlab-scroll p-3" style={{ height: "380px" }}>
										<ul className="timeline">
											<li>
												<div className="timeline-panel">
													<div className="media me-2">
														<img alt="images" width={50} src={avatar} />
													</div>
													<div className="media-body">
														<h6 className="mb-1">Dr sultads Send you Photo</h6>
														<small className="d-block">29 July 2022 - 02:26 PM</small>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media me-2 media-info">KG</div>
													<div className="media-body">
														<h6 className="mb-1">
															Resport created successfully
														</h6>
														<small className="d-block">
															29 July 2022 - 02:26 PM
														</small>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media me-2 media-success">
														<i className="fa fa-home" />
													</div>
													<div className="media-body">
														<h6 className="mb-1">Reminder : Treatment Time!</h6>
														<small className="d-block">
															29 July 2022 - 02:26 PM
														</small>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media me-2">
														<img alt="" width={50} src={avatar} />
													</div>
													<div className="media-body">
														<h6 className="mb-1">Dr sultads Send you Photo</h6>
														<small className="d-block">
															29 July 2022 - 02:26 PM
														</small>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media me-2 media-danger">KG</div>
													<div className="media-body">
														<h6 className="mb-1">
															Resport created successfully
														</h6>
														<small className="d-block">
															29 July 2022 - 02:26 PM
														</small>
													</div>
												</div>
											</li>
											<li>
												<div className="timeline-panel">
													<div className="media me-2 media-primary">
														<i className="fa fa-home" />
													</div>
													<div className="media-body">
														<h6 className="mb-1">Reminder : Treatment Time!</h6>
														<small className="d-block">
															29 July 2022 - 02:26 PM
														</small>
													</div>
												</div>
											</li>
										</ul>
									</div>


									<Link className="all-notification" to="#">
										See all notifications <i className="ti-arrow-right" />
									</Link>
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown as="li" className="nav-item  notification_dropdown">
								<Dropdown.Toggle variant="" as="a" className="nav-link  ai-icon i-false c-pointer  me-0">
									<svg width="20" className="setting-svg" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12.2631 2.66667L11.4167 6.46615C10.9353 6.69779 10.4752 6.96458 10.0339 7.26563L6.32035 6.09636L2.58337 12.5703L5.39848 15.1484C5.28849 15.9648 5.33831 16.3672 5.39848 16.8516L2.58337 19.4297L6.32035 25.9037L10.0339 24.7344C10.4752 25.0354 10.9353 25.3022 11.4167 25.5339L12.2631 29.3333H19.737L20.5834 25.5339C21.0647 25.3022 21.5249 25.0354 21.9662 24.7344L25.6797 25.9037L29.4167 19.4297L26.6016 16.8516C26.6246 16.5682 26.6664 16.2845 26.6667 16C26.6678 15.7069 26.6216 15.4108 26.6016 15.1484L29.4167 12.5703L25.6797 6.09636L21.9662 7.26563C21.5249 6.96458 21.0647 6.69779 20.5834 6.46615L19.737 2.66667H12.2631ZM14.4037 5.33334H17.5964L18.2552 8.29167L18.9167 8.55209C19.6649 8.84512 20.3644 9.24846 20.9922 9.75001L21.5495 10.1927L24.4401 9.28386L26.0365 12.0495L23.8021 14.099L23.9089 14.8021C24.0346 15.5797 24.0101 16.4746 23.9089 17.1979L23.8021 17.901L26.0365 19.9505L24.4401 22.7162L21.5495 21.8073L20.9922 22.25C20.3644 22.7516 19.6649 23.1549 18.9167 23.4479L18.2552 23.7083L17.5964 26.6667H14.4037L13.7448 23.7083L13.0834 23.4479C12.3351 23.1549 11.6357 22.7516 11.0079 22.25L10.4506 21.8073L7.55994 22.7162L5.96358 19.9505L8.19796 17.901L8.09119 17.1979C7.96095 16.4046 7.98095 15.4967 8.09119 14.8021L8.19796 14.099L5.96358 12.0495L7.55994 9.28386L10.4506 10.1927L11.0079 9.75001C11.6357 9.24846 12.3351 8.84512 13.0834 8.55209L13.7448 8.29167L14.4037 5.33334ZM16 10.6667C13.0703 10.6667 10.6667 13.0703 10.6667 16C10.6667 18.9297 13.0703 21.3333 16 21.3333C18.9298 21.3333 21.3334 18.9297 21.3334 16C21.3334 13.0703 18.9298 10.6667 16 10.6667ZM16 13.3333C17.4886 13.3333 18.6667 14.5115 18.6667 16C18.6667 17.4886 17.4886 18.6667 16 18.6667C14.5115 18.6667 13.3334 17.4886 13.3334 16C13.3334 14.5115 14.5115 13.3333 16 13.3333Z" fill="#A098AE" />
									</svg>
								</Dropdown.Toggle>
								<Dropdown.Menu align="end" className="mt-2 dropdown-menu dropdown-menu-end">
									<div id="DZ_W_TimeLine02" className="widget-timeline dlab-scroll style-1 p-3 height370">
										<ul className="timeline">
											<li>
												<div className="timeline-badge primary" />
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>10 minutes ago</span>
													<h6 className="mb-0">
														Youtube, a video-sharing website, goes live{" "}
														<strong className="text-primary">$500</strong>.
													</h6>
												</Link>
											</li>
											<li>
												<div className="timeline-badge info"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>20 minutes ago</span>
													<h6 className="mb-0">
														New order placed{" "}
														<strong className="text-info">#XF-2356.</strong>
													</h6>
													<p className="mb-0">
														Quisque a consequat ante Sit amet magna at
														volutapt...
													</p>
												</Link>
											</li>
											<li>
												<div className="timeline-badge danger"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>30 minutes ago</span>
													<h6 className="mb-0">
														john just buy your product{" "}
														<strong className="text-warning">Sell $250</strong>
													</h6>
												</Link>
											</li>
											<li>
												<div className="timeline-badge success"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>15 minutes ago</span>
													<h6 className="mb-0">
														StumbleUpon is acquired by eBay.{" "}
													</h6>
												</Link>
											</li>
											<li>
												<div className="timeline-badge warning"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>20 minutes ago</span>
													<h6 className="mb-0">
														Mashable, a news website and blog, goes live.
													</h6>
												</Link>
											</li>
											<li>
												<div className="timeline-badge dark"></div>
												<Link
													className="timeline-panel c-pointer text-muted"
													to="#"
												>
													<span>20 minutes ago</span>
													<h6 className="mb-0">
														Mashable, a news website and blog, goes live.
													</h6>
												</Link>
											</li>
										</ul>
									</div>
								</Dropdown.Menu>
							</Dropdown>

							<li className="nav-item ">
								<Dropdown className="dropdown header-profile2">
									<Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer ms-0">
										<div className="header-info2 d-flex align-items-center">
											<img src={profile} alt="" />
										</div>
									</Dropdown.Toggle>
									<Dropdown.Menu align="end" className="mt-1 dropdown-menu dropdown-menu-end" >
										<div className="card mb-0">
											<div className="card-header p-3">
												<ul className="d-flex align-items-center">
													<li>
														<img src={profile} className="ms-0" alt="" />
													</li>
													<li className="ms-2">
														<h4 className="mb-0">Nella Vita</h4>
														<span>Admin</span>
													</li>
												</ul>

											</div>
											<div className="card-body p-3">
												<Link to="/app-profile" className="dropdown-item ai-icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
														<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
															<polygon points="0 0 24 0 24 24 0 24" />
															<path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
															<path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="var(--primary)" fillRule="nonzero" />
														</g>
													</svg>
													<span className="ms-2">Profile </span>
												</Link>
												<Link to="/chat" className="dropdown-item ai-icon ">
													<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
														<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
															<rect x="0" y="0" width="24" height="24" />
															<path d="M21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L5,18 C3.34314575,18 2,16.6568542 2,15 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 Z M6.16794971,10.5547002 C7.67758127,12.8191475 9.64566871,14 12,14 C14.3543313,14 16.3224187,12.8191475 17.8320503,10.5547002 C18.1384028,10.0951715 18.0142289,9.47430216 17.5547002,9.16794971 C17.0951715,8.86159725 16.4743022,8.98577112 16.1679497,9.4452998 C15.0109146,11.1808525 13.6456687,12 12,12 C10.3543313,12 8.9890854,11.1808525 7.83205029,9.4452998 C7.52569784,8.98577112 6.90482849,8.86159725 6.4452998,9.16794971 C5.98577112,9.47430216 5.86159725,10.0951715 6.16794971,10.5547002 Z" fill="var(--primary)" />
														</g>
													</svg>
													<span className="ms-2">Message </span>
												</Link>
												<Link to="/email-inbox" className="dropdown-item ai-icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
														<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
															<rect x="0" y="0" width="24" height="24" />
															<path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#000000" />
															<circle fill="var(--primary)" opacity="0.3" cx="19.5" cy="17.5" r="2.5" />
														</g>
													</svg>
													<span className="ms-2">Inbox </span>
												</Link>
												<Link to="#" className="dropdown-item ai-icon ">
													<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
														<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
															<rect x="0" y="0" width="24" height="24" />
															<path d="M18.6225,9.75 L18.75,9.75 C19.9926407,9.75 21,10.7573593 21,12 C21,13.2426407 19.9926407,14.25 18.75,14.25 L18.6854912,14.249994 C18.4911876,14.250769 18.3158978,14.366855 18.2393549,14.5454486 C18.1556809,14.7351461 18.1942911,14.948087 18.3278301,15.0846699 L18.372535,15.129375 C18.7950334,15.5514036 19.03243,16.1240792 19.03243,16.72125 C19.03243,17.3184208 18.7950334,17.8910964 18.373125,18.312535 C17.9510964,18.7350334 17.3784208,18.97243 16.78125,18.97243 C16.1840792,18.97243 15.6114036,18.7350334 15.1896699,18.3128301 L15.1505513,18.2736469 C15.008087,18.1342911 14.7951461,18.0956809 14.6054486,18.1793549 C14.426855,18.2558978 14.310769,18.4311876 14.31,18.6225 L14.31,18.75 C14.31,19.9926407 13.3026407,21 12.06,21 C10.8173593,21 9.81,19.9926407 9.81,18.75 C9.80552409,18.4999185 9.67898539,18.3229986 9.44717599,18.2361469 C9.26485393,18.1556809 9.05191298,18.1942911 8.91533009,18.3278301 L8.870625,18.372535 C8.44859642,18.7950334 7.87592081,19.03243 7.27875,19.03243 C6.68157919,19.03243 6.10890358,18.7950334 5.68746499,18.373125 C5.26496665,17.9510964 5.02757002,17.3784208 5.02757002,16.78125 C5.02757002,16.1840792 5.26496665,15.6114036 5.68716991,15.1896699 L5.72635306,15.1505513 C5.86570889,15.008087 5.90431906,14.7951461 5.82064513,14.6054486 C5.74410223,14.426855 5.56881236,14.310769 5.3775,14.31 L5.25,14.31 C4.00735931,14.31 3,13.3026407 3,12.06 C3,10.8173593 4.00735931,9.81 5.25,9.81 C5.50008154,9.80552409 5.67700139,9.67898539 5.76385306,9.44717599 C5.84431906,9.26485393 5.80570889,9.05191298 5.67216991,8.91533009 L5.62746499,8.870625 C5.20496665,8.44859642 4.96757002,7.87592081 4.96757002,7.27875 C4.96757002,6.68157919 5.20496665,6.10890358 5.626875,5.68746499 C6.04890358,5.26496665 6.62157919,5.02757002 7.21875,5.02757002 C7.81592081,5.02757002 8.38859642,5.26496665 8.81033009,5.68716991 L8.84944872,5.72635306 C8.99191298,5.86570889 9.20485393,5.90431906 9.38717599,5.82385306 L9.49484664,5.80114977 C9.65041313,5.71688974 9.7492905,5.55401473 9.75,5.3775 L9.75,5.25 C9.75,4.00735931 10.7573593,3 12,3 C13.2426407,3 14.25,4.00735931 14.25,5.25 L14.249994,5.31450877 C14.250769,5.50881236 14.366855,5.68410223 14.552824,5.76385306 C14.7351461,5.84431906 14.948087,5.80570889 15.0846699,5.67216991 L15.129375,5.62746499 C15.5514036,5.20496665 16.1240792,4.96757002 16.72125,4.96757002 C17.3184208,4.96757002 17.8910964,5.20496665 18.312535,5.626875 C18.7350334,6.04890358 18.97243,6.62157919 18.97243,7.21875 C18.97243,7.81592081 18.7350334,8.38859642 18.3128301,8.81033009 L18.2736469,8.84944872 C18.1342911,8.99191298 18.0956809,9.20485393 18.1761469,9.38717599 L18.1988502,9.49484664 C18.2831103,9.65041313 18.4459853,9.7492905 18.6225,9.75 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
															<path d="M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000" />
														</g>
													</svg>
													<span className="ms-2">Settings </span>
												</Link>
											</div>
											<div className="card-footer text-center p-3">
												<LogoutPage />
											</div>
										</div>
									</Dropdown.Menu>
								</Dropdown>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Header2;