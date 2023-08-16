import axios from './config'
// const OrderItem = (cart_id, total_price, customer_name, customer_email, shipping_address, payment, status) => {
//     const token = localStorage.getItem('token');
//     const data = {
//         orderItems: {
//             cart_id,
//             total_price,
//             customer_name,
//             customer_email,
//             shipping_address
//         },
//         order: {
//             payment,
//             status
//         }
//     };

//     return axios.post('order/', data, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// }
const OrderItem = async (cart_id, total_price, customerName, customerEmail, shippingAddress, payment, status) => {
    const token = localStorage.getItem('token');
    // const orderItems = cartItems.map(item => ({
    //     cart_id: item.cart_id,
    //     total_price: item.total_price,
    //     customer_name: customerName,
    //     customer_email: customerEmail,
    //     shipping_address: shippingAddress
    // }));

    const data = {
        orderItems: {
            cart_id: cart_id,
            total_price: total_price,
            customer_name: customerName,
            customer_email: customerEmail,
            shipping_address: shippingAddress
        },
        order: {
            payment,
            status
        }
    };

    try {
        const response = await axios.post('order/', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Could not create new order');
    }
};

const MyOrderr = () => {
    const token = localStorage.getItem('token');
    return axios.get('order/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export { OrderItem, MyOrderr };