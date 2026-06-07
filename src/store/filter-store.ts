import { create } from "zustand";

export interface FilterDraft {
  range?: number;
  priceMin?: string;
  priceMax?: string;
  rating?: number;
}

interface FilterState {
  draft: FilterDraft;
  isDrawerOpen: boolean;
  setDraft: (patch: Partial<FilterDraft>) => void;
  resetDraft: () => void;
  hydrate: (draft: FilterDraft) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  draft: {},
  isDrawerOpen: false,
  setDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),
  resetDraft: () => set({ draft: {} }),
  hydrate: (draft) => set({ draft }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));
