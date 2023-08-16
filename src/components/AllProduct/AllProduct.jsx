import './allproduct.css'
import { SearchProduct, fetchAllProduct } from '../config/ProductService'
import ReactStars from 'react-stars'
import React, { useState, useEffect } from "react"

import _, { debounce, times } from "lodash";
import { useParams } from 'react-router-dom'
import { CategoryAll } from '../config/CategoryService'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
const AllProduct = (props) => {
    const data = [
        {
            cateImg: "./images/category/cat1.png",
            cateName: "Fashion",
        },
        {
            cateImg: "./images/category/cat2.png",
            cateName: "Electronic",
        },
        {
            cateImg: "./images/category/cat3.png",
            cateName: "Cars",
        },
        {
            cateImg: "./images/category/cat4.png",
            cateName: "Home & Garden",
        },
        {
            cateImg: "./images/category/cat5.png",
            cateName: "Gifts",
        },
        {
            cateImg: "./images/category/cat6.png",
            cateName: "Music",
        },
        {
            cateImg: "./images/category/cat7.png",
            cateName: "Health & Beauty",
        },
        {
            cateImg: "./images/category/cat8.png",
            cateName: "Pets",
        },
        {
            cateImg: "./images/category/cat9.png",
            cateName: "Baby Toys",
        },
        {
            cateImg: "./images/category/cat10.png",
            cateName: "Groceries",
        },
        {
            cateImg: "./images/category/cat11.png",
            cateName: "Books",
        },
    ]
    const { search } = useParams();
    const [ListProduct, setListProduct] = useState([]);
    const [count, setCount] = useState(0)
    const [sortBy, setSorBy] = useState("asc");
    const [sorField, setSortField] = useState("id");
    const [Categories, setCategories] = useState([]);
    const increment = () => {
        setCount(count + 1)
    }
    useEffect(() => {

        getUser();
    }, [search])
    const getUser = async () => {
        let res = await SearchProduct(search);
        console.log('check search', res);
        setListProduct(res.slice(0, 9));
    }

    const handelSor = (sortBy, sorField) => {
        setSorBy(sortBy);
        setSortField(sorField);

        let clonelistUsers = _.cloneDeep(ListProduct);
        clonelistUsers = _.orderBy(clonelistUsers, [sorField], [sortBy]);
        setListProduct(clonelistUsers);
    }



    useEffect(() => {

        getCategories();
    }, [])

    const getCategories = async () => {
        let res = await CategoryAll();
        console.log('check product', res)

        setCategories(res);

    }
    return (
        <>

            <div className='arrange-product container d_flex'>
                <div className='contentWidth '>
                    <div className='grid1 product-content'>

                    </div>

                </div>

            </div>
            <div className='container d_flex'>

                <div className='category'>
                    <div className='chead d_flex'>
                        <h1>Categories </h1>

                    </div>
                    {Categories.map((item, index) => {
                        return (
                            <div className='box f_flex' key={item.id}>
                                <img src={item.image_url} alt='' />
                                <span>{item.name}</span>
                            </div>
                        )
                    })}
                    <div className='box box2'>
                        <button>View All Brands</button>
                    </div>
                </div>
                <div className='contentWidth'>
                    <div className='heading d_flex'>

                        <div className='heading-right row '>
                            <h1 className='text-search'> Search <strong className=''>{search}</strong></h1>

                        </div>
                    </div>
                    <p></p>
                    <div className='heading container'>
                        <div className='d_flex '>
                            <strong>Sắp xếp theo: </strong>
                            <div className='checkbox-arrange'>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("desc", "name")} />
                                Tên A-Z
                            </div>

                            <div>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("asc", "name")} />
                                Tên Z-A
                            </div>
                            <div>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("desc", "id")} />
                                Hàng mới
                            </div>
                            <div>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("asc", "price")} />
                                Giá cao đến thấp
                            </div>
                            <div>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("desc", "price")} />
                                Giá thấp đến cao
                            </div>

                        </div>
                    </div>
                    <div className='product-content  grid1'>
                        {
                            ListProduct.map((item, index) => {
                                return (
                                    <div className='box' key={item.id} >
                                        <div className='product mtop'>
                                            <div className='img'>
                                                <span className='discount'>{item.id}% Off</span>
                                                <img className='image-allproduct' src={item.image_url} alt='' />
                                                <div className='product-like'>
                                                    <label>{count}</label> <br />
                                                    <i className='fa-regular fa-heart'  ></i>
                                                    <br />
                                                    <i class="detail fa-sharp fa-regular fa-eye"></i>
                                                </div>
                                            </div>
                                            <div className='product-details'>
                                                <NavLink to={`/produkDetil/${item.id}`}><h3 >{item.name}</h3></NavLink>
                                                <div className='rate'>
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={4}
                                                        edit={false}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                                <div className='price'>
                                                    <h4>${item.price}.00 </h4>
                                                    {/* step : 3  
                                                        if hami le button ma click garryo bahne 
                                                        */}
                                                    <button >
                                                        <i className='fa fa-plus'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default AllProduct
