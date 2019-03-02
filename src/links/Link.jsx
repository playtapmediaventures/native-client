import React from 'react';

const Link = ({ pid, href, offer_id: offerId, img, head, loc, position, sub }) => {
  const handleClick = () => {
    navigate();
  };

  const handleKeyPress = ({ keyCode, which }) => {
    const key = keyCode || which;
    if (key === 13 || key === 32) {
      navigate();
    }
  };

  const navigate = () => {
    window.location.href = `${href}?pid=${pid}`;
  };

  return (
    <div
      className="msclvrLinkItem"
      key={offerId}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="link"
      style={{
        cursor: 'pointer',
        margin: '10px',
        width: '200px'
      }}
      tabIndex={position}
    >
      <img
        alt={head}
        src={img}
        style={{
          borderRadius: '7px'
        }}
      />
      <div style={{ marginLeft: '10px' }}>
        <p
          style={{
            fontSize: '16px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 'bold',
            fontFamily: 'Verdana, Geneva, sans-serif',
            margin: '0px',
            color: '#4C2E47'
          }}
        >
          {head}
        </p>
      </div>
      <div
        style={{
          marginLeft: '10px',
          marginRight: '10px',
          marginBottom: '10px',
          marginTop: '2px'
        }}
      >
        <p
          style={{
            fontSize: '12px',
            fontFamily: 'Verdana, Geneva, sans-serif',
            margin: '0px',
            fontWeight: 'normal',
            color: '#4C2E47'
          }}
        >
          {loc}
        </p>
        <p
          style={{
            fontSize: '12px',
            fontFamily: 'Verdana, Geneva, sans-serif',
            margin: '0px',
            fontWeight: 'normal',
            color: '#4C2E47'
          }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
};

export default Link;
