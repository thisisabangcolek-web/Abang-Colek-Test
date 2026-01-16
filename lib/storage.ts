import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppData } from "./types";

const STORAGE_KEY = "@abang_colek_app_data";

export const defaultAppData: AppData = {
  events: [],
  checklists: [],
  hooks: [],
  contentPlans: [],
  reviews: [],
  milestones: [],
  luckyDrawCampaigns: [],
  luckyDrawEntries: [],
  luckyDrawWinners: [],
};

export async function loadAppData(): Promise<AppData> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    return defaultAppData;
  } catch (error) {
    console.error("Error loading app data:", error);
    return defaultAppData;
  }
}

export async function saveAppData(data: AppData): Promise<void> {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error("Error saving app data:", error);
    throw error;
  }
}

export async function clearAppData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing app data:", error);
    throw error;
  }
}

export async function exportAppData(): Promise<string> {
  try {
    const data = await loadAppData();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Error exporting app data:", error);
    throw error;
  }
}

export async function importAppData(jsonString: string): Promise<void> {
  try {
    const data = JSON.parse(jsonString) as AppData;
    await saveAppData(data);
  } catch (error) {
    console.error("Error importing app data:", error);
    throw error;
  }
}
