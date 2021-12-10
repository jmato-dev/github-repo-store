import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Skeleton from '../Skeleton';

const Card = styled.div `
  display: flex;
  justify-content: center;
  width: 90px;
  height: 90px;
  padding: 5px;
  border-radius: 4px;
  background-image: url(${(props) => props.image});
  background-size: cover;
`;

const Title = styled.span`
  color: #fff;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const ImageCard = ({ image, title }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = image;
    imageLoader.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <>
      {imageLoaded ? (
        <Card image={image}>
          <Title>{title}</Title>
        </Card>
      ) : (
        <Skeleton width="90px" height="90px" />
      )}
    </>
  );
};

export default ImageCard;
