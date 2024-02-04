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
  console.log(foodCategories, "foodCategoryw")


  return (
    <>
      <div className='w-full m-auto lg:w-11/12'>

        <div>
          <Navbar />
        </div>
        <div className='container mx-auto'>
          {
            foodCategories.length !== 0
              ?
              foodCategories.map((data) => {
                return (
                  <>


                    <div key={data._id}>
                      <h2 class="text-2xl font-semibold mb-4">{data.CategoryName}</h2>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                      {foodItems.filter(item => item.CategoryName == data.CategoryName).map((filterItems) => {
                        return (
                          <div key={filterItems._id} className=''>
                            <Card foodName={filterItems.name} imgSrc={filterItems.img} options={filterItems.options[0]} foodDescription={filterItems.description} />
                            {/* shivam */}
                          </div>
                        )
                      })}
                    </div>
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