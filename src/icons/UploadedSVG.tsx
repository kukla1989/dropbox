import React from 'react';

interface Props {
  cssClass: string;
}

const UploadedSVG: React.FC<Props> = ({ cssClass }) => (
  <svg
    className={cssClass}
    viewBox="0 0 24 24"
    fill="none"
    width="24"
    height="24"
    role="status"
    focusable="false"
    aria-label="Upload Complete"
    color="#2D7A02"
  >
    <path
      d="M12 4c-5.159 0-8 2.841-8 8s2.841 8 8 8 8-2.841 8-8-2.841-8-8-8Zm0 14.5c-4.374 0-6.5-2.126-6.5-6.5 0-4.374 2.126-6.5 6.5-6.5 4.374 0 6.5 2.126 6.5 6.5 0 4.374-2.126 6.5-6.5 6.5Z"
      fill="currentColor"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="m11 13.44-1.97-1.97-1.06 1.06L11 15.56l5.03-5.03-1.06-1.06L11 13.44Z"
      fill="currentColor"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default UploadedSVG;
