import styled from "styled-components";
import { Button } from "./interactables.styles";
import { useEffect, useState } from "react";
import { Row } from "./flex.styles";
import { IconArrowDown } from "@tabler/icons-react";

const _DropdownContainer = styled.div`
  position: relative;
`;
const _DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  height: 100%;
  z-index: 1;
  margin-top: 5px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #1a1c1d;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #232526;
`;

export const Dropdown = ({ children, label, icon }) => {
  const [open, setOpen] = useState(false);

  // After 5 seconds, close the dropdown
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <_DropdownContainer>
      <Button onClick={() => setOpen(!open)}>
        <Row gap={5}>
          {icon}
          {label}
          <IconArrowDown size={12} />
        </Row>
      </Button>
      {open && (
        <_DropdownList>
          <Container>{children}</Container>
        </_DropdownList>
      )}
    </_DropdownContainer>
  );
};
