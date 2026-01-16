import { ScrollView, Text, View, TouchableOpacity, Platform } from "react-native";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";
import { loadAppData } from "@/lib/storage";
import { motivationalQuotes } from "@/lib/preset-data";
import type { AppData } from "@/lib/types";

export default function DashboardScreen() {
  const [appData, setAppData] = useState<AppData | null>(null);
  const [dailyQuote, setDailyQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    loadData();
    setRandomQuote();
  }, []);

  const loadData = async () => {
    const data = await loadAppData();
    setAppData(data);
  };

  const setRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setDailyQuote(motivationalQuotes[randomIndex]);
  };

  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  if (!appData) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-muted">Loading...</Text>
      </ScreenContainer>
    );
  }

  const upcomingEvents = appData.events.filter(
    (e) => e.status === "confirmed" || e.status === "lead"
  ).length;
  const completedEvents = appData.events.filter((e) => e.status === "completed").length;
  const totalHooks = appData.hooks.length;
  const pendingContent = appData.contentPlans.filter((c) => !c.posted).length;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-foreground">
              Abang Colek 🌶️🥭
            </Text>
            <Text className="text-base text-muted">
              Brand OS • Founder Dashboard
            </Text>
          </View>

          {/* Daily Motivation Card */}
          <TouchableOpacity
            onPress={() => {
              handlePress();
              setRandomQuote();
            }}
            className="bg-primary rounded-2xl p-6 shadow-sm active:opacity-80"
          >
            <View className="gap-3">
              <View className="flex-row items-center gap-2">
                <Text className="text-2xl">📈</Text>
                <Text className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Daily Motivation
                </Text>
              </View>
              <Text className="text-lg font-bold text-foreground leading-relaxed">
                "{dailyQuote.quote}"
              </Text>
              <Text className="text-sm text-foreground/70">
                — {dailyQuote.author}
              </Text>
              <Text className="text-xs text-foreground/50 text-center mt-2">
                Tap untuk tukar quote
              </Text>
            </View>
          </TouchableOpacity>

          {/* Quick Stats */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Quick Stats
            </Text>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-3xl font-bold text-primary">
                  {upcomingEvents}
                </Text>
                <Text className="text-sm text-muted mt-1">
                  Upcoming Events
                </Text>
              </View>
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-3xl font-bold text-success">
                  {completedEvents}
                </Text>
                <Text className="text-sm text-muted mt-1">
                  Completed
                </Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-3xl font-bold text-error">
                  {totalHooks}
                </Text>
                <Text className="text-sm text-muted mt-1">
                  TikTok Hooks
                </Text>
              </View>
              <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
                <Text className="text-3xl font-bold text-warning">
                  {pendingContent}
                </Text>
                <Text className="text-sm text-muted mt-1">
                  Pending Posts
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Quick Actions
            </Text>
            <TouchableOpacity
              onPress={handlePress}
              className="bg-primary rounded-xl p-4 active:opacity-80"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">📅</Text>
                  <Text className="text-base font-semibold text-foreground">
                    Add New Event
                  </Text>
                </View>
                <Text className="text-foreground">→</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              className="bg-error rounded-xl p-4 active:opacity-80"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">🎬</Text>
                  <Text className="text-base font-semibold text-white">
                    Create TikTok Content
                  </Text>
                </View>
                <Text className="text-white">→</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              className="bg-surface rounded-xl p-4 border border-border active:opacity-70"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">✅</Text>
                  <Text className="text-base font-semibold text-foreground">
                    Booth Checklist
                  </Text>
                </View>
                <Text className="text-foreground">→</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Brand Tagline */}
          <View className="bg-surface rounded-2xl p-6 border border-border items-center">
            <Text className="text-2xl font-bold text-foreground text-center mb-2">
              Rasa Padu, Pedas Menggamit
            </Text>
            <Text className="text-sm text-muted text-center">
              🌶️ PEDAS MANIS LIKAT MELEKAT 🥭
            </Text>
            <Text className="text-xs text-muted text-center mt-3 italic">
              "Rasa Sekali Jatuh Cinta Selamanya"
            </Text>
          </View>

          {/* Founder's Corner */}
          <View className="bg-surface rounded-2xl p-6 border border-border">
            <View className="flex-row items-center gap-2 mb-3">
              <Text className="text-2xl">💡</Text>
              <Text className="text-lg font-semibold text-foreground">
                Founder's Corner
              </Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              Setiap event adalah peluang untuk buat customer jatuh cinta dengan
              brand kita. Consistency, quality, dan passion - itulah formula
              kejayaan Abang Colek!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
