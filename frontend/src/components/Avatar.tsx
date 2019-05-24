import React from 'react';
import './Avatar.css';

export interface Props {
  text: string;
}

const Avatar: React.FC<Props> = (props: Props) => {
  return (
    <div className='avatar'>
      <div>
        {props.text}
      </div>
    </div>
  );
};

export default Avatar;
