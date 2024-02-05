import styled from "styled-components";
import { Button } from "./interactables.styles";
import { Spacer } from "./basics.styles";
import { Row } from "./flex.styles";
import { Small } from "./typography.styles";

const _ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const _Modal = styled.div`
  background-color: #1a1c1d;
  color: #afafaf;
  border: 1px solid #232526;
  padding: 10px;
  border-radius: 5px;
  width: 400px;
  min-height: 500px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const _IconContainer = styled.div`
  position: absolute;
  top: -80px;
  right: -70px;
  opacity: 0.03;
`;
const _Relative = styled.div`
  position: relative;
  z-index: 0;
`;
const _ModalContent = styled.div`
  z-index: 1;
`;

export const Modal = ({ children, open, onClose, notice, icon }) => {
  return open ? (
    <_ModalBackground onClick={onClose}>
      <_Modal onClick={(e) => e.stopPropagation()}>
        <_Relative>
          <_IconContainer>{icon}</_IconContainer>
        </_Relative>
        <_ModalContent>
          <Row gap={10}>
            <Button onClick={onClose}>Close</Button>
          </Row>
          <Spacer units={2} />
          {children}
        </_ModalContent>
      </_Modal>
    </_ModalBackground>
  ) : null;
};
