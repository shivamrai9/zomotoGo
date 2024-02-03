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
  console.log(foodItems, "foodItems")
console.log(foodCategories,"foodCategoryw")

 
  return (
    <>
      <div className='w-full m-auto lg:w-10/12'>

        <div>
          <Navbar />
        </div>
        <div className='container'>
          {/* mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 */}
          {
            foodCategories.length !== 0
              ? 
              foodCategories.map((data) => {
                return (
                  <>
                    <div key={data._id}>
                      {data.CategoryName}
                    </div>
                    <hr />

                    {foodItems.filter(item => item.CategoryName == data.CategoryName).map((filterItems)=>{
                      return(
                        <div key={filterItems._id} className='border-red-600 border'>
                          <Card foodName={filterItems.name} imgSrc={filterItems.img} options={filterItems.options[0]} foodDescription={filterItems.description}/>
                        </div>
                      )
                    })}
                  </>
                )
              })
              : ""
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