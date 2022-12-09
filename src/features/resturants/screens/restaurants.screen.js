import React, {useState, useContext} from "react";
import { FlatList, View } from 'react-native';
import { SafeArea } from "../../../components/utility/safe-area.component";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { RestaurantsContext } from "../../../services/restaurants/mock/restaurants.context";
import { ActivityIndicator,MD2Colors } from "react-native-paper";

const SearchContainer = styled.View`
    padding: ${(props) => props.theme.space[3]};
`;

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

export const RestaurantsScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const { isLoading, error, restaurants } = useContext(RestaurantsContext);
  
    return (
      <SafeArea>
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={true} color={MD2Colors.blue300} />
          </LoadingContainer>
        )}
        <SearchContainer>
          <Searchbar placeholder="Search" />
        </SearchContainer>
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
                <RestaurantInfoCard restaurant={item} />
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </SafeArea>
    );
  };
