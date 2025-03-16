import React, { useState } from 'react';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import { SVGICON } from './Content';
// import { TeacherDetails } from './Elements/TeacherDetails';
import { UnpaidCompanyTable } from './Elements/UnpaidCompanyTable';
import { useNavigate } from 'react-router-dom';

const CompanyPerformance = loadable(() =>
    pMinDelay(import("./Elements/CompanyPerformance.jsx"), 500)
);
const CompanyOverView = loadable(() =>
    pMinDelay(import("./Elements/CompanyOverView"), 1000)
);

const cardBlog = [
    { title: 'Companies', svg: SVGICON.company, number: '20K', change: 'company-data' },
    { title: 'Trainers', svg: SVGICON.trainer, number: '10K', change: 'trainer-data bg-dark' },
    { title: 'Hotels', svg: SVGICON.hotel, number: '5K', change: 'hotel-data bg-dark' },
];

const Home = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [companies] = useState([
        { companyName: 'Company A', enquirerName: 'John Doe' },
        { companyName: 'Company B', enquirerName: 'Jane Smith' },
        { companyName: 'Company C', enquirerName: 'Alice Johnson' },
        { companyName: 'Company D', enquirerName: 'Bob Brown' },
        { companyName: 'Company E', enquirerName: 'Charlie Davis' },
        { companyName: 'Company F', enquirerName: 'Diana Evans' }
    ]);

    const navigate = useNavigate();

    const handleShowMore = () => {
        navigate('/company');
    };
const cardBlog = [
  // {title:'Students', svg: SVGICON.user, number:'93K', change:'std-data'},
  //   {
  //     title: "trainers",
  //     svg: SVGICON.user2,
  //     number: "74K",
  //     change: "teach-data",
  //   },
  {
    title: "Trainers",
    svg: SVGICON.user2,
    number: "10K",
    change: "copmany-data bg-dark",
  },

  {
    title: "Companies",
    svg: SVGICON.user,
    number: "20K",
    change: "company-data bg-dark",
  },

  {
    title: "Hotels",
    svg: SVGICON.hotel,
    number: "5K",
    change: "hotel-data bg-dark",
  },
];

return (
  <div className="row">
    {/* <div className="col-xl-6 wow fadeInUp" data-wow-delay="1.5s">
                <div className="card">
                    <div className="card-header pb-0 border-0 flex-wrap">
                        <div>
                            <div className="mb-3">
                                <h2 className="heading mb-0">Company Calendar</h2>
                            </div>
                        </div>
                    </div>
                    <div className="card-body text-center event-calender dz-calender py-0 px-1">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            inline
                            fixedHeight
                        />
                    </div>
                </div>
            </div> */}
    <div className="col-xl-6 wow fadeInUp" data-wow-delay="1.5s">
      <div className="card">
        <div className="card-header pb-0 border-0 flex-wrap">
          <div>
            <div className="mb-3">
              <h2 className="heading mb-0">Registered Companies</h2>
            </div>
          </div>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {companies.slice(0, 5).map((company, index) => (
              <li key={index} className="list-group-item">
                {company.companyName} - {company.enquirerName}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary mt-3" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default Home;