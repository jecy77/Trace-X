export async function getFundFlow(address: string) {
  try {
    const url = `${
      import.meta.env.VITE_API_URL
    }/api/analysis/fund-flow?chain_id=1&address=${address}`;

    const res = await fetch(url);

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
