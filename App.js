import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from './constants/Colors';

/* Components */
import Column from './components/ui/Column';

/* Screens */
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import ManageExpenseScreen from './screens/ManageExpense';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
	/* These screens are navigated through BottomTabs */
	return (
		<Tab.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: COLORS.primary500 },
				headerTintColor: 'white',
				tabBarStyle: { backgroundColor: COLORS.primary500 },
				tabBarActiveTintColor: COLORS.accent500,
				headerTitleAlign: 'center',
			}}
		>
			<Tab.Screen name="RecentExpenses" component={RecentExpensesScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => <Entypo name="back-in-time" size={size} color={color} />,
					tabBarLabelStyle: {
						fontSize: 12,
					},
					headerTitle: 'Recent Expenses',
					tabBarLabel: 'Recent',
				}}
			/>
			<Tab.Screen name="AllExpenses" component={AllExpensesScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => <FontAwesome5 name="list-alt" size={size} color={color} />,
					tabBarLabelStyle: {
						fontSize: 12,
					},
					headerTitle: 'All Expenses',
					tabBarLabel: 'All Expenses',
				}}
			/>
		</Tab.Navigator>
	);
}


export default function App() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar style='light' />
			<NavigationContainer>
				<Stack.Navigator initialRouteName='ExpensesOverview' screenOptions={{}}>
					<Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{ headerShown: false }} />
					<Stack.Screen name='ManageExpense' component={ManageExpenseScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	columnStyle: {
		flex: 1,
		backgroundColor: 'tomato',
	}
});
