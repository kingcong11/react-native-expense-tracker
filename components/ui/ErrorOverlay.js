import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native'
import { COLORS } from '../../constants/Colors';

export default function ErrorOverlay({ message, onPressFn }) {

	const navigation = useNavigation();
	return (
		<View style={styles.flex}>
			<Text style={[styles.text, styles.title]}>An error occured!!</Text>
			<Text style={styles.text}>{message}</Text>
			<Button
				title='Okay'
				onPress={onPressFn}
			></Button>
		</View >
	);
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: COLORS.primary700
	},
	text: {
		color: 'white',
		textAlign: 'center',
		marginBottom: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
}); 