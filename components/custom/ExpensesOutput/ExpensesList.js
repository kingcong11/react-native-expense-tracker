import { FlatList, StyleSheet, Text, View } from 'react-native'

/* Components */
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({ expenses }) {
	return (
		<View style={styles.container}>
			<FlatList
				data={expenses}
				keyExtractor={(item, index) => item.id}
				// contentContainerStyle={{ paddingBottom: 100 }}
				renderItem={(expenseData) => {

					const expense = expenseData.item;

					return (
						<ExpenseItem expense={expense} />
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'red',
		paddingTop: 4,
		flex: 1,
	},
	expensetext: {
		color: 'black',
	}
});