import styled from 'styled-components';

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(78, 89, 131, 0.5);
  backdrop-filter: blur(5px);

  z-index: 999;
`;

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 500px;
  max-width: 100%;
  max-height: calc(100% - 144px);

  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 32px rgba(78, 89, 131, 0.2);
`;
