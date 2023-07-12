import React from 'react';

const FileSVG = (): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={30}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" fill="#8AA8CA" />
    <line x1="16" y1="13" x2="8" y2="13" fill="#8AA8CA" />
    <line x1="16" y1="17" x2="8" y2="17" fill="#8AA8CA" />
    <polyline points="10 9 9 9 8 9" fill="#8AA8CA" />
  </svg>
);

export default FileSVG;
