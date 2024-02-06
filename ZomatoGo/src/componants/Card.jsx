import React, { useState } from 'react'
import { useDispatchCart } from './ContextReducer';
import { useCart } from './ContextReducer';
export default function Card({ options, foodItems }) {
    let dispatch = useDispatchCart();

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const data = useCart()


    let foodDescription = foodItems.description
    let foodimg = foodItems.img
    let foodname = foodItems.name
    let foodCategoryName = foodItems.CategoryName

    const MAX_DESCRIPTION_LENGTH = 19;
    const truncatedDescription =
        foodDescription.length > MAX_DESCRIPTION_LENGTH
            ? `${foodDescription.substring(0, MAX_DESCRIPTION_LENGTH)}...`
            : foodDescription;

    let priceOption = Object.keys(options)

    const priceOptions = priceOption.slice(0, -1);

    const handleAddToCart = async () => {
        await dispatch({
            type: "ADD",
            id: foodItems._id,
            name: foodname,
            price: foodItems.finalPrice,
            qty: qty,
            size: size,
            img: foodimg
        })
        console.log(data)

    }

    return (
        <div className="flex flex-grow h-55  rounded-3xl overflow-hidden shadow-lg bg-slate-200 p-2">
            {/* Product Image */}
            <div className='relative w-1/2 h-full overflow-hidden bg-gray-200 rounded-2xl'>
                <div className='absolute rounded-full bg-white h-6 w-6 z-40 top-2 right-2 p-1 cursor-pointer'>
                    <svg className='text-red-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                </div>
                <img className="w-full h-48 object-cover" src={foodimg} alt="Product" />
            </div>
            <div className="relative w-1/2 ml-2 flex flex-col">
                {/* Product Title */}
                <div className="font-medium text-lg">{foodname}</div>
                {/* Product Description */}
                <p className="text-gray-500 text-sm mb-2">{truncatedDescription}</p>
                <div className="flex flex-row w-full items-center justify-between align-middle">
                    <div className="w-1/3 ">
                        <select
                            className="w-full p-2 border-none outline-none rounded"
                            id="quantity"
                            name="quantity"
                            onChange={(e) => setQty(e.target.value)}
                        >
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="w-1/2">
                        <select
                            className="w-full p-2 border-none outline-none rounded"
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((data) => {
                                return (
                                    <option key={data} value={data}>{data}</option>
                                )
                            })}
                        </select>

                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-1 flex flex-row w-full items-center justify-center">
                    <div className="w-1/2 ">
                        <p className="text-gray-700 text-base font-bold">₹ 150</p>
                    </div>
                    <div className="w-1/2">
                        <button
                            onClick={handleAddToCart}
                            className="w-full font-bold text-xs rounded-lg bg-green-600 py-2 text-white shadow-lg hover:bg-green-700 transition duration-200">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
