interface Props {
  className?: string;
}

export const Board: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="800"
      height="800"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
          <stop stopColor="#1f8675" offset="0%" />
          <stop stopColor="#1f8675" offset="100%" />
        </linearGradient>
      </defs>
      <rect fill="url(#a)" width="256" height="256" rx="25" />
      <rect
        fill="#FFF"
        x="144.64"
        y="33.28"
        width="78.08"
        height="112"
        rx="12"
      />
      <rect
        fill="#FFF"
        x="33.28"
        y="33.28"
        width="78.08"
        height="176"
        rx="12"
      />
    </svg>
  );
};
