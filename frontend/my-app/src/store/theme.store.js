import { create } from 'zustand'; 

const getInitialTheme = () => {
  try {
    const theme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return theme ? theme : (systemPrefersDark ? 'dark' : 'light');
  } catch (error) {
    return 'light';
  }
};

const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return { theme: newTheme };
    }),
  applyTheme: () => {
    const theme = getInitialTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },
}));

export default useThemeStore;