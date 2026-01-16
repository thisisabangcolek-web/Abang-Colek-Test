import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { sampleHooks } from "@/lib/preset-data";
import type { Hook } from "@/lib/types";

export default function TikTokScreen() {
  const colors = useColors();
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "used">("popular");

  useEffect(() => {
    // Load hooks from storage or use sample data
    setHooks(sampleHooks);
  }, []);

  // Get all unique tags from hooks
  const allTags = Array.from(
    new Set(hooks.flatMap((hook) => hook.tags))
  ).sort();

  // Filter and sort hooks
  const filteredHooks = hooks
    .filter((hook) => {
      // Search filter
      const matchesSearch = hook.text
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => hook.tags.includes(tag));

      return matchesSearch && matchesTags;
    })
    .sort((a, b) => {
      if (sortBy === "popular") {
        return (b.performance?.views || 0) - (a.performance?.views || 0);
      } else if (sortBy === "used") {
        return b.usedCount - a.usedCount;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const toggleTag = (tag: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const copyToClipboard = async (text: string, hookId: string) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    await Clipboard.setStringAsync(text);
    
    // Update used count
    setHooks((prev) =>
      prev.map((h) =>
        h.id === hookId
          ? { ...h, usedCount: h.usedCount + 1, lastUsed: new Date().toISOString() }
          : h
      )
    );

    if (Platform.OS === "web") {
      alert("Hook copied to clipboard!");
    } else {
      Alert.alert("✅ Copied!", "Hook copied to clipboard");
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="p-6 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              TikTok Hook Bank 🎬
            </Text>
            <Text className="text-sm text-muted">
              {filteredHooks.length} hooks • Tap to copy
            </Text>
          </View>

          {/* Search Bar */}
          <View className="bg-surface rounded-xl p-4 border border-border">
            <TextInput
              placeholder="Search hooks..."
              placeholderTextColor={colors.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="text-base text-foreground"
              style={{ outlineStyle: "none" } as any}
            />
          </View>

          {/* Sort Options */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setSortBy("popular")}
              style={{
                opacity: sortBy === "popular" ? 1 : 0.6,
              }}
              className={`flex-1 py-3 rounded-lg ${
                sortBy === "popular" ? "bg-primary" : "bg-surface"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  sortBy === "popular" ? "text-foreground" : "text-muted"
                }`}
              >
                🔥 Popular
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSortBy("used")}
              style={{
                opacity: sortBy === "used" ? 1 : 0.6,
              }}
              className={`flex-1 py-3 rounded-lg ${
                sortBy === "used" ? "bg-primary" : "bg-surface"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  sortBy === "used" ? "text-foreground" : "text-muted"
                }`}
              >
                ⭐ Most Used
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSortBy("recent")}
              style={{
                opacity: sortBy === "recent" ? 1 : 0.6,
              }}
              className={`flex-1 py-3 rounded-lg ${
                sortBy === "recent" ? "bg-primary" : "bg-surface"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  sortBy === "recent" ? "text-foreground" : "text-muted"
                }`}
              >
                🕐 Recent
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tag Filter */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">
              Filter by Tags:
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {allTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={{
                    opacity: selectedTags.includes(tag) ? 1 : 0.7,
                  }}
                  className={`px-4 py-2 rounded-full ${
                    selectedTags.includes(tag)
                      ? "bg-error"
                      : "bg-surface border border-border"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedTags.includes(tag)
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    #{tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedTags.length > 0 && (
              <TouchableOpacity
                onPress={() => setSelectedTags([])}
                className="self-start"
              >
                <Text className="text-sm text-error font-medium">
                  Clear filters
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Hooks List */}
          <View className="gap-4">
            {filteredHooks.length === 0 ? (
              <View className="bg-surface rounded-2xl p-8 items-center gap-2">
                <Text className="text-4xl">🔍</Text>
                <Text className="text-base font-semibold text-foreground">
                  No hooks found
                </Text>
                <Text className="text-sm text-muted text-center">
                  Try adjusting your search or filters
                </Text>
              </View>
            ) : (
              filteredHooks.map((hook) => (
                <TouchableOpacity
                  key={hook.id}
                  onPress={() => copyToClipboard(hook.text, hook.id)}
                  style={({ pressed }: { pressed: boolean }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                  className="bg-surface rounded-2xl p-4 border border-border gap-3"
                >
                  {/* Hook Text */}
                  <Text className="text-base font-medium text-foreground leading-relaxed">
                    {hook.text}
                  </Text>

                  {/* Tags */}
                  <View className="flex-row flex-wrap gap-2">
                    {hook.tags.map((tag) => (
                      <View
                        key={tag}
                        className="bg-background px-3 py-1 rounded-full"
                      >
                        <Text className="text-xs text-muted">#{tag}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Performance Metrics */}
                  {hook.performance && (
                    <View className="flex-row gap-4 pt-2 border-t border-border">
                      <View className="flex-row items-center gap-1">
                        <Text className="text-xs text-muted">👁️</Text>
                        <Text className="text-xs font-semibold text-foreground">
                          {formatNumber(hook.performance.views)}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Text className="text-xs text-muted">❤️</Text>
                        <Text className="text-xs font-semibold text-foreground">
                          {formatNumber(hook.performance.likes)}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Text className="text-xs text-muted">🔄</Text>
                        <Text className="text-xs font-semibold text-foreground">
                          {formatNumber(hook.performance.shares)}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Text className="text-xs text-muted">📊</Text>
                        <Text className="text-xs font-semibold text-success">
                          {hook.performance.engagement.toFixed(1)}%
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Usage Stats */}
                  <View className="flex-row justify-between items-center pt-2 border-t border-border">
                    <Text className="text-xs text-muted">
                      Used {hook.usedCount} times
                      {hook.lastUsed && ` • Last: ${formatDate(hook.lastUsed)}`}
                    </Text>
                    <View className="bg-primary px-3 py-1 rounded-full">
                      <Text className="text-xs font-semibold text-foreground">
                        📋 Copy
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Add New Hook Button */}
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS !== "web") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
              Alert.alert("Coming Soon", "Hook creation feature coming soon!");
            }}
            style={({ pressed }: { pressed: boolean }) => ({
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
            className="bg-error rounded-2xl p-4 items-center"
          >
            <Text className="text-base font-bold text-white">
              ➕ Add New Hook
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
