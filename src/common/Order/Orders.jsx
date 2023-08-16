import React, { useEffect, useState } from "react"
import { useParams, useHistory } from 'react-router-dom';
import { CartUserItemList, CartUserClear } from "../../components/config/CartService";
import { ProductDetaill } from "../../components/config/ProductService";
import { OrderItem } from "../../components/config/OrderItem";

import { toast } from 'react-toastify';
const Orders = () => {
    const navigate = useHistory()
    const [ListCartItem, setListCartItem] = useState([]);
    const [productCart, setProductCart] = useState([]);
    const [total_price, setTotal_Price] = useState("");
    const [customer_name, setCustomerName] = useState("");
    const [customer_email, setCustomerEmail] = useState("");
    const [shipping_address, setShippingAddress] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartIds, setCartItem] = useState('')
    const [payment, setPayment] = useState("cash")
    const [status, setStatucs] = useState("pending")
    const [CartClear, setCartClear] = useState([])
    const token = localStorage.getItem('token');

    const getListCartItem = async () => {
        let res = await CartUserItemList();
        console.log("Check Cart List >>>", res);

        setListCartItem(res);

        for (const item of res) {
            await getProductCart(item.product_id);
        }
    };

    const getProductCart = async (productId) => {
        const res = await ProductDetaill(productId);
        console.log("check product Cart detail >>>", res, productId);

        setProductCart((prevProductCart) => [...prevProductCart, res]);
    };
    const handleCartClear = async () => {

        const res = await CartUserClear();
        console.log('check clear >>>', res)

    }

    useEffect(() => {
        getListCartItem();
    }, [token]);
    useEffect(() => {
        setProductCart([]);
        for (const item of ListCartItem) {
            getProductCart(item.product_id);
        }
    }, [ListCartItem]);

    useEffect(() => {
        const totalPrice = ListCartItem.reduce((price, item) => item.total * item.quantity, 0);
        const cartIds = ListCartItem.find(item => item)?.cart_id;
        setTotalPrice(totalPrice);
        setCartItem(cartIds)
    }, [ListCartItem]);


    const addOrder = async () => {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (!customer_name || !customer_email || !shipping_address) {
                toast.error('Please provide all required information');
                return;
            }

            const response = await OrderItem(
                cartIds,
                totalPrice,
                customer_name,
                customer_email,
                shipping_address,
                'cash',
                'pending'
            );
            console.log('Check response >>>>>>>', response, cartIds, totalPrice, customer_email, customer_name, shipping_address);

            if (response) {
                toast.error('Could not create new order');
            } else {
                toast.success('Order created successfully');
                handleCartClear();
                navigate.push("/");


            }
        } catch (error) {
            console.error(error);
            toast.error('Error occurred while creating order');
        }
    };

    return (
        <>
            <section className='cart-itemss'>
                <div className='container d_flex'>
                    {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

                    <div className='cart-details'>

                        <div className="product">
                            <table >
                                <thead>
                                    <tr>
                                        <th >
                                            ID
                                        </th>
                                        <th style={{ paddingLeft: 60 }}>
                                            Image
                                        </th>
                                        <th style={{ paddingLeft: 80 }}>
                                            Name
                                        </th>
                                        <th style={{ paddingLeft: 80 }}>
                                            Price
                                        </th>
                                        <th style={{ paddingLeft: 80 }}>
                                            Quantity
                                        </th>
                                        {/* <th style={{ paddingLeft: 80 }}>
                                            Total
                                        </th> */}
                                        {/* <th style={{ paddingLeft: 80 }}>
                                            Hello
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {ListCartItem.map((item) => {

                                        // const productcart = productCart.find((product) => product.product_id === item.product_id);
                                        const productcart = productCart.find((product) => product.id === item.product_id);
                                        const productName = productcart && productcart.name ? productcart.name : 'Product Name Not Available';
                                        const productQty = item.price * (productcart && productcart.price)

                                        return (
                                            <tr>
                                                <td >{item.id}</td>
                                                <td style={{ paddingLeft: 60 }}> <img src={productcart && productcart.image_url} style={{ width: 95, height: 95 }} alt="" /> </td>
                                                <td style={{ paddingLeft: 80 }}>{productName}</td>
                                                <td style={{ paddingLeft: 80 }}>{productcart && productcart.price}</td>
                                                <td style={{ paddingLeft: 80 }}> {item.quantity} </td>
                                                <td style={{ paddingLeft: 80 }}>{item.total}</td>


                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>


                    </div>

                    <div className='cart-total product'>
                        <h2>Cart Summary</h2>
                        <div className=' d_flex'>
                            <div>
                                <div>
                                    <input id='customer_name' value={customer_name} className='inputlogin' type="text" placeholder='customer_name...'
                                        onChange={(event) => setCustomerName(event.target.value)}
                                    /><br />
                                </div>
                                <div>
                                    <input id='customer_email' value={customer_email} className='inputlogin' type="text" placeholder='customer_email...'
                                        onChange={(event) => setCustomerEmail(event.target.value)}
                                    /><br />
                                </div>
                                <div>
                                    <input id='shipping_address' value={shipping_address} className='inputlogin' type="email" placeholder='shipping_address...'
                                        onChange={(event) => setShippingAddress(event.target.value)}
                                    /><br />
                                    <input id='shipping_address' value={totalPrice} className='inputlogin' type="email" placeholder='shipping_address...'
                                        onChange={(event) => setTotalPrice(event.target.value)}
                                    /><br />
                                </div>

                            </div>

                        </div>
                        <div className="d_flex">
                            <h4>Total Price :</h4>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="checkout-cart">
                            <button className="checkout-item" onClick={() => addOrder()}>Check Out</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Orders
