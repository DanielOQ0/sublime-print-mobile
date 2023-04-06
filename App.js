import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNavigation from './src/navigation/BottomTabsNavigation';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabsNavigation/>
    </NavigationContainer>
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
