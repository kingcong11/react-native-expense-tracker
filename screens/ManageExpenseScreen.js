import { StyleSheet, Text, View, Platform, StatusBar, ScrollView } from 'react-native'
import { COLORS } from '../constants/Colors';
import { storeExpense, updateExpense, deleteExpense } from '../utils/network/http';

/* State Related */
import { useDispatch, useSelector } from 'react-redux';
import { removeExpenseFn, addExpenseFn, updateExpenseFn } from '../store/slices/expenses';
import { useLayoutEffect, useState } from 'react';


/* Components */
import GenericIconButton from '../components/ui/GenericIconButton';
import ExpenseForm from '../components/custom/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

export default function ManageExpenseScreen({ navigation, route }) {

	/* Hooks & Variables */
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const screenParameters = route.params;
	const expenseIdToEdit = screenParameters?.expenseId;
	const isEditing = expenseIdToEdit !== undefined;
	const selectedExpense = useSelector((state) => state.userExpenses.expenses).find((expense) => expense.id == expenseIdToEdit);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: (isEditing) ? 'Edit Expense' : 'Add Expense'
		});
	}, [navigation, expenseIdToEdit]);

	/* Methods */
	async function removeExpense() {
		setIsLoading(true);
		const payload = {
			expenseId: expenseIdToEdit
		}
		try {
			await deleteExpense(expenseIdToEdit);
			dispatch(removeExpenseFn(payload));
			navigation.goBack();
		} catch (error) {
			setError('Could not delete expense');
			setIsLoading(false);
		}
	}

	async function confirmHandler(expenseData) {
		// make sure later that the userInput is an object following the expenseModel
		setIsLoading(true);
		try {
			if (isEditing) {
				const payload = {
					expenseId: expenseIdToEdit,
					expenseData: expenseData
				};
				dispatch(updateExpenseFn(payload));
				await updateExpense(expenseIdToEdit, expenseData)
			} else {
				const idGenerated = await storeExpense(expenseData);
				const payload = {
					id: idGenerated,
					expenseData: expenseData
				};
				dispatch(addExpenseFn(payload));
			}
			navigation.goBack();

		} catch (error) {
			setError('Could not save data');
			setIsLoading(false);
		}
	}

	function cancelHandler() {
		navigation.goBack();
	}


	if (error && !isLoading) {
		return <ErrorOverlay message={error} onPressFn={() => setError(null)} />
	}

	if (isLoading) {
		return <LoadingOverlay />
	}

	return (
		<View style={styles.screen}>
			<ScrollView style={styles.sample}>
				<ExpenseForm onCancelFn={cancelHandler} onConfirmFn={confirmHandler} expense={selectedExpense} confirmLabel={(isEditing) ? 'Update' : 'Add'} />
				{
					(isEditing)
					&& <View style={styles.deleteContainer}>
						<GenericIconButton icon="trash-alt" size={24} color="tomato" pressFn={removeExpense} />
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
