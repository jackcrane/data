import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;
  gap: ${(props) => props.gap || 0}px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${(props) => props.gap || 0}px;
`;
