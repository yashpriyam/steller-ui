import "./header.scss";
interface HeaderProps {
  children: React.ReactNode;
  headerType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "lg" | "md" | "sm";
  className?: string;
}
const textElementClassType = {
    h1 : "h1-header-style",
    h2 : "h2-header-style",
    h3 : "h3-header-style",
    h4 : "h4-header-style",
    h5 : "h5-header-style",
    h6 : "h6-header-style",
    lg : "lg-para-style",
    md : "md-para-style",
    sm : "sm-para-style",
}
export const Text: React.FC<HeaderProps> = ({ children, headerType, className }) => {
  return <div className={`${textElementClassType[headerType]} ${className}`}>{children}</div>;
};