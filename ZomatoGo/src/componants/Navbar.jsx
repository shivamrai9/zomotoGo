import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export const Navbar = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [cartView, setCartView] = useState(false);

	const data = useCart()

	const navigate = useNavigate()

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const handleLogout = () => {
		localStorageNaNpxoveItem("authToken");
		navigate('/login')
	}
	const handelCart = () => {
		navigate('/cart')
	}

	return (
		<>
			<nav className="relative px-4 py-4 flex justify-between items-center bg-white">
				<Link className="text-3xl font-bold leading-none text-red-500">
					ZomatoGo
				</Link>
				{/* mobile responsice hamburger menu  */}
				<div className="lg:hidden">
					<button className="navbar-burger flex items-center text-blue-600 p-3" onClick={toggleMenu}>
						<svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<title>Mobile menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
						</svg>
					</button>
				</div>
				{/* <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
					<li><Link className="text-sm text-gray-400 hover:text-blue-600 font-bold" to="/login">Home</Link></li>
					<li className="text-gray-300 ">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
						</svg>
					</li>
					<li><Link className="text-sm  font-bold" to='/createuser'>About Us</Link></li>
				</ul> */}
				{/* <form className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6 lg:ml-auto">

						<input
							type="text"
							placeholder="Search"
							className="border-2 border-gray-300 rounded-md py-1 px-2"
						/>
						<button className='flex flex-col justify-center m-0'>
							<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
						</button>
					</form> */}
				<div className='hidden lg:inline-block '>
					{
						(localStorage.getItem('authToken')) ?
							<>
								<div className="relative hidden lg:inline-block lg:mr-3" onClick={()=>{setCartView(!cartView)}}>
									<div className="py-2 px-6 bg-green-400 hover:bg-gray-200 text-sm text-gray-900 font-bold rounded-xl transition duration-200" to="/login">
										Cart
									</div>
									<span className="absolute top-[-10px] right-[-5px] bg-red-500 rounded-full px-2 py-1 text-white text-xs font-bold">
										{data.length}
									</span>
								</div>
								<Link className="hidden lg:inline-block lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-200 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" to="/login">My Order</Link>
							</>
							: ""
					}
					{
						(!localStorage.getItem('authToken')) ?
							<>

								<Link className="hidden lg:inline-block lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-200 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" to="/login">Login In</Link>
								<Link className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" to='/createuser'>Sign up</Link>
							</> :
							<div className="hidden lg:inline-block py-2 px-6 bg-red-500 hover:bg-red-600 text-sm text-white font-bold rounded-xl transition duration-200" to='/login' onClick={handleLogout}>Log Out</div>
					}
				</div>
			</nav>


			<div className={`navbar-menu relative z-50 ${isMenuOpen ? '' : 'hidden'}`}>
				<div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" onClick={closeMenu}></div>
				<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
					<div className="flex items-center mb-8">
						<Link className="mr-auto text-3xl font-bold leading-none text-red-500" to="/">

							ZomatoGo
						</Link>
						<button className="navbar-close" onClick={closeMenu}    >
							<svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						</button>
					</div>
					<div>
						<ul>
							<li className="mb-1">
								<Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">Home</Link>
							</li>
							<li className="mb-1">
								<Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">About Us</Link>
							</li>
							<li className="mb-1">
								<Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">Services</Link>
							</li>
							<li className="mb-1">
								<Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">Pricing</Link>
							</li>
							<li className="mb-1">
								<Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" to="#">Contact</Link>
							</li>
						</ul>
					</div>
					<div className="mt-auto">
						<div className="pt-6">
							<Link className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold  bg-gray-50 hover:bg-gray-100 rounded-xl" to="/login">Sign in</Link>
							<Link className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" to='/createuser'>Sign Up</Link>
						</div>
						<p className="my-4 text-xs text-center text-gray-400">
							<span>Copyright © 2021</span>
						</p>
					</div>
				</nav>
			</div>
			{cartView && (
				<Modal onClose={()=>{setCartView(!cartView)}}>
					<Cart />
				</Modal>
			)}
		</>
	)
}
