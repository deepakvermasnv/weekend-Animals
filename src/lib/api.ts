export function getApiBaseUrl(): string {
  const rawUrl =
    (typeof window === 'undefined'
      ? process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_API_URL) || 'http://localhost:5000';

  return rawUrl.trim().replace(/\/+$/, '');
}

export function getApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (baseUrl.endsWith('/api') && cleanPath.startsWith('/api')) {
    return `${baseUrl}${cleanPath.substring(4)}`;
  }

  return `${baseUrl}${cleanPath}`;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = getApiUrl(path);
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    credentials: 'include', // Ensure cookies are included in cross-origin requests
  });

  return response;
}
