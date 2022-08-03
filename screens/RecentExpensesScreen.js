import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import React from 'react'

export default function RecentExpensesScreen() {
	return (
		<View style={styles.screen}>
			<Text>RecentExpensesScreen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'tomato',
		// marginTop: Platform.select({ android: StatusBar.currentHeight, ios: null }),
	}
});