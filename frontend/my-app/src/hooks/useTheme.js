import useThemeStore from '../store/theme.store';

// This hook just simplifies accessing the store
const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const applyTheme = useThemeStore((state) => state.applyTheme);

  return { theme, toggleTheme, applyTheme };
};

export default useTheme;