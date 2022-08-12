import { createSlice } from "@reduxjs/toolkit";
import Expense from "../../models/Expense";
import moment from 'moment';

const initialState = {
	expenses: [
		new Expense(
			'e1',
			'TESTING REDUX 1',
			98.59,
			moment('2016-07-15')

		),
		new Expense(
			'e2',
			'TESTING REDUX 2',
			700.30,
			// new Date('2022-03-12'),
			moment('2022-03-12')
		),
	],
};

const expensesSlice = createSlice({
	name: 'expenses',
	initialState: initialState,
	reducers: {
		addExpenseFn: (state, action) => {

			const payload = action.payload;

			const newExpense = new Expense(
				Math.random().toString(),
				payload.description,
				payload.amount,
				payload.date,
			);

			state.expenses.push(newExpense);
		},
		removeExpenseFn: (state, action) => {

			console.log(`BEFORE: `, state.expenses);

			const expenseId = action.payload.expenseId;
			const indexOfExpense = state.expenses.map((expense) => expense.id).indexOf(expenseId);
			state.expenses.splice(indexOfExpense, 1);

			console.log(`BEFORE: `, state.expenses);

		},
		updateExpenseFn: (state, action) => {


			const payload = action.payload;
			const expenseId = payload.expenseId;
			const indexOfExpense = state.expenses.map((expense) => expense.id).indexOf(expenseId);
			const expenseToUpdate = state.expenses[indexOfExpense];

			console.log(`PAYLOAD RECEIVED: `, payload);

			/* updating data */
			state.expenses[indexOfExpense] = new Expense(
				payload.expenseId,
				payload.description,
				payload.amount,
				payload.date,
			);

		}
	}

});

export const { addExpenseFn, removeExpenseFn, updateExpenseFn } = expensesSlice.actions

export default expensesSlice.reducer;