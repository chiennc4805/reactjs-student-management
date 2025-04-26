import { createContext, useState } from 'react';

const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});

const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    })

    const [listParents, setListParents] = useState([]);
    const [listClasses, setListClasses] = useState([]);

    const [isAppLoading, setIsAppLoading] = useState(true)

    return (
        <AuthContext.Provider value={{ user, setUser, listParents, setListParents, listClasses, setListClasses }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthWrapper }