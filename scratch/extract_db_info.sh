#!/bin/bash

DB_CONTAINER="supabase_db_portfolio-next"
DB_USER="postgres"
DB_NAME="postgres"

echo "Extracting Database Schema..."

docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;
" > scratch/schema.txt

echo "Extracting RLS Policies..."
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "
SELECT tablename, policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
" > scratch/policies.txt

echo "Extracting RLS Status (Enabled/Disabled)..."
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME -c "
SELECT relname AS table_name, relrowsecurity AS rls_enabled
FROM pg_class
WHERE relnamespace = 'public'::regnamespace AND relkind = 'r'
ORDER BY relname;
" > scratch/rls_status.txt

echo "Done."
