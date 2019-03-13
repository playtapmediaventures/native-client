import React, { Component } from 'react';
import handleViewport from 'react-in-viewport';

const ONE_SECOND_IN_MILLISECONDS = 1000;

export default function calculateViewability(WrappedComponent) {
  const getDisplayName = () => WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // eslint-disable-next-line react/prefer-stateless-function
  class ActiveViewComponent extends Component {
    static displayName = `ActiveView${getDisplayName()}`;

    constructor(props) {
      super(props);
      this.impressionTimer = null;
      this.setImpressionTimer = this.setImpressionTimer.bind(this);
      this.clearImpressionTimer = this.clearImpressionTimer.bind(this);
      this.state = {
        adViewable: false
      };
    }

    componentWillUnmount() {
      this.clearImpressionTimer();
    }

    setImpressionTimer() {
      const { adViewable } = this.state;
      if (!this.impressionTimer && !adViewable) {
        this.impressionTimer = setTimeout(
          () => this.setState({ adViewable: true }),
          ONE_SECOND_IN_MILLISECONDS
        );
      }
    }

    clearImpressionTimer() {
      clearTimeout(this.impressionTimer);
      this.impressionTimer = null;
    }

    manageImpressionTimer() {
      const { inViewport } = this.props;
      if (inViewport) {
        this.setImpressionTimer();
      } else {
        this.clearImpressionTimer();
      }
    }

    render() {
      this.manageImpressionTimer();

      const { inViewport, enterCount, leaveCount, ...rest } = this.props;
      const { adViewable } = this.state;

      return <WrappedComponent adViewable={adViewable} {...rest} />;
    }
  }

  const ViewportActiveViewComponent = handleViewport(ActiveViewComponent, { threshold: 0.5 });
  return ViewportActiveViewComponent;
}
