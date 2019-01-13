import React from 'react';

const Link = ({ pid, href, offer_id: offerId, img, head, loc, sub }) => (
  <a href={`${href}?pid=${pid}`} style={{ textDecoration: 'none' }}>
    <div
      className="msclvrLinkItem"
      key={offerId}
      style={{
        width: '200px',
        margin: '10px'
      }}
    >
      <img
        style={{
          borderRadius: '7px'
        }}
        src={img}
        alt={head}
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
  </a>
);

export default Link;
