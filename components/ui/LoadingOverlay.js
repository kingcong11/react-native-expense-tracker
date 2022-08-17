import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { COLORS } from '../../constants/Colors';

export default function LoadingOverlay() {
	return (
		<View style={styles.flex}>
			<ActivityIndicator size='large' color='white' />
		</View>
	);
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: COLORS.primary700
	}
});