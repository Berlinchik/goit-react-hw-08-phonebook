import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledButton = styled(NavLink)`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.6;
  color: #fff;
  text-decoration: none;
  border: 1px solid #fff;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-right: 20px;
  }

  &:hover,
  &:focus {
    color: palevioletred;
  }
`;

export const StyledLink = styled(NavLink)`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.6;
  color: #fff;
  text-decoration: none;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus {
    color: palevioletred;
  }
`;
