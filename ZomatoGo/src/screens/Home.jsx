import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from '../componants/Navbar'
import { Footer } from '../componants/Footer'
import Card from '../componants/Card'

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/foodData');
        const data = response?.data;
        setFoodItems(data[0]);
        setFoodCategories(data[1]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
  console.log(foodItems,"foodCategoryw")


  return (
    <>
    <div className='w-full m-auto lg:w-10/12'>

      <div>
        <Navbar />
      </div>
      <div className='container mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {
          foodItems !=[]
          ? foodItems.map((data)=>{
            return (
              <>
              {/* <div key={data._id} className='font-medium text-xl'>{data.CategoryName}</div> */}
              {/* <hr /> */}
              {/* {foodItems ![]? } */}
              <img src={data.img} alt="" />
              </>
              
            )
          })
          :""
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default Home