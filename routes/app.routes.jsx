import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Game from '../screens/Game';
import WinnerOrLoser from '../screens/WinnerOrLoser';
import CustomHeader from '../components/CustomHeader';



const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName='Home'
            screenOptions={{
                header: props => < CustomHeader {...props} />,
                headerShown: true,
                unmountOnBlur: true,
            }}
            unmountOnBlur={true}
        >
            <Stack.Screen name="Home" component={Home} options={{
                title: "Tela Inicial"
            }} />
            <Stack.Screen name="Game"
             component={Game}
                options={{
                    headerBackTitle: "Voltar",
                    title: "Adivinhe a palavra",
                }}
            />
            <Stack.Screen name="WinnerOrLoser" component={WinnerOrLoser}
                options={{
                    headerBackTitle: "Voltar",
                    headerBackRoute: "Home",
                }}
            />
        </Stack.Navigator >
    );
}