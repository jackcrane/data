import styled from "styled-components";

export const Topnav = styled.div`
  background-color: #1a1c1d;
  overflow: hidden;
  padding: 10px;
`;

export const NodeContainer = styled.div`
  border-top: 1px solid #232526;
  border-right: 1px solid #232526;
  flex: 1;
  height: 100%;
`;

export const Rightbar = styled.div`
  background-color: #1a1c1d;
  width: 200px;
  color: #afafaf;
  height: 100%;
`;

export const Section = styled.div`
  border-bottom: 2px solid #232526;
  padding: 10px;
`;

export const Mono = styled.span`
  font-family: monospace;
`;

export const Box = styled.div`
  background-color: #232526;
  padding: 10px;
  border-radius: 5px;
`;

export const Spacer = styled.div`
  height: ${(props) => props.units * 8 || 16}px;
`;

const _Tooltip = styled.div`
  position: relative;
  display: inline-block;
  &:hover span {
    visibility: visible;
    opacity: 0.9;
  }
`;

const _TooltipText = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: #232526;
  color: #afafaf;
  border: 1px solid #afafaf;
  text-align: center;
  padding: 5px 3px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
`;

export const Tooltip = ({ children, text }) => {
  return (
    <_Tooltip>
      {children}
      <_TooltipText>{text}</_TooltipText>
    </_Tooltip>
  );
};
