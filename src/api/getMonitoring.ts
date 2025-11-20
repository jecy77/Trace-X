// src/apis/dashboard/getMonitoring.ts
import axios from "axios";

export type MonitoringItem = {
  chain: string;
  txHash: string;
  timestamp: string;
  value: string;
};

export type MonitoringResponse = {
  RecentHighValueTransfers: MonitoringItem[];
  cache_age_seconds?: number; // 프론트는 무시해도 됨
};

export async function getMonitoring() {
  try {
    const res = await axios.get<MonitoringResponse>(
      `${import.meta.env.VITE_API_URL}/api/dashboard/monitoring`
    );

    return res.data;
  } catch (err) {
    console.error("❌ getMonitoring API Error:", err);
    throw err;
  }
}
