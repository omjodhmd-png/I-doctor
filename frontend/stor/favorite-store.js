import { create } from "zustand";

const useFavoriteStore = create((set) => ({
  favorites: [], // ids of favorite doctors
  toggleFavorite: (id) =>
    set((state) => {
      const isFav = state.favorites.includes(id);
      return {
        favorites: isFav
          ? state.favorites.filter((fid) => fid !== id)
          : [...state.favorites, id],
      };
    }),
}));

export default useFavoriteStore;
