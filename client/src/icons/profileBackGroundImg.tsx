export const ProfileBackGroundImg: React.FC<ProfileAvatarProps> = ({
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-supported-dps="2048x512"
      viewBox="0 0 551 119"
      className={className}
      width="100%"
      height="100%"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    >
      <path fill="none" d="M0 0h552v138H0z"></path>
      <path fill="#d9e5e7" d="M0 0h552v138H0z"></path>
      <path fill="#bfd3d6" d="M380 0h172v138H380z"></path>
      <path
        fill="#a0b4b7"
        d="M333.22 0H0v138h333.22a207.93 207.93 0 000-138z"
      ></path>
    </svg>
  );
};