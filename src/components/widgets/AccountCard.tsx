import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/prices";
import { AccountForUI } from "@/types/database";

interface AccountCardProps {
  account: AccountForUI;
  balanceInUsd?: number;
}

type CurrencyType = "ARS" | "USD" | "BTC";

export function AccountCard({ account, balanceInUsd }: AccountCardProps) {
  const currencyColors: Record<CurrencyType, string> = {
    ARS: "text-blue-600 dark:text-blue-400",
    USD: "text-green-600 dark:text-green-400",
    BTC: "text-orange-500",
  };

  const currency = account.currency as CurrencyType;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
        <span
          className={`text-xs font-semibold ${currencyColors[currency]}`}
        >
          {currency}
        </span>
      </CardHeader>
      <CardContent>
        <p
          className={`text-2xl font-bold ${currencyColors[currency]}`}
        >
          {formatCurrency(account.balance, currency)}
        </p>
        {balanceInUsd !== undefined && currency !== "USD" && (
          <p className="text-sm text-muted-foreground mt-1">
            ≈ {formatCurrency(balanceInUsd, "USD")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
