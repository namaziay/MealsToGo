import React, {useState,createContext} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { loginRequest } from "./authentication.service";


export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user,setUser] = useState(null);
    const [error,setError] =useState(null);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });

    const onLogin = (email,password) => {
        setIsLoading(true);
        loginRequest(email,password)
        .then((u) => {
            console.log("confused")
            setUser(u);
            setIsLoading(false);
        })
        .catch((err) => {
            setIsLoading(false);
            setError(err.toString())
        })
    }

    const onLogout = () => {
        setUser(null);
        firebase.auth().signOut();
      };

    const onRegister = (email, password, repeatedPassword) => {
        setIsLoading(true);

        if (password !== repeatedPassword) {
          setError("Error: Passwords do not match");
          return;
        }
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((u) => {
            setUser(u);
            setIsLoading(false);
          })
          .catch((e) => {
            setIsLoading(false);
            setError(e.toString());
          });
      };

    return (
        <AuthenticationContext.Provider
        value={{
            isAuthenticated:!!user,
            user,
            isLoading,
            error,
            onLogin,
            onRegister,
            onLogout,
        }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}