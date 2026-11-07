import type { HomeAssistant } from "./types/ha";

/**
 * The name Home Assistant's own cards show for an entity (device + entity name,
 * the same words as the `friendly_name` attribute). Uses `hass.formatEntityName`
 * (2026.4+) and falls back to `friendly_name`, which is slated for deprecation.
 */
export function entityDisplayName(
  hass: HomeAssistant,
  entityId: string | undefined
): string | undefined {
  const state = entityId ? hass.states[entityId] : undefined;
  if (!state) return undefined;
  if (typeof hass.formatEntityName === "function") {
    try {
      const name = hass.formatEntityName(
        state,
        [{ type: "device" }, { type: "entity" }],
        { separator: " " }
      );
      if (name) return name;
    } catch {
      // fall through to the attribute
    }
  }
  return state.attributes.friendly_name;
}
