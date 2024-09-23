import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const STORAGE_KEY = 'user-storage';

const useUserStore = create()(
  persist(
    (set) => ({
      isLoggedIn: false,
      session: undefined,
      login: ({ session }) => {
        set((state) => ({
          ...state,
          isLoggedIn: true,
          session,
        }));
      },
      logout: () =>
        set((state) => ({
          ...state,
          isLoggedIn: false,
          session: undefined,
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
