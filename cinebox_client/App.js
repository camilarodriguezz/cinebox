import React from 'react';
import MovieList from './components/MovieList';
import Detail from './components/Detail';
import Edit from './components/Edit';
import Auth from './components/Auth';
import AddNew from './components/AddNew';
import Search from './components/Search';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

import { CineboxProvider, CineboxContext } from './components/CineboxProvider';

const AppNavigator = createStackNavigator({
  Auth: { screen: Auth, },
  MovieList: { screen: MovieList },
  Detail: { screen: Detail },
  Edit: { screen: Edit },
  AddNew: { screen: AddNew},
  Search: { screen: Search},
})

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <CineboxProvider>
      <AppContainer />
    </CineboxProvider>
  )
}

export default App;