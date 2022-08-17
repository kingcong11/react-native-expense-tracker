import axios from "axios";
import moment from "moment";

const BACKEND_URL = 'https://react-native-expenses-tr-a2033-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function storeExpense(expenseData) {
	const response = await axios.post(
		BACKEND_URL + '/expenses.json',
		JSON.stringify(expenseData)
	);

	const idGenerated = response.data.name;

	return idGenerated;
}

export async function fetchExpenses() {
	const response = await axios.get(BACKEND_URL + '/expenses.json');

	const expences = [];

	for (let key in response.data) {
		const expenseObject = {
			id: key,
			amount: response.data[key].amount,
			date: moment(response.data[key].date),
			description: response.data[key].description,
		}

		expences.push(expenseObject);
	}

	return expences;
}

export function updateExpense(id, updatedExpenseData) {
	return axios.put(
		BACKEND_URL + `/expenses/${id}.json`,
		updatedExpenseData
	);
}

export function deleteExpense(id) {
	return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}