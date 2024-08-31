import React, { useContext, useEffect, useState } from 'react'
import classes from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';




export default function Cart() {

    let { getCart, CartData, CartItemsCount, removeFromCart, updateProductQty } = useContext(CartContext);
    let { userToken } = useContext(AuthContext);
    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState(false)


    async function getCartInfo() {
        setLoading(true);
        let response = await getCart();
        if (response.Status === 'success') {
            setLoading(false);

            console.log(response);
        }
        else {
            console.log(response);
            setError(true)

        }
    }

    async function deleteItem(productId) {
        setLoading(true);

        let response = await removeFromCart(productId);
        if (response.status === 'success') {
            setLoading(false);

            toast.info('Item deleted successfully from cart ')
        }
        else {
            toast.error('something wrong happen')
        }
    }


    async function updateProductQuantity(productId, count) {
        setLoading(true);

        let response = await updateProductQty(productId, count);
        if (response.status === 'success') {
            setLoading(false);

            toast.info('Item Count updated')
        }
        else {
            toast.error('something wrong happen')
        }
    }


    useEffect(() => {

        userToken && getCartInfo();

    }, [userToken])





    return (


        <>
            

<div className="container mx-auto px-4">
  {CartData && (
    <>
      <div className="box flex flex-col lg:flex-row justify-between items-center mb-4">
        <div className="numberOfProducts mb-4 lg:mb-0">
          <h2 className='bg-sky-800 p-3 text-white font-bold text-xl lg:text-2xl rounded-lg'>
            Total Cart Products: {CartItemsCount}
          </h2>
        </div>

        <div className="totalPrice">
          <h2 className='bg-sky-800 p-3 text-white font-bold text-xl lg:text-2xl rounded-lg'>
            Total Price: {CartData.totalCartPrice}
          </h2>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-blue-500 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {CartData.products.map((product) => (
              <tr key={product.product.id} className="bg-blue-300 cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => updateProductQuantity(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 mr-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Decrease quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <h3>{product.count}</h3>
                    <button onClick={() => updateProductQuantity(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Increase quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  <div className='flex'>
                    <p>{product.price}</p>
                    <span className='mx-2'>$</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteItem(product.product.id)} className='bg-red-500 p-2 md:p-3 rounded-lg text-white'>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={'/checkOut'} className='bg-blue-600 hover:bg-blue-400 text-white rounded-lg p-2 md:p-4 block w-2/3 md:w-1/3 text-center my-6 md:my-10 text-lg md:text-2xl mx-auto'>
          Go to Payment
        </Link>
      </div>
    </>
  )}
</div>

        </>

    )




}









