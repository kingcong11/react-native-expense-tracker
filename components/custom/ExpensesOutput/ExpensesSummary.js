import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors';

/* Components */
import Row from '../../ui/Row';

export default function ExpensesSummary({ expenses, period }) {

	const totalExpenses = expenses.reduce((sum, expense) => {
		return sum + expense.amount;
	}, 0);

	return (
		<Row style={styles.rowContainer}>
			<Text style={styles.period}>{period}</Text>
			<Text style={styles.amount}>${totalExpenses.toFixed(2)}</Text>
		</Row>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		justifyContent: 'space-between',
		padding: 8,
		backgroundColor: COLORS.primary50,
		borderRadius: 6,
	},
	period: {
		fontSize: 17,
		color: COLORS.primary400,
	},
	amount: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.primary500,
	},
});