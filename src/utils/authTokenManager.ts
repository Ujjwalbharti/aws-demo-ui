const TOKEN_KEY = "auth_token";

function getLocalStorage(): Storage | null {
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    return window.localStorage;
  }
  return null;
}

function setAuthToken(token: string): void {
  const storage = getLocalStorage();
  if (storage) {
    storage.setItem(TOKEN_KEY, token);
  }
}

function getAuthToken(): string | null {
  const storage = getLocalStorage();
  return storage ? storage.getItem(TOKEN_KEY) : null;
}

function deleteAuthToken(): void {
  const storage = getLocalStorage();
  if (storage) {
    storage.removeItem(TOKEN_KEY);
  }
}

export { setAuthToken, getAuthToken, deleteAuthToken };
