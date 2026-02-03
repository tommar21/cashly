-- Cashly Database Schema
-- Run this in your Supabase SQL Editor

-- Accounts table (IOL, Nexo, Carrefour, etc)
create table if not exists public.accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  currency text not null check (currency in ('ARS', 'USD', 'BTC')),
  balance decimal default 0,
  created_at timestamptz default now()
);

-- Transactions table
create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  account_id uuid references public.accounts not null,
  amount decimal not null,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  description text,
  date date default current_date,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.accounts enable row level security;
alter table public.transactions enable row level security;

-- RLS Policies for accounts
create policy "Users can view own accounts"
  on public.accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert own accounts"
  on public.accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own accounts"
  on public.accounts for update
  using (auth.uid() = user_id);

create policy "Users can delete own accounts"
  on public.accounts for delete
  using (auth.uid() = user_id);

-- RLS Policies for transactions
create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Indexes for better performance
create index if not exists accounts_user_id_idx on public.accounts(user_id);
create index if not exists transactions_user_id_idx on public.transactions(user_id);
create index if not exists transactions_account_id_idx on public.transactions(account_id);
create index if not exists transactions_date_idx on public.transactions(date);
