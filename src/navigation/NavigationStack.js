import { NavigationContainer } from "@react-navigation/native";
import { createNaviteStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register"

const Stack = createNaviteStackNavigator();

return (
    <NavigationContainer>
        <StackNavigator>
            <Stack.Screen name ="Login" component={Login}/>
            <Stack.Screen name ="Register" component={Register}/>
        </StackNavigator>
    </NavigationContainer>
)