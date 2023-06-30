import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen name="Home" component={StackNavigator}></Drawer.Screen>
            <Drawer.Screen name="Profile" component={Profile}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;