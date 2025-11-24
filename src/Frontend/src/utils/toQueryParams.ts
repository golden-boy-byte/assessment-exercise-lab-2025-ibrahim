export default function toQueryParams(obj: Record<string, string>): string {
  const query = Object.entries(obj)
    .filter(([, value]) => Boolean(value)) // only truthy values
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return query ? `?${query}` : "";
}
