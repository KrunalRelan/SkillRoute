import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import trans1 from './../../../../assets/images/trans/1.jpg';
import trans2 from './../../../../assets/images/trans/2.jpg';
import trans3 from './../../../../assets/images/trans/3.jpg';
import trans4 from './../../../../assets/images/trans/4.jpg';
import trans5 from './../../../../assets/images/trans/5.jpg';
import { Dropdown } from 'react-bootstrap';


const tableData = [
  {
    id: "1",
    image: trans1,
    name: "Jordan Nico",
    studid: "ID 1234567911",
    class: "Web Development",
    fee: "200",
    status: "Paid",
  },
  {
    id: "2",
    image: trans2,
    name: "Karen Hope",
    studid: "ID 1234567101",
    class: ".Net Development",
    fee: "200",
    status: "Paid",
  },
  {
    id: "3",
    image: trans3,
    name: "Nadila Adja",
    studid: "ID 1234567001",
    class: "React Development",
    fee: "200",
    status: "Paid",
  },
  {
    id: "4",
    image: trans4,
    name: "James Brown",
    studid: "ID 1234567231",
    class: "Angular Development",
    fee: "200",
    status: "UnPaid",
  },
  {
    id: "5",
    image: trans5,
    name: "Dack Xarma",
    studid: "ID 1234567456",
    class: "Vue Development",
    fee: "200",
    status: "UnPaid",
  },
  {
    id: "9",
    image: trans4,
    name: "James Brown",
    studid: "ID 1234567231",
    class: "Angular Development",
    fee: "200",
    status: "Paid",
  },
];
export const UnpaidCompanyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 5;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = tableData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(tableData.length / recordsPage);
  const number = [...Array(npage + 1).keys()].slice(1);
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <div className="table-responsive basic-tbl">
      <div id="trainer-table_wrapper" className="dataTables_wrapper no-footer">
        <table id="example-1" className="display dataTable no-footer w-100">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Training</th>
              <th>Fees</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, ind) => (
              <tr key={ind}>
                <td>
                  <div className="trans-list">
                    <img
                      src={item.image}
                      alt=""
                      className="avatar avatar-sm me-3"
                    />
                    <h4>{item.name}</h4>
                  </div>
                </td>
                <td>
                  <span className="text-primary font-w600">{item.studid}</span>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="icon-box icon-box-sm bg-secondary">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.7055 6.52503C12.7055 6.73128 12.6914 6.93753 12.6656 7.14144C12.6773 7.05941 12.689 6.97503 12.6984 6.893C12.6422 7.30081 12.5344 7.69691 12.3773 8.07659C12.4078 8.00159 12.4406 7.92659 12.4711 7.85159C12.314 8.22191 12.1125 8.56878 11.8664 8.88753C11.9156 8.82425 11.9648 8.76097 12.014 8.69769C11.7703 9.01175 11.4867 9.29534 11.1726 9.53909C11.2359 9.48987 11.2992 9.44066 11.3625 9.39144C11.0437 9.63519 10.6969 9.83909 10.3265 9.99612C10.4015 9.96566 10.4765 9.93284 10.5515 9.90237C10.1719 10.0594 9.77577 10.1672 9.36795 10.2235C9.44998 10.2117 9.53436 10.2 9.61639 10.1907C9.20623 10.2446 8.79373 10.2446 8.38358 10.1907C8.46561 10.2024 8.54998 10.2141 8.63201 10.2235C8.2242 10.1672 7.82811 10.0594 7.44842 9.90237C7.52342 9.93284 7.59842 9.96566 7.67342 9.99612C7.30311 9.83909 6.95623 9.63753 6.63748 9.39144C6.70076 9.44066 6.76404 9.48987 6.82732 9.53909C6.51326 9.29534 6.22967 9.01175 5.98592 8.69769C6.03514 8.76097 6.08436 8.82425 6.13357 8.88753C5.88982 8.56878 5.68592 8.22191 5.52889 7.85159C5.55936 7.92659 5.59217 8.00159 5.62264 8.07659C5.4656 7.69691 5.35779 7.30081 5.30154 6.893C5.31326 6.97503 5.32498 7.05941 5.33436 7.14144C5.28045 6.73128 5.28045 6.31878 5.33436 5.90863C5.32264 5.99066 5.31092 6.07503 5.30154 6.15706C5.35779 5.74925 5.4656 5.35316 5.62264 4.97347C5.59217 5.04847 5.55936 5.12347 5.52889 5.19847C5.68592 4.82816 5.88748 4.48128 6.13357 4.16253C6.08436 4.22581 6.03514 4.28909 5.98592 4.35238C6.22967 4.03831 6.51326 3.75472 6.82732 3.51097C6.76404 3.56019 6.70076 3.60941 6.63748 3.65863C6.95623 3.41488 7.30311 3.21097 7.67342 3.05394C7.59842 3.08441 7.52342 3.11722 7.44842 3.14769C7.82811 2.99066 8.2242 2.88284 8.63201 2.82659C8.54998 2.83831 8.46561 2.85003 8.38358 2.85941C8.79373 2.8055 9.20623 2.8055 9.61639 2.85941C9.53436 2.84769 9.44998 2.83597 9.36795 2.82659C9.77577 2.88284 10.1719 2.99066 10.5515 3.14769C10.4765 3.11722 10.4015 3.08441 10.3265 3.05394C10.6969 3.21097 11.0437 3.41253 11.3625 3.65863C11.2992 3.60941 11.2359 3.56019 11.1726 3.51097C11.4867 3.75472 11.7703 4.03831 12.014 4.35238C11.9648 4.28909 11.9156 4.22581 11.8664 4.16253C12.1101 4.48128 12.314 4.82816 12.4711 5.19847C12.4406 5.12347 12.4078 5.04847 12.3773 4.97347C12.5344 5.35316 12.6422 5.74925 12.6984 6.15706C12.6867 6.07503 12.675 5.99066 12.6656 5.90863C12.6914 6.11253 12.7031 6.31878 12.7055 6.52503C12.7078 7.01487 13.1344 7.48597 13.643 7.46253C14.1492 7.43909 14.5828 7.05003 14.5805 6.52503C14.5758 5.40238 14.2383 4.25394 13.5773 3.33988C13.3992 3.09378 13.2094 2.85238 12.9984 2.63441C12.7851 2.41409 12.5508 2.22425 12.307 2.03909C11.864 1.70159 11.3695 1.45316 10.8445 1.26097C8.72811 0.485188 6.17576 1.17659 4.74373 2.92034C4.54685 3.15941 4.35935 3.40784 4.19998 3.67503C4.0406 3.93988 3.91639 4.22113 3.80154 4.50706C3.58592 5.03675 3.47576 5.59925 3.43123 6.16878C3.34451 7.28441 3.63513 8.44925 4.21639 9.4055C4.77654 10.3289 5.62264 11.1211 6.6117 11.5688C6.90233 11.7 7.19998 11.8219 7.50936 11.9086C7.81639 11.993 8.12811 12.0399 8.44451 12.0774C9.02108 12.1453 9.60936 12.0985 10.1789 11.9836C12.3422 11.543 14.1539 9.67972 14.4891 7.493C14.5383 7.17425 14.5758 6.8555 14.5758 6.53206C14.5781 6.04222 14.1422 5.57113 13.6383 5.59456C13.132 5.61097 12.7055 6.00003 12.7055 6.52503ZM15.8156 21.1805C15.3562 21.1805 14.8969 21.1805 14.4375 21.1805C13.343 21.1805 12.2508 21.1805 11.1562 21.1805C9.83905 21.1805 8.52186 21.1805 7.20233 21.1805C6.06561 21.1805 4.92889 21.1805 3.78982 21.1805C3.25779 21.1805 2.72576 21.1852 2.19373 21.1805C2.13513 21.1805 2.07654 21.1758 2.02029 21.1688C2.10232 21.1805 2.1867 21.1922 2.26873 21.2016C2.17498 21.1875 2.08591 21.1617 1.9992 21.1266C2.0742 21.1571 2.1492 21.1899 2.2242 21.2203C2.13045 21.1805 2.04373 21.1289 1.9617 21.0657C2.02498 21.1149 2.08826 21.1641 2.15154 21.2133C2.08123 21.1547 2.0156 21.0914 1.95935 21.0211C2.00857 21.0844 2.05779 21.1477 2.10701 21.211C2.04373 21.1289 1.99451 21.0422 1.95232 20.9485C1.98279 21.0235 2.0156 21.0985 2.04607 21.1735C2.01091 21.0867 1.98748 20.9953 1.97107 20.9039C1.98279 20.986 1.99451 21.0703 2.00388 21.1524C1.96638 20.8688 1.99216 20.5688 1.99216 20.2828C1.99216 19.9477 1.99216 19.6149 1.99216 19.2797C1.99216 19.0289 2.00623 18.7805 2.03904 18.5321C2.02732 18.6141 2.0156 18.6985 2.00623 18.7805C2.07185 18.3 2.19841 17.8289 2.38826 17.3813C2.35779 17.4563 2.32498 17.5313 2.29451 17.6063C2.47732 17.1797 2.7117 16.7789 2.99529 16.411C2.94607 16.4742 2.89685 16.5375 2.84763 16.6008C3.13123 16.2375 3.45701 15.9094 3.82264 15.6258C3.75935 15.675 3.69607 15.7242 3.63279 15.7735C4.00076 15.4899 4.40154 15.2555 4.8281 15.0727C4.7531 15.1032 4.6781 15.136 4.6031 15.1664C5.05076 14.9789 5.51951 14.85 6.00232 14.7844C5.92029 14.7961 5.83592 14.8078 5.75389 14.8172C6.10076 14.7727 6.44529 14.7703 6.79451 14.7703C7.22342 14.7703 7.65233 14.7703 8.08123 14.7703C9.08201 14.7703 10.0828 14.7703 11.0836 14.7703C11.4703 14.7703 11.8547 14.768 12.2414 14.8172C12.1594 14.8055 12.075 14.7938 11.993 14.7844C12.4734 14.85 12.9445 14.9766 13.3922 15.1664C13.3172 15.136 13.2422 15.1032 13.1672 15.0727C13.5937 15.2555 13.9945 15.4899 14.3625 15.7735C14.2992 15.7242 14.2359 15.675 14.1726 15.6258C14.5359 15.9094 14.864 16.2352 15.1476 16.6008C15.0984 16.5375 15.0492 16.4742 15 16.411C15.2836 16.7789 15.518 17.1797 15.7008 17.6063C15.6703 17.5313 15.6375 17.4563 15.607 17.3813C15.7945 17.8289 15.9234 18.2977 15.9891 18.7805C15.9773 18.6985 15.9656 18.6141 15.9562 18.5321C16.0008 18.886 16.0031 19.2375 16.0031 19.5938C16.0031 19.9805 16.0031 20.3672 16.0031 20.7539C16.0031 20.8875 16.0078 21.0211 15.9914 21.1524C16.0031 21.0703 16.0148 20.986 16.0242 20.9039C16.0101 20.9977 15.9844 21.0867 15.9492 21.1735C15.9797 21.0985 16.0125 21.0235 16.043 20.9485C16.0031 21.0422 15.9516 21.1289 15.8883 21.211C15.9375 21.1477 15.9867 21.0844 16.0359 21.0211C15.9773 21.0914 15.9141 21.1571 15.8437 21.2133C15.907 21.1641 15.9703 21.1149 16.0336 21.0657C15.9516 21.1289 15.8648 21.1782 15.7711 21.2203C15.8461 21.1899 15.9211 21.1571 15.9961 21.1266C15.9094 21.1617 15.818 21.1852 15.7266 21.2016C15.8086 21.1899 15.893 21.1782 15.975 21.1688C15.9234 21.1758 15.8695 21.1782 15.8156 21.1805C15.5742 21.1828 15.3258 21.2836 15.1523 21.4547C14.9906 21.6164 14.8664 21.8836 14.8781 22.118C14.9015 22.6196 15.2906 23.0625 15.8156 23.0555C16.7273 23.0414 17.5289 22.4461 17.7961 21.5719C17.9016 21.225 17.8781 20.8524 17.8781 20.4961C17.8781 19.6805 17.9039 18.8719 17.7633 18.0633C17.557 16.8797 16.9617 15.7664 16.1461 14.8922C15.3305 14.018 14.2336 13.3758 13.0734 13.0899C12.4078 12.9258 11.7375 12.9 11.0578 12.9C10.3594 12.9 9.66327 12.9 8.96483 12.9C8.27576 12.9 7.58904 12.9 6.89998 12.9C6.20389 12.9 5.51248 12.9328 4.83514 13.1133C3.68435 13.418 2.60154 14.0672 1.80232 14.9485C0.99607 15.8367 0.412476 16.9524 0.222632 18.143C0.0960691 18.9422 0.12185 19.7438 0.12185 20.55C0.12185 20.9203 0.100757 21.3071 0.23435 21.661C0.407788 22.1157 0.684351 22.4742 1.08982 22.7438C1.40623 22.9524 1.80701 23.0532 2.18201 23.0578C2.36482 23.0602 2.54763 23.0578 2.73045 23.0578C3.1992 23.0578 3.6656 23.0578 4.13435 23.0578C4.79998 23.0578 5.46326 23.0578 6.12889 23.0578C6.90233 23.0578 7.67576 23.0578 8.4492 23.0578C9.24373 23.0578 10.0359 23.0578 10.8305 23.0578C11.557 23.0578 12.2812 23.0578 13.0078 23.0578C13.5773 23.0578 14.1469 23.0578 14.714 23.0578C15.0398 23.0578 15.3656 23.0578 15.6914 23.0578C15.7336 23.0578 15.7758 23.0578 15.818 23.0578C16.3078 23.0578 16.7789 22.6266 16.7555 22.1203C16.732 21.6094 16.343 21.1805 15.8156 21.1805Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="ms-2">
                      <span className="mb-0">Training Module</span>
                      <h6 className="text-primary mb-0 font-w600">
                        {item.class}
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="doller font-w600"> INR {item.fee}</span>
                </td>
                <td>{item.status}</td>
                <td>
                  <ul className="tbl-action">
                    <li>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_6_400-6)">
                          <path
                            d="M23 19H18.93C18.6648 19 18.4104 18.8946 18.2229 18.7071C18.0354 18.5196 17.93 18.2652 17.93 18V15H6V18C6 18.2652 5.89464 18.5196 5.70711 18.7071C5.51957 18.8946 5.26522 19 5 19H1C0.734784 19 0.48043 18.8946 0.292893 18.7071C0.105357 18.5196 0 18.2652 0 18V8C0 7.20435 0.31607 6.44129 0.87868 5.87868C1.44129 5.31607 2.20435 5 3 5H21C21.7956 5 22.5587 5.31607 23.1213 5.87868C23.6839 6.44129 24 7.20435 24 8V18C24 18.2652 23.8946 18.5196 23.7071 18.7071C23.5196 18.8946 23.2652 19 23 19ZM19.93 17H22V8C22.0015 7.86827 21.9766 7.73757 21.9269 7.61558C21.8771 7.49359 21.8035 7.38276 21.7104 7.28961C21.6172 7.19646 21.5064 7.12285 21.3844 7.07312C21.2624 7.02339 21.1317 6.99853 21 7H3C2.86827 6.99853 2.73757 7.02339 2.61558 7.07312C2.49359 7.12285 2.38276 7.19646 2.28961 7.28961C2.19646 7.38276 2.12285 7.49359 2.07312 7.61558C2.02339 7.73757 1.99853 7.86827 2 8V17H4V14C4 13.7348 4.10536 13.4804 4.29289 13.2929C4.48043 13.1054 4.73478 13 5 13H18.93C19.1952 13 19.4496 13.1054 19.6371 13.2929C19.8246 13.4804 19.93 13.7348 19.93 14V17Z"
                            fill="#A098AE"
                          />
                          <path
                            d="M18.9331 7H5.00012C4.73491 7 4.48055 6.89464 4.29302 6.70711C4.10548 6.51957 4.00012 6.26522 4.00012 6V1C4.00012 0.734784 4.10548 0.48043 4.29302 0.292893C4.48055 0.105357 4.73491 0 5.00012 0L18.9331 0C19.1983 0 19.4527 0.105357 19.6402 0.292893C19.8278 0.48043 19.9331 0.734784 19.9331 1V6C19.9331 6.26522 19.8278 6.51957 19.6402 6.70711C19.4527 6.89464 19.1983 7 18.9331 7ZM6.00012 5H17.9331V2H6.00012V5ZM17.0331 24H6.90012C6.13099 24 5.39337 23.6945 4.84951 23.1506C4.30566 22.6068 4.00012 21.8691 4.00012 21.1V14C4.00012 13.7348 4.10548 13.4804 4.29302 13.2929C4.48055 13.1054 4.73491 13 5.00012 13H18.9301C19.1953 13 19.4497 13.1054 19.6372 13.2929C19.8248 13.4804 19.9301 13.7348 19.9301 14V21.1C19.9301 21.8686 19.625 22.6058 19.0818 23.1495C18.5386 23.6933 17.8017 23.9992 17.0331 24ZM6.00012 15V21.1C6.00012 21.3387 6.09494 21.5676 6.26373 21.7364C6.43251 21.9052 6.66143 22 6.90012 22H17.0331C17.2718 22 17.5007 21.9052 17.6695 21.7364C17.8383 21.5676 17.9331 21.3387 17.9331 21.1V15H6.00012ZM20.0001 10H19.0001C18.7349 10 18.4806 9.89464 18.293 9.70711C18.1055 9.51957 18.0001 9.26522 18.0001 9C18.0001 8.73478 18.1055 8.48043 18.293 8.29289C18.4806 8.10536 18.7349 8 19.0001 8H20.0001C20.2653 8 20.5197 8.10536 20.7072 8.29289C20.8948 8.48043 21.0001 8.73478 21.0001 9C21.0001 9.26522 20.8948 9.51957 20.7072 9.70711C20.5197 9.89464 20.2653 10 20.0001 10Z"
                            fill="#A098AE"
                          />
                          <path
                            d="M14.9999 18H8.99988C8.73466 18 8.48031 17.8946 8.29277 17.7071C8.10523 17.5196 7.99988 17.2652 7.99988 17C7.99988 16.7348 8.10523 16.4804 8.29277 16.2929C8.48031 16.1054 8.73466 16 8.99988 16H14.9999C15.2651 16 15.5194 16.1054 15.707 16.2929C15.8945 16.4804 15.9999 16.7348 15.9999 17C15.9999 17.2652 15.8945 17.5196 15.707 17.7071C15.5194 17.8946 15.2651 18 14.9999 18ZM11.9999 21H8.99988C8.73466 21 8.48031 20.8946 8.29277 20.7071C8.10523 20.5196 7.99988 20.2652 7.99988 20C7.99988 19.7348 8.10523 19.4804 8.29277 19.2929C8.48031 19.1054 8.73466 19 8.99988 19H11.9999C12.2651 19 12.5194 19.1054 12.707 19.2929C12.8945 19.4804 12.9999 19.7348 12.9999 20C12.9999 20.2652 12.8945 20.5196 12.707 20.7071C12.5194 20.8946 12.2651 21 11.9999 21Z"
                            fill="#A098AE"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6_400-6">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <Dropdown className="custom-dropdown ">
                        <Dropdown.Toggle
                          as="div"
                          className="btn sharp tp-btn i-false"
                        >
                          <svg
                            width="18"
                            height="6"
                            viewBox="0 0 24 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.0012 0.359985C11.6543 0.359985 11.3109 0.428302 10.9904 0.561035C10.67 0.693767 10.3788 0.888317 10.1335 1.13358C9.88829 1.37883 9.69374 1.67 9.56101 1.99044C9.42828 2.31089 9.35996 2.65434 9.35996 3.00119C9.35996 3.34803 9.42828 3.69148 9.56101 4.01193C9.69374 4.33237 9.88829 4.62354 10.1335 4.8688C10.3788 5.11405 10.67 5.3086 10.9904 5.44134C11.3109 5.57407 11.6543 5.64239 12.0012 5.64239C12.7017 5.64223 13.3734 5.36381 13.8686 4.86837C14.3638 4.37294 14.6419 3.70108 14.6418 3.00059C14.6416 2.3001 14.3632 1.62836 13.8677 1.13315C13.3723 0.637942 12.7004 0.359826 12 0.359985H12.0012ZM3.60116 0.359985C3.25431 0.359985 2.91086 0.428302 2.59042 0.561035C2.26997 0.693767 1.97881 0.888317 1.73355 1.13358C1.48829 1.37883 1.29374 1.67 1.16101 1.99044C1.02828 2.31089 0.959961 2.65434 0.959961 3.00119C0.959961 3.34803 1.02828 3.69148 1.16101 4.01193C1.29374 4.33237 1.48829 4.62354 1.73355 4.8688C1.97881 5.11405 2.26997 5.3086 2.59042 5.44134C2.91086 5.57407 3.25431 5.64239 3.60116 5.64239C4.30165 5.64223 4.97339 5.36381 5.4686 4.86837C5.9638 4.37294 6.24192 3.70108 6.24176 3.00059C6.2416 2.3001 5.96318 1.62836 5.46775 1.13315C4.97231 0.637942 4.30045 0.359826 3.59996 0.359985H3.60116ZM20.4012 0.359985C20.0543 0.359985 19.7109 0.428302 19.3904 0.561035C19.07 0.693767 18.7788 0.888317 18.5336 1.13358C18.2883 1.37883 18.0937 1.67 17.961 1.99044C17.8283 2.31089 17.76 2.65434 17.76 3.00119C17.76 3.34803 17.8283 3.69148 17.961 4.01193C18.0937 4.33237 18.2883 4.62354 18.5336 4.8688C18.7788 5.11405 19.07 5.3086 19.3904 5.44134C19.7109 5.57407 20.0543 5.64239 20.4012 5.64239C21.1017 5.64223 21.7734 5.36381 22.2686 4.86837C22.7638 4.37294 23.0419 3.70108 23.0418 3.00059C23.0416 2.3001 22.7632 1.62836 22.2677 1.13315C21.7723 0.637942 21.1005 0.359826 20.4 0.359985H20.4012Z"
                              fill="#A098AE"
                            />
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                          <Dropdown.Item>Delete</Dropdown.Item>
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item>Copy</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-sm-flex text-center justify-content-between align-items-center">
          <div className="dataTables_info">
            Showing {lastIndex - recordsPage + 1} to{" "}
            {tableData.length < lastIndex ? tableData.length : lastIndex} of{" "}
            {tableData.length} entries
          </div>
          <div
            className="dataTables_paginate paging_simple_numbers justify-content-center"
            id="example2_paginate"
          >
            <Link
              className="paginate_button previous disabled"
              to="#"
              onClick={prePage}
            >
              <i className="fa-solid fa-angle-left" />
            </Link>
            <span>
              {number.map((n, i) => (
                <Link
                  className={`paginate_button ${
                    currentPage === n ? "current" : ""
                  } `}
                  key={i}
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </Link>
              ))}
            </span>
            <Link className="paginate_button next" to="#" onClick={nextPage}>
              <i className="fa-solid fa-angle-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
