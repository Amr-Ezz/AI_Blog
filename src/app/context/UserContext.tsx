'use client'
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

type ExtendedUser = User & {
    name?: string
}
interface UserContextType {
    user: ExtendedUser | null,
    loading: boolean
}
const UserContext = createContext<UserContextType>({
    user: null,
    loading: true
})
export const useUser = () => useContext(UserContext);
export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<ExtendedUser | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const profile = localStorage.getItem('user profile');
                const {name} = profile ? JSON.parse(profile) : {};
                setUser({...firebaseUser, name})

            } else {
                setUser(null);
            }
            setLoading(false)
        });
        return () => unsubscribe();
    }, [])
    return (
        <UserContext.Provider value={{user, loading}}>
            {children}
        </UserContext.Provider>
    )
}