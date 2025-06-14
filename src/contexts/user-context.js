import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const User = createContext();

export default function UserProvider({ children }) {
    // para testar localmente setar a variavel isLoaded: true
    const [user, setUser] = useState({ name: '', email: '', isLoaded: true });

    return <User.Provider value={{ user, setUser }}>{children}</User.Provider>;
}

export function useUser() {
    const { user, setUser } = useContext(User);
    return { user, setUser };
}

UserProvider.propTypes = {
    children: PropTypes.element,
};

UserProvider.defaultProps = {
    children: true,
};
