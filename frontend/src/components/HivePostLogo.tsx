const HivePostLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={120}
      height={120}
      fill="none"
      className={className}
    >
      <polygon
        points="60,10 75,20 75,40 60,50 45,40 45,20"
        className="fill-[var(--color-accent)]"
      />
      <polygon
        points="90,30 105,40 105,60 90,70 75,60 75,40"
        className="fill-[var(--color-accent-darkTheme)]"
      />
      <polygon
        points="30,30 45,40 45,60 30,70 15,60 15,40"
        className="fill-[var(--color-accent-darkTheme)]"
      />
      <polygon
        points="60,50 75,60 75,80 60,90 45,80 45,60"
        className="fill-[var(--color-accent)]"
      />

      <path
        d="M60 90 L50 105 L60 100 L70 105 Z"
        className="fill-[var(--color-accent-darkTheme)]"
      />

      <text
        x="60"
        y="115"
        textAnchor="middle"
        className="font-sans text-[16px] font-bold"
      >
        HivePost
      </text>
    </svg>
  )
}

export default HivePostLogo
