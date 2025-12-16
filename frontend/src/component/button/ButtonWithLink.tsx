import { Link, To } from 'react-router-dom';
import Button from './Button';
import styled from 'styled-components';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';

type Props = {
  to: To;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: ReactNode;
  backgroundColor: string;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
};

const ButtonWithLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
`;

export default function ButtonWithLinkComponent({
  to,
  onClick,
  children,
  backgroundColor,
  target,
  className,
}: Props) {
  return (
    <ButtonWithLink
      to={to}
      onClick={onClick}
      target={target}
      className={className}
    >
      <Button backgroundColor={backgroundColor} width="100%">
        {children}
      </Button>
    </ButtonWithLink>
  );
}
