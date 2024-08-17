import React from 'react';
import styled from 'styled-components'; // You can use CSS Modules or inline styles too

const UpdatingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; // Ensure it's on top of other content
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: 1.5rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Updating
    = ({ message = 'Processing...' }) => {
        return (
            <UpdatingContainer>
                <div>
                    <LoadingSpinner />
                    <LoadingMessage>{message}</LoadingMessage>
                </div>
            </UpdatingContainer>
        );
    };

export default Updating;