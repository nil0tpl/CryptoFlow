import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import Login from './Login';
import Signup from './Signup';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export default function AuthModal() {
    const { showAuth, setShowAuth, setName } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
	const [form, setForm] = useState({});
	
	useEffect(() => {
		const storedForm = JSON.parse(localStorage.getItem('auth')) || {};
		setForm(storedForm);
	}, []);
	
	useEffect(()=>{
		if(form.loginState){
			setShowAuth(false);
			setName(form.username);
		}
		else{
			setShowAuth(true);
			setName('');
		}
	}, [form]);

	if(!showAuth) return null;

return (
	<div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
		<div className="relative bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
			<ErrorBoundary fallback={<h2 className="text-center text-red-400">Error in Authentication</h2>}>
				<button onClick={() => setShowAuth(false)} className="absolute top-4 right-6 text-2xl text-white hover:text-gray-300">
					&times;
				</button>

				<h2 className="text-3xl font-bold mb-6 text-center text-pink-400">
					{isLogin ? 'Login to CryptoFlow' : 'Sign Up for CryptoFlow'}
				</h2>

				<div className="flex justify-center gap-4 mb-6">
					<button className={`px-4 py-2 rounded-full font-semibold transition ${isLogin ? 'bg-pink-600 text-white shadow-md' : 'bg-white text-pink-600 hover:bg-gray-100'}`} onClick={() => setIsLogin(true)}>
						Login
					</button>
					<button
						className={`px-4 py-2 rounded-full font-semibold transition ${
							!isLogin
								? 'bg-pink-600 text-white shadow-md'
								: 'bg-white text-pink-600 hover:bg-gray-100'
						}`}
						onClick={() => setIsLogin(false)}
					>
						Sign Up
					</button>
				</div>

				{isLogin ? <Login /> : <Signup />}
			</ErrorBoundary>
		</div>
	</div>
);
}