# InpinityCitySite Upgrade Bundle

This bundle focuses on the production-critical issues in the city build flow.

## Included fixes

- real wallet event sync (`accountsChanged`, `chainChanged`, `disconnect`)
- automatic Base chain switch on connect / flow start
- no more hard-coded `slotIndex: 0`
- slot resolution based on the connected wallet's real personal plot slots
- CityValidation preflight before reserve / contribute
- build plot selection restricted to wallet-owned or flow-reserved plots
- resource eligibility based on the selected cell's live remaining requirement
- faster live plot hook by separating plot-wide reads from per-cell reads
- faster `city-land.ts` by caching Qubiq costs and not refetching config 25 times
- stable codegen using local `root-schema.json` by default
- explicit `graphql` dependency
- `.env.example` with live Base addresses

## Files to replace / add

Replace:
- `src/App.tsx`
- `src/lib/config.ts`
- `src/lib/city-registry.ts`
- `src/lib/city-land.ts`
- `src/lib/resource-check.ts`
- `src/lib/city-qubiq-flow.ts`
- `src/hooks/useLivePlotProgress.ts`
- `codegen.ts`
- `package.json`

Add:
- `src/lib/evm-wallet.ts`
- `src/lib/city-validation.ts`
- `.env.example`

## Suggested apply order

1. copy the files into your repo
2. run `npm install`
3. run `npm run codegen`
4. run `npm run build`
5. test the full flow on Base:
   - connect wallet
   - city key selection
   - faction selection
   - reserve plot
   - approve resources
   - contribute Qubiq
   - switch account / switch network edge cases

## Note

I aligned the frontend changes to the live contract methods and addresses that are already used by the repo and the ABI package you provided.
