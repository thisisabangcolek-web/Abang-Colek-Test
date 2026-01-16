import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function TikTokScreen() {
  return (
    <ScreenContainer className="p-6">
      <ScrollView>
        <View className="gap-4">
          <Text className="text-3xl font-bold text-foreground">TikTok Engine 🎬</Text>
          <Text className="text-base text-muted">
            Hook bank, content calendar, and shot lists
          </Text>
          <View className="bg-surface rounded-xl p-6 border border-border items-center">
            <Text className="text-6xl mb-4">🌶️🥭</Text>
            <Text className="text-lg font-semibold text-foreground mb-2">
              Coming Soon
            </Text>
            <Text className="text-sm text-muted text-center">
              Manage your TikTok hooks, content calendar, and create viral content
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
