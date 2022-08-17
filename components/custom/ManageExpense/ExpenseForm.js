import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

/* State Related */
import { useDispatch } from 'react-redux';
import { addExpenseFn } from '../../../store/slices/expenses';


/* Components */
import CustomInput from './CustomInput';
import Row from '../../ui/Row';
import GenericButton from '../../ui/GenericButton';



export default function ExpenseForm({ onCancelFn, confirmLabel, onConfirmFn, expense }) {

	/* Hooks and variables */
	const [inputs, setInputs] = useState({
		amount: {
			value: expense ? expense.amount.toString() : '',
			isValid: true,
		},
		date: {
			value: expense ? moment(expense.date).format('YYYY-MM-DD') : '',
			isValid: true,
		},
		description: {
			value: expense ? expense.description : '',
			isValid: true,
		}
	});
	const formIsValid = (inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid);

	const amountProps = {
		keyboardType: 'decimal-pad',
		onChangeText: (input) => {
			inputChangeHandler('amount', input);
		},
		value: inputs.amount.value
	};
	const dateProps = {
		placeholder: 'YYYY-MM-DD',
		maxLength: 10,
		onChangeText: (input) => {
			inputChangeHandler('date', input);
		},
		value: inputs.date.value
	};
	const descriptionProps = {
		multiline: true,
		autoCorrect: false,
		onChangeText: (input) => {
			inputChangeHandler('description', input);
		},
		value: inputs.description.value
	};
	const navigation = useNavigation();
	const dispatch = useDispatch();

	/* Methods */
	function inputChangeHandler(identifier, input) {
		/* 
		||	identifier['amount', 'date', 'description']
		||	the [identifier]: input is a standard js. it allows us to set and target a property dinamically. 
		||	in this case, whatever the identifier is, it will override the spread currentValues so we only 
		||	change the value of identified property
		*/

		setInputs((currentValue) => {
			return {
				...currentValue,
				[identifier]: { value: input, isValid: true },
			}
		});

		// console.log(inputs);
	}

	function trySubmitForm() {
		const expenseData = {
			amount: parseFloat(inputs.amount.value),
			date: moment(inputs.date.value).format('YYYY-MM-DD'),
			description: inputs.description.value,
		}

		const amountIsValid = (!isNaN(expenseData.amount) && expenseData.amount > 0);
		const dateIsValid = moment(expenseData.date).isValid();
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (amountIsValid && dateIsValid && descriptionIsValid) {
			onConfirmFn(expenseData);
		} else {
			/* Show some feedback */


			setInputs((crnt) => {
				return {
					amount: { value: crnt.amount.value, isValid: amountIsValid },
					date: { value: crnt.date.value, isValid: dateIsValid },
					description: { value: crnt.description.value, isValid: descriptionIsValid },
				}
			})
			return;
		}

	}

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<Row style={styles.row}>
				<CustomInput label="Amount" inputProps={amountProps} valid={inputs.amount.isValid} />
				<CustomInput label="Date" inputProps={dateProps} valid={inputs.date.isValid} />
			</Row>
			<CustomInput label="Description" inputProps={descriptionProps} valid={inputs.description.isValid} />

			{(!formIsValid) && <Text style={styles.invalidInput}>Invalid inputs - Please check entered data</Text>}

			<Row style={styles.buttonsContainer}>
				<GenericButton style={styles.buttons} mode="flat" onPressFn={onCancelFn}>Cancel</GenericButton>
				<GenericButton style={styles.buttons} onPressFn={trySubmitForm}>{confirmLabel}</GenericButton>
			</Row>
		</View>

	);
}

const styles = StyleSheet.create({
	row: {
		justifyContent: 'space-evenly',
	},
	form: {
		marginTop: 70,
	},
	title: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 24,
		marginVertical: 12,
	},
	buttonsContainer: {
		justifyContent: 'center',
		marginTop: 10,
	},
	buttons: {
		marginHorizontal: 8,
		minWidth: 100,
	},
	invalidInput: {
		color: 'tomato',
		marginLeft: 6
	}
});