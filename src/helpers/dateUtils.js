/**
 * Native date and time formatting utilities (zero dependency, zero bundle bloat).
 */

export const formatTime = (dt_txt, dt) => {
  if (typeof dt_txt === "string" && dt_txt.length >= 16) {
    return dt_txt.slice(11, 16);
  }
  if (dt) {
    const d = new Date(dt * 1000);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  return "";
};

export const getDateKey = (dt_txt, dt) => {
  if (typeof dt_txt === "string" && dt_txt.length >= 10) {
    return dt_txt.slice(0, 10);
  }
  if (dt) {
    const d = new Date(dt * 1000);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return "";
};

export const formatDayLabel = (dateKey, isShort = false) => {
  if (!dateKey) return "";
  const [year, month, day] = dateKey.split("-").map(Number);
  const target = new Date(year, month - 1, day);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (target.getTime() === today.getTime()) {
    return "Today";
  }
  return target.toLocaleDateString("en-US", { weekday: isShort ? "short" : "long" });
};

export const formatMonthDay = (dateKey) => {
  if (!dateKey) return "";
  const [year, month, day] = dateKey.split("-").map(Number);
  const target = new Date(year, month - 1, day);
  const monthName = target.toLocaleDateString("en-US", { month: "short" });
  const dayNum = target.getDate();
  return `${monthName} ${dayNum}`;
};

/**
 * Convert wind angle (degrees 0-360) to cardinal direction
 */
export const degToCompass = (deg) => {
  if (deg === undefined || deg === null) return "N";
  const val = Math.floor((deg / 22.5) + 0.5);
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[val % 16] || "N";
};

/**
 * Format unix timestamp to hour:minute (e.g. 07:15)
 */
export const formatUnixTime = (timestamp) => {
  if (!timestamp) return "--:--";
  const date = new Date(timestamp * 1000);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

/**
 * Get sunset/sunrise countdown description
 */
export const getSunStatus = (sunrise, sunset) => {
  const now = Math.floor(Date.now() / 1000);
  if (!sunrise || !sunset) return { label: "Sun status", detail: "Standard cycle", percent: 50 };

  if (now >= sunrise && now < sunset) {
    const remainingSec = sunset - now;
    const hours = Math.floor(remainingSec / 3600);
    const mins = Math.floor((remainingSec % 3600) / 60);
    const totalDaylight = sunset - sunrise;
    const elapsed = now - sunrise;
    const percent = Math.min(100, Math.max(0, Math.round((elapsed / totalDaylight) * 100)));

    return {
      label: "Sunset in",
      detail: `${hours}h ${mins}m`,
      subtext: `Sunset at ${formatUnixTime(sunset)}`,
      percent,
      isDay: true,
    };
  } else {
    return {
      label: "Sunrise at",
      detail: formatUnixTime(sunrise),
      subtext: `Sunset was at ${formatUnixTime(sunset)}`,
      percent: 0,
      isDay: false,
    };
  }
};
