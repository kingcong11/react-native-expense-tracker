import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import React from 'react'

export default function AllExpensesScreen() {
	return (
		<View style={styles.screen}>
			<Text>AllExpensesScreen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightblue',
		marginTop: Platform.select({ android: StatusBar.currentHeight, ios: null }),
	}
});