import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/prices";
import { Account, Currency } from "@/types/database";

interface AccountCardProps {
  account: Account;
  balanceInUsd?: number;
}

export function AccountCard({ account, balanceInUsd }: AccountCardProps) {
  const currencyColors: Record<Currency, string> = {
    ARS: "text-blue-600 dark:text-blue-400",
    USD: "text-green-600 dark:text-green-400",
    BTC: "text-orange-500",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
        <span
          className={`text-xs font-semibold ${currencyColors[account.currency]}`}
        >
          {account.currency}
        </span>
      </CardHeader>
      <CardContent>
        <p
          className={`text-2xl font-bold ${currencyColors[account.currency]}`}
        >
          {formatCurrency(account.balance, account.currency)}
        </p>
        {balanceInUsd !== undefined && account.currency !== "USD" && (
          <p className="text-sm text-muted-foreground mt-1">
            ≈ {formatCurrency(balanceInUsd, "USD")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
