import React, { FC } from 'react';

interface FirstPageProps {
  title?: string;
}

const FirstPage: FC<FirstPageProps> = ({ title }) => (
  <p>first page works! {title}</p>
);

FirstPage.defaultProps = {
  title: 'Default Title',
};

export { FirstPage };
