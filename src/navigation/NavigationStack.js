import { NavigationContainer } from "@react-navigation/native";
import { createNaviteStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register"
import NavigationTab from "./NavigationTab";

const Stack = createNativeStackNavigator();

function NavigationStack(){
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name ="Login" component={Login}/>
            <Stack.Screen name ="Register" component={Register}/>
            <Stack.Screen name="HomeTab" component={NavigationTab}/>
        </Stack.Navigator>
    </NavigationContainer>
)
}

export default NavigationStack;
