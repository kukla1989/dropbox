import React from 'react';

interface Props {
  // eslint-disable-next-line react/require-default-props
  cssClass?: string;
}

const ShareSVG: React.FC<Props> = ({ cssClass }) => (
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
      d="M11 15.5V6.744l-3.484 3.3-1.032-1.088 5.266-4.989 5.266 4.989-1.032 1.088-3.484-3.3V15.5H11Z"
      fill="currentColor"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="M15 13v-1.5h3.5V20H5v-8.5h3.5V13h-2v5.5H17V13h-2Z"
      fill="currentColor"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default ShareSVG;
