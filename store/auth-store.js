import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const STORAGE_KEY = 'user-storage';

const useUserStore = create()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userId: undefined,
      login: ({ id }) => {
        set((state) => ({
          ...state,
          isLoggedIn: true,
          userId: id,
        }));
      },
      logout: () =>
        set((state) => ({
          ...state,
          isLoggedIn: false,
          userId: undefined,
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
