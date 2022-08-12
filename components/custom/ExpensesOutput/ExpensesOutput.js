import { StyleSheet, Text, View, FlatList } from 'react-native'
import { EXPENSES } from '../../../data/dummy-data';


/* Components */
import Column from '../../ui/Column';
import Row from '../../ui/Row';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const DUMMY_EXPENSES = EXPENSES;

export default function ExpensesOutput({ expenses, period }) {

	return (
		<Column style={styles.column}>
			<ExpensesSummary expenses={expenses} period={period} />
			<ExpensesList expenses={expenses} />
		</Column>
	);
}

const styles = StyleSheet.create({
	column: {
		// backgroundColor: 'lime',
		flex: 1,
	},
});