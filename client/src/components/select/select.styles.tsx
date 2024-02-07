import React from "react";
import { createUseStyles } from "react-jss";

export const useSelectStyles = createUseStyles(({ colors }: ThemeType) => ({
  selectRequiredTag: {
    color: colors.primaryTextColor,
    backgroundColor: colors.primaryBgColor,
  },
  optionList: {
    "&:hover": {
      backgroundColor: colors.secondaryBgOnHover,
      color: colors.secondaryTextOnHover,
    },
  },
  selectedOption: {
    backgroundColor: colors.primaryBgOnHover,
    "&:hover": {
      backgroundColor: colors.secondaryBgOnHover,
    },
  },
  selectError: {
    border: `1px solid ${colors.errorColor}`,
  },
  optionContainer: {
    backgroundColor: colors.secondaryBgColor,
  },
  selectBox: {
    backgroundColor: colors.primaryBgColor,
    color: colors.primaryTextColor,
    border: `2px solid ${colors.primaryBorder}`,
  },
}));
