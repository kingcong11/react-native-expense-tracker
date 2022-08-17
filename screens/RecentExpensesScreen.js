import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { COLORS } from '../constants/Colors';
import { getDateMinusDaysFromNow } from '../utils/date';
import moment from 'moment';

/* State Related */
import { useSelector } from 'react-redux';

/* Components */
import ExpensesOutput from '../components/custom/ExpensesOutput/ExpensesOutput';

export default function RecentExpensesScreen({ navigation, route }) {
	/* Hooks & Variables */
	const expenses = useSelector((state) => state.userExpenses.expenses);

	const leftDateBoundary = getDateMinusDaysFromNow(7);

	const recentExpenses = expenses.filter((expense) => moment(expense.date).isAfter(leftDateBoundary));

	if (expenses.length == 0) {
		return (
			<View style={styles.emptyExpenses}>
				<Text style={styles.emptyText}>You dont have any expenses</Text>
			</View>
		);
	}
	return (
		<View style={styles.screen}>
			<ExpensesOutput expenses={recentExpenses} period="Last 7 Days" />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: COLORS.primary700,
		// marginTop: Platform.select({ android: StatusBar.currentHeight, ios: null }),
		paddingHorizontal: 10,
		paddingTop: 10,
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