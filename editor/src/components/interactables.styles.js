import styled from "styled-components";

export const Button = styled.button`
  background-color: #232526;
  color: #afafaf;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #2c2f30;
  }
`;

export const Input = styled.input`
  background-color: #232526;
  color: #afafaf;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none;
    background-color: #2c2f30;
  }
`;
