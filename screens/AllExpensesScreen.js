import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { COLORS } from '../constants/Colors';

/* State Related */
import { useSelector } from 'react-redux';

/* Components */
import ExpensesOutput from '../components/custom/ExpensesOutput/ExpensesOutput';

export default function AllExpensesScreen() {
	/* Hooks & Variables */
	const expenses = useSelector((state) => state.userExpenses.expenses);

	if (expenses.length == 0) {
		return (
			<View style={styles.emptyExpenses}>
				<Text style={styles.emptyText}>You dont have any expenses</Text>
			</View>
		);
	}
	return (
		<View style={styles.screen}>
			<ExpensesOutput expenses={expenses} period="All Expenses" />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: 'lightblue',
		paddingHorizontal: 10,
		paddingTop: 10,
		// marginTop: Platform.select({ android: StatusBar.currentHeight, ios: null }),
	},
	emptyExpenses: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.primary700,

	},
	emptyText: {
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold'
	}
});