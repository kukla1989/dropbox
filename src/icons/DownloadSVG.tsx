import React from 'react';

interface Props {
  // eslint-disable-next-line react/require-default-props
  cssClass?: string;
}

const DownloadSVG: React.FC<Props> = ({ cssClass }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={cssClass}
    width="24"
    height="24"
    role="presentation"
    focusable="false"
  >
    <path
      d="m17.015 11.044-1.03-1.088-3.485 3.3V5.5H11v7.757L7.516 9.956l-1.032 1.088 5.266 4.989 5.265-4.989ZM19 17.5H4.5V19H19v-1.5Z"
      fill="currentColor"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default DownloadSVG;
