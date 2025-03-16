import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const tableData = [
	{id:'1', name:'Yatin Xarma', subject:'Programming', qualification:'B.Tech', fee:'117.00', status:'Good'},
	{id:'2', name:'Hanu Chang', subject:'Basic Algorithm', qualification:'B.E', fee:'215.50', status:'Good'},
	{id:'3', name:'Jordan Nico', subject:'English', qualification:'B.A', fee:'210.70', status:'Good'},
	{id:'4', name:'Nadila Adja', subject:'History', qualification:'B.A', fee:'204.50', status:'Bad'},
	{id:'5', name:'James Brown', subject:'Commarce', qualification:'B.Com', fee:'217.70', status:'Good'},
	{id:'6', name:'Jack John', subject:'Software Engg', qualification:'B.Tech', fee:'200.10', status:'Bad'},
	{id:'7', name:'Tony Soap', subject:'It Engg', qualification:'B.Tech', fee:'217.70', status:'Good'},
	{id:'8', name:'Yatin Xarma', subject:'Programming', qualification:'B.Tech', fee:'117.00', status:'Good'},
	{id:'9', name:'Hanu Chang', subject:'Basic Algorithm', qualification:'B.E', fee:'215.50', status:'Bad'},
	{id:'10', name:'Jordan Nico', subject:'English', qualification:'B.A', fee:'210.70', status:'Good'},
	{id:'11', name:'Nadila Adja', subject:'History', qualification:'B.A', fee:'204.50', status:'Bad'},
	{id:'12', name:'James Brown', subject:'Commarce', qualification:'B.Com', fee:'217.70', status:'Good'},
	{id:'13', name:'Jack John', subject:'Software Engg', qualification:'B.Tech', fee:'200.10', status:'Bad'},
	{id:'14', name:'Tony Soap', subject:'It Engg', qualification:'B.Tech', fee:'217.70', status:'Good'},
	{id:'15', name:'Jordan Nico', subject:'English', qualification:'B.A', fee:'210.70', status:'Bad'},
	{id:'16', name:'Kohni Pandye', subject:'Sanskrit', qualification:'B.Tech', fee:'150.50', status:'Good'}	
];

export const TrainerDetails = () => {
    const [currentPage , setCurrentPage] = useState(1);  
    const recordsPage = 8;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;   
    const records = tableData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(tableData.length / recordsPage)
    const number = [...Array(npage + 1).keys()].slice(1)
    function prePage (){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage (id){
        setCurrentPage(id);
    }
    function nextPage (){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div className="table-responsive basic-tbl">
            <div id="trainer-table_wrapper" className="dataTables_wrapper no-footer">
                <table id="trainer-table" className="tech-data dataTable no-footer" style={{ minWidth: "798px"}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Qulification</th>
                            <th>Fee</th>
                            <th className="text-end">Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((item, ind)=>(
                            <tr key={ind}>
                                <td>{item.name}</td>
                                <td>{item.subject}</td>
                                <td>{item.qualification}</td>
                                <td>${item.fee}</td>
                                <td className="text-end"><span className={`badge badge-sm light badge-${item.status === "Good" ?  'success' : 'danger' }`}>{item.status}</span></td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                <div className="d-sm-flex text-center justify-content-between align-items-center">                           
                    <div className='dataTables_info'>
                        Showing {lastIndex-recordsPage + 1} to{" "}
                        {tableData.length < lastIndex ? tableData.length : lastIndex}
                        {" "}of {tableData.length} entries
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
                            {number.map((n , i )=>(
                                <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                    onClick={()=>changeCPage(n)}
                                > 
                                    {n}                                                

                                </Link>
                            ))}
                        </span>
                        <Link
                            className="paginate_button next"
                            to="#"                                        
                            onClick={nextPage}
                        >
                            <i className="fa-solid fa-angle-right" />
                        </Link>
                    </div>
                </div> 
            </div>	
        </div>
    )
}
