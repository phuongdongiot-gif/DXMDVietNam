import { create } from 'zustand';

interface MapStore {
  selectedProjectId: number | null;
  filterType: 'all' | 'project' | 'office';
  setSelectedProjectId: (id: number | null) => void;
  setFilterType: (type: 'all' | 'project' | 'office') => void;
}

export const useMapStore = create<MapStore>((set) => ({
  selectedProjectId: null,
  filterType: 'all',
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
  setFilterType: (type) => set({ filterType: type })
}));
