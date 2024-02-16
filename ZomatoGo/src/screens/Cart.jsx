import React, { useState } from 'react'
import { useCart, useDispatchCart } from '../componants/ContextReducer';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  let data = useCart();
  console.log(data)
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div>The Cart is Empty!</div>
      </div>

    )
  }

  // ... other functions for adding items to cart, removing items, etc.


  let Totaprice = data.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <table className="table-auto w-full rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Options</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      {item.image && (
                        <img
                          src={item.image}
                          className="w-16 h-16 rounded mr-4"
                        />
                      )}
                      <div>{item.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-2 rounded mr-2"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.qty}
                        disabled
                        className="w-16 text-center border border-gray-300 rounded"
                      />
                      <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-2 rounded ml-2"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-left">
                    <ul className="list-disc ml-4 ">
                      <li >{item.size}</li>
                    </ul>
                  </td>
                  <td className="px-4 py-2 text-right">{item.price}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          {/* Total price and checkout button */}
          <div className="flex justify-end mt-4">
            <div className="text-gray-700 font-bold mr-4">Total Price:</div>
            <span className="text-green-500">{Totaprice}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none ml-4">
              Checkout
            </button>
          </div>
        </>

      )}

    </div>
  )
}

export default Cart
