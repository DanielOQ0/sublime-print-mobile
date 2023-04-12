import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNavigation from './src/navigation/BottomTabsNavigation';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from "./src/store/store.js"


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabsNavigation/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
