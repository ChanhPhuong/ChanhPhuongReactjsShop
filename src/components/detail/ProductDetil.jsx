import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import "./Detail.css";
import { CategoryDetaill, LiseProductReview, ProductDetaill, ProductReview } from "../config/ProductService";
import axios from "axios";
import { fetchAllProduct } from '../config/ProductService'
import ReactStars from 'react-stars'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { CartUserItem } from "../config/CartService";
import { toast } from 'react-toastify';


const ProductDetail = (props) => {
    const navigate = useHistory()
    const imgs = document.querySelectorAll('.img-select a');
    const [productt, setProductt] = useState([]);
    const [quantity, setQuatity] = useState(1);
    const [listProducreview, setListProductreview] = useState([])
    const [cartitem, setCartItem] = useState([]);
    const [rating, setRating] = useState("")
    const [comment, setComment] = useState("")
    const { id } = useParams();

    const [ListProduct, setListProduct] = useState([]);
    const [count, setCount] = useState(0)
    const [Categorys, setCategory] = useState([])

    const [product_id, setProduct_id] = useState(productt.id);

    const imgBtns = [...imgs];
    let imgId = 1;
    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });
    // useEffect(() => {
    //     const getProduct = async () => {
    //         const response = await fetch(`http://localhost:3001/frontend/produkDetil/${url}`);
    //         setProductt(await response.json());
    //         console.log('data>>>>', response)
    //     }
    //     getProduct();
    // }, []);

    const getProduct = async () => {
        const res = await ProductDetaill(id)
        console.log("check detaill >>>", res)
        setProductt(res)

    }
    const getListProductReview = async () => {
        const res = await LiseProductReview(id)
        console.log("check detaill >>>", res)
        setListProductreview(res)

    }

    const getCategory = async () => {
        const res = await CategoryDetaill(productt.category_id)
        console.log("check categori >>>", res)
        setCategory(res)

    }


    const increment = () => {
        setCount(count + 1)
    }
    useEffect(() => {
        getProduct();
        getListProductReview();
        // getUser();

    }, [])
    useEffect(() => {
        getCategory();
    }, [productt]);

    // useEffect(() => {
    //     getCartItem();
    // }, [])
    const getAuthToken = () => {
        return localStorage.getItem('authToken'); // Assuming you stored the token with the key 'authToken' in local storage
    };

    const addCartItem = async () => {
        try {
            const token = localStorage.getItem('token');

            // Kiểm tra token có tồn tại
            if (!token) {
                // Xử lý khi không có token
                return;
            }

            // Gửi yêu cầu thêm sản phẩm vào giỏ hàng đến API với bearer token
            const response = await CartUserItem(productt.id, quantity)

            // Xử lý phản hồi từ API
            if (response.status === 201) {
                toast.error('Đã xảy ra lỗi khi thêm vào giỏ hàng');

            } else {
                toast.success('Thêm vào giỏ hàng thành công');

            }
        } catch (error) {

            console.error(error);
            toast.error('Đã xảy ra lỗi khi gọi API');
        }
    };


    const getCartItem = async () => {
        const token = localStorage.getItem("token");

        // Kiểm tra token có tồn tại
        if (!token) {
            // Xử lý khi không có token
            alert("Lỗi ko lấy đc token!")
            return;
        }
        let res = await CartUserItem(productt.id, quantity)
        console.log("Check cart >>>>", res, productt.id)
        if (res && res.status === 401) {
            navigate.push("/login");
            toast.error('Đăng nhập mới đc mua hàng')


        }
        setCartItem(res)

    }
    const handleCartItem = () => {

        getCartItem();
    }
    // const getUser = async () => {
    //     let res = await fetchAllProduct();
    //     console.log('check userr', res)
    //     if (res && res.data) {
    //         setListProduct(res.data.slice(0, 3));
    //     }
    // }



    const handleReview = async () => {
        try {
            const token = localStorage.getItem('token');

            // Kiểm tra token có tồn tại
            if (!token) {
                // Xử lý khi không có token
                return;
            }

            // Gửi yêu cầu thêm sản phẩm vào giỏ hàng đến API với bearer token
            const response = await ProductReview(id, rating, comment);
            console.log("check res:", response, rating, comment)

            // Xử lý phản hồi từ API
            if (response.status === 400) {
                toast.error('Đánh giá tối đa là 5* ');

            } else {
                navigate.push(window.location.reload())
            }
        } catch (error) {

            console.error(error);
            toast.error('Đã xảy ra lỗi khi gọi API');
        }




    }
    function slideImage() {
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }

    window.addEventListener('resize', slideImage);

    return (
        <>
            <div style={{ height: 50 }}>

            </div>
            <div class="card-wrapper" >
                <div class="card">

                    <div class="product-imgs">
                        <div class="img-display">
                            <div class="img-showcase">
                                <img src={productt.image_url} alt="shoe image" />
                                <img src={productt.image_url} alt="shoe image" />
                                <img src={productt.image_url} alt="shoe image" />
                                <img src={productt.image_url} alt="shoe image" />
                            </div>
                        </div>
                        <div class="img-select">
                            <div class="img-item">
                                <a href="#" data-id="1">
                                    <img src={productt.image_url} alt="shoe image" />
                                </a>
                            </div>
                            <div class="img-item">
                                <a href="#" data-id="2">
                                    <img src={productt.image_url} alt="shoe image" />
                                </a>
                            </div>
                            <div class="img-item">
                                <a href="#" data-id="3">
                                    <img src={productt.image_url} alt="shoe image" />
                                </a>
                            </div>
                            <div class="img-item">
                                <a href="#" data-id="4">
                                    <img src={productt.image_url} alt="shoe image" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="product-content">
                        <h2 class="product-title">{productt.name}</h2>
                        <a href="#" class="product-link">visit nike store</a>
                        <div class="product-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>4.7(21)</span>
                        </div>

                        <div class="product-price">
                            <p class="last-price">Old Price: <span>$257.00 {productt.id} </span></p>
                            <p class="new-price">New Price: <span>${productt.price}.00 (5%)</span></p>
                        </div>

                        <div class="product-detail">
                            <h2>about this item: </h2>
                            <p>{productt.description}</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
                            <ul>
                                <li>Color: <span className="color-item" >
                                    <button className="color-item" style={{ backgroundColor: productt.color }}></button>
                                </span>
                                </li>
                                <li>Available: <span>in stock</span></li>
                                <li>Category: <span >
                                    <NavLink to={`/categorys/${productt.category_id}`}>{Categorys.name}</NavLink>

                                </span>
                                </li>
                                <li>Shipping Area: <span>All over the world</span></li>
                                <li>Shipping Fee: <span>Free</span></li>
                            </ul>
                        </div>

                        <div class="purchase-info">
                            <input type="number" min={1} value={quantity} max={10} onChange={(event) => setQuatity(event.target.value)} />
                            <button type="button" class="btn" onClick={() => addCartItem()}>
                                Add to Cart <i class="fas fa-shopping-cart"></i>
                            </button>
                            <button type="button" class="btn">Compare</button>
                        </div>

                        <div class="social-links">
                            <p>Share At: </p>
                            <a href="#">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div className="reviews">
                <p>
                    <h1>   Đánh Giá sản phẩm</h1>
                </p>
                <div className="list-reviews" >
                    {listProducreview && listProducreview.length > 0 &&
                        listProducreview.map((item, index) => {
                            return (
                                <div className="user-list-reviews f_flex" >
                                    <div className="f_flex">
                                        <i className='fa fa-user icon-circlee'></i>
                                    </div>
                                    <div className="list-user-product-reviews">
                                        <p className="use-name-reviews">Tên</p>
                                        <ReactStars
                                            count={5}
                                            size={18}
                                            value={item.rating}
                                            edit={false}
                                            activeC
                                            polor="#ffd700"
                                        />
                                        <address> <p className="use-name-reviews">{item.created_at}</p></address>
                                        <p>
                                            {item.comment}
                                        </p>
                                    </div>

                                </div>

                            )
                        })
                    }



                </div>

                <div>
                    <textarea class="form-control input-review" id="review" rows="3" value={comment} onChange={(event) => setComment(event.target.value)}>


                    </textarea>
                    <p></p>
                    <div className="f_flex" >
                        <ReactStars
                            count={1}
                            size={24}
                            value={1}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <span style={{ marginTop: 10 }}><select name="" id="" value={rating} onChange={(event) => setRating(event.target.value)} >
                            <option value={1} >1</option>
                            <option value={2} >2</option>
                            <option value={3} >3</option>
                            <option value={4} >4</option>
                            <option value={5} >5</option>
                        </select></span>
                        {/* <input type="text" name="" id="" value={rating} onChange={(event) => setRating(event.target.value)} /> */}
                    </div>
                    <p></p>
                    <button className="btn-review" style={{ marginTop: 10, marginBottom: 10 }} onClick={() => handleReview()}>Gửi</button>

                </div>
                <div>

                </div>
            </div >


        </>
    )
}

export default ProductDetail