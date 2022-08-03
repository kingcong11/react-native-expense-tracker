import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import React from 'react'

export default function ManageExpenseScreen() {
	return (
		<View style={styles.screen}>
			<Text>ManageExpenseScreen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightgreen',
		// marginTop: Platform.select({ android: StatusBar.currentHeight, ios: null }),
	}
});