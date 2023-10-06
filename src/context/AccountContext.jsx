import React, { useContext, useState } from 'react'

const createAccountContext = React.createContext();

export function useAccount() {
    return useContext(createAccountContext);
}

const AccountContext = ({ children }) => {
    
    const [user,setUser] = useState("")
    const [error,setError] = useState("")
    const [owner,setOwner] = useState(null)
    const [accountList,setAccountList] = useState([])

    const logout = () => {
        window.open('http://localhost:7777/auth/logout',"_self");
    }

    const handleLogin = async (e,email,pass) => {
        e.preventDefault();
    
        const userCredentials = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: pass,
            }),
        };
    
        try {
            // const response = await fetch('http://localhost:7777/auth/register', userCredentials);
            const response = await fetch('http://localhost:7777/auth/login', userCredentials);
            const responseData = await response.json();
            console.log(responseData.user);
            console.log(responseData);

            // Check if registration was successful
            if (responseData.message === 'Login successful') {
                setUser(responseData.user)
            } else {
                setError(responseData.message)
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const registerAccount = async() => {

    }

    const deleteAccount = async (uid) => {
        // Delete the document from the 'auth' collection
    }
    
    const updateAccount = async (uid, emailAcc, usernameAcc, type) => {
        // Update the document in the 'auth' collection

    }


    const value = {
        user,
        owner,
        setOwner,
        handleLogin,
        logout,
        registerAccount,
        accountList,
        setAccountList,
        deleteAccount,
        updateAccount
    }

    return (
        <createAccountContext.Provider value={value}>
            {children}
        </createAccountContext.Provider>
    )
}

export default AccountContext