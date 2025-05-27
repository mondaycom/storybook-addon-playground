import { Code } from "@/types";

const STORAGE_KEY = "storybook-playground-v1";

export function saveCodeToStorage(code: Code): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(code));
  } catch (error) {
    console.warn("[Playground] Failed to save code to localStorage:", error);
  }
}

export function loadCodeFromStorage(): Code | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const code = JSON.parse(stored);

    if (code && typeof code.jsx === "string" && typeof code.css === "string") {
      return code;
    }

    return null;
  } catch (error) {
    console.warn("[Playground] Failed to load code from localStorage:", error);
    return null;
  }
}

export function clearStoredCode(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("[Playground] Failed to clear stored code:", error);
  }
}
