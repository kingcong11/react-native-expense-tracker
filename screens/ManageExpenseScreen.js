import { StyleSheet, Text, View, Platform, StatusBar, ScrollView } from 'react-native'
import { useLayoutEffect } from 'react';
import { COLORS } from '../constants/Colors';
import moment from 'moment';

/* State Related */
import { useDispatch, useSelector } from 'react-redux';
import { removeExpenseFn, addExpenseFn, updateExpenseFn } from '../store/slices/expenses';

/* Components */
import GenericIconButton from '../components/ui/GenericIconButton';
import ExpenseForm from '../components/custom/ManageExpense/ExpenseForm';

export default function ManageExpenseScreen({ navigation, route }) {

	/* Hooks & Variables */
	const screenParameters = route.params;
	const expenseIdToEdit = screenParameters?.expenseId;
	const isEditing = expenseIdToEdit !== undefined;
	const selectedExpense = useSelector((state) => state.userExpenses.expenses).find((expense) => expense.id == expenseIdToEdit);
	const dispatch = useDispatch();

	console.log(`THIS IS THE RESULT: `, selectedExpense);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: (isEditing) ? 'Edit Expense' : 'Add Expense'
		});
	}, [navigation, expenseIdToEdit]);

	/* Methods */
	function deleteExpense() {
		navigation.goBack();

		const payload = {
			expenseId: expenseIdToEdit
		}
		dispatch(removeExpenseFn(payload));
	}

	function confirmHandler(expenseData) {
		// make sure later that the userInput is an object following the expenseModel
		navigation.goBack();
		if (isEditing) {
			const payload = {
				expenseId: expenseIdToEdit,
				expenseData: expenseData
			};
			dispatch(updateExpenseFn(payload));
		} else {
			const payload = {
				expenseData: expenseData
			};
			dispatch(addExpenseFn(payload));
		}
	}

	function cancelHandler() {
		navigation.goBack();
	}

	return (
		<View style={styles.screen}>
			<ScrollView style={styles.sample}>
				<ExpenseForm onCancelFn={cancelHandler} onConfirmFn={confirmHandler} expense={selectedExpense} confirmLabel={(isEditing) ? 'Update' : 'Add'} />
				{
					(isEditing)
					&& <View style={styles.deleteContainer}>
						<GenericIconButton icon="trash-alt" size={24} color="tomato" pressFn={deleteExpense} />
					</View>
				}
			</ScrollView>
		</View >
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.primary800,
		paddingHorizontal: 12,
		// marginTop: Platform.select({ android: StatusBar.currentHeight, ios: null }),
	},
	deleteContainer: {
		alignItems: 'center',
		borderTopWidth: 2,
		borderTopColor: COLORS.primary200,
		paddingTop: 14,
		marginTop: 16,
	},
	sample: {
		// backgroundColor: 'red',
	}
});