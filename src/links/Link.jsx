import React, { useState } from 'react';
import track from 'react-tracking';
import { createEvent } from '../events';
import withViewability from '../util/calculate-viewability';
import { processEvents, publishEvent } from '../util/analytics';

const baseTextStyle = {
  fontSize: '12px',
  fontFamily: 'Verdana, Geneva, sans-serif',
  margin: '0px',
  fontWeight: 'normal',
  color: '#4C2E47'
};

const checkViewability = ({ isViewable, tracking }, [impressionFired, setImpressionFired]) => {
  if (isViewable && !impressionFired) {
    tracking.trackEvent(createEvent('slot_viewable'));
    setImpressionFired(true);
  }
};

const navigate = ({ href, pid, tracking }) => {
  tracking.trackEvent(createEvent('slot_clicked'));
  processEvents(pid);
  setTimeout(_ => {
    window.location.href = `${href}?pid=${pid}`;
  }, 500);
};

const Link = props => {
  const handleClick = () => navigate(props);

  const handleKeyPress = ({ keyCode, which }) => {
    const key = keyCode || which;
    if (key === 13 || key === 32) {
      navigate(props);
    }
  };

  checkViewability(props, useState(false));

  const { img, head, innerRef, loc, offer_id: offerId, sub } = props;
  return (
    <div
      className="msclvrLinkItem"
      key={offerId}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      ref={innerRef}
      role="link"
      style={{
        cursor: 'pointer',
        margin: '10px',
        width: '200px'
      }}
      tabIndex={0}
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
            ...baseTextStyle,
            fontSize: '16px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
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
        <p style={baseTextStyle}>{loc}</p>
        <p style={baseTextStyle}>{sub}</p>
      </div>
    </div>
  );
};

export default track(
  ({ offer_id: id, layout, position }) =>
    createEvent('slot_loaded', {
      slot: {
        id,
        layout,
        position
      }
    }),
  {
    dispatchOnMount: true,
    dispatch: publishEvent
  }
)(withViewability(Link));
