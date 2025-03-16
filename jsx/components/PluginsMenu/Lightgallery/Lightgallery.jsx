import React from 'react';
import { Link } from 'react-router-dom';
import LightGallery from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import big1 from '../../../../assets/images/big/img1.jpg';
import big2 from '../../../../assets/images/big/img2.jpg';
import big3 from '../../../../assets/images/big/img3.jpg';
import big4 from '../../../../assets/images/big/img4.jpg';
import big5 from '../../../../assets/images/big/img5.jpg';
import big6 from '../../../../assets/images/big/img6.jpg';
import big7 from '../../../../assets/images/big/img7.jpg';
import big8 from '../../../../assets/images/big/img8.jpg';
import pic1 from '../../../../assets/images/big/pic1.jpg';
import pic2 from '../../../../assets/images/big/pic2.jpg';
import pic3 from '../../../../assets/images/big/pic3.jpg';
import pic4 from '../../../../assets/images/big/pic4.jpg';
import pic5 from '../../../../assets/images/big/pic5.jpg';
import pic6 from '../../../../assets/images/big/pic6.jpg';
import pic7 from '../../../../assets/images/big/pic7.jpg';
import pic8 from '../../../../assets/images/big/pic8.jpg';
import pic9 from '../../../../assets/images/big/pic9.jpg';

const lightGallery = [
	{ large: big1, thumb: big1, },
	{ large: big2, thumb: big2, },
	{ large: big3, thumb: big3, },
	{ large: big4, thumb: big4, },
	{ large: big5, thumb: big5, },
	{ large: big6, thumb: big6, },
	{ large: big7, thumb: big7, },
	{ large: big8, thumb: big8, },
];
const galleryData = [
	{ image: pic1 },
	{ image: pic2 },
	{ image: pic3 },
	{ image: pic4 },
	{ image: pic5 },
	{ image: pic6 },
	{ image: pic7 },
	{ image: pic8 },
	{ image: pic1 },
];
const galleryData2 = [
	{ image: pic2 },
	{ image: pic3 },
	{ image: pic4 },
	{ image: pic5 },
	{ image: pic6 },
	{ image: pic7 },
];

const Lightgallery = () => {
	const onInit = () => {
	};

	return (
		<>
			<div className="row">
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Light Gallery</h4>
						</div>

						<div className="card-body pb-1">
							<LightGallery
								onInit={onInit}
								speed={500}
								plugins={[lgThumbnail, lgZoom]}
								elementClassNames="row"
							>
								{lightGallery.map((item, index) => (
									<div data-src={item.thumb} className="col-lg-3 col-md-6 mb-4" key={index}>
										<img src={item.thumb} style={{ width: "100%" }} alt="gallery" className='cursor-pointer' />
									</div>
								))}
							</LightGallery>

						</div>
					</div>
					{/* <!-- /# card --> */}
				</div>
				<div className="col-xl-4">
					<div className="card ">
						<div className="card-body p-3">
							<LightGallery
								onInit={onInit}
								speed={500}
								plugins={[lgThumbnail, lgZoom]}
								elementClassNames="row g-2"
							>
								{galleryData.map((item, ind) => (
									<div data-exthumbimage={item.image} data-src={item.image} className="col-lg-4  col-4" key={ind}>
										<img src={item.image} className="w-100" alt="" />
									</div>
								))}
							</LightGallery>
						</div>
					</div>
				</div>
				<div className="col-xl-8">
					<div className="card h-auto">
						<div className="card-body p-3">
							<LightGallery
								onInit={onInit}
								speed={500}
								plugins={[lgThumbnail, lgZoom]}
								elementClassNames="row g-2"
							>
								<div data-src={pic9} className="col-lg-12  col-12" >
									<img src={pic9} className="w-100 cursor-pointer" alt="" />
								</div>

								{galleryData2.map((item, ind) => (
									<div data-exthumbimage={item.image} data-src={item.image} className="col-lg-2  col-2 cursor-pointer" key={ind}>
										<img src={item.image} className="w-100" alt="" />
									</div>
								))}
							</LightGallery>
						</div>
					</div>
				</div>
			</div>
		</>
	)

}
export default Lightgallery;