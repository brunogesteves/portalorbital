#!/bin/sh
npx prisma generate
exec "$@"
