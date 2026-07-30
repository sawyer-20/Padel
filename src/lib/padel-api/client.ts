const BASE_URL = "https://padelapi.org/api";

export class PadelApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "PadelApiError";
  }
}

// Só corre em código de servidor (Server Components / route handlers) — a chave nunca
// chega ao cliente (regra §6.1 do PROJECT.md).
export async function padelApiFetch(path: string, init?: RequestInit): Promise<unknown> {
  const token = process.env.PADEL_API_TOKEN;
  if (!token) {
    throw new PadelApiError("PADEL_API_TOKEN não está definido.");
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new PadelApiError(`Padel API respondeu ${response.status} para ${path}`, response.status);
  }

  return response.json();
}
