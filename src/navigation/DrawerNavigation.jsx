import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Index from '../screens/Index';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
  <Drawer.Navigator>
    <Drawer.Screen 
  name="Index" 
  component={Index} 
  options={{
    drawerIcon: ({color}) => (
      <Ionicons name="home-outline" size={22} color={color} />
    ),
  }}
  />
</Drawer.Navigator>)
    
}

export default DrawerNavigation