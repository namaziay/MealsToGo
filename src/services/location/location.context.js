import React, {useState,useEffect,createContext} from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationsContext = createContext();

export const LocationsContextProvider = ({children}) => {
    const [location,setLocation] = useState(null);    
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [keyword,setKeyword] = useState("san francisco");

    const onSearch = (searchKeyword="Antwerp") => {
        setIsLoading(true);
        setKeyword(searchKeyword)
        locationRequest(searchKeyword.toLowerCase())
        .then(locationTransform)
        .then(result => {
            setIsLoading(false);
            setLocation(result);
            console.log(result);
        }).catch(err => {
            setIsLoading(false);
            setError(err);
        })
    }

    return(
        <LocationsContext.Provider
        value={{
            isLoading,
            error,
            location,
            search: onSearch,
            keyword,
        }}
        >
            {children}
        </LocationsContext.Provider>
    )
}