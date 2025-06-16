import React, { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from './AuthContext';

export default function LoginForm() {
	const { setShowAuth, setName, updateForm } = useContext(AuthContext);

	const [form, setForm] = useState({});
	useEffect(() => {
		const storedForm = JSON.parse(localStorage.getItem('auth')) || {};
		setForm(storedForm);
	}, []);
	
	const reducer = (state, action) =>{
		switch (action.type) {
			case 'USERNAME':
				return { ...state, username: action.payload };

			case 'PASSWORD':
				return { ...state, password: action.payload };
				
			default:
				return { ...state, email: '', password: '' };
		}
	}
			
	const [login, dispatch] = useReducer(reducer, {username: '', password: ''});
			

	const checkData = (e) =>{
		e.preventDefault();

		if (login.username !== form.username && login.password !== form.password) {
			alert("Invalid Credentials!");
			dispatch({type: 'INVALID'});
			return;
		}

		const updatedUser = { ...form, loginState: true };
		setForm(updatedUser);
		alert('Logged in Successfully!  :)  Redirecting...');
		location.reload();
		updateForm(updatedUser);
		setName(form.username);
		setShowAuth(false);
	}

return (
	<form onSubmit={checkData} className="space-y-4">
		<input
			required
			onChange={(e)=> dispatch({type: 'USERNAME', payload: e.target.value})}
			type="text"
			placeholder="Username"
			className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
		/>
		<input
			required
			onChange={(e)=> dispatch({type: 'PASSWORD', payload: e.target.value})}
			type="password"
			placeholder="Password"
			className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
		/>
		<button
			type="submit"
			className="w-full bg-pink-600 hover:bg-pink-700 font-semibold py-2 rounded transition"
		>
			Login
		</button>
	</form>
);
}
