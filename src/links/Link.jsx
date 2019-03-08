import React from 'react';
import track from 'react-tracking';
import { buildEvent } from '../events';

const Link = ({ pid, href, offer_id: offerId, img, head, loc, position, sub, tracking }) => {
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
    tracking.trackEvent({ action: 'offerClick' });
    // window.location.href = `${href}?pid=${pid}`;
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

export default track(
  ({ position, offer_id: id, pid }) => ({
    action: 'offerLoaded',
    offer: {
      id,
      position
    },
    ...buildEvent(window, pid)
  }),
  { dispatchOnMount: true }
)(Link);
