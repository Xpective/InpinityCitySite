export const DASHBOARD_QUERY = `
  query DashboardQuery {
    _meta {
      block {
        number
      }
    }

    weaponDefinitions(first: 5, orderBy: weaponDefinitionId, orderDirection: asc) {
      id
      weaponDefinitionId
      name
      category
      rarityTier
    }

    materiaDefinitions(first: 5, orderBy: materiaId, orderDirection: asc) {
      id
      materiaId
      name
      elementLabel
      categoryLabel
      rarityTier
      maxLevel
      enabled
    }

    enchantmentItemDefinitions(first: 5, orderBy: itemId, orderDirection: asc) {
      id
      itemId
      enchantmentDefinitionId
      level
      rarityTier
      enabled
    }

    materiaItemDefinitions(first: 5, orderBy: itemId, orderDirection: asc) {
      id
      itemId
      materiaDefinitionId
      level
      rarityTier
      enabled
    }
  }
`;
