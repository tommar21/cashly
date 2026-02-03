import { DolarBlueResponse, CryptoPriceResponse } from "@/types/database";

export async function getDolarBlue(): Promise<DolarBlueResponse> {
  const res = await fetch("https://dolarapi.com/v1/dolares/blue", {
    next: { revalidate: 3600 }, // Cache 1 hora
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dolar blue");
  }

  return res.json();
}

export async function getCryptoPrice(
  coin: string = "bitcoin"
): Promise<number> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`,
    {
      next: { revalidate: 300 }, // Cache 5 min
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${coin} price`);
  }

  const data: CryptoPriceResponse = await res.json();
  return data[coin].usd;
}

export async function getAllPrices() {
  try {
    const [dolar, btc] = await Promise.all([
      getDolarBlue(),
      getCryptoPrice("bitcoin"),
    ]);

    return {
      dolarBlue: {
        compra: dolar.compra,
        venta: dolar.venta,
        fechaActualizacion: dolar.fechaActualizacion,
      },
      btcUsd: btc,
      btcArs: btc * dolar.venta,
    };
  } catch (error) {
    console.error("Error fetching prices:", error);
    return null;
  }
}

export function formatCurrency(
  amount: number,
  currency: "ARS" | "USD" | "BTC"
): string {
  if (currency === "BTC") {
    return `${amount.toFixed(8)} BTC`;
  }

  return new Intl.NumberFormat(currency === "ARS" ? "es-AR" : "en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function convertToUSD(
  amount: number,
  fromCurrency: "ARS" | "USD" | "BTC",
  dolarBlueVenta: number,
  btcUsd: number
): number {
  switch (fromCurrency) {
    case "USD":
      return amount;
    case "ARS":
      return amount / dolarBlueVenta;
    case "BTC":
      return amount * btcUsd;
    default:
      return amount;
  }
}
