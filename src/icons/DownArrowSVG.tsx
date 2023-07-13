import React from 'react';

interface Props {
  // eslint-disable-next-line react/require-default-props
  cssClass?: string;
}

const DownArrowSVG: React.FC<Props> = ({ cssClass }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="24"
    height="24"
    role="presentation"
    focusable="false"
    className={cssClass}
  >
    <path
      d="m5.25 9.25 6.5 6.25 6.5-6.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default DownArrowSVG;
