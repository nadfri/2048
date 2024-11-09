export default function ScreenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={props.className || ''}
      aria-hidden="true"
      fill="currentColor"
      height="30"
      width="30"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <polygon points="126.533,102.4 199.111,102.4 199.111,68.267 68.267,68.267 68.267,199.111 102.4,199.111 102.4,126.538 198.422,222.558 222.556,198.423" />
        </g>
      </g>
      <g>
        <g>
          <polygon points="222.557,313.581 198.422,289.445 102.4,385.467 102.4,312.889 68.267,312.889 68.267,443.733 199.111,443.733 199.111,409.6 126.538,409.6" />
        </g>
      </g>
      <g>
        <g>
          <polygon points="409.6,312.889 409.6,385.467 313.578,289.444 289.444,313.578 385.462,409.6 312.889,409.6 312.889,443.733 443.733,443.733 443.733,312.889" />
        </g>
      </g>
      <g>
        <g>
          <polygon points="312.889,68.267 312.889,102.4 385.467,102.4 289.444,198.423 313.578,222.558 409.6,126.538 409.6,199.111 443.733,199.111 443.733,68.267" />
        </g>
      </g>
    </svg>
  );
}