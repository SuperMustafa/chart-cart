
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import { toast } from 'react-toastify';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

export default function Product({ product }) {
  let { addToCart } = useContext(CartContext);
  let { addToWishList } = useContext(WishListContext);
  
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleLiked = async () => {
    setLiked(!liked);
    await addToUserWishList(product.id);
  };

  async function addToUserWishList(productId) {
    let response = await addToWishList(productId);
    if (response.status === 'success') {
      toast.info('Product added successfully to your wish list');
    } else {
      toast.error(response.response.data.message);
    }
    console.log(response);
  }

  async function addProductToCart(productId) {
    setLoading(true);
    let response = await addToCart(productId);
    if (response.status === 'success') {
      setLoading(false);
      toast.info(response.message, {
        position: 'top-left',
        theme: 'dark',
        autoClose: 5000,
      });
    } else if (response.message !== 'success') {
      toast.error('Something bad just happened', {
        position: 'top-right',
        theme: 'dark',
        autoClose: 5000,
      });
    }
  }

  return (
    <div key={product.id} className="w-full lg:w-1/4 px-3 p-2 product my-2 cursor-pointer relative">
      <div className="heart">
        <i 
          onClick={toggleLiked}
          style={{ color: liked ? 'red' : 'black', cursor: 'pointer' }}
          className="fa-solid fa-heart text-3xl text-slate-700 absolute right-7 top-7"
        ></i>
      </div>

      <Link to={`/product-details/${product.id}/${product.category.name}`}>
        <div>
          <img className="w-full object-cover" src={product.imageCover} alt={product.title} />
          <h4 className="text-blue-600 my-2">{product.category.name}</h4>
          <h4 className="font-semibold text-slate-700">{product.title.split(' ').slice(0, 2).join(' ')}</h4>
          <div className="flex justify-between items-center">
            <span className="font-bold">{product.price} EGP</span>
            <i className="fas fa-star text-yellow-400"></i>
          </div>
        </div>
      </Link>
      <button
        onClick={() => addProductToCart(product.id)}
        className="Btn bg-blue-600 text-white p-2 rounded-md w-full mt-2"
      >
        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add to Cart"}
      </button>
    </div>
  );
}
