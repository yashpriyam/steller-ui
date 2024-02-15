import React, { useEffect } from "react";
import { useTheme } from "react-jss";

export const useUpdateThemeColor = ({
  useStyle,
  colors,
}: UseUpdateThemeColorProp) => {
  const theme: ThemeType = useTheme() || { colors: {} };
  return useStyle({
    theme: colors
      ? {
          ...theme,
          colors: Object.entries(colors).reduce(
            (updatedColors, [key, value]: [string, string]) => {
              updatedColors[key] = value || theme.colors[key];
              return updatedColors;
            },
            {} as ThemeColorType
          ),
        }
      : theme,
  });
};
