#/bin/sh

# Generates each prisma schema
pnpm prisma generate --schema test/schemas/full.prisma > /dev/null &

# Waits for generation
wait

# Runs tests sequentially
# pnpm tsd -f test/schemas/full.generated.ts -t test/schemas/full.snapshot.ts --show-diff && echo "✅ Full suite"

# if diff test/schemas/full.generated.ts test/schemas/full.snapshot.ts; then
#     echo "✅ Full suite"
# else
#     echo "Error: Generated type does not match snapshot" >&2
#     exit 1
# fi
