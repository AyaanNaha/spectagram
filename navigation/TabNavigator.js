import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Feed from "../screens/Feed";
import CreatePost from "../screens/CreatePost";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            labeled={false}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Feed') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'CreatePost') {
                        iconName = focused ? 'create' : 'create-outline';
                    }
                    return <Ionicons name={iconName} size={RFValue(25)} color={color}/>
                }
            })}
        >
            <Tab.Screen name="Feed" component={Feed}></Tab.Screen>
            <Tab.Screen name="CreatePost" component={CreatePost}/>
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;