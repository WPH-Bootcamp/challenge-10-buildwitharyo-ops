"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns false during SSR and the first render, then true once the component
 * has hydrated on the client. Useful for reading client-only sources (cookies,
 * sessionStorage) without causing a hydration mismatch.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
