import { FC } from "react";

export const CheckedIcon: FC<SvgIconProps> = ({
  height = "25px",
  width = "25px",
  className,
}: SvgIconProps) => (
  <svg
    height={height}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={className}
  >
    <g>
      <path fill="none" d="M0 0H24V24H0z"></path>
      <path
        fill="#3ba800"
        fillRule="evenodd"
        d="M9.559 3.697a3 3 0 014.882 0l.19.267a1 1 0 00.925.413l.849-.095a3 3 0 013.313 3.313l-.095.85a1 1 0 00.413.923l.267.19a3 3 0 010 4.883l-.267.19a1 1 0 00-.413.925l.095.849a3 3 0 01-3.313 3.313l-.85-.095a1 1 0 00-.923.413l-.19.267a3 3 0 01-4.883 0l-.19-.267a1 1 0 00-.925-.413l-.849.095a3 3 0 01-3.313-3.313l.095-.85a1 1 0 00-.413-.923l-.267-.19a3 3 0 010-4.883l.267-.19a1 1 0 00.413-.925l-.095-.849a3 3 0 013.313-3.313l.85.095a1 1 0 00.923-.413l.19-.267zm6.148 5.596a1 1 0 010 1.414l-3.819 3.819c-.49.49-1.286.49-1.776 0l-1.82-1.819a1 1 0 111.415-1.414L11 12.586l3.293-3.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
    </g>
  </svg>
);
