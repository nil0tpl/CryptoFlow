import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export function AuthContextProvider(props) {
	const [name, setName] = useState('');
    	const [showAuth, setShowAuth] = useState(true);
	const [form, setForm] = useState({});
	const [update, setUpdate] = useState({});

	useEffect(() => {
        const storedForm = JSON.parse(localStorage.getItem('auth')) || {};
        setForm(storedForm);
    }, []);

	useEffect(()=>{
        localStorage.setItem('auth', JSON.stringify(form));
    }, [form]);

    const addUser = (newForm) => {
        setForm({...newForm});
    }

	const updateForm = (updated) =>{
		setUpdate(updated);
	}

	useEffect(()=>{
		localStorage.setItem('auth', JSON.stringify(update));
	}, [update]);

return (
	<AuthContext.Provider value={{form, showAuth, setShowAuth, addUser, name, setName, updateForm}}>
		{props.children}
	</AuthContext.Provider>
)
}
