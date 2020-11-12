import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { MdDelete, MdRoom, MdStar } from 'react-icons/md';
import { PlaceDispatchContext } from '../PlaceContext';

const Remove = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #dee2e6;
  cursor: pointer;

  &:hover {
    color: #ff6b6b;
  }
`;

const PlaceListItemBlock = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;

  &:nth-child(even) {
    background: #f8f9fa;
  }
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;
const Text = styled.div`
  margin-left: 0.5rem;
`;

const StarBox = styled.div`
  width: 100px;
  height: 20px;
  background: #339af0;
  margin-left: 10px;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Star = styled(MdStar)`
  color: #1c7ed6;

  ${(props) =>
    props.star === 1 &&
    css`
      &:nth-child(1) {
        color: yellow;
      }
    `}
  ${(props) =>
    props.star === 2 &&
    css`
      &:nth-child(1),
      &:nth-child(2) {
        color: yellow;
      }
    `}
  ${(props) =>
    props.star === 3 &&
    css`
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        color: yellow;
      }
    `}
  ${(props) =>
    props.star === 4 &&
    css`
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        color: yellow;
      }
    `}
  ${(props) =>
    props.star === 5 &&
    css`
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5) {
        color: yellow;
      }
    `}
`;

const PlaceBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: #1c7ed6;
`;

const PlaceListItem = ({ id, name, star }) => {
  const dispatch = useContext(PlaceDispatchContext);
  const onRemove = () =>
    dispatch({
      type: 'REMOVE',
      id,
    });

  return (
    <PlaceListItemBlock>
      <PlaceBox>
        <MdRoom />
        <Text>{name}</Text>
        <StarBox>
          <Star star={star} />
          <Star star={star} />
          <Star star={star} />
          <Star star={star} />
          <Star star={star} />
        </StarBox>
      </PlaceBox>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </PlaceListItemBlock>
  );
};

export default React.memo(PlaceListItem);
