import React from "react";
import { Link } from "react-router-dom";
import bgImg  from "../../assets/images/student-bg.jpg";
import Student  from "../../assets/images/svg/student.svg";

const Error403 = () => {
   return (
      <div className="authincation" style={{backgroundImage: `url(${bgImg})`, backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
            <div className="container ">
               <div className="row h-100 align-items-center">
                  <div className="col-lg-6 col-sm-12">
                     <div className="form-input-content error-page">
                     <h1 className="error-text text-primary">403</h1>
                     <h4>Forbidden Error!</h4>
                     <p>You do not have permission to view this resource.</p>
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

export default Error403;
