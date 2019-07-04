import React, { Component } from 'react';
import track from 'react-tracking';
import { createEvent } from '../events';
import withViewability from '../util/calculate-viewability';
import { processEvents, publishEvent } from '../util/analytics';

class Link extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this._checkViewability = this._checkViewability.bind(this);
    this._navigate = this._navigate.bind(this);
    this.impressionFired = false;
  }

  _checkViewability() {
    const { isViewable, tracking } = this.props;
    if (isViewable && !this.impressionFired) {
      tracking.trackEvent(createEvent('slot_viewable'));
      this.impressionFired = true;
    }
  }

  _navigate() {
    const { href, pid, tracking } = this.props;
    tracking.trackEvent(createEvent('slot_clicked'));
    processEvents(pid);
    setTimeout(_ => {
      window.location.href = `${href}?pid=${pid}`;
    }, 500);
  }

  handleClick() {
    this._navigate();
  }

  handleKeyPress({ keyCode, which }) {
    const key = keyCode || which;
    if (key === 13 || key === 32) {
      this._navigate();
    }
  }

  render() {
    this._checkViewability();

    const { img, head, innerRef, loc, offer_id: offerId, position, sub } = this.props;

    return (
      <div
        className="msclvrLinkItem"
        key={offerId}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        ref={innerRef}
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
  }
}

export default track(
  ({ offer_id: id, layout, pid, position }) =>
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
