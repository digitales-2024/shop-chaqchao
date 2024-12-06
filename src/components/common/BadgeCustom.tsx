interface BadgeCustomProps {
  children: React.ReactNode;
}
export const BadgeCustom = ({ children }: BadgeCustomProps) => {
  return (
    <span className="relative inline-flex gap-2 bg-rose-50 p-2 font-medium text-rose-500 dark:bg-rose-950">
      {children}
      <span className="absolute inset-x-[-0.1875rem] -top-px block transform-gpu text-rose-200 dark:text-rose-900">
        <svg
          aria-hidden="true"
          height="1"
          stroke="currentColor"
          strokeDasharray="3.3 1"
          width="100%"
        >
          <line x1="0" x2="100%" y1="0.5" y2="0.5" />
        </svg>
      </span>
      <span className="absolute inset-x-[-0.1875rem] -bottom-px block transform-gpu text-rose-200 dark:text-rose-900">
        <svg
          aria-hidden="true"
          height="1"
          stroke="currentColor"
          strokeDasharray="3.3 1"
          width="100%"
        >
          <line x1="0" x2="100%" y1="0.5" y2="0.5" />
        </svg>
      </span>
      <span className="absolute inset-y-[-0.1875rem] -left-px block transform-gpu text-rose-200 dark:text-rose-900">
        <svg
          aria-hidden="true"
          height="100%"
          stroke="currentColor"
          strokeDasharray="3.3 1"
          width="1"
        >
          <line x1="0.5" x2="0.5" y1="0" y2="100%" />
        </svg>
      </span>
      <span className="absolute inset-y-[-0.1875rem] -right-px block transform-gpu text-rose-200 dark:text-rose-900">
        <svg
          aria-hidden="true"
          height="100%"
          stroke="currentColor"
          strokeDasharray="3.3 1"
          width="1"
        >
          <line x1="0.5" x2="0.5" y1="0" y2="100%" />
        </svg>
      </span>
    </span>
  );
};
