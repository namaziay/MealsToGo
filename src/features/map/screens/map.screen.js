import React,{useState,useContext,useEffect} from "react";
import MapView,{Marker,Callout} from "react-native-maps";
import styled from "styled-components";
import { LocationsContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/mock/restaurants.context";
import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";

const Map = styled(MapView)`
    height:100%;
    width:100%;
`

export const MapScreen = ({navigation}) => {
    const {location} = useContext(LocationsContext);
    const {restaurants} = useContext(RestaurantsContext);
    const [latDelta,setLatDelta] = useState(0);
    const {viewPort, lat, lng} = location;

    useEffect(()=>{
        const northeastLat = viewPort.northeast.lat;
        const southwestLat = viewPort.southwest.lat;

        const latDelta = northeastLat - southwestLat;
        setLatDelta(latDelta);
    },[location, viewPort]);

    return (
        <>
        <Search/>
        <Map
        region={{
            latitude:lat,
            longitude:lng,
            latitudeDelta:latDelta,
            longitudeDelta:0.02,
        }}
        >
            {restaurants.map((restaurant) => {
                return (<Marker
                key={restaurant.name}
                title={restaurant.name}
                coordinate={{
                    latitude:restaurant.geometry.location.lat,
                    longitude:restaurant.geometry.location.lng, 
                }}
                >
                    <Callout onPress={()=> navigation.navigate("RestaurantDetail", {restaurant})}>
                        <MapCallout restaurant={restaurant} />
                    </Callout>
                </Marker>
                )
            })}
        </Map>
        </>
    )
}