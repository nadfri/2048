export default function ExitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={props.className || ''}
      aria-hidden="true"
      width="30"
      height="30"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" fill="none" width="20" height="20" />

      <g>
        <path
          fill="currentColor"
          d="M3.4 2L2 3.4l2.8 2.8L3 8h5V3L6.2 4.8 3.4 2zm11.8 4.2L18 3.4 16.6 2l-2.8 2.8L12 3v5h5l-1.8-1.8zM4.8 13.8L2 16.6 3.4 18l2.8-2.8L8 17v-5H3l1.8 1.8zM17 12h-5v5l1.8-1.8 2.8 2.8 1.4-1.4-2.8-2.8L17 12z"
        />
      </g>
    </svg>
  );
}
