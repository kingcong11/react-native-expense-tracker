import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from './constants/Colors';

/* Components */
import Column from './components/ui/Column';
import GenericIconButton from './components/ui/GenericIconButton';

/* Screens */
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import ManageExpenseScreen from './screens/ManageExpenseScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
	/* These screens are navigated through BottomTabs */
	return (
		<Tab.Navigator
			screenOptions={({ navigation, route }) => {

				/*
				|| in this approach where we have a function which returns an object for screenOptions,
				|| we also have access to the navigation and route prop and do navigation methods like navigate
				*/

				return {
					headerStyle: { backgroundColor: COLORS.primary500 },
					headerTintColor: 'white',
					tabBarStyle: { backgroundColor: COLORS.primary500 },
					tabBarActiveTintColor: COLORS.accent500,
					headerTitleAlign: 'center',
					headerRight: () => {
						return <GenericIconButton
							color={COLORS.accent500}
							pressFn={() => {
								navigation.navigate('ManageExpense');
							}}
							size={24}
							icon="plus"
						/>
					}
				}
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
		<>
			<SafeAreaView style={styles.safeArea} >
				<StatusBar style='auto' backgroundColor={COLORS.primary500} />
				<NavigationContainer>
					<Stack.Navigator initialRouteName='ExpensesOverview' screenOptions={{}}>
						<Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{ headerShown: false }} />
						<Stack.Screen name='ManageExpense' component={ManageExpenseScreen}
							options={{
								headerTitleAlign: 'center',
								headerStyle: { backgroundColor: COLORS.primary500 },
								headerTintColor: 'white',
								presentation: 'modal'
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		</>
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
