import { StyleSheet, Text, View, TextInput } from 'react-native'
import { COLORS } from '../../../constants/Colors';

export default function CustomInput({ label, inputProps, valid }) {


	const isMultiline = ('multiline' in inputProps);
	const inputStyles = [
		styles.input,
		(isMultiline) && styles.multiline,
		!valid ? { borderColor: 'tomato', borderWidth: 2, backgroundColor: COLORS.error50 } : null
	];

	return (
		<View style={styles.container}>
			<Text style={[styles.label, (!valid) ? styles.invalidLabel : null]}>{label}</Text>
			<TextInput style={inputStyles} {...inputProps} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 4,
		marginVertical: 6,
		// backgroundColor: 'white',
		flex: 1,
	},
	label: {
		fontSize: 14,
		color: COLORS.primary100,
		marginBottom: 4,
	},
	input: {
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 4,
		backgroundColor: COLORS.primary100,
		padding: 6,
		fontSize: 18,
		color: COLORS.primary700,
	},
	multiline: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
	invalidLabel: {
		color: 'tomato'
	}
});