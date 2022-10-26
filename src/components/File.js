import React, { useEffect, useState } from 'react';
import { getWarehouseData } from './Get Data/Only';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default function File(props) {

    const [WarehouseData, setWarehouseData] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            navigator('/login')
        }
        getWarehouseUser();
    }, [])
    const getWarehouseUser = async () => {
        const record = await getWarehouseData()
        setWarehouseData(record);
    }

    return (
        <div className={props.pageFullWidth === false ? 'fullWidth' : 'smalWidth'}>
            <div class="d-flex bd-highlight bg-light shadow-lg  bg-body rounded mx-4 p-2 mt-2">
                <div class="p-2 bd-highlight"><h4 className=''>Warehouses</h4></div>
                <div class="ms-auto p-2 bd-highlight">
                    {/* <button className='btn btn-light btn-outline-warning text-dark'>Add Warehouse</button> */}
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-success mb-3"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Export Data to Excel Sheet"
                    />
                </div>
            </div>



            <div className='container mt-5  tableWidth'>

                <table className='table table-striped table-hover' id='table-to-xls'>
                    <thead className='brandBgColor'>

                        <td className='py-3' style={{ width: "5%" }}>ID</td>
                        <th className='py-3' style={{ width: "7%" }}>Name</th>
                        <th className='py-3' style={{ width: "15%" }}>Person Name</th>
                        <th className='py-3'>Person Phone</th>
                        <th className='py-3'>Location</th>
                        <th className='py-3'>Longitude</th>
                        <th className='py-3'>Latitude</th>
                    </thead>
                    <tbody>
                        {WarehouseData.map((row) => {
                            return <tr key={row.id}>
                                <td>{row.id}</td>
                                <td >{row.name}</td>
                                <td>{row.contact_person_name}</td>
                                <td>{row.contact_person_phone}</td>
                                <td>{row.location !== null ? row.location : '-----'}</td>
                                <td>{row.longitude !== null ? row.longitude : '-----'}</td>
                                <td>{row.latitude.slice(0, 10) + "\t" + row.latitude.slice(11, 19)}</td>
                            </tr>
                        })}
                    </tbody>

                </table>

            </div>
        </div>
    )
}
