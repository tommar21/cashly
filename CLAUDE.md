# Cashly - App de Finanzas Personales

## Overview

App de finanzas personales para Argentina con:
- Tracking de ingresos y gastos
- Dólar blue en tiempo real
- Bitcoin en tiempo real
- Multi-moneda (ARS, USD, BTC)

## Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **Deploy:** Vercel

## Setup

1. Clonar el repo
2. `npm install`
3. Copiar `.env.local.example` a `.env.local` y configurar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Ejecutar el SQL de `supabase/migrations/001_initial_schema.sql` en Supabase
5. `npm run dev`

## Estructura

```
src/
├── app/
│   ├── (auth)/           # Páginas de login/signup
│   ├── (dashboard)/      # Dashboard y páginas protegidas
│   ├── auth/             # Callbacks de auth
│   └── api/              # API routes
├── components/
│   ├── ui/               # Shadcn components
│   └── widgets/          # Widgets del dashboard
├── lib/
│   ├── supabase/         # Cliente Supabase
│   └── prices.ts         # APIs de dólar y crypto
└── types/
    └── database.ts       # Types de la DB
```

## APIs Externas

- **Dólar Blue:** `https://dolarapi.com/v1/dolares/blue`
- **BTC:** `https://api.coingecko.com/api/v3/simple/price`

## Database Schema

- `accounts`: Cuentas del usuario (IOL, Nexo, etc)
- `transactions`: Ingresos y gastos

Ver `supabase/migrations/001_initial_schema.sql` para el schema completo.

## Comandos

- `npm run dev` - Desarrollo
- `npm run build` - Build de producción
- `npm run lint` - Linter
