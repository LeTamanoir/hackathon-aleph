export const LoadingIcon = ({ className }: { className?: string }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const BinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.31682 2.16666C5.31682 1.8445 5.57799 1.58333 5.90016 1.58333H10.1002C10.4223 1.58333 10.6835 1.8445 10.6835 2.16666C10.6835 2.48882 10.4223 2.74999 10.1002 2.74999H5.90016C5.57799 2.74999 5.31682 2.48882 5.31682 2.16666ZM1.5835 4.26666C1.5835 3.94449 1.84467 3.68333 2.16683 3.68333H13.8335C14.1557 3.68333 14.4168 3.94449 14.4168 4.26666C14.4168 4.58882 14.1557 4.84999 13.8335 4.84999H13.0168V11.7333C13.0168 13.2222 11.8223 14.4167 10.3335 14.4167H5.66682C4.16757 14.4167 2.98349 13.2116 2.98349 11.675V4.84999H2.16683C1.84467 4.84999 1.5835 4.58882 1.5835 4.26666ZM4.15016 4.84999V11.675C4.15016 12.5884 4.83275 13.25 5.66682 13.25H10.3335C11.178 13.25 11.8502 12.5778 11.8502 11.7333V4.84999H4.15016ZM6.42516 6.36666C6.74733 6.36666 7.0085 6.62783 7.0085 6.94999V11.2083C7.0085 11.5305 6.74733 11.7917 6.42516 11.7917C6.103 11.7917 5.84183 11.5305 5.84183 11.2083V6.94999C5.84183 6.62783 6.103 6.36666 6.42516 6.36666ZM9.57516 6.36666C9.89734 6.36666 10.1585 6.62783 10.1585 6.94999V11.2083C10.1585 11.5305 9.89734 11.7917 9.57516 11.7917C9.25299 11.7917 8.99183 11.5305 8.99183 11.2083V6.94999C8.99183 6.62783 9.25299 6.36666 9.57516 6.36666Z"
      fill="currentColor"
    />
  </svg>
);
