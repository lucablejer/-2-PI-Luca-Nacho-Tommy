import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import CreatePost from "../screens/CreatePost/CreatePost";

const Tab = createBottomTabNavigator();


function NavigationTab(){
    return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name ="Home" component={Home}/>
            <Tab.Screen name ="Profile" component={Profile}/>
            <Tab.Screen name ="CreatePost" component={CreatePost}/>
        </Tab.Navigator>
    </NavigationContainer>
)
}

export default NavigationTab;
