import { createSlice } from "@reduxjs/toolkit";
import Expense from "../../models/Expense";
import moment from 'moment';
import { storeExpense } from "../../utils/network/http";

const initialState = {
	expenses: [
		// new Expense(
		// 	'e1',
		// 	'TESTING REDUX 1',
		// 	98.59,
		// 	moment('2016-07-15')

		// ),
		// new Expense(
		// 	'e2',
		// 	'TESTING REDUX 2',
		// 	700.30,
		// 	// new Date('2022-03-12'),
		// 	moment('2022-03-12')
		// ),
	],
};

const expensesSlice = createSlice({
	name: 'expenses',
	initialState: initialState,
	reducers: {
		addExpenseFn: (state, action) => {

			const payload = action.payload;

			const newExpense = new Expense(
				payload.id,
				payload.expenseData.description,
				payload.expenseData.amount,
				payload.expenseData.date,
			);

			state.expenses.push(newExpense);
		},
		removeExpenseFn: (state, action) => {

			const expenseId = action.payload.expenseId;
			const indexOfExpense = state.expenses.map((expense) => expense.id).indexOf(expenseId);
			state.expenses.splice(indexOfExpense, 1);

		},
		updateExpenseFn: (state, action) => {


			const payload = action.payload;
			const expenseId = payload.expenseId;
			const indexOfExpense = state.expenses.map((expense) => expense.id).indexOf(expenseId);

			console.log(`PAYLOAD RECEIVED: `, payload);

			/* updating data */
			state.expenses[indexOfExpense] = new Expense(
				payload.expenseId,
				payload.expenseData.description,
				payload.expenseData.amount,
				payload.expenseData.date,
			);

		},
		setExpensesFn: (state, action) => {
			state.expenses = action.payload;
		}
	}

});

export const { addExpenseFn, removeExpenseFn, updateExpenseFn, setExpensesFn } = expensesSlice.actions

export default expensesSlice.reducer;