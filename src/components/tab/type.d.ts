import { ReactElementLike } from "prop-types";
import { CSSProperties } from "styled-components";

export interface TabProps {
  label?: string | ReactNode;
  value: string;
  style?: CSSProperties;
  onClick?: (e: any) => void;
  disabled?: boolean;
  className?: string;
  selectedClass?: string;
  isSelected?: boolean;
  index?: number;
}
