import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function EventsScreen() {
  return (
    <ScreenContainer className="p-6">
      <ScrollView>
        <View className="gap-4">
          <Text className="text-3xl font-bold text-foreground">Events Pipeline</Text>
          <Text className="text-base text-muted">
            Manage your event bookings from lead to completion
          </Text>
          <View className="bg-surface rounded-xl p-6 border border-border items-center">
            <Text className="text-6xl mb-4">📅</Text>
            <Text className="text-lg font-semibold text-foreground mb-2">
              Coming Soon
            </Text>
            <Text className="text-sm text-muted text-center">
              Event pipeline with status tracking, EO contacts, and booth ops integration
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
