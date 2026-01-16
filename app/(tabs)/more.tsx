import { ScrollView, Text, View, TouchableOpacity, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";
import { JinglePlayer } from "@/components/jingle-player";
import { taglines } from "@/lib/preset-data";

export default function MoreScreen() {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView>
        <View className="gap-6">
          <Text className="text-3xl font-bold text-foreground">More</Text>

          {/* Jingle Player */}
          <JinglePlayer />

          {/* Brand Kit Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Brand Kit</Text>
            
            {/* Colors */}
            <View className="bg-surface rounded-xl p-4 border border-border">
              <Text className="text-sm font-semibold text-foreground mb-3">Brand Colors</Text>
              <View className="flex-row gap-2">
                <View className="flex-1 items-center gap-1">
                  <View className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#FFC107" }} />
                  <Text className="text-xs text-muted">Yellow</Text>
                </View>
                <View className="flex-1 items-center gap-1">
                  <View className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#E53935" }} />
                  <Text className="text-xs text-muted">Red</Text>
                </View>
                <View className="flex-1 items-center gap-1">
                  <View className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#1A1A1A" }} />
                  <Text className="text-xs text-muted">Black</Text>
                </View>
                <View className="flex-1 items-center gap-1">
                  <View className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#4CAF50" }} />
                  <Text className="text-xs text-muted">Green</Text>
                </View>
              </View>
            </View>

            {/* Taglines */}
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <Text className="text-sm font-semibold text-foreground">Brand Taglines</Text>
              {taglines.map((tagline) => (
                <View key={tagline.id} className="gap-1">
                  <Text className="text-sm font-medium text-foreground">
                    {tagline.emoji} {tagline.text}
                  </Text>
                  <Text className="text-xs text-muted capitalize">
                    {tagline.context}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Links */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Quick Links</Text>
            
            <TouchableOpacity
              onPress={handlePress}
              className="bg-surface rounded-xl p-4 border border-border active:opacity-70"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">✅</Text>
                  <Text className="text-base font-semibold text-foreground">
                    Booth Ops Checklist
                  </Text>
                </View>
                <Text className="text-foreground">→</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePress}
              className="bg-surface rounded-xl p-4 border border-border active:opacity-70"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">📊</Text>
                  <Text className="text-base font-semibold text-foreground">
                    Reviews & Analytics
                  </Text>
                </View>
                <Text className="text-foreground">→</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePress}
              className="bg-surface rounded-xl p-4 border border-border active:opacity-70"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">📤</Text>
                  <Text className="text-base font-semibold text-foreground">
                    Export & Backup
                  </Text>
                </View>
                <Text className="text-foreground">→</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* About */}
          <View className="bg-surface rounded-xl p-6 border border-border items-center">
            <Text className="text-2xl mb-2">🌶️🥭</Text>
            <Text className="text-lg font-bold text-foreground mb-1">
              Abang Colek
            </Text>
            <Text className="text-sm text-muted text-center">
              Brand OS v1.0.0
            </Text>
            <Text className="text-xs text-muted text-center mt-3">
              by Liurleleh House
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
