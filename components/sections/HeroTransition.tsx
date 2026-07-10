export default function HeroTransition() {
  return (
    <div className="hero-transition" aria-hidden="true">
      <svg
        className="hero-transition__svg"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <clipPath id="hero-transition-paper-clip">
            <path d="M0 120C136 82 263 82 393 112C531 144 653 205 802 184C948 164 1047 87 1192 78C1296 72 1370 88 1440 66V300H0V120Z" />
          </clipPath>
        </defs>
        <path
          className="hero-transition__glow"
          d="M0 92C154 54 282 67 410 101C548 137 664 194 805 174C946 155 1047 86 1194 76C1304 68 1382 83 1440 66V300H0V92Z"
        />
        <path
          className="hero-transition__rim"
          d="M0 134C143 101 268 101 400 128C539 157 654 211 802 191C947 171 1043 102 1190 93C1296 87 1376 101 1440 83V300H0V134Z"
        />
        <path
          className="hero-transition__paper"
          d="M0 120C136 82 263 82 393 112C531 144 653 205 802 184C948 164 1047 87 1192 78C1296 72 1370 88 1440 66V300H0V120Z"
        />
        <g clipPath="url(#hero-transition-paper-clip)">
          <path
            className="hero-transition__contour hero-transition__contour--one"
            d="M78 184C204 155 322 158 449 184C576 210 686 225 812 205C943 185 1047 137 1175 132C1267 128 1348 139 1412 124"
          />
          <path
            className="hero-transition__contour hero-transition__contour--two"
            d="M0 232C132 204 252 205 382 224C526 246 656 256 798 235C933 215 1030 178 1152 174C1260 170 1342 184 1440 164"
          />
          <path
            className="hero-transition__contour hero-transition__contour--three"
            d="M253 146C347 140 422 156 512 178C619 204 706 214 815 197C928 180 1009 130 1128 119C1200 113 1261 119 1324 128"
          />
        </g>
        <path
          className="hero-transition__highlight"
          d="M0 120C136 82 263 82 393 112C531 144 653 205 802 184C948 164 1047 87 1192 78C1296 72 1370 88 1440 66"
        />
      </svg>
    </div>
  );
}
