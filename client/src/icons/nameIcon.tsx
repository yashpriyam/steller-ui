import { getRandomColor } from "../utils/index";
interface NameIconProps {
  height?: string;
  width?: string;
  fillColor?: string;
  name: string;
}
export const NameIcon: React.FC<NameIconProps> = ({
  height = "25px",
  width = "25px",
  fillColor,
  name = "",
}: NameIconProps) => {
  const acronymName = name.split(" ").map((word) => word.charAt(0));
  const randomColor = getRandomColor();
  console.log({ acronymName, randomColor });
  return (
    <span
      style={{
        backgroundColor: fillColor || randomColor,
        width,
        height,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>{acronymName}</span>
    </span>
  );
};
