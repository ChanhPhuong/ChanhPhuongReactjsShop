import React, { useState, useEffect } from "react"
import { CategoryAll } from "../config/CategoryService";

const Catg = () => {
  const data = [
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Apple",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Samasung",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Oppo",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Vivo",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Redimi",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Sony",
    },
  ]
  const [Categories, setCategories] = useState([]);

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
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Brands </h1>
          <h1>Shops </h1>
        </div>
        {Categories.map((value, index) => {
          return (
            <div className='box f_flex' key={value.id}>
              <img src={value.cateImg} alt='' />
              <span>{value.name}</span>
            </div>
          )
        })}
        <div className='box box2'>
          <button>View All Brands</button>
        </div>
      </div>
    </>
  )
}

export default Catg
