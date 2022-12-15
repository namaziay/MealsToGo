import React, {useState, useContext} from "react";
import { FlatList, View, TouchableOpacity } from 'react-native';
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components/native";
import { Search } from "../components/search.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { RestaurantsContext } from "../../../services/restaurants/mock/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { ActivityIndicator,MD2Colors } from "react-native-paper";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

const RestaurantList = styled(FlatList).attrs({
    contentContainerStyle: {
      padding: 16,
    },
  })``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const { isLoading, error, restaurants } = useContext(RestaurantsContext);
    const [isToggled, setIsToggled] = useState(false);
    const {favourites} = useContext(FavouritesContext);

    
    return (
      <SafeArea>
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={true} color={MD2Colors.blue300} />
          </LoadingContainer>
        )}
        <Search onFavouritesToggle={()=>setIsToggled(!isToggled)} isFavouritesToggled={isToggled}/>
        {isToggled && (
        <FavouritesBar favourites={favourites} onNavigate={navigation.navigate} />
      )}
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={()=> navigation.navigate("RestaurantDetail",
              {restaurant:item}
              )}>
                <RestaurantInfoCard restaurant={item} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </SafeArea>
    );
  };
