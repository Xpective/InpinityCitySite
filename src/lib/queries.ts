export const CITY_DASHBOARD_QUERY = `
  query CityDashboard {
    _meta {
      block {
        number
      }
    }

    players(first: 200, orderBy: id, orderDirection: asc) {
      id
      cityKeyTokenId
      faction
      personalPlotCount
      craftedWeapons
    }

    plots(first: 400, orderBy: plotId, orderDirection: asc) {
      id
      plotId
      owner {
        id
      }
      plotType
      faction
      status
      width
      height
      createdAt
      exists
    }

    plotStatusInfos(first: 400, orderBy: id, orderDirection: asc) {
      id
      currentStatus
      updatedAt
      activatedAt
      lastMaintenanceAt
      inactivityWarningAt
    }

    plotProvenances(first: 400, orderBy: plotId, orderDirection: asc) {
      id
      plotId
      currentOwner
      transferCount
      lastTransferAt
    }

    weaponDefinitions(first: 12, orderBy: weaponDefinitionId, orderDirection: asc) {
      id
      weaponDefinitionId
      name
      techTier
      minDamage
      maxDamage
      enchantmentSlots
      materiaSlots
      enabled
    }

    weaponInstances(first: 24, orderBy: tokenId, orderDirection: asc) {
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

    materiaDefinitions(first: 24, orderBy: materiaId, orderDirection: asc) {
      id
      materiaId
      name
      categoryLabel
      elementLabel
      maxLevel
      enabled
    }
  }
`;