import React, { useState } from 'react'
import { SVGICON } from './Content'
import BalanceChart from './Elements/BalanceChart';
import CompanyPerformance from './Elements/CompanyPerformance';
import FinanceMapBar from './Elements/FinanceMapBar';
import { UnpaidCompanyTable } from './Elements/UnpaidCompanyTable';
import CompanyExpenseTable from './Elements/CompanyExpenseTable';
import { Dropdown } from 'react-bootstrap';

const cardBlog = [
    { number: '932', svg: SVGICON.user, title: 'Total Company', color: 'primary' },
    { number: '754', svg: SVGICON.user2, title: 'Total trainer', color: 'secondary' },
];

function Finance() {
    const [selectValue, setSelectValue] = useState('Week');
    return (
      <div className="row">
        {cardBlog.map((data, index) => (
          <div className="col-xl-3 col-sm-6" key={index}>
            <div className="card">
              <div className="card-body">
                <ul className="d-flex align-items-center">
                  <li className={`icon-box icon-box-lg me-3 bg-${data.color}`}>
                    {data.svg}
                  </li>
                  <li>
                    <span>{data.title}</span>
                    <h3 className="my-1">{data.number}</h3>
                    <span>+10% than last month</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body pb-0">
              <div className="d-sm-flex d-block align-items-center justify-content-between">
                <ul className="d-flex align-items-center">
                  <li className="icon-box icon-box-lg bg-warning me-3">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M36.2365 21.8435C33.9956 21.0315 31.5096 21.212 29.4077 22.3374L25.9812 23.8788C25.7043 22.3007 24.4923 21.1148 22.9963 21.0692C22.9875 21.069 17.8587 21.0111 17.8587 21.0111C13.7536 19.885 11.0862 21.332 9.56458 22.7579C9.25338 23.0496 8.9797 23.3498 8.73885 23.646C8.32825 23.2038 7.60347 23.0856 7.07492 23.3762L2.41928 25.9354C1.81543 26.2674 1.5527 26.9956 1.80594 27.6358L6.35586 39.1377C6.65483 39.8934 7.57364 40.2274 8.29056 39.8333L12.9462 37.2742C13.3826 37.0343 13.6395 36.5873 13.6536 36.1162H20.6022C21.7356 36.1162 22.8546 35.8185 23.8382 35.2553C23.8382 35.2553 36.9065 27.7589 36.9803 27.6919C38.8104 26.027 38.8668 22.7966 36.2365 21.8435C37.2858 22.2237 33.9956 21.0315 36.2365 21.8435ZM8.33218 36.688L4.7968 27.7508L7.03304 26.5216L10.5684 35.4588L8.33218 36.688ZM35.2316 25.5773L22.4747 32.8826C21.9054 33.2087 21.2578 33.381 20.6019 33.381H12.6919L10.036 26.667C10.2636 26.2034 10.7117 25.4342 11.4394 24.7522C12.93 23.3555 14.8946 22.998 17.2791 23.6898C17.3983 23.7244 17.5218 23.7427 17.6459 23.7441L22.918 23.8034C23.0526 23.815 23.3011 24.1143 23.3011 24.568C23.3011 25.035 23.0445 25.3327 22.9103 25.3327H17.7302V28.0679H22.9103C23.552 28.0679 24.1492 27.8509 24.6463 27.4791L30.5779 24.8109C30.6094 24.7968 30.6401 24.7815 30.6704 24.765C32.0933 23.9914 33.7815 23.8636 35.3018 24.4145C35.9035 24.6326 35.4688 25.3364 35.2316 25.5773ZM27 19.7079C21.5669 19.7079 17.1467 15.2874 17.1467 9.85393C17.1467 4.42051 21.5668 0 27 0C32.4331 0 36.8532 4.42051 36.8532 9.85393C36.8532 15.2874 32.433 19.7079 27 19.7079ZM27 2.73521C23.0775 2.73521 19.8864 5.92863 19.8864 9.85393C19.8864 13.7792 23.0776 16.9727 27 16.9727C30.9225 16.9727 34.1136 13.7791 34.1136 9.85393C34.1136 5.92872 30.9224 2.73521 27 2.73521Z"
                        fill="white"
                      />
                      <path
                        d="M27.6362 8.73923C26.5469 8.29188 26.4627 8.09966 26.4627 7.87684C26.4627 7.73453 26.5333 7.40368 27.1876 7.40368C27.7862 7.40368 28.532 7.73966 29.058 8.0859L29.7897 6.16795C29.2673 5.83539 28.6324 5.54966 28.0388 5.45829V4.21103H26.0879V5.57966C24.9289 5.94496 24.2147 6.87146 24.2147 8.02479C24.2147 9.55231 25.4368 10.2343 26.6304 10.6991C27.5841 11.0828 27.664 11.3765 27.664 11.6217C27.664 11.9989 27.3164 12.2426 26.7785 12.2426C26.077 12.2426 25.2614 11.838 24.6903 11.3952L23.9863 13.3439C24.5686 13.7954 25.2426 14.0933 26.0009 14.2045V15.4969H27.964V14.0901C29.1592 13.7095 29.9242 12.7193 29.9242 11.5354C29.9242 9.87812 28.7015 9.1706 27.6362 8.73923Z"
                        fill="white"
                      />
                    </svg>
                  </li>
                  <li>
                    <span>Company Balance</span>
                    <h3 className="my-1">$123,456</h3>
                    <span>+10% than last month</span>
                  </li>
                </ul>
                <ul>
                  <BalanceChart />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card h-auto">
            <div className="card-header border-0 pb-0">
              <h3 className="heading mb-0">Balance Analytics</h3>
              <div className="p-static">
                <div className="d-flex align-items-center mb-3 mb-sm-0">
                  <div className="round weekly" id="dzOldSeries">
                    <div>
                      <input
                        type="checkbox"
                        id="checkbox1"
                        name="radio"
                        value="weekly"
                      />
                      <label htmlFor="checkbox1" className="checkmark"></label>
                    </div>
                    <div>
                      <span className="fs-14">This Week</span>
                      <h4 className="fs-5 font-w600 mb-0">1.245</h4>
                    </div>
                  </div>
                  <div className="round " id="dzNewSeries">
                    <div>
                      <input
                        type="checkbox"
                        id="checkbox"
                        name="radio"
                        value="monthly"
                      />
                      <label htmlFor="checkbox" className="checkmark"></label>
                    </div>
                    <div>
                      <span className="fs-14">This Week</span>
                      <h4 className="fs-5 font-w600 mb-0">1.356</h4>
                    </div>
                  </div>
                  <Dropdown className="drop-select">
                    <Dropdown.Toggle as="div" className="drop-select-btn ">
                      {selectValue}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setSelectValue("Week")}>
                        Week
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectValue("Month")}>
                        Month
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectValue("Year")}>
                        Year
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="card-body px-2 pb-0">
              <CompanyPerformance />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-12">
          <div className="card">
            <div className="card-header border-0 p-static pb-2">
              <div>
                <h4 className="card-title">Finance Map</h4>
              </div>
              <Dropdown className="drop-select">
                <Dropdown.Toggle as="div" className="drop-select-btn ">
                  Week
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Week</Dropdown.Item>
                  <Dropdown.Item>Month</Dropdown.Item>
                  <Dropdown.Item>Year</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="card-body tab-content p-3 py-0">
              <div className="tab-pane fade show active" id="monthly">
                <div id="chartTimeline"></div>
                <FinanceMapBar />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-7">
          <div className="card">
            <div className="card-header border-0 p-3">
              <h4 className="heading mb-0">Unpaid Company Intuition</h4>
            </div>
            <div className="card-body p-0">
              <UnpaidCompanyTable />
            </div>
          </div>
        </div>
        <div className="col-xl-5">
          <div className="card">
            <div className="card-header border-0 p-3">
              <h4 className="haeding mb-0">Company Expense</h4>
            </div>
            <div className="card-body p-0">
              <CompanyExpenseTable />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Finance