export async function getFundFlow(
  address: string,
  chainId: number = 1,
  maxHops: number = 1,
  maxAddresses: number = 5
) {
  try {
    const backendUrl =
      import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8888";
    const url = `${backendUrl}/api/analysis/fund-flow?chain_id=${chainId}&address=${address}&max_hops=${maxHops}&max_addresses=${maxAddresses}`;

    const res = await fetch(url, {
      cache: "no-cache", // 캐시 방지
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const json = await res.json();

    // 정상 데이터면 반환
    if (json.data && json.data.nodes) {
      return json.data;
    }

    // API 응답이 비어 있으면 null
    return null;
  } catch (error) {
    console.error("getFundFlow Error:", error);
    return null;
  }
}
