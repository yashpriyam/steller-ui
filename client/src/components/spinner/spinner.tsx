import React, { FC } from 'react';
import './spinner.scss';


const Spinner: FC<SpinnerProps> = ({ colors=["#D5B9B2", "#A26769", "#6D2E46"], width="300px", height="300px", theme='dark' }) => {
  
  return (
    <div className={'spinner'} style={{ width, height }}>
      {colors.map((color, index) => (
        <div key={index} className="dot" style={{ backgroundColor: color }}></div>
      ))}
    </div>
  );
};

export default Spinner;
