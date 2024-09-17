import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import Home from "../pages/home";
import RestaurantDetails from "../pages/restaurantsDetail";

// Defina os tipos de parâmetros para o Stack Navigator
export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    RestaurantDetails: { restaurantId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="RestaurantDetails"
                component={RestaurantDetails}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
