import { Container } from "@/components/container";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
	return (
		<Container>
			<ScrollView className="flex-1 py-4">
				<Text className="mb-6 font-bold font-mono text-2xl text-foreground">
					BETTER T STACK
				</Text>

				<View className="rounded-lg border border-foreground p-4">
					<Text className="mb-2 font-medium text-foreground">API Status</Text>
				</View>
			</ScrollView>
		</Container>
	);
}
