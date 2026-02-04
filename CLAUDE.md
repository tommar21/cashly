# Cashly

App de finanzas personales con precios en tiempo real de dólar blue y BTC.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Neon PostgreSQL + Prisma 7
- **Auth:** Auth.js (NextAuth v5) con credentials
- **Styling:** Tailwind CSS + Shadcn UI
- **Deploy:** Vercel

## URLs

- **Producción:** https://cashly-blue.vercel.app
- **GitHub:** https://github.com/tommar21/cashly

## Desarrollo

```bash
npm run dev     # Inicia en localhost:3000
npm run build   # Build de producción
```

## Base de Datos

```bash
npx prisma studio    # GUI para ver/editar datos
npx prisma db push   # Sincronizar schema con DB
npx prisma generate  # Regenerar cliente
```

## Estructura

```
src/
├── app/
│   ├── (auth)/           # Login, Signup
│   ├── (dashboard)/      # Dashboard, Accounts, Transactions
│   └── api/              # API routes (accounts, transactions, auth)
├── components/
│   ├── ui/               # Shadcn components
│   └── widgets/          # DolarBlueCard, BTCCard, etc.
├── lib/
│   ├── auth.ts           # Auth.js config
│   ├── prisma.ts         # Prisma client
│   └── prices.ts         # APIs de dólar blue y BTC
└── types/
    └── database.ts       # TypeScript types
```

## APIs Externas

- **Dólar Blue:** https://dolarapi.com/v1/dolares/blue
- **BTC:** https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

## Variables de Entorno

```env
DATABASE_URL=         # Neon PostgreSQL connection string
AUTH_SECRET=          # Auth.js secret (openssl rand -base64 32)
AUTH_URL=             # URL de la app (http://localhost:3000 en dev)
```

## Modelos

- **User** - Usuarios con auth
- **BankAccount** - Cuentas (IOL, Nexo, etc.) con moneda (ARS/USD/BTC)
- **Transaction** - Ingresos y gastos por cuenta y categoría
