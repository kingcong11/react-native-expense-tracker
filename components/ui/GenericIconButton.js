import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../constants/Colors';

export default function GenericIconButton({ icon, size, color, pressFn }) {
	return (
		<Pressable style={({ pressed }) => [
			styles.container,
			pressed ? styles.pressed : null
		]} onPress={pressFn}>
			<View>
				<FontAwesome5 name={icon} size={size} color={color} />
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		marginRight: 20,
	},
	pressed: {
		opacity: 0.75
	}

});