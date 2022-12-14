import React, {useContext} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text,Button } from "react-native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { RestaurantsContextProvider } from "../../services/restaurants/mock/restaurants.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationsContextProvider } from "../../services/location/location.context";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { SafeArea } from "../../components/utility/safe-area.component";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const Settings = () => {
    const { onLogout } = useContext(AuthenticationContext);
    return (
      <SafeArea>
        <Text>Settings</Text>
        <Button title="logout" onPress={() => onLogout()} />
      </SafeArea>
    );
  };


const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    headerShown:false,
  };
};

export const AppNavigator = () => (
    <FavouritesContextProvider>
    <LocationsContextProvider>
      <RestaurantsContextProvider>
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
    </RestaurantsContextProvider>
    </LocationsContextProvider>
  </FavouritesContextProvider>
);