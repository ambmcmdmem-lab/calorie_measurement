import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  backgroundColor: string;
  children: ReactNode;
  onClick?: () => void;
  width?: string;
};

const Button = styled.button`
  text-align: center;
  display: block;
  margin: 0 auto;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid #000;
  color: #f0f0f0;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

export default function ButtonComponent({
  backgroundColor,
  children,
  onClick,
  width,
}: Props) {
  return (
    <Button onClick={onClick} style={{ backgroundColor, width }}>
      {children}
    </Button>
  );
}
