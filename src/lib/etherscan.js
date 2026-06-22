const BASE_URL = "https://api.etherscan.io/v2/api";
const CHAIN_ID = 1; // Ethereum Mainnet

function getApiKey() {
  return import.meta.env.VITE_ETHERSCAN_API_KEY || "";
}

export async function fetchNormalTransactions(address) {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  const url = `${BASE_URL}?chainid=${CHAIN_ID}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Gagal menghubungi Etherscan API");

  const data = await res.json();

  if (data.status === "0" && data.result?.includes("Invalid API Key")) {
    throw new Error("API_KEY_INVALID");
  }

  if (data.status === "0" && data.message === "No transactions found") {
    return [];
  }
  if (data.status === "0") {
    throw new Error(data.result || "Terjadi kesalahan saat mengambil data");
  }

  return data.result || [];
}

export async function fetchInternalTransactions(address) {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  const url = `${BASE_URL}?chainid=${CHAIN_ID}&module=account&action=txlistinternal&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  if (data.status === "0") return [];

  return data.result || [];
}

export async function getWalletData(address) {
  const [normalTxs, internalTxs] = await Promise.all([
    fetchNormalTransactions(address),
    fetchInternalTransactions(address),
  ]);

  const allTxs = [...normalTxs, ...internalTxs].sort(
    (a, b) => Number(a.timeStamp) - Number(b.timeStamp)
  );

  const firstTxTime = allTxs.length > 0 ? Number(allTxs[0].timeStamp) : null;
  const lastTxTime = allTxs.length > 0 ? Number(allTxs[allTxs.length - 1].timeStamp) : null;
  const now = Math.floor(Date.now() / 1000);

  const ageInDays = firstTxTime ? Math.floor((now - firstTxTime) / 86400) : 0;
  const txCount = normalTxs.length;

  const incomingTxs = normalTxs.filter(
    (tx) => tx.to.toLowerCase() === address.toLowerCase() && tx.value !== "0"
  );

  const uniqueSenders = new Set(incomingTxs.map((tx) => tx.from.toLowerCase()));

  const sevenDaysAgo = now - 7 * 86400;
  const recentSenders = new Set(
    incomingTxs
      .filter((tx) => Number(tx.timeStamp) >= sevenDaysAgo)
      .map((tx) => tx.from.toLowerCase())
  );

  const totalEtherReceived = incomingTxs.reduce(
    (sum, tx) => sum + parseFloat(tx.value) / 1e18,
    0
  );

  return {
    ageInDays,
    txCount,
    uniqueSenderCount: uniqueSenders.size,
    recentSenderCount: recentSenders.size,
    totalEtherReceived,
    firstTxTime,
    lastTxTime,
  };
}
