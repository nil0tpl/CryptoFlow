import React, { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from './AuthContext'

const initialForm = {
    username: '',
    email: '',
    password: '',
	loginState: false,
};

export default function SignupForm() {
  	const [status, setStatus] = useState('');
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

    const saveDB = async (e)=>{
		e.preventDefault();
		
		if(password.initial !== password.confirm){
			setPassword({...password, matched: false});
			return;
		}
			
		setPassword({...password, matched: true});
		dispatch({type: 'PASSWORD', payload: password.confirm});


		const data = new FormData(e.target);

		const res = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			body: data
		});

		if (res.ok) {
			setStatus('Success! Your message has been sent.');
			e.target.reset();
		} else {
			setStatus('Oops! Something went wrong.');
		}
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
		<input type="hidden" name="access_key" value="c667177b-268a-4612-a5f4-ba7f61f47c5e" />
        <input
			required
			name='name'
			onChange={(e)=> dispatch({type: 'USERNAME', payload: e.target.value})}
			type="text"
			placeholder="Username"
			className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
			required
			name='email'
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
			name='message'
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
