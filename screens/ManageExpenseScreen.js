import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { useLayoutEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/Colors';

/* Components */
import GenericIconButton from '../components/ui/GenericIconButton';
import Row from '../components/ui/Row';
import GenericButton from '../components/ui/GenericButton';

export default function ManageExpenseScreen({ navigation, route }) {

	/* Hooks & Variables */
	const screenParameters = route.params;
	const expenseIdToEdit = screenParameters?.expenseId;
	const isEditing = expenseIdToEdit !== undefined;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: (isEditing) ? 'Edit Expense' : 'Add Expense'
		});
	}, [navigation, expenseIdToEdit]);

	/* Methods */
	function deleteExpense() {
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler() {
		navigation.goBack();

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