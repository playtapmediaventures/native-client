import React from 'react';

import Link from './Link';

const calculateResizeStyles = (allowedWidth = 1320, length) => {
  const width = 220;
  const maxPossibleCols = Math.floor(allowedWidth / width);
  const possibilities = [1, 2, 3, 6];
  const acceptableCols = possibilities.filter(p => length % p === 0 && p <= maxPossibleCols && p);
  const colsToUse = acceptableCols.pop();
  const realWidth = colsToUse * width;
  const remainder = allowedWidth - realWidth;

  return {
    width: `${realWidth}px`,
    marginLeft: `${remainder / 2}px`
  };
};

const Links = ({ pid, containerWidth, options }) => {
  const { length } = options;
  const resizeStyles = calculateResizeStyles(containerWidth, length);

  return (
    <div
      className="msclvrContainer"
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        float: 'left',
        ...resizeStyles
      }}
    >
      <p
        style={{
          width: '100%',
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'Verdana, Geneva, sans-serif',
          margin: '10px',
          color: '#4C2E47'
        }}
      >
        Music Recommended for You
        <img
          style={{
            float: 'right',
            width: '100px',
            height: '20px'
          }}
          src="/native/img/powered_by_msclvr.png"
          alt="Powered by MSCLVR"
        />
      </p>
      {options.map(option => (
        <Link key={JSON.stringify(option)} pid={pid} {...option} />
      ))}
    </div>
  );
};

export default Links;
