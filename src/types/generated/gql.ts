/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  query CityDashboard {\n    _meta {\n      block {\n        number\n      }\n    }\n\n    weaponDefinitions(first: 6, orderBy: weaponDefinitionId, orderDirection: asc) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n\n    weaponInstances(first: 12, orderBy: tokenId, orderDirection: asc) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      rarityTier\n      upgradeLevel\n      durability\n      originPlotId\n      weaponDefinition {\n        id\n        name\n      }\n    }\n\n    materiaDefinitions(first: 12, orderBy: materiaId, orderDirection: asc) {\n      id\n      materiaId\n      name\n      categoryLabel\n      elementLabel\n      rarityTier\n      maxLevel\n      enabled\n    }\n\n    plots(first: 24, orderBy: plotId, orderDirection: asc) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      exists\n      createdAt\n      owner {\n        id\n      }\n    }\n\n    players(first: 12, orderBy: id, orderDirection: asc) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n\n    plotStatusInfos(first: 24, orderBy: id, orderDirection: asc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      lastActivityAt\n      lastMaintenanceAt\n      manualStatusOverride\n      derivedStatus\n      layerEligible\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n\n    plotProvenances(first: 24, orderBy: id, orderDirection: asc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      firstBuilder\n      createdAt\n      layerCount\n      ownershipTransfers\n      aetherUses\n      historicScore\n      originFaction\n      genesisEra\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n": typeof types.CityDashboardDocument;
  "\n  query GetPlotsPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: Plot_orderBy = plotId\n    $orderDirection: OrderDirection = asc\n  ) {\n    plots(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      exists\n      createdAt\n      owner {\n        id\n      }\n    }\n  }\n": typeof types.GetPlotsPaginatedDocument;
  "\n  query GetPlotStatusInfosPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: PlotStatusInfo_orderBy = id\n    $orderDirection: OrderDirection = asc\n  ) {\n    plotStatusInfos(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plot {\n        id\n        plotId\n      }\n      lastActivityAt\n      lastMaintenanceAt\n      manualStatusOverride\n      derivedStatus\n      layerEligible\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n": typeof types.GetPlotStatusInfosPaginatedDocument;
  "\n  query GetPlotProvenancesPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: PlotProvenance_orderBy = id\n    $orderDirection: OrderDirection = asc\n  ) {\n    plotProvenances(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plot {\n        id\n        plotId\n      }\n      firstBuilder\n      createdAt\n      layerCount\n      ownershipTransfers\n      aetherUses\n      historicScore\n      originFaction\n      genesisEra\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n": typeof types.GetPlotProvenancesPaginatedDocument;
  "\n  query GetPlayer($id: ID!) {\n    player(id: $id) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n  }\n": typeof types.GetPlayerDocument;
  "\n  query GetPlayers($first: Int = 50, $skip: Int = 0) {\n    players(first: $first, skip: $skip, orderBy: id, orderDirection: asc) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n  }\n": typeof types.GetPlayersDocument;
  "\n  query GetPlot($id: ID!) {\n    plot(id: $id) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      createdAt\n      exists\n      owner {\n        id\n      }\n    }\n  }\n": typeof types.GetPlotDocument;
  "\n  query GetPlots($first: Int = 50, $skip: Int = 0) {\n    plots(first: $first, skip: $skip, orderBy: plotId, orderDirection: asc) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      createdAt\n      exists\n      owner {\n        id\n      }\n    }\n  }\n": typeof types.GetPlotsDocument;
  "\n  query GetWeaponDefinition($id: ID!) {\n    weaponDefinition(id: $id) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n  }\n": typeof types.GetWeaponDefinitionDocument;
  "\n  query GetWeaponDefinitions($first: Int = 50, $skip: Int = 0) {\n    weaponDefinitions(first: $first, skip: $skip, orderBy: weaponDefinitionId, orderDirection: asc) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n  }\n": typeof types.GetWeaponDefinitionsDocument;
  "\n  query GetWeaponInstance($id: ID!) {\n    weaponInstance(id: $id) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      weaponDefinition {\n        id\n        name\n      }\n      rarityTier\n      frameTier\n      durability\n      upgradeLevel\n      metadataRevision\n      originPlotId\n      originFaction\n      originDistrictKind\n      craftedAt\n      visualVariant\n      resonanceType\n      craftSeed\n      provenanceHash\n      genesisEra\n      usedAether\n      txHash\n      blockNumber\n    }\n  }\n": typeof types.GetWeaponInstanceDocument;
  "\n  query GetWeaponInstances($first: Int = 50, $skip: Int = 0) {\n    weaponInstances(first: $first, skip: $skip, orderBy: tokenId, orderDirection: asc) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      rarityTier\n      upgradeLevel\n      durability\n      originPlotId\n      weaponDefinition {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetWeaponInstancesDocument;
  "\n  query GetPlotQubiqs($first: Int = 100, $skip: Int = 0) {\n    plotQubiqs(first: $first, skip: $skip) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      oilDeposited\n      lemonsDeposited\n      ironDeposited\n      completed\n      usedAether\n      lastContributor\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetPlotQubiqsDocument;
  "\n  query GetAetherUses($first: Int = 100, $skip: Int = 0) {\n    aetherUses(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      user\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n": typeof types.GetAetherUsesDocument;
  "\n  query GetPlotCompletions($first: Int = 100, $skip: Int = 0) {\n    plotCompletions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n": typeof types.GetPlotCompletionsDocument;
  "\n  query GetQubiqContributions($first: Int = 100, $skip: Int = 0) {\n    qubiqContributions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      contributor\n      oil\n      lemons\n      iron\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n": typeof types.GetQubiqContributionsDocument;
  "\n  query GetOwnershipTransferredEvents($first: Int = 100, $skip: Int = 0) {\n    ownershipTransferredEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      previousOwner\n      newOwner\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n": typeof types.GetOwnershipTransferredEventsDocument;
  "\n  query GetTransferEvents($first: Int = 100, $skip: Int = 0) {\n    transferEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      from\n      to\n      tokenId\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n": typeof types.GetTransferEventsDocument;
  "\n  query GetApprovalEvents($first: Int = 100, $skip: Int = 0) {\n    approvalEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      owner\n      approved\n      tokenId\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n": typeof types.GetApprovalEventsDocument;
  "\n  query GetApprovalForAllEvents($first: Int = 100, $skip: Int = 0) {\n    approvalForAllEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      owner\n      operator\n      approved\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n": typeof types.GetApprovalForAllEventsDocument;
};
const documents: Documents = {
  "\n  query CityDashboard {\n    _meta {\n      block {\n        number\n      }\n    }\n\n    weaponDefinitions(first: 6, orderBy: weaponDefinitionId, orderDirection: asc) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n\n    weaponInstances(first: 12, orderBy: tokenId, orderDirection: asc) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      rarityTier\n      upgradeLevel\n      durability\n      originPlotId\n      weaponDefinition {\n        id\n        name\n      }\n    }\n\n    materiaDefinitions(first: 12, orderBy: materiaId, orderDirection: asc) {\n      id\n      materiaId\n      name\n      categoryLabel\n      elementLabel\n      rarityTier\n      maxLevel\n      enabled\n    }\n\n    plots(first: 24, orderBy: plotId, orderDirection: asc) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      exists\n      createdAt\n      owner {\n        id\n      }\n    }\n\n    players(first: 12, orderBy: id, orderDirection: asc) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n\n    plotStatusInfos(first: 24, orderBy: id, orderDirection: asc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      lastActivityAt\n      lastMaintenanceAt\n      manualStatusOverride\n      derivedStatus\n      layerEligible\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n\n    plotProvenances(first: 24, orderBy: id, orderDirection: asc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      firstBuilder\n      createdAt\n      layerCount\n      ownershipTransfers\n      aetherUses\n      historicScore\n      originFaction\n      genesisEra\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n":
    types.CityDashboardDocument,
  "\n  query GetPlotsPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: Plot_orderBy = plotId\n    $orderDirection: OrderDirection = asc\n  ) {\n    plots(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      exists\n      createdAt\n      owner {\n        id\n      }\n    }\n  }\n":
    types.GetPlotsPaginatedDocument,
  "\n  query GetPlotStatusInfosPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: PlotStatusInfo_orderBy = id\n    $orderDirection: OrderDirection = asc\n  ) {\n    plotStatusInfos(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plot {\n        id\n        plotId\n      }\n      lastActivityAt\n      lastMaintenanceAt\n      manualStatusOverride\n      derivedStatus\n      layerEligible\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n":
    types.GetPlotStatusInfosPaginatedDocument,
  "\n  query GetPlotProvenancesPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: PlotProvenance_orderBy = id\n    $orderDirection: OrderDirection = asc\n  ) {\n    plotProvenances(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plot {\n        id\n        plotId\n      }\n      firstBuilder\n      createdAt\n      layerCount\n      ownershipTransfers\n      aetherUses\n      historicScore\n      originFaction\n      genesisEra\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n":
    types.GetPlotProvenancesPaginatedDocument,
  "\n  query GetPlayer($id: ID!) {\n    player(id: $id) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n  }\n":
    types.GetPlayerDocument,
  "\n  query GetPlayers($first: Int = 50, $skip: Int = 0) {\n    players(first: $first, skip: $skip, orderBy: id, orderDirection: asc) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n  }\n":
    types.GetPlayersDocument,
  "\n  query GetPlot($id: ID!) {\n    plot(id: $id) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      createdAt\n      exists\n      owner {\n        id\n      }\n    }\n  }\n":
    types.GetPlotDocument,
  "\n  query GetPlots($first: Int = 50, $skip: Int = 0) {\n    plots(first: $first, skip: $skip, orderBy: plotId, orderDirection: asc) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      createdAt\n      exists\n      owner {\n        id\n      }\n    }\n  }\n":
    types.GetPlotsDocument,
  "\n  query GetWeaponDefinition($id: ID!) {\n    weaponDefinition(id: $id) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n  }\n":
    types.GetWeaponDefinitionDocument,
  "\n  query GetWeaponDefinitions($first: Int = 50, $skip: Int = 0) {\n    weaponDefinitions(first: $first, skip: $skip, orderBy: weaponDefinitionId, orderDirection: asc) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n  }\n":
    types.GetWeaponDefinitionsDocument,
  "\n  query GetWeaponInstance($id: ID!) {\n    weaponInstance(id: $id) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      weaponDefinition {\n        id\n        name\n      }\n      rarityTier\n      frameTier\n      durability\n      upgradeLevel\n      metadataRevision\n      originPlotId\n      originFaction\n      originDistrictKind\n      craftedAt\n      visualVariant\n      resonanceType\n      craftSeed\n      provenanceHash\n      genesisEra\n      usedAether\n      txHash\n      blockNumber\n    }\n  }\n":
    types.GetWeaponInstanceDocument,
  "\n  query GetWeaponInstances($first: Int = 50, $skip: Int = 0) {\n    weaponInstances(first: $first, skip: $skip, orderBy: tokenId, orderDirection: asc) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      rarityTier\n      upgradeLevel\n      durability\n      originPlotId\n      weaponDefinition {\n        id\n        name\n      }\n    }\n  }\n":
    types.GetWeaponInstancesDocument,
  "\n  query GetPlotQubiqs($first: Int = 100, $skip: Int = 0) {\n    plotQubiqs(first: $first, skip: $skip) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      oilDeposited\n      lemonsDeposited\n      ironDeposited\n      completed\n      usedAether\n      lastContributor\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n":
    types.GetPlotQubiqsDocument,
  "\n  query GetAetherUses($first: Int = 100, $skip: Int = 0) {\n    aetherUses(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      user\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n":
    types.GetAetherUsesDocument,
  "\n  query GetPlotCompletions($first: Int = 100, $skip: Int = 0) {\n    plotCompletions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n":
    types.GetPlotCompletionsDocument,
  "\n  query GetQubiqContributions($first: Int = 100, $skip: Int = 0) {\n    qubiqContributions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      contributor\n      oil\n      lemons\n      iron\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n":
    types.GetQubiqContributionsDocument,
  "\n  query GetOwnershipTransferredEvents($first: Int = 100, $skip: Int = 0) {\n    ownershipTransferredEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      previousOwner\n      newOwner\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n":
    types.GetOwnershipTransferredEventsDocument,
  "\n  query GetTransferEvents($first: Int = 100, $skip: Int = 0) {\n    transferEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      from\n      to\n      tokenId\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n":
    types.GetTransferEventsDocument,
  "\n  query GetApprovalEvents($first: Int = 100, $skip: Int = 0) {\n    approvalEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      owner\n      approved\n      tokenId\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n":
    types.GetApprovalEventsDocument,
  "\n  query GetApprovalForAllEvents($first: Int = 100, $skip: Int = 0) {\n    approvalForAllEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      owner\n      operator\n      approved\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n":
    types.GetApprovalForAllEventsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query CityDashboard {\n    _meta {\n      block {\n        number\n      }\n    }\n\n    weaponDefinitions(first: 6, orderBy: weaponDefinitionId, orderDirection: asc) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n\n    weaponInstances(first: 12, orderBy: tokenId, orderDirection: asc) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      rarityTier\n      upgradeLevel\n      durability\n      originPlotId\n      weaponDefinition {\n        id\n        name\n      }\n    }\n\n    materiaDefinitions(first: 12, orderBy: materiaId, orderDirection: asc) {\n      id\n      materiaId\n      name\n      categoryLabel\n      elementLabel\n      rarityTier\n      maxLevel\n      enabled\n    }\n\n    plots(first: 24, orderBy: plotId, orderDirection: asc) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      exists\n      createdAt\n      owner {\n        id\n      }\n    }\n\n    players(first: 12, orderBy: id, orderDirection: asc) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n\n    plotStatusInfos(first: 24, orderBy: id, orderDirection: asc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      lastActivityAt\n      lastMaintenanceAt\n      manualStatusOverride\n      derivedStatus\n      layerEligible\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n\n    plotProvenances(first: 24, orderBy: id, orderDirection: asc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      firstBuilder\n      createdAt\n      layerCount\n      ownershipTransfers\n      aetherUses\n      historicScore\n      originFaction\n      genesisEra\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n",
): (typeof documents)["\n  query CityDashboard {\n    _meta {\n      block {\n        number\n      }\n    }\n\n    weaponDefinitions(first: 6, orderBy: weaponDefinitionId, orderDirection: asc) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n\n    weaponInstances(first: 12, orderBy: tokenId, orderDirection: asc) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      rarityTier\n      upgradeLevel\n      durability\n      originPlotId\n      weaponDefinition {\n        id\n        name\n      }\n    }\n\n    materiaDefinitions(first: 12, orderBy: materiaId, orderDirection: asc) {\n      id\n      materiaId\n      name\n      categoryLabel\n      elementLabel\n      rarityTier\n      maxLevel\n      enabled\n    }\n\n    plots(first: 24, orderBy: plotId, orderDirection: asc) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      exists\n      createdAt\n      owner {\n        id\n      }\n    }\n\n    players(first: 12, orderBy: id, orderDirection: asc) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n\n    plotStatusInfos(first: 24, orderBy: id, orderDirection: asc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      lastActivityAt\n      lastMaintenanceAt\n      manualStatusOverride\n      derivedStatus\n      layerEligible\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n\n    plotProvenances(first: 24, orderBy: id, orderDirection: asc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      firstBuilder\n      createdAt\n      layerCount\n      ownershipTransfers\n      aetherUses\n      historicScore\n      originFaction\n      genesisEra\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPlotsPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: Plot_orderBy = plotId\n    $orderDirection: OrderDirection = asc\n  ) {\n    plots(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      exists\n      createdAt\n      owner {\n        id\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetPlotsPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: Plot_orderBy = plotId\n    $orderDirection: OrderDirection = asc\n  ) {\n    plots(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      exists\n      createdAt\n      owner {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPlotStatusInfosPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: PlotStatusInfo_orderBy = id\n    $orderDirection: OrderDirection = asc\n  ) {\n    plotStatusInfos(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plot {\n        id\n        plotId\n      }\n      lastActivityAt\n      lastMaintenanceAt\n      manualStatusOverride\n      derivedStatus\n      layerEligible\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n",
): (typeof documents)["\n  query GetPlotStatusInfosPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: PlotStatusInfo_orderBy = id\n    $orderDirection: OrderDirection = asc\n  ) {\n    plotStatusInfos(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plot {\n        id\n        plotId\n      }\n      lastActivityAt\n      lastMaintenanceAt\n      manualStatusOverride\n      derivedStatus\n      layerEligible\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPlotProvenancesPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: PlotProvenance_orderBy = id\n    $orderDirection: OrderDirection = asc\n  ) {\n    plotProvenances(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plot {\n        id\n        plotId\n      }\n      firstBuilder\n      createdAt\n      layerCount\n      ownershipTransfers\n      aetherUses\n      historicScore\n      originFaction\n      genesisEra\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n",
): (typeof documents)["\n  query GetPlotProvenancesPaginated(\n    $first: Int!\n    $skip: Int!\n    $orderBy: PlotProvenance_orderBy = id\n    $orderDirection: OrderDirection = asc\n  ) {\n    plotProvenances(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {\n      id\n      plot {\n        id\n        plotId\n      }\n      firstBuilder\n      createdAt\n      layerCount\n      ownershipTransfers\n      aetherUses\n      historicScore\n      originFaction\n      genesisEra\n      updatedAtBlock\n      updatedAtTimestamp\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPlayer($id: ID!) {\n    player(id: $id) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n  }\n",
): (typeof documents)["\n  query GetPlayer($id: ID!) {\n    player(id: $id) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPlayers($first: Int = 50, $skip: Int = 0) {\n    players(first: $first, skip: $skip, orderBy: id, orderDirection: asc) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n  }\n",
): (typeof documents)["\n  query GetPlayers($first: Int = 50, $skip: Int = 0) {\n    players(first: $first, skip: $skip, orderBy: id, orderDirection: asc) {\n      id\n      cityKeyTokenId\n      faction\n      personalPlotCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPlot($id: ID!) {\n    plot(id: $id) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      createdAt\n      exists\n      owner {\n        id\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetPlot($id: ID!) {\n    plot(id: $id) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      createdAt\n      exists\n      owner {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPlots($first: Int = 50, $skip: Int = 0) {\n    plots(first: $first, skip: $skip, orderBy: plotId, orderDirection: asc) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      createdAt\n      exists\n      owner {\n        id\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetPlots($first: Int = 50, $skip: Int = 0) {\n    plots(first: $first, skip: $skip, orderBy: plotId, orderDirection: asc) {\n      id\n      plotId\n      plotType\n      faction\n      status\n      width\n      height\n      createdAt\n      exists\n      owner {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetWeaponDefinition($id: ID!) {\n    weaponDefinition(id: $id) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n  }\n",
): (typeof documents)["\n  query GetWeaponDefinition($id: ID!) {\n    weaponDefinition(id: $id) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetWeaponDefinitions($first: Int = 50, $skip: Int = 0) {\n    weaponDefinitions(first: $first, skip: $skip, orderBy: weaponDefinitionId, orderDirection: asc) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n  }\n",
): (typeof documents)["\n  query GetWeaponDefinitions($first: Int = 50, $skip: Int = 0) {\n    weaponDefinitions(first: $first, skip: $skip, orderBy: weaponDefinitionId, orderDirection: asc) {\n      id\n      weaponDefinitionId\n      name\n      classId\n      damageTypeId\n      techTier\n      minDamage\n      maxDamage\n      enchantmentSlots\n      materiaSlots\n      enabled\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetWeaponInstance($id: ID!) {\n    weaponInstance(id: $id) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      weaponDefinition {\n        id\n        name\n      }\n      rarityTier\n      frameTier\n      durability\n      upgradeLevel\n      metadataRevision\n      originPlotId\n      originFaction\n      originDistrictKind\n      craftedAt\n      visualVariant\n      resonanceType\n      craftSeed\n      provenanceHash\n      genesisEra\n      usedAether\n      txHash\n      blockNumber\n    }\n  }\n",
): (typeof documents)["\n  query GetWeaponInstance($id: ID!) {\n    weaponInstance(id: $id) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      weaponDefinition {\n        id\n        name\n      }\n      rarityTier\n      frameTier\n      durability\n      upgradeLevel\n      metadataRevision\n      originPlotId\n      originFaction\n      originDistrictKind\n      craftedAt\n      visualVariant\n      resonanceType\n      craftSeed\n      provenanceHash\n      genesisEra\n      usedAether\n      txHash\n      blockNumber\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetWeaponInstances($first: Int = 50, $skip: Int = 0) {\n    weaponInstances(first: $first, skip: $skip, orderBy: tokenId, orderDirection: asc) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      rarityTier\n      upgradeLevel\n      durability\n      originPlotId\n      weaponDefinition {\n        id\n        name\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetWeaponInstances($first: Int = 50, $skip: Int = 0) {\n    weaponInstances(first: $first, skip: $skip, orderBy: tokenId, orderDirection: asc) {\n      id\n      tokenId\n      owner {\n        id\n      }\n      rarityTier\n      upgradeLevel\n      durability\n      originPlotId\n      weaponDefinition {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPlotQubiqs($first: Int = 100, $skip: Int = 0) {\n    plotQubiqs(first: $first, skip: $skip) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      oilDeposited\n      lemonsDeposited\n      ironDeposited\n      completed\n      usedAether\n      lastContributor\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  query GetPlotQubiqs($first: Int = 100, $skip: Int = 0) {\n    plotQubiqs(first: $first, skip: $skip) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      oilDeposited\n      lemonsDeposited\n      ironDeposited\n      completed\n      usedAether\n      lastContributor\n      completedAt\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetAetherUses($first: Int = 100, $skip: Int = 0) {\n    aetherUses(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      user\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n",
): (typeof documents)["\n  query GetAetherUses($first: Int = 100, $skip: Int = 0) {\n    aetherUses(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      user\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPlotCompletions($first: Int = 100, $skip: Int = 0) {\n    plotCompletions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n",
): (typeof documents)["\n  query GetPlotCompletions($first: Int = 100, $skip: Int = 0) {\n    plotCompletions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetQubiqContributions($first: Int = 100, $skip: Int = 0) {\n    qubiqContributions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      contributor\n      oil\n      lemons\n      iron\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n",
): (typeof documents)["\n  query GetQubiqContributions($first: Int = 100, $skip: Int = 0) {\n    qubiqContributions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      plot {\n        id\n        plotId\n      }\n      x\n      y\n      contributor\n      oil\n      lemons\n      iron\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetOwnershipTransferredEvents($first: Int = 100, $skip: Int = 0) {\n    ownershipTransferredEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      previousOwner\n      newOwner\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n",
): (typeof documents)["\n  query GetOwnershipTransferredEvents($first: Int = 100, $skip: Int = 0) {\n    ownershipTransferredEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      previousOwner\n      newOwner\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetTransferEvents($first: Int = 100, $skip: Int = 0) {\n    transferEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      from\n      to\n      tokenId\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n",
): (typeof documents)["\n  query GetTransferEvents($first: Int = 100, $skip: Int = 0) {\n    transferEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      from\n      to\n      tokenId\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetApprovalEvents($first: Int = 100, $skip: Int = 0) {\n    approvalEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      owner\n      approved\n      tokenId\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n",
): (typeof documents)["\n  query GetApprovalEvents($first: Int = 100, $skip: Int = 0) {\n    approvalEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      owner\n      approved\n      tokenId\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetApprovalForAllEvents($first: Int = 100, $skip: Int = 0) {\n    approvalForAllEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      owner\n      operator\n      approved\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n",
): (typeof documents)["\n  query GetApprovalForAllEvents($first: Int = 100, $skip: Int = 0) {\n    approvalForAllEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {\n      id\n      owner\n      operator\n      approved\n      blockNumber\n      timestamp\n      txHash\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
