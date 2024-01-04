import React from "react";
export const CloseLockIcon: React.FC<CloseIconProps> = ({ className }: CloseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16px"
      height="16px"
      className={`${className}`}
    >
      {" "}
      <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 L 4 8 L 4 22 L 20 22 L 20 8 L 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z" />
    </svg>
  );
};
