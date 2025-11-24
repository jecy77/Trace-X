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

    // 안전 체크: data가 없거나 필수 필드가 없으면 기본값 반환
    if (!res.data?.data) {
      return {
        totalVolume: { value: 0, changeRate: "0" },
        totalTransactions: { value: 0, changeRate: "0" },
        highRiskTransactions: { value: 0, changeRate: "0" },
        warningTransactions: { value: 0, changeRate: "0" },
        highRiskTransactionTrend: {},
        highRiskTransactionsByChain: {},
        averageRiskScore: {},
      };
    }

    // 추가 안전 체크: 각 필드가 올바른 구조인지 확인
    const data = res.data.data;
    return {
      totalVolume: data?.totalVolume || { value: 0, changeRate: "0" },
      totalTransactions: data?.totalTransactions || {
        value: 0,
        changeRate: "0",
      },
      highRiskTransactions: data?.highRiskTransactions || {
        value: 0,
        changeRate: "0",
      },
      warningTransactions: data?.warningTransactions || {
        value: 0,
        changeRate: "0",
      },
      highRiskTransactionTrend: data?.highRiskTransactionTrend || {},
      highRiskTransactionsByChain: data?.highRiskTransactionsByChain || {},
      averageRiskScore: data?.averageRiskScore || {},
    };
  } catch (error: any) {
    // 에러 발생 시 기본값 반환 (에러를 throw하지 않음)
    console.error("[Dashboard API Error]:", error);
    return {
      totalVolume: { value: 0, changeRate: "0" },
      totalTransactions: { value: 0, changeRate: "0" },
      highRiskTransactions: { value: 0, changeRate: "0" },
      warningTransactions: { value: 0, changeRate: "0" },
      highRiskTransactionTrend: {},
      highRiskTransactionsByChain: {},
      averageRiskScore: {},
    };
  }
};
