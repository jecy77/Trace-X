/* ============================================
   📌 응답 타입 정의
============================================ */

import { api } from "./axiosInstance";

export type DashboardSummaryResponse = {
  data: {
    totalVolume: {
      value: number;
      changeRate: string;
    };
    totalTransactions: {
      value: number;
      changeRate: string;
    };
    highRiskTransactions: {
      value: number;
      changeRate: string;
    };
    warningTransactions: {
      value: number;
      changeRate: string;
    };

    highRiskTransactionTrend: Record<string, number>;

    highRiskTransactionsByChain: Record<string, Record<string, number>>;

    averageRiskScore: Record<string, number>;
  };
};

/* ============================================
   📌 getDashboardSummary 
============================================ */

export const getDashboardSummary = async (chainId?: string) => {
  try {
    const res = await api.get<DashboardSummaryResponse>(
      "/api/dashboard/summary",
      {
        params: chainId ? { chain_id: chainId } : undefined, // ⭐ 변경!
      }
    );

    return res.data.data;
  } catch (error: any) {
    // 서버 응답 오류
    if (error.response) {
      console.error(
        "[Dashboard API Error] 서버 응답 오류:",
        error.response.status,
        error.response.data
      );
      throw new Error(
        error.response.data?.message ?? `서버 오류 (${error.response.status})`
      );
    }

    // 응답 없음
    if (error.request) {
      console.error("[Dashboard API Error] 응답 없음:", error.request);
      throw new Error("서버가 응답하지 않습니다.");
    }

    // 기타 오류
    console.error("[Dashboard API Error] 기타 오류:", error.message);
    throw new Error("예기치 못한 오류가 발생했습니다.");
  }
};
