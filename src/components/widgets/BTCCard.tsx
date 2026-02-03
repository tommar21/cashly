import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/prices";

interface BTCCardProps {
  btcUsd: number;
  btcArs: number;
}

export function BTCCard({ btcUsd, btcArs }: BTCCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Bitcoin</CardTitle>
        <span className="text-xs text-orange-500">BTC</span>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-muted-foreground">USD</p>
            <p className="text-2xl font-bold">{formatCurrency(btcUsd, "USD")}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">ARS (Blue)</p>
            <p className="text-lg font-semibold text-muted-foreground">
              {formatCurrency(btcArs, "ARS")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
