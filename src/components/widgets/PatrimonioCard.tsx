import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/prices";

interface PatrimonioCardProps {
  totalUsd: number;
  totalArs: number;
  dolarBlueVenta: number;
}

export function PatrimonioCard({
  totalUsd,
  totalArs,
  dolarBlueVenta,
}: PatrimonioCardProps) {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Patrimonio Total</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalUsd, "USD")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {formatCurrency(totalArs, "ARS")} al blue
            </p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p>Dólar blue: {formatCurrency(dolarBlueVenta, "ARS")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
