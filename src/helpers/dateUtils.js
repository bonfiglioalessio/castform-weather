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

export const formatDayLabel = (dateKey) => {
  if (!dateKey) return "";
  const [year, month, day] = dateKey.split("-").map(Number);
  const target = new Date(year, month - 1, day);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const weekday = target.toLocaleDateString("en-US", { weekday: "long" });

  if (target.getTime() === today.getTime()) {
    return `${weekday} - Today`;
  }
  if (target.getTime() === tomorrow.getTime()) {
    return `${weekday} - Tomorrow`;
  }
  return weekday;
};

export const formatMonthDay = (dateKey) => {
  if (!dateKey) return "";
  const [year, month, day] = dateKey.split("-").map(Number);
  const target = new Date(year, month - 1, day);
  const monthName = target.toLocaleDateString("en-US", { month: "long" });
  const dayNum = target.getDate();

  const j = dayNum % 10;
  const k = dayNum % 100;
  let suffix = "th";
  if (j === 1 && k !== 11) suffix = "st";
  else if (j === 2 && k !== 12) suffix = "nd";
  else if (j === 3 && k !== 13) suffix = "rd";

  return `${monthName} ${dayNum}${suffix}`;
};
