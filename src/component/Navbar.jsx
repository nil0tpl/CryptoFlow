import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Auth/AuthContext'
import Tooltip from '../Portal/Tooltip';

export default function Navbar() {
    const { setShowAuth, name, setName, updateForm } = useContext(AuthContext);
    useEffect(()=>{
        document.body.classList.add('bg-gradient-to-br', 'from-slate-900', 'via-purple-900', 'to-slate-900', 'min-h-screen', 'text-white')
    }, []);

    const [form, setForm] = useState({});
        
    useEffect(() => {
        const storedForm = JSON.parse(localStorage.getItem('auth')) || {};
        setForm(storedForm);
    }, []);

    const handleLogout = () =>{
        setForm({...form, loginState: false});
    }
    
    useEffect(()=>{
        setName('');
        updateForm(form);
    }, [form]);

    useEffect(()=>{
        document.title = `CryptoFlow`
    });

return (
<>
    <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg">₿</div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CryptoFlow</h1>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-400">Live</span>
                    </div>

                    {name === '' ? (
                        <button onClick={() => setShowAuth(true)} className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl shadow-lg font-semibold transition-all duration-300 transform hover:scale-105">
                            <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=64&w=64" alt="User avatar" className="w-8 h-8 rounded-full bg-gray-200" />
                            <span>Login / Signup</span>
                        </button>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Tooltip content={`${name} your'e logged in`}>
                                <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-800/50 shadow-inner">
                                    <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=64&w=64" alt="User avatar" className="w-8 h-8 rounded-full bg-gray-200" />
                                    <span className="text-white font-medium">{name}</span>
                                </div>
                            </Tooltip>
                            <Tooltip content="Logout from the App">
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md font-semibold transition-all duration-300 transform hover:scale-105">
                                    Logout
                                </button>
                            </Tooltip>
                        </div>
                    )}
                </div>

            </div>
        </div>
    </header>
</>
)
}
