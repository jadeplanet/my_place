import React, { useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { MdStar, MdAdd } from 'react-icons/md';
import { PlaceDispatchContext, PlaceNextIdContext } from '../PlaceContext';

const PlaceInsertBlock = styled.form`
  display: flex;
  background: #d0ebff;

  input {
    background: none;
    outline: none;
    border: none;
    padding-left: 1.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: #1864ab;
    flex: 1;

    &::placeholder {
      color: #4dabf7;
      font-size: 0.9rem;
    }

    &:focus::placeholder {
      visibility: hidden;
    }
  }

  button {
    outline: none;
    border: none;
    background: #51cf66;
    color: #fff;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: #37b24d;
    }
  }
`;

const Rating = styled.div`
  width: 200px;
  font-size: 1.125rem;
  color: #74c0fc;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 10px;
  background-color: #a5d8ff;
  padding: 10px;

  .active {
    color: yellow;
  }

  .point {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 0.8rem;
    color: #228be6;
  }
`;

const PlaceAdd = () => {
  const dispatch = useContext(PlaceDispatchContext);
  const nextId = useContext(PlaceNextIdContext);

  const [value, setValue] = useState('');
  const [starPoint, setStarPoint] = useState(0);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      if (value === '') {
        window.alert('장소를 입력해주세요');
        e.preventDefault();
      } else if (starPoint === 0) {
        window.alert('별점을 입력해주세요');
        e.preventDefault();
      } else {
        e.preventDefault();
        dispatch({
          type: 'CREATE',
          place: {
            id: nextId.current,
            name: value,
            star: starPoint,
          },
        });
        setValue('');
        const stars = e.currentTarget.childNodes[1].childNodes;
        for (let i = 0; i < 5; i++) {
          stars[i].classList.remove('active');
        }
        e.currentTarget.childNodes[1].lastChild.innerHTML = '별점을 입력하세요';
        setStarPoint(0);
        nextId.current += 1;
      }
    },
    [value, dispatch, nextId, starPoint]
  );

  const onMarking = (e) => {
    let element = e.currentTarget;
    const parent = element.parentNode;
    const children = parent.childNodes;
    const lastChild = parent.lastChild;

    let index = 0;
    for (let i = 0; i < children.length - 1; i++) {
      if (element === children[i]) {
        index = i;
      }
    }

    for (let i = 0; i <= index; i++) {
      children[i].classList.add('active');
    }

    for (let i = index + 1; i <= children.length - 1; i++) {
      children[i].classList.remove('active');
    }

    let score = index + 1;
    setStarPoint(score);

    if (score === 1) {
      lastChild.innerHTML = `${score}점 : 최악의 식당`;
    } else if (score === 2) {
      lastChild.innerHTML = `${score}점 : 음식이 별로`;
    } else if (score === 3) {
      lastChild.innerHTML = `${score}점 : 먹을만한 곳`;
    } else if (score === 4) {
      lastChild.innerHTML = `${score}점 : 맛있는 식당`;
    } else {
      lastChild.innerHTML = `${score}점 : 최고의 맛집`;
    }
  };

  return (
    <PlaceInsertBlock onSubmit={onSubmit}>
      <input
        placeholder="방문했던 장소를 입력하세요"
        value={value}
        onChange={onChange}
      />
      <Rating className="parent">
        <MdStar className="star" onClick={onMarking} />
        <MdStar className="star" onClick={onMarking} />
        <MdStar className="star" onClick={onMarking} />
        <MdStar className="star" onClick={onMarking} />
        <MdStar className="star" onClick={onMarking} />
        <div className="point">별점을 입력하세요</div>
      </Rating>
      <button type="submit">
        <MdAdd />
      </button>
    </PlaceInsertBlock>
  );
};

export default React.memo(PlaceAdd);
