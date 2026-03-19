import { gql } from "../types/generated/gql";

// ============================================================
// MAIN DASHBOARD
// ============================================================

export const CITY_DASHBOARD_QUERY = gql(`
  query CityDashboard {
    _meta {
      block {
        number
      }
    }

    weaponDefinitions(first: 6, orderBy: weaponDefinitionId, orderDirection: asc) {
      id
      weaponDefinitionId
      name
      classId
      damageTypeId
      techTier
      minDamage
      maxDamage
      enchantmentSlots
      materiaSlots
      enabled
    }

    weaponInstances(first: 12, orderBy: tokenId, orderDirection: asc) {
      id
      tokenId
      owner {
        id
      }
      rarityTier
      upgradeLevel
      durability
      originPlotId
      weaponDefinition {
        id
        name
      }
    }

    materiaDefinitions(first: 12, orderBy: materiaId, orderDirection: asc) {
      id
      materiaId
      name
      categoryLabel
      elementLabel
      rarityTier
      maxLevel
      enabled
    }

    plots(first: 24, orderBy: plotId, orderDirection: asc) {
      id
      plotId
      plotType
      faction
      status
      width
      height
      exists
      createdAt
      owner {
        id
      }
    }

    players(first: 12, orderBy: id, orderDirection: asc) {
      id
      cityKeyTokenId
      faction
      personalPlotCount
    }

    plotStatusInfos(first: 24, orderBy: id, orderDirection: asc) {
      id
      plot {
        id
        plotId
      }
      lastActivityAt
      lastMaintenanceAt
      manualStatusOverride
      derivedStatus
      layerEligible
      updatedAtBlock
      updatedAtTimestamp
    }

    plotProvenances(first: 24, orderBy: id, orderDirection: asc) {
      id
      plot {
        id
        plotId
      }
      firstBuilder
      createdAt
      layerCount
      ownershipTransfers
      aetherUses
      historicScore
      originFaction
      genesisEra
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`);

// ============================================================
// PAGINATED QUERIES
// ============================================================

export const PLOTS_PAGINATED_QUERY = gql(`
  query GetPlotsPaginated(
    $first: Int!
    $skip: Int!
    $orderBy: Plot_orderBy = plotId
    $orderDirection: OrderDirection = asc
  ) {
    plots(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      plotId
      plotType
      faction
      status
      width
      height
      exists
      createdAt
      owner {
        id
      }
    }
  }
`);

export const PLOT_STATUS_INFOS_PAGINATED_QUERY = gql(`
  query GetPlotStatusInfosPaginated(
    $first: Int!
    $skip: Int!
    $orderBy: PlotStatusInfo_orderBy = id
    $orderDirection: OrderDirection = asc
  ) {
    plotStatusInfos(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      plot {
        id
        plotId
      }
      lastActivityAt
      lastMaintenanceAt
      manualStatusOverride
      derivedStatus
      layerEligible
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`);

export const PLOT_PROVENANCES_PAGINATED_QUERY = gql(`
  query GetPlotProvenancesPaginated(
    $first: Int!
    $skip: Int!
    $orderBy: PlotProvenance_orderBy = id
    $orderDirection: OrderDirection = asc
  ) {
    plotProvenances(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      plot {
        id
        plotId
      }
      firstBuilder
      createdAt
      layerCount
      ownershipTransfers
      aetherUses
      historicScore
      originFaction
      genesisEra
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`);

// ============================================================
// PLAYER & PLOT
// ============================================================

export const PLAYER_QUERY = gql(`
  query GetPlayer($id: ID!) {
    player(id: $id) {
      id
      cityKeyTokenId
      faction
      personalPlotCount
    }
  }
`);

export const PLAYERS_QUERY = gql(`
  query GetPlayers($first: Int = 50, $skip: Int = 0) {
    players(first: $first, skip: $skip, orderBy: id, orderDirection: asc) {
      id
      cityKeyTokenId
      faction
      personalPlotCount
    }
  }
`);

export const PLOT_QUERY = gql(`
  query GetPlot($id: ID!) {
    plot(id: $id) {
      id
      plotId
      plotType
      faction
      status
      width
      height
      createdAt
      exists
      owner {
        id
      }
    }
  }
`);

export const PLOTS_QUERY = gql(`
  query GetPlots($first: Int = 50, $skip: Int = 0) {
    plots(first: $first, skip: $skip, orderBy: plotId, orderDirection: asc) {
      id
      plotId
      plotType
      faction
      status
      width
      height
      createdAt
      exists
      owner {
        id
      }
    }
  }
`);

// ============================================================
// WEAPONS
// ============================================================

export const WEAPON_DEFINITION_QUERY = gql(`
  query GetWeaponDefinition($id: ID!) {
    weaponDefinition(id: $id) {
      id
      weaponDefinitionId
      name
      classId
      damageTypeId
      techTier
      minDamage
      maxDamage
      enchantmentSlots
      materiaSlots
      enabled
    }
  }
`);

export const WEAPON_DEFINITIONS_QUERY = gql(`
  query GetWeaponDefinitions($first: Int = 50, $skip: Int = 0) {
    weaponDefinitions(first: $first, skip: $skip, orderBy: weaponDefinitionId, orderDirection: asc) {
      id
      weaponDefinitionId
      name
      classId
      damageTypeId
      techTier
      minDamage
      maxDamage
      enchantmentSlots
      materiaSlots
      enabled
    }
  }
`);

export const WEAPON_INSTANCE_QUERY = gql(`
  query GetWeaponInstance($id: ID!) {
    weaponInstance(id: $id) {
      id
      tokenId
      owner {
        id
      }
      weaponDefinition {
        id
        name
      }
      rarityTier
      frameTier
      durability
      upgradeLevel
      metadataRevision
      originPlotId
      originFaction
      originDistrictKind
      craftedAt
      visualVariant
      resonanceType
      craftSeed
      provenanceHash
      genesisEra
      usedAether
      txHash
      blockNumber
    }
  }
`);

export const WEAPON_INSTANCES_QUERY = gql(`
  query GetWeaponInstances($first: Int = 50, $skip: Int = 0) {
    weaponInstances(first: $first, skip: $skip, orderBy: tokenId, orderDirection: asc) {
      id
      tokenId
      owner {
        id
      }
      rarityTier
      upgradeLevel
      durability
      originPlotId
      weaponDefinition {
        id
        name
      }
    }
  }
`);

// ============================================================
// LAND
// ============================================================

export const PLOT_QUBIQS_QUERY = gql(`
  query GetPlotQubiqs($first: Int = 100, $skip: Int = 0) {
    plotQubiqs(first: $first, skip: $skip) {
      id
      plot {
        id
        plotId
      }
      x
      y
      oilDeposited
      lemonsDeposited
      ironDeposited
      completed
      usedAether
      lastContributor
      completedAt
      createdAt
      updatedAt
    }
  }
`);

export const AETHER_USES_QUERY = gql(`
  query GetAetherUses($first: Int = 100, $skip: Int = 0) {
    aetherUses(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
      id
      plot {
        id
        plotId
      }
      x
      y
      user
      blockNumber
      timestamp
      txHash
    }
  }
`);

export const PLOT_COMPLETIONS_QUERY = gql(`
  query GetPlotCompletions($first: Int = 100, $skip: Int = 0) {
    plotCompletions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
      id
      plot {
        id
        plotId
      }
      blockNumber
      timestamp
      txHash
    }
  }
`);

export const QUBIQ_CONTRIBUTIONS_QUERY = gql(`
  query GetQubiqContributions($first: Int = 100, $skip: Int = 0) {
    qubiqContributions(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
      id
      plot {
        id
        plotId
      }
      x
      y
      contributor
      oil
      lemons
      iron
      blockNumber
      timestamp
      txHash
    }
  }
`);

// ============================================================
// CORE EVENTS
// ============================================================

export const OWNERSHIP_TRANSFERRED_EVENTS_QUERY = gql(`
  query GetOwnershipTransferredEvents($first: Int = 100, $skip: Int = 0) {
    ownershipTransferredEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`);

export const TRANSFER_EVENTS_QUERY = gql(`
  query GetTransferEvents($first: Int = 100, $skip: Int = 0) {
    transferEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
      id
      from
      to
      tokenId
      blockNumber
      timestamp
      txHash
    }
  }
`);

export const APPROVAL_EVENTS_QUERY = gql(`
  query GetApprovalEvents($first: Int = 100, $skip: Int = 0) {
    approvalEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
      id
      owner
      approved
      tokenId
      blockNumber
      timestamp
      txHash
    }
  }
`);

export const APPROVAL_FOR_ALL_EVENTS_QUERY = gql(`
  query GetApprovalForAllEvents($first: Int = 100, $skip: Int = 0) {
    approvalForAllEvents(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
      id
      owner
      operator
      approved
      blockNumber
      timestamp
      txHash
    }
  }
`);