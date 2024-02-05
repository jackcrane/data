import styled from "styled-components";

export const Spinner = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid #767676;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
