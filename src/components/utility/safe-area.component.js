import {SafeAreaView,Platform,StatusBar } from 'react-native';
import styled from 'styled-components';


export const SafeArea = styled(SafeAreaView)`
    flex:1;
    margin-top:${Platform.OS =='android' ? 0 : 0}px;
`;