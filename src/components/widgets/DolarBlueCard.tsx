import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/prices";

interface DolarBlueCardProps {
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

export function DolarBlueCard({
  compra,
  venta,
  fechaActualizacion,
}: DolarBlueCardProps) {
  const fecha = new Date(fechaActualizacion);
  const horaFormateada = fecha.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Dólar Blue</CardTitle>
        <span className="text-xs text-muted-foreground">
          Actualizado: {horaFormateada}
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-muted-foreground">Compra</p>
            <p className="text-xl font-bold">{formatCurrency(compra, "ARS")}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Venta</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(venta, "ARS")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
