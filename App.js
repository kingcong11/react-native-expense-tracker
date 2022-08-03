import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

/* Components */
import Column from './components/ui/Column';

/* Screens */
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import ManageExpense from './screens/ManageExpense';


export default function App() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ManageExpense></ManageExpense>
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
