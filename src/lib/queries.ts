// queries.ts

export const CITY_DASHBOARD_QUERY = `
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
      owner
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
      craftedWeapons
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
`;

// ----------------------------------------------------------------------
// Player & Plot Queries
// ----------------------------------------------------------------------

export const PLAYER_QUERY = (id: string) => `
  query GetPlayer {
    player(id: "${id}") {
      id
      cityKeyTokenId
      faction
      personalPlotCount
      craftedWeapons {
        id
        tokenId
        weaponDefinition {
          name
        }
      }
    }
  }
`;

export const PLAYERS_QUERY = `
  query GetPlayers($first: Int = 50, $skip: Int = 0) {
    players(first: $first, skip: $skip, orderBy: id, orderDirection: asc) {
      id
      cityKeyTokenId
      faction
      personalPlotCount
    }
  }
`;

export const PLOT_QUERY = (id: string) => `
  query GetPlot {
    plot(id: "${id}") {
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
`;

export const PLOTS_QUERY = `
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
`;

// ----------------------------------------------------------------------
// Weapon Queries
// ----------------------------------------------------------------------

export const WEAPON_DEFINITION_QUERY = (id: string) => `
  query GetWeaponDefinition {
    weaponDefinition(id: "${id}") {
      id
      weaponDefinitionId
      name
      classId
      damageTypeId
      techTier
      requiredLevel
      requiredTechTier
      minDamage
      maxDamage
      attackSpeed
      critChanceBps
      critMultiplierBps
      accuracyBps
      range
      maxDurability
      armorPenBps
      blockChanceBps
      lifeStealBps
      energyCost
      heatGeneration
      stability
      cooldownMs
      projectileSpeed
      aoeRadius
      enchantmentSlots
      materiaSlots
      visualVariant
      maxUpgradeLevel
      familySetId
      enabled
      createdAtBlock
      createdAtTimestamp
    }
  }
`;

export const WEAPON_DEFINITIONS_QUERY = `
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
`;

export const WEAPON_INSTANCE_QUERY = (id: string) => `
  query GetWeaponInstance {
    weaponInstance(id: "${id}") {
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
`;

export const WEAPON_INSTANCES_QUERY = `
  query GetWeaponInstances($first: Int = 50, $skip: Int = 0) {
    weaponInstances(first: $first, skip: $skip, orderBy: tokenId, orderDirection: asc) {
      id
      tokenId
      owner
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
`;

export const WEAPON_BONUSES_QUERY = `
  query GetWeaponBonuses($first: Int = 50) {
    weaponBonuses(first: $first) {
      id
      weapon {
        id
        tokenId
      }
      minDamageBonus
      maxDamageBonus
      attackSpeedBonus
      critChanceBpsBonus
      critMultiplierBpsBonus
      accuracyBpsBonus
      rangeBonus
      maxDurabilityBonus
      armorPenBpsBonus
      blockChanceBpsBonus
      lifeStealBpsBonus
      energyCostBonus
      heatGenerationBonus
      stabilityBonus
      cooldownMsBonus
      projectileSpeedBonus
      aoeRadiusBonus
      enchantmentSlotsBonus
      materiaSlotsBonus
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const AUTHORIZED_MINTERS_QUERY = `
  query GetAuthorizedMinters {
    authorizedMinters(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const BASE_URIS_QUERY = `
  query GetBaseURIs {
    baseURIs(first: 5) {
      id
      uri
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const WEAPON_SOCKETS_QUERY = `
  query GetWeaponSockets {
    weaponSocketsCollection(first: 5) {
      id
      socketsAddress
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const WEAPONS_PAUSED_QUERY = `
  query GetWeaponsPaused {
    weaponsPauseds(first: 5) {
      id
      paused
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

// ----------------------------------------------------------------------
// Crafting Queries
// ----------------------------------------------------------------------

export const RECIPE_DEFINITIONS_QUERY = `
  query GetRecipeDefinitions($first: Int = 50) {
    recipeDefinitions(first: $first) {
      id
      recipeId
      outputKind
      outputId
      outputAmount
      enabled
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const CRAFT_EVENTS_QUERY = `
  query GetCraftEvents($first: Int = 100, $orderDirection: OrderDirection = desc) {
    craftEvents(first: $first, orderBy: timestamp, orderDirection: $orderDirection) {
      id
      user
      recipeId
      outputKind
      outputId
      outputAmount
      tokenId
      weaponDefinitionId
      craftNonce
      txHash
      blockNumber
      timestamp
    }
  }
`;

export const AUTHORIZED_CALLERS_QUERY = `
  query GetAuthorizedCallers {
    authorizedCallers(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const CITY_BLUEPRINTS_QUERY = `
  query GetCityBlueprints {
    cityBlueprintsCollection(first: 5) {
      id
      address
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const CITY_COMPONENTS_QUERY = `
  query GetCityComponents {
    cityComponentsCollection(first: 5) {
      id
      address
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const CITY_WEAPONS_ADDRESS_QUERY = `
  query GetCityWeaponsAddress {
    cityWeaponsAddresses(first: 5) {
      id
      address
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const CRAFTING_PAUSED_QUERY = `
  query GetCraftingPaused {
    craftingPauseds(first: 5) {
      id
      paused
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const RECIPE_DISCOVERED_EVENTS_QUERY = `
  query GetRecipeDiscoveredEvents($first: Int = 100) {
    recipeDiscoveredEvents(first: $first, orderBy: timestamp, orderDirection: desc) {
      id
      user
      recipeId
      blockNumber
      timestamp
      txHash
    }
  }
`;

// ----------------------------------------------------------------------
// Land Queries (CityLand)
// ----------------------------------------------------------------------

export const PLOT_QUBIQS_QUERY = `
  query GetPlotQubiqs($first: Int = 100) {
    plotQubiqs(first: $first) {
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
`;

export const AETHER_USES_QUERY = `
  query GetAetherUses($first: Int = 100) {
    aetherUses(first: $first, orderBy: timestamp, orderDirection: desc) {
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
`;

export const PLOT_COMPLETIONS_QUERY = `
  query GetPlotCompletions($first: Int = 100) {
    plotCompletions(first: $first, orderBy: timestamp, orderDirection: desc) {
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
`;

export const QUIBIQ_CONTRIBUTIONS_QUERY = `
  query GetQubiqContributions($first: Int = 100) {
    qubiqContributions(first: $first, orderBy: timestamp, orderDirection: desc) {
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
`;

export const PLOT_STATS_QUERY = `
  query GetPlotStats($first: Int = 50) {
    plotStatsCollection(first: $first) {
      id
      plot {
        id
        plotId
      }
      completedQubiqCount
      aetherUsesCount
      totalOil
      totalLemons
      totalIron
      updatedAt
    }
  }
`;

// ----------------------------------------------------------------------
// Event Queries (Ownership, Transfer, Approval)
// ----------------------------------------------------------------------

export const OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetOwnershipTransferredEvents($first: Int = 100) {
    ownershipTransferredEvents(first: $first, orderBy: timestamp, orderDirection: desc) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const TRANSFER_EVENTS_QUERY = `
  query GetTransferEvents($first: Int = 100) {
    transferEvents(first: $first, orderBy: timestamp, orderDirection: desc) {
      id
      from
      to
      tokenId
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const APPROVAL_EVENTS_QUERY = `
  query GetApprovalEvents($first: Int = 100) {
    approvalEvents(first: $first, orderBy: timestamp, orderDirection: desc) {
      id
      owner
      approved
      tokenId
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const APPROVAL_FOR_ALL_EVENTS_QUERY = `
  query GetApprovalForAllEvents($first: Int = 100) {
    approvalForAllEvents(first: $first, orderBy: timestamp, orderDirection: desc) {
      id
      owner
      operator
      approved
      blockNumber
      timestamp
      txHash
    }
  }
`;

// ----------------------------------------------------------------------
// Additional Queries (based on your full list)
// ----------------------------------------------------------------------

export const CITY_CONFIG_STATES_QUERY = `
  query GetCityConfigStates {
    cityConfigStates(first: 10) {
      id
      # Add fields as needed
    }
  }
`;

export const CITY_CONFIG_ADDRESS_ENTRIES_QUERY = `
  query GetCityConfigAddressEntries {
    cityConfigAddressEntries(first: 50) {
      id
      # Add fields: key, value, updatedAtBlock, updatedAtTimestamp
    }
  }
`;

export const CITY_CONFIG_UINT_ENTRIES_QUERY = `
  query GetCityConfigUintEntries {
    cityConfigUintEntries(first: 50) {
      id
      # Add fields: key, value, updatedAtBlock, updatedAtTimestamp
    }
  }
`;

export const CONFIG_INITIALIZED_EVENTS_QUERY = `
  query GetConfigInitializedEvents {
    configInitializedEvents(first: 50) {
      id
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const CORE_ADDRESS_SET_EVENTS_QUERY = `
  query GetCoreAddressSetEvents {
    coreAddressSetEvents(first: 50) {
      id
      # Add fields: addressType, newAddress, blockNumber, timestamp, txHash
    }
  }
`;

export const UINT_CONFIG_SET_EVENTS_QUERY = `
  query GetUintConfigSetEvents {
    uintConfigSetEvents(first: 50) {
      id
      # Add fields: key, value, blockNumber, timestamp, txHash
    }
  }
`;

export const CONFIG_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetConfigOwnershipTransferredEvents {
    configOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const PLOT_HISTORY_INITIALIZED_EVENTS_QUERY = `
  query GetPlotHistoryInitializedEvents {
    plotHistoryInitializedEvents(first: 50) {
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
`;

export const AETHER_USE_RECORDED_EVENTS_QUERY = `
  query GetAetherUseRecordedEvents {
    aetherUseRecordedEvents(first: 50) {
      id
      plot {
        id
        plotId
      }
      user
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const LAYER_ADDED_EVENTS_QUERY = `
  query GetLayerAddedEvents {
    layerAddedEvents(first: 50) {
      id
      plot {
        id
        plotId
      }
      layerIndex
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const OWNERSHIP_TRANSFER_RECORDED_EVENTS_QUERY = `
  query GetOwnershipTransferRecordedEvents {
    ownershipTransferRecordedEvents(first: 50) {
      id
      plot {
        id
        plotId
      }
      from
      to
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const CITY_HISTORY_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityHistoryOwnershipTransferredEvents {
    cityHistoryOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const PLOT_STATUS_UPDATED_EVENTS_QUERY = `
  query GetPlotStatusUpdatedEvents {
    plotStatusUpdatedEvents(first: 50) {
      id
      plot {
        id
        plotId
      }
      newStatus
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const MANUAL_STATUS_CLEARED_EVENTS_QUERY = `
  query GetManualStatusClearedEvents {
    manualStatusClearedEvents(first: 50) {
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
`;

export const CITY_STATUS_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityStatusOwnershipTransferredEvents {
    cityStatusOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const PLOT_DISTRICTS_QUERY = `
  query GetPlotDistricts {
    plotDistricts(first: 50) {
      id
      plot {
        id
        plotId
      }
      districtKind
      assignedAt
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const DISTRICT_AUTHORIZED_CALLERS_QUERY = `
  query GetDistrictAuthorizedCallers {
    districtAuthorizedCallers(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const CITY_DISTRICTS_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityDistrictsOwnershipTransferredEvents {
    cityDistrictsOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const VALIDATION_HOOKS_QUERY = `
  query GetValidationHooks {
    validationHooksCollection(first: 5) {
      id
      # Add fields: hookType, contractAddress, enabled, updatedAtBlock, updatedAtTimestamp
    }
  }
`;

export const CITY_VALIDATION_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityValidationOwnershipTransferredEvents {
    cityValidationOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

// ----------------------------------------------------------------------
// Component & Blueprint Queries
// ----------------------------------------------------------------------

export const COMPONENT_DEFINITIONS_QUERY = `
  query GetComponentDefinitions {
    componentDefinitions(first: 50) {
      id
      componentId
      name
      rarityTier
      maxStack
      enabled
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const COMPONENT_AUTHORIZED_CONSUMERS_QUERY = `
  query GetComponentAuthorizedConsumers {
    componentAuthorizedConsumers(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const COMPONENT_AUTHORIZED_MINTERS_QUERY = `
  query GetComponentAuthorizedMinters {
    componentAuthorizedMinters(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const COMPONENT_BASE_METADATA_URIS_QUERY = `
  query GetComponentBaseMetadataURIs {
    componentBaseMetadataURIs(first: 5) {
      id
      uri
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const COMPONENT_BALANCES_QUERY = `
  query GetComponentBalances($first: Int = 100) {
    componentBalances(first: $first) {
      id
      account
      component {
        id
      }
      amount
      updatedAtBlock
    }
  }
`;

export const COMPONENT_MINT_EVENTS_QUERY = `
  query GetComponentMintEvents {
    componentMintEvents(first: 100) {
      id
      to
      componentId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const COMPONENT_BURN_EVENTS_QUERY = `
  query GetComponentBurnEvents {
    componentBurnEvents(first: 100) {
      id
      from
      componentId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const COMPONENT_TRANSFER_SINGLE_EVENTS_QUERY = `
  query GetComponentTransferSingleEvents {
    componentTransferSingleEvents(first: 100) {
      id
      from
      to
      componentId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const COMPONENT_TRANSFER_BATCH_EVENTS_QUERY = `
  query GetComponentTransferBatchEvents {
    componentTransferBatchEvents(first: 100) {
      id
      from
      to
      componentIds
      amounts
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const COMPONENT_APPROVAL_FOR_ALL_EVENTS_QUERY = `
  query GetComponentApprovalForAllEvents {
    componentApprovalForAllEvents(first: 100) {
      id
      owner
      operator
      approved
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const COMPONENT_URI_EVENTS_QUERY = `
  query GetComponentURIEvents {
    componentURIEvents(first: 50) {
      id
      componentId
      uri
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const CITY_COMPONENTS_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityComponentsOwnershipTransferredEvents {
    cityComponentsOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const BLUEPRINT_DEFINITIONS_QUERY = `
  query GetBlueprintDefinitions {
    blueprintDefinitions(first: 50) {
      id
      blueprintId
      name
      rarityTier
      maxStack
      enabled
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const BLUEPRINT_AUTHORIZED_CONSUMERS_QUERY = `
  query GetBlueprintAuthorizedConsumers {
    blueprintAuthorizedConsumers(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const BLUEPRINT_AUTHORIZED_MINTERS_QUERY = `
  query GetBlueprintAuthorizedMinters {
    blueprintAuthorizedMinters(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const BLUEPRINT_BASE_METADATA_URIS_QUERY = `
  query GetBlueprintBaseMetadataURIs {
    blueprintBaseMetadataURIs(first: 5) {
      id
      uri
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const BLUEPRINT_BALANCES_QUERY = `
  query GetBlueprintBalances {
    blueprintBalances(first: 100) {
      id
      account
      blueprint {
        id
      }
      amount
      updatedAtBlock
    }
  }
`;

export const BLUEPRINT_MINT_EVENTS_QUERY = `
  query GetBlueprintMintEvents {
    blueprintMintEvents(first: 100) {
      id
      to
      blueprintId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const BLUEPRINT_BURN_EVENTS_QUERY = `
  query GetBlueprintBurnEvents {
    blueprintBurnEvents(first: 100) {
      id
      from
      blueprintId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const BLUEPRINT_TRANSFER_SINGLE_EVENTS_QUERY = `
  query GetBlueprintTransferSingleEvents {
    blueprintTransferSingleEvents(first: 100) {
      id
      from
      to
      blueprintId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const BLUEPRINT_TRANSFER_BATCH_EVENTS_QUERY = `
  query GetBlueprintTransferBatchEvents {
    blueprintTransferBatchEvents(first: 100) {
      id
      from
      to
      blueprintIds
      amounts
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const BLUEPRINT_APPROVAL_FOR_ALL_EVENTS_QUERY = `
  query GetBlueprintApprovalForAllEvents {
    blueprintApprovalForAllEvents(first: 100) {
      id
      owner
      operator
      approved
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const BLUEPRINT_URI_EVENTS_QUERY = `
  query GetBlueprintURIEvents {
    blueprintURIEvents(first: 50) {
      id
      blueprintId
      uri
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const CITY_BLUEPRINTS_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityBlueprintsOwnershipTransferredEvents {
    cityBlueprintsOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

// ----------------------------------------------------------------------
// Enchantment & Materia Queries
// ----------------------------------------------------------------------

export const ENCHANTMENT_DEFINITIONS_QUERY = `
  query GetEnchantmentDefinitions {
    enchantmentDefinitions(first: 50) {
      id
      enchantmentId
      name
      category
      element
      rarityTier
      maxLevel
      enabled
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const ENCHANTMENT_AUTHORIZED_CALLERS_QUERY = `
  query GetEnchantmentAuthorizedCallers {
    enchantmentAuthorizedCallers(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const ENCHANTMENT_BONUS_SETS_QUERY = `
  query GetEnchantmentBonusSets {
    enchantmentBonusSets(first: 100) {
      id
      enchantment {
        id
      }
      # Add bonus fields
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const CITY_ENCHANTMENTS_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityEnchantmentsOwnershipTransferredEvents {
    cityEnchantmentsOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const ENCHANTMENT_ITEM_DEFINITIONS_QUERY = `
  query GetEnchantmentItemDefinitions {
    enchantmentItemDefinitions(first: 50) {
      id
      itemId
      name
      rarityTier
      maxStack
      enabled
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const ENCHANTMENT_ITEM_AUTHORIZED_CONSUMERS_QUERY = `
  query GetEnchantmentItemAuthorizedConsumers {
    enchantmentItemAuthorizedConsumers(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const ENCHANTMENT_ITEM_AUTHORIZED_MINTERS_QUERY = `
  query GetEnchantmentItemAuthorizedMinters {
    enchantmentItemAuthorizedMinters(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const ENCHANTMENT_ITEM_BASE_METADATA_URI_SET_EVENTS_QUERY = `
  query GetEnchantmentItemBaseMetadataURISetEvents {
    enchantmentItemBaseMetadataURISetEvents(first: 50) {
      id
      itemId
      uri
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const ENCHANTMENT_ITEM_MINTED_EVENTS_QUERY = `
  query GetEnchantmentItemMintedEvents {
    enchantmentItemMintedEvents(first: 100) {
      id
      to
      itemId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const ENCHANTMENT_ITEM_BURNED_EVENTS_QUERY = `
  query GetEnchantmentItemBurnedEvents {
    enchantmentItemBurnedEvents(first: 100) {
      id
      from
      itemId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const ENCHANTMENT_ITEM_APPROVAL_FOR_ALL_EVENTS_QUERY = `
  query GetEnchantmentItemApprovalForAllEvents {
    enchantmentItemApprovalForAllEvents(first: 100) {
      id
      owner
      operator
      approved
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const ENCHANTMENT_ITEM_TRANSFER_SINGLE_EVENTS_QUERY = `
  query GetEnchantmentItemTransferSingleEvents {
    enchantmentItemTransferSingleEvents(first: 100) {
      id
      from
      to
      itemId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const ENCHANTMENT_ITEM_TRANSFER_BATCH_EVENTS_QUERY = `
  query GetEnchantmentItemTransferBatchEvents {
    enchantmentItemTransferBatchEvents(first: 100) {
      id
      from
      to
      itemIds
      amounts
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const ENCHANTMENT_ITEM_URI_EVENTS_QUERY = `
  query GetEnchantmentItemURIEvents {
    enchantmentItemURIEvents(first: 50) {
      id
      itemId
      uri
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const CITY_ENCHANTMENT_ITEMS_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityEnchantmentItemsOwnershipTransferredEvents {
    cityEnchantmentItemsOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const MATERIA_DEFINITIONS_QUERY = `
  query GetMateriaDefinitions {
    materiaDefinitions(first: 50) {
      id
      materiaId
      name
      categoryLabel
      elementLabel
      rarityTier
      maxLevel
      enabled
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const MATERIA_BONUSES_QUERY = `
  query GetMateriaBonuses {
    materiaBonuses(first: 100) {
      id
      materia {
        id
      }
      # Add bonus fields
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const MATERIA_AUTHORIZED_CALLERS_QUERY = `
  query GetMateriaAuthorizedCallers {
    materiaAuthorizedCallers(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const CITY_MATERIA_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityMateriaOwnershipTransferredEvents {
    cityMateriaOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const MATERIA_ITEM_DEFINITIONS_QUERY = `
  query GetMateriaItemDefinitions {
    materiaItemDefinitions(first: 50) {
      id
      itemId
      name
      rarityTier
      maxStack
      enabled
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const MATERIA_ITEM_AUTHORIZED_CONSUMERS_QUERY = `
  query GetMateriaItemAuthorizedConsumers {
    materiaItemAuthorizedConsumers(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const MATERIA_ITEM_AUTHORIZED_MINTERS_QUERY = `
  query GetMateriaItemAuthorizedMinters {
    materiaItemAuthorizedMinters(first: 100) {
      id
      allowed
      updatedAtBlock
      updatedAtTimestamp
    }
  }
`;

export const MATERIA_ITEM_APPROVAL_FOR_ALL_EVENTS_QUERY = `
  query GetMateriaItemApprovalForAllEvents {
    materiaItemApprovalForAllEvents(first: 100) {
      id
      owner
      operator
      approved
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const MATERIA_ITEM_BASE_METADATA_URI_SET_EVENTS_QUERY = `
  query GetMateriaItemBaseMetadataURISetEvents {
    materiaItemBaseMetadataURISetEvents(first: 50) {
      id
      itemId
      uri
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const MATERIA_ITEM_BURNED_EVENTS_QUERY = `
  query GetMateriaItemBurnedEvents {
    materiaItemBurnedEvents(first: 100) {
      id
      from
      itemId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const MATERIA_ITEM_MINTED_EVENTS_QUERY = `
  query GetMateriaItemMintedEvents {
    materiaItemMintedEvents(first: 100) {
      id
      to
      itemId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const MATERIA_ITEM_TRANSFER_SINGLE_EVENTS_QUERY = `
  query GetMateriaItemTransferSingleEvents {
    materiaItemTransferSingleEvents(first: 100) {
      id
      from
      to
      itemId
      amount
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const MATERIA_ITEM_TRANSFER_BATCH_EVENTS_QUERY = `
  query GetMateriaItemTransferBatchEvents {
    materiaItemTransferBatchEvents(first: 100) {
      id
      from
      to
      itemIds
      amounts
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const MATERIA_ITEM_URI_EVENTS_QUERY = `
  query GetMateriaItemURIEvents {
    materiaItemURIEvents(first: 50) {
      id
      itemId
      uri
      blockNumber
      timestamp
      txHash
    }
  }
`;

export const CITY_MATERIA_ITEMS_OWNERSHIP_TRANSFERRED_EVENTS_QUERY = `
  query GetCityMateriaItemsOwnershipTransferredEvents {
    cityMateriaItemsOwnershipTransferredEvents(first: 50) {
      id
      previousOwner
      newOwner
      blockNumber
      timestamp
      txHash
    }
  }
`;