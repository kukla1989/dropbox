import React from 'react';

interface Props {
  // eslint-disable-next-line react/require-default-props
  cssClass?: string;
  openModal: (e: React.MouseEvent) => void;
}

const ThreeDodsSVG: React.FC<Props> = ({ cssClass, openModal }) => (
  <svg
    onClick={openModal}
    viewBox="0 0 24 24"
    fill="none"
    className={cssClass}
    width="24"
    height="24"
    role="presentation"
    focusable="false"
  >
    <path
      d="M12 10a1.857 1.857 0 0 0-2 2 1.857 1.857 0 0 0 2 2 1.857 1.857 0 0 0 2-2 1.857 1.857 0 0 0-2-2Zm6 0a1.857 1.857 0 0 0-2 2 1.858 1.858 0 0 0 2 2 1.857 1.857 0 0 0 2-2 1.857 1.857 0 0 0-2-2ZM6 10a1.857 1.857 0 0 0-2 2 1.857 1.857 0 0 0 2 2 1.856 1.856 0 0 0 2-2 1.857 1.857 0 0 0-2-2Z"
      fill="currentColor"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default ThreeDodsSVG;
