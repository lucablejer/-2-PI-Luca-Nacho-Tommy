import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import CreatePost from "../screens/CreatePost/CreatePost";

const Tab = createBottomTabNavigator();


function NavigationTab(){
    return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name ="Home" component={Home} options={{tabBarIcon: () => <fontAwesome name="home" size={24} color="black" />}}/>
            <Tab.Screen name ="Profile" component={Profile} options={{tabBarIcon: () => <fontAwesome name="person" size={24} color="black" />}}/>
            <Tab.Screen name ="CreatePost" component={CreatePost} options={{tabBarIcon: () => <fontAwesome name="plus" size={24} color="black" />}}/>
        </Tab.Navigator>
    </NavigationContainer> 
)
}

export default NavigationTab;
