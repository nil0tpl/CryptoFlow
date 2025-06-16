import React, { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from './AuthContext'

const initialForm = {
    username: '',
    email: '',
    password: '',
	loginState: false,
};

export default function SignupForm() {
	const { addUser } = useContext(AuthContext);

	const reducer = (state, action) =>{
		switch (action.type) {
		case 'USERNAME':
			return { ...state, username: action.payload }

		case 'EMAIL':
			return { ...state, email: action.payload }

		case 'PASSWORD':
			return { ...state, password: action.payload }

		case 'LOGIN':
			return { ...state, loginState: action.payload }
		
		default:
			return { state };
		}
	}

	const [formState, dispatch] = useReducer(reducer, initialForm);
	const [password, setPassword] = useState({
		initial: '',
		confirm: '',
		matched: true
	});

    const saveDB = (e)=>{
		e.preventDefault();
		
		if(password.initial !== password.confirm){
			setPassword({...password, matched: false});
			return;
		}
			
		setPassword({...password, matched: true});
		dispatch({type: 'PASSWORD', payload: password.confirm});

    }

	useEffect(() => {
		if (formState.password !== '') {
			setToLocalStorage();
		}
	}, [formState.password]);

	const setToLocalStorage = () =>{
		addUser(formState);
		alert("Account Created Successfully! \n Go back to Login section");
	}

      

return (
      <form onSubmit={saveDB} className="space-y-4">
        <input
			required
			onChange={(e)=> dispatch({type: 'USERNAME', payload: e.target.value})}
			type="text"
			placeholder="Username"
			className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
			required
			onChange={(e)=> dispatch({type: 'EMAIL', payload: e.target.value})}
			type="email"
			placeholder="Email"
			className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
			required
			onChange={(e)=> setPassword({...password, initial: e.target.value})}
			type="password"
			placeholder="Password"
			className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
			required
			onChange={(e)=> setPassword({...password, confirm: e.target.value})}
			type="password"
			placeholder="Confirm Password"
			className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {!password.matched && <div className='text-red-400'>*Password didn't mathced</div>}
        <button type='submit' className="w-full bg-pink-600 hover:bg-pink-700 font-semibold py-2 rounded transition">
          Sign Up
        </button>
      </form>
);
}
