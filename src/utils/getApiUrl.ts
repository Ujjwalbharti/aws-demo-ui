export function getApiUrl(path: string): string {
  const host = process.env.NEXT_PUBLIC_API_HOST ?? "localhost";
  const port = process.env.NEXT_PUBLIC_API_PORT ?? "5000";

  const baseUrl = `http://${host}:${port}`;

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
