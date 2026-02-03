import { createClient } from "@/lib/supabase/server";
import { getAllPrices, convertToUSD } from "@/lib/prices";
import { DolarBlueCard } from "@/components/widgets/DolarBlueCard";
import { BTCCard } from "@/components/widgets/BTCCard";
import { PatrimonioCard } from "@/components/widgets/PatrimonioCard";
import { AccountCard } from "@/components/widgets/AccountCard";
import { Account, Currency } from "@/types/database";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function DashboardPage() {
  const supabase = await createClient();
  const prices = await getAllPrices();

  // Get user's accounts
  const { data: accounts } = await supabase
    .from("accounts")
    .select("*")
    .order("created_at", { ascending: true });

  // Calculate total patrimony
  let totalUsd = 0;
  const accountsWithUsd: Array<{ account: Account; balanceInUsd: number }> = [];

  if (accounts && prices) {
    for (const account of accounts as Account[]) {
      const balanceInUsd = convertToUSD(
        account.balance,
        account.currency as Currency,
        prices.dolarBlue.venta,
        prices.btcUsd
      );
      totalUsd += balanceInUsd;
      accountsWithUsd.push({ account, balanceInUsd });
    }
  }

  const totalArs = totalUsd * (prices?.dolarBlue.venta || 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Tus finanzas en tiempo real
          </p>
        </div>
        <Link href="/dashboard/transactions/new">
          <Button>+ Nueva transacción</Button>
        </Link>
      </div>

      {/* Price Widgets */}
      {prices ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DolarBlueCard
            compra={prices.dolarBlue.compra}
            venta={prices.dolarBlue.venta}
            fechaActualizacion={prices.dolarBlue.fechaActualizacion}
          />
          <BTCCard btcUsd={prices.btcUsd} btcArs={prices.btcArs} />
          <PatrimonioCard
            totalUsd={totalUsd}
            totalArs={totalArs}
            dolarBlueVenta={prices.dolarBlue.venta}
          />
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          No se pudieron cargar los precios. Intentá de nuevo más tarde.
        </div>
      )}

      {/* Accounts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Cuentas</h2>
          <Link href="/dashboard/accounts/new">
            <Button variant="outline" size="sm">
              + Nueva cuenta
            </Button>
          </Link>
        </div>

        {accountsWithUsd.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accountsWithUsd.map(({ account, balanceInUsd }) => (
              <AccountCard
                key={account.id}
                account={account}
                balanceInUsd={balanceInUsd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-lg border">
            <p className="text-muted-foreground mb-4">
              No tenés cuentas creadas todavía
            </p>
            <Link href="/dashboard/accounts/new">
              <Button>Crear tu primera cuenta</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
