import React, { createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const userDetails = JSON.parse(localStorage.getItem('user'));

    return (
        <UserContext.Provider value={userDetails}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider}