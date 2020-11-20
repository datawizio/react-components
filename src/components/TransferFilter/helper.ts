export const isLoadedDataSource = (include: string[] | null) =>
  Array.isArray(include) && include.length === 0;

export const isLocalDataSource = (
  include: string[] | null,
  direction: "right" | "left",
  local: boolean
) => {
  if (local) return true;
  return direction === "right" && Array.isArray(include) && include.length > 0;
};
