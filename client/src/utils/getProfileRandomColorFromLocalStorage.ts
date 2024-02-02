import { getRandomColor } from "./getRandomColor";

export const getProfileRandomColorFromLocalStorage = (
  format: "hex" | "rgb" | "rgba" = "hex"
): string => {
  const randomColor = localStorage.getItem("profileRandomColor");
  if (randomColor) {
    return randomColor;
  }
  const generateRandomColor = getRandomColor();
  localStorage.setItem("profileRandomColor", generateRandomColor);
  return generateRandomColor;
};
