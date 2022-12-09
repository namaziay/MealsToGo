import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { View,Text } from 'react-native';
import { ThemeProvider} from 'styled-components/native';
import { RestaurantsScreen } from './src/features/resturants/screens/restaurants.screen';
import { theme } from './src/infrastructure/theme';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeArea } from './src/components/utility/safe-area.component';
import {Ionicons} from '@expo/vector-icons';
import { RestaurantsContextProvider } from './src/services/restaurants/mock/restaurants.context';
import { LocationsContextProvider } from './src/services/location/location.context';

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';

import {
  useFonts as useLato,
  Lato_400Regular,
} from '@expo-google-fonts/lato';

function SettingsScreen() {
  return (
    <SafeArea>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    </SafeArea>
  );

}
function Map() {
  return (
    <SafeArea>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Maps!</Text>
      </View>
    </SafeArea>
  );
}

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants:"md-restaurant",
  Settings:"md-settings",
  Maps:"md-map"
};


const createScreenOptions = ({route})=> {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({size,color}) => {
      return <Ionicons name={iconName} size={size} color={color} />
    }
  }
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if(!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
      <LocationsContextProvider>
        <RestaurantsContextProvider>
          <NavigationContainer style={{marginBottom:0}}>
          <Tab.Navigator
          screenOptions={createScreenOptions}
          >
            <Tab.Screen name="Restaurants" component={RestaurantsScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
            <Tab.Screen name="Maps" component={Map}/>
          </Tab.Navigator>
          </NavigationContainer>
        </RestaurantsContextProvider>
      </LocationsContextProvider>  
      </ThemeProvider>
      <ExpoStatusBar style='auto'/>
    </>
  );
}


