/**
 * Castform (#351 - The Weather Pokémon) Intelligence Helper
 * Signature Ability: Forecast (Transforms based on current weather)
 */

export const CASTFORM_FORMS = {
  SUNNY: {
    id: "sunny",
    name: "Sunny Form",
    type: "Fire",
    typeColor: "#f97316",
    typeBg: "rgba(249, 115, 22, 0.2)",
    auraColor: "rgba(251, 191, 36, 0.35)",
    artwork:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10013.png",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/castform-sunny.gif",
    quote: "Clear skies ahead! Soaking up pure solar energy!",
    tip: "Great day for outdoor activities. Stay hydrated!",
  },
  RAINY: {
    id: "rainy",
    name: "Rainy Form",
    type: "Water",
    typeColor: "#38bdf8",
    typeBg: "rgba(56, 189, 248, 0.2)",
    auraColor: "rgba(56, 189, 248, 0.35)",
    artwork:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10014.png",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/castform-rainy.gif",
    quote: "Rain detected! My droplet body is fully charged!",
    tip: "Keep an umbrella handy and watch out for slippery surfaces.",
  },
  SNOWY: {
    id: "snowy",
    name: "Snowy Form",
    type: "Ice",
    typeColor: "#a855f7",
    typeBg: "rgba(168, 85, 247, 0.2)",
    auraColor: "rgba(192, 132, 252, 0.35)",
    artwork:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10015.png",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/castform-snowy.gif",
    quote: "Sub-zero chill in the air! Transforming into ice crystals!",
    tip: "Bundle up warmly in multiple layers against the cold.",
  },
  NORMAL: {
    id: "normal",
    name: "Normal Form",
    type: "Normal",
    typeColor: "#94a3b8",
    typeBg: "rgba(148, 163, 184, 0.2)",
    auraColor: "rgba(226, 232, 240, 0.25)",
    artwork:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/351.png",
    sprite: "https://play.pokemonshowdown.com/sprites/ani/castform.gif",
    quote: "Misty and overcast! Floating peacefully on cloud currents.",
    tip: "Cloudy day with mild conditions. Comfortable for a walk.",
  },
};

/**
 * Determine Castform's active form based on weather condition, icon, and temperature.
 *
 * @param {string} condition - Main weather description (e.g. "Clear", "Rain", "Snow", "Clouds")
 * @param {string} icon - OpenWeather icon code (e.g. "01d", "10n")
 * @param {number} temp - Current temperature in Celsius
 * @returns {object} Form details
 */
export const getCastformForm = (condition = "", icon = "", temp = null) => {
  const cond = condition.toLowerCase();
  const isNight = icon.includes("n");

  // 1. Snow / Frost / Blizzard / Sub-zero ice
  if (
    cond.includes("snow") ||
    cond.includes("sleet") ||
    cond.includes("blizzard") ||
    cond.includes("freeze") ||
    (temp !== null && temp <= 0 && (cond.includes("rain") || cond.includes("drizzle")))
  ) {
    return CASTFORM_FORMS.SNOWY;
  }

  // 2. Rain / Drizzle / Thunderstorm
  if (
    cond.includes("rain") ||
    cond.includes("drizzle") ||
    cond.includes("thunderstorm") ||
    cond.includes("shower")
  ) {
    return CASTFORM_FORMS.RAINY;
  }

  // 3. Sunny / Clear Day (Daytime clear sky or few clouds)
  if (
    !isNight &&
    (cond.includes("clear") ||
      (cond.includes("sun") && !cond.includes("rain")) ||
      icon.startsWith("01d") ||
      icon.startsWith("02d"))
  ) {
    return CASTFORM_FORMS.SUNNY;
  }

  // 4. Default / Clouds / Overcast / Mist / Fog / Night
  return CASTFORM_FORMS.NORMAL;
};
