import { useState } from "react";
import React from 'react'
import { MyOrderr } from "../../components/config/OrderItem";
import { useEffect } from "react";

const MyOrder = () => {
    const [ListOrder, setListOrder] = useState([]);
    const token = localStorage.getItem('token');




    useEffect(() => {
        getListOrderItem();
    }, [token])
    const getListOrderItem = async () => {
        let res = await MyOrderr();
        console.log("Check Cart List >>>", res);
        setListOrder(res);
    };
    return (
        <>
            <div>
                <div className='myorder' style={{ paddingLeft: 100, paddingBottom: 50, paddingTop: 10 }}>
                    <h1>Trach My Order</h1>
                </div>
                <div>
                    <table style={{ paddingLeft: 100, width: 1000, height: 400 }} >
                        <thead>
                            <tr>
                                <th >
                                    ID
                                </th>

                                <th style={{ paddingLeft: 0 }}>
                                    Name
                                </th>
                                <th style={{ paddingLeft: 80 }}>
                                    Created At
                                </th>
                                <th style={{ paddingLeft: 80 }}>
                                    Updated At
                                </th>
                                <th style={{ paddingLeft: 80 }}>
                                    Payment
                                </th>
                                <th style={{ paddingLeft: 80 }}>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListOrder && ListOrder.length > 0 &&
                                ListOrder.map((item, index) => {
                                    return (
                                        <tr>
                                            <td >{item.id}</td>
                                            <td style={{ paddingLeft: 10 }}> {item.user_id} </td>
                                            <td style={{ paddingLeft: 10 }}>{item.created_at}</td>
                                            <td style={{ paddingLeft: 80 }}>{item.updated_at}</td>
                                            <td style={{ paddingLeft: 80 }}> {item.payment} </td>
                                            <td style={{ paddingLeft: 80 }}>{item.status}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default MyOrder
