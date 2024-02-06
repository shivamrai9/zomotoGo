import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';

export default function Login() {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials)

    try {
      // Make a request to your authentication API endpoint
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json()
      if (!json.success) {
        alert("Enter Valid Credentials")
      }

      if (json.success) {
        // Handle successful sign-in (e.g., redirect to dashboard)
        localStorage.setItem("authToken",json.authtoken)
        console.log(localStorage.getItem("authToken"))
        navigate('/')
      } else {
        // Handle sign-in failure (e.g., show an error message)
        console.error('Failed to sign in');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row"'>
        <div className="flex flex-col items-center justify-center w-full pt-5 pr-10  pl-10 lg:flex-row">
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Sign In to your account</p>
              <form className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8" onSubmit={handleSubmit}>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                  <input
                    placeholder="123@ex.com"
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Password</p>
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
                  <button className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease">Sign In</button>
                </div>
                <div className="flex justify-center">
                  <Link className="bg-green-500 relative rounded py-1.5 px-2 mt-4 text-white transform hover:scale-105 text-center" to="/createuser">Don't have an account? Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
