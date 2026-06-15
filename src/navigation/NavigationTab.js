import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import CreatePost from "../screens/CreatePost/CreatePost";
import CommentPost from "../screens/CommentPost/CommentPost";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen(){
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <HomeStack.Screen name="CommentPost" component={CommentPost}/>
        </HomeStack.Navigator>
    )
}

function NavigationTab(){
    return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="home" size={24} color="black"/>}}/>
            <Tab.Screen name="CreatePost" component={CreatePost} options={{tabBarIcon: () => <FontAwesome name="plus" size={24} color="black"/>}}/>
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <FontAwesome name="user" size={24} color="black"/>}}/>
        </Tab.Navigator>
    )
}

export default NavigationTab;