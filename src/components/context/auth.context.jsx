import { createContext, useState } from 'react';

const AuthContext = createContext({
    id: "",
    name: "",
    role: ""
});

const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        id: "",
        name: "",
        role: ""
    })

    const [isAppLoading, setIsAppLoading] = useState(true)

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthWrapper };

