function getRuntimeEnv() {
  if (typeof window === "undefined") {
    return {};
  }

  return window.__NETLIFY_ENV__ || {};
}

export function getClientEnv(key, defaultValue = "") {
  const value = getRuntimeEnv()[key];
  return value ?? defaultValue;
}
