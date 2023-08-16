import axios from './config'

const fetchAllProduct = () => {
    return axios.get('/api/products');
}

// const fetchAllProduct = () => {
//     return axios.get('/frontend/produkHome');
// }

const ProductDetaill = (id) => {
    return axios.get(`/api/products/${id}`)
}

const CategoryDetaill = (category_id) => {
    return axios.get(`/api/categories/${category_id}`)
}

const SearchProduct = (search) => {
    return axios.get(`api/products?search=${search}`)
}

const ProductReview = (id, rating, comment) => {
    const token = localStorage.getItem('token');
    return axios.post(`api/reviews/${id}`, { rating, comment }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

}
const LiseProductReview = (id) => {
    return axios.get(`api/reviews/${id}/reviews`)
}





export { fetchAllProduct, ProductDetaill, CategoryDetaill, SearchProduct, ProductReview, LiseProductReview };
