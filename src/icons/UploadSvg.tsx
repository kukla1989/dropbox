import React from 'react';

interface Props {
  cssClass: string;
}

const UploadSvg: React.FC<Props> = ({ cssClass }) => (
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
      d="M11 8.244V16h1.5V8.244l3.485 3.3 1.03-1.088-5.265-4.989-5.266 4.989 1.032 1.088L11 8.244Zm8 9.256H4.5V19H19v-1.5Z"
      fill="currentColor"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default UploadSvg;
