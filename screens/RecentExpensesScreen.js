import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { COLORS } from '../constants/Colors';
import { getDateMinusDaysFromNow } from '../utils/date';
import moment from 'moment';
import { useEffect, useState } from 'react';

/* State Related */
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../utils/network/http';
import { setExpensesFn } from '../store/slices/expenses';

/* Components */
import ExpensesOutput from '../components/custom/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

export default function RecentExpensesScreen({ navigation, route }) {
	/* Hooks & Variables */
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const dispatch = useDispatch();
	const expenses = useSelector((state) => state.userExpenses.expenses);

	useEffect(() => {
		async function getExpenses() {
			setIsLoading(true);
			try {
				const expenses = await fetchExpenses();
				dispatch(setExpensesFn(expenses));
			} catch (error) {
				setError('Failed to fetch expenses');
			}
			setIsLoading(false);
		}

		getExpenses();
	}, []);

	const leftDateBoundary = getDateMinusDaysFromNow(7);
	const recentExpenses = expenses.filter((expense) => moment(expense.date).isAfter(leftDateBoundary));

	if (error && !isLoading) {
		return <ErrorOverlay message={error} onPressFn={() => setError(null)} />
	}
	if (isLoading) {
		return <LoadingOverlay />
	}

	if (recentExpenses.length == 0) {
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