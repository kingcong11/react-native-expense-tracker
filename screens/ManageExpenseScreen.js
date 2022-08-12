import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { useLayoutEffect } from 'react';
import { COLORS } from '../constants/Colors';
import moment from 'moment';

/* State Related */
import { useDispatch } from 'react-redux';
import { addExpenseFn, removeExpenseFn, updateExpenseFn } from '../store/slices/expenses';

/* Components */
import GenericIconButton from '../components/ui/GenericIconButton';
import Row from '../components/ui/Row';
import GenericButton from '../components/ui/GenericButton';

export default function ManageExpenseScreen({ navigation, route }) {

	/* Hooks & Variables */
	const screenParameters = route.params;
	const expenseIdToEdit = screenParameters?.expenseId;
	const isEditing = expenseIdToEdit !== undefined;
	const dispatch = useDispatch();

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

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler(userInput) {
		// make sure later that the userInput is an object following the expenseModel
		navigation.goBack();
		if (isEditing) {
			const payload = {
				expenseId: expenseIdToEdit,
				description: 'NEW TESTING DESCRIPTION',
				amount: 9999.00,
				date: moment(),
			};
			dispatch(updateExpenseFn(payload));
		} else {
			const payload = {
				id: Math.random().toString(),
				description: 'NEWLY ADDED',
				amount: 9999.00,
				date: moment(),
			};
			dispatch(addExpenseFn(payload));
		}
	}

	return (
		<View style={styles.screen}>
			<Row style={styles.buttonsContainer}>
				<GenericButton style={styles.buttons} mode="flat" onPressFn={cancelHandler}>Cancel</GenericButton>
				<GenericButton style={styles.buttons} onPressFn={confirmHandler}>{(isEditing) ? 'Update' : 'Add'}</GenericButton>
			</Row>
			{
				(isEditing)
				&& <View style={styles.deleteContainer}>
					<GenericIconButton icon="trash-alt" size={24} color="tomato" pressFn={deleteExpense} />
				</View>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.primary800,
		padding: 12,
		// marginTop: Platform.select({ android: StatusBar.currentHeight, ios: null }),
	},
	deleteContainer: {
		alignItems: 'center',
		borderTopWidth: 2,
		borderTopColor: COLORS.primary200,
		paddingTop: 14,
		marginTop: 16,
	},
	buttonsContainer: {
		// backgroundColor: 'white',
		justifyContent: 'center'
	},
	buttons: {
		marginHorizontal: 8,
		minWidth: 100,
	}
});