import { StyleSheet, Text, View, Pressable } from 'react-native'
import { COLORS } from '../../../constants/Colors';

/* Utils */
import { getFormattedDate } from '../../../utils/date';
/* Components */
import Row from '../../ui/Row';

export default function ExpenseItem({ expense }) {
	return (
		<Pressable onPress={() => {
			console.log(`asdasda`);
		}}>
			<Row style={[styles.row, styles.expenseItem]}>
				<View >
					<Text style={[styles.textBase, styles.description]}>{expense.description}</Text>
					<Text style={[styles.textBase]}>{getFormattedDate(expense.date)}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>{expense.amount.toFixed(2)}</Text>
				</View>
			</Row>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	row: {
		justifyContent: 'space-between',
	},
	expenseItem: {
		padding: 10,
		backgroundColor: COLORS.primary500, //change later COLORS.primary500
		marginVertical: 4,
		borderRadius: 6,
		elevation: 3,
		shadowColor: COLORS.gray500,
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4

	},
	textBase: {
		color: COLORS.primary50
	},
	amount: {
		color: COLORS.primary500,
		fontWeight: 'bold',
	},
	amountContainer: {
		paddingHorizontal: 12,
		// paddingVertical: 4,
		borderRadius: 4,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 80,
	},
	description: {
		fontSize: 16,
		marginBottom: 4,
		fontWeight: 'bold',
	}
});