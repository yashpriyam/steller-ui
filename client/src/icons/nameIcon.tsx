import { getFirstLettersOfName, getProfileRandomColorFromLocalStorage } from "../utils/index";
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
  const acronymName = getFirstLettersOfName(name);
  const randomColor = getProfileRandomColorFromLocalStorage();
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
        padding: '10px'
      }}
    >
      <span>{acronymName}</span>
    </span>
  );
};
