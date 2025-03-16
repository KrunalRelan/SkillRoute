import React from "react";
import { Link } from "react-router-dom";
import bgImg  from "../../assets/images/student-bg.jpg";
import Student  from "../../assets/images/svg/student.svg";

const Error404 = () => {
   return (
      <div className="authincation" style={{backgroundImage: `url(${bgImg})`, backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
            <div className="container ">
               <div className="row h-100 align-items-center">
                  <div className="col-lg-6 col-sm-12">
                     <div className="form-input-content error-page">
                     <h1 className="error-text text-primary">404</h1>
                     <h4>The page you were looking for is not found!</h4>
                     <p>You may have mistyped the address or the page may have moved.</p>
                     <Link className="btn btn-primary" to="/dashboard">Back to Home</Link>
                  </div>
               </div>
               <div className="col-lg-6 col-sm-12">
                  <img  className="w-100 move1" src={Student} alt="student" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Error404;
