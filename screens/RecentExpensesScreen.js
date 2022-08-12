import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { COLORS } from '../constants/Colors';

/* Components */
import ExpensesOutput from '../components/custom/ExpensesOutput/ExpensesOutput';

export default function RecentExpensesScreen({ navigation, route }) {

	return (
		<View style={styles.screen}>
			<ExpensesOutput period="Last 7 Days" />
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: COLORS.primary700,
		// marginTop: Platform.select({ android: StatusBar.currentHeight, ios: null }),
		paddingHorizontal: 10,
		paddingTop: 10,
	}
});