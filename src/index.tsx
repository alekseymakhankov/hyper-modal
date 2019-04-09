import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DefaultButton, DefaultCloseIcon, DefaultModalContent } from './components';
import {
  buildContentStyle,
  classnames,
  createElement,
  defaultProps,
  defferCall,
  disableScroll as disableScrollHelper,
} from './helpers';
import { IModalProps, IModalState } from './types';
import './style.scss';

const ESC_KEY = 27;

class HyperModal extends React.Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);
    this.state = {
      isInnerOpen: false,
    };
  }

  static defaultProps = defaultProps;

  static getDerivedStateFromProps(props: IModalProps, state: IModalState) {
    if (state.isInnerOpen) {
      if (props.disableScroll) {
        disableScrollHelper(state.isInnerOpen);
      }
      return {
        isInnerOpen: true,
      };
    }
    if (props.isOpen !== state.isInnerOpen && !props.unmountOnClose) {
      if (props.disableScroll) {
        disableScrollHelper(props.isOpen);
      }
      return {
        isInnerOpen: props.isOpen,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (
      this.props.closeOnEscClick &&
      event.keyCode === ESC_KEY &&
      this.state.isInnerOpen
    ) {
      event.stopPropagation();
      this.handleClose();
    }
  }

  openModal = () => {
    const { disableScroll } = this.props;
    this.setState({ isInnerOpen: true });
    if (disableScroll) {
      disableScrollHelper(true);
    }
  }

  closeModal = () => {
    const { disableScroll } = this.props;
    this.setState({ isInnerOpen: false });
    if (disableScroll) {
      disableScrollHelper(false);
    }
  }

  handleAfterClose = () => {
    const { afterClose } = this.props;
    if (afterClose) {
      afterClose();
    }
  }

  handleClose = () => {
    const { beforeClose, requestClose, closeDebounceTimeout } = this.props;
    if (beforeClose) {
      beforeClose();
    }
    if (closeDebounceTimeout) {
      return defferCall(
        () => {
          this.closeModal();
          if (requestClose) {
            requestClose();
          }
          this.handleAfterClose();
        },
        closeDebounceTimeout,
      );
    }
    this.closeModal();
    if (requestClose) {
      requestClose();
    }
    this.handleAfterClose();
    return;
  }

  renderDimmer = () => {
    const { classes, closeOnDimmerClick } = this.props;
    return (
      <div
        className={
          classnames('hyper-dimmer-wrapper', classes && classes.dimmerClassName)
        }
        onClick={closeOnDimmerClick ? this.handleClose : undefined}
      />
    );
  }

  renderCloseIcon = () => {
    const { classes, renderCloseIcon, closeOnCloseIconClick, closeIconPosition } = this.props;
    const iconClassNames = closeIconPosition
      ? classnames(
          'hyper-close-icon-wrapper',
          closeIconPosition.horizontal,
          closeIconPosition.vertical,
        )
      : 'hyper-close-icon-wrapper';
    return (
      <div
        className={classnames(iconClassNames, classes && classes.closeIconClassName)}
        onClick={closeOnCloseIconClick ? this.handleClose : undefined}
        tabIndex={0}
      >
        {renderCloseIcon ? renderCloseIcon() : (<DefaultCloseIcon />)}
      </div>
    );
  }

  renderButton = () => {
    const { renderOpenButton } = this.props;
    if (renderOpenButton) {
      if (typeof renderOpenButton === 'boolean') {
        return (
          <DefaultButton onClick={this.openModal} />
        );
      }
      return renderOpenButton(this.openModal);
    }
    return (null);
  }

  renderModalContent = () => {
    const {
      ariaEnabled,
      ariaProps,
      classes,
      isFullscreen,
      modalContentRef,
      renderContent,
      childrenMode,
      children,
    } = this.props;

    const content = childrenMode
      ? children
      : renderContent ? renderContent() : (null);

    return (
      <div
        className={
          classnames({
            'hyper-modal-content-wrapper': true,
            fullscreen: isFullscreen || false,
            [(classes && classes.contentClassName) || '']: true,
          })
        }
        ref={modalContentRef}
      >
        {content
          ? content
          : (<DefaultModalContent
              ariaProps={ariaProps}
              ariaEnabled={ariaEnabled}
              handleClose={this.handleClose}
            />)
        }
        {this.renderCloseIcon()}
      </div>
    );
  }

  renderModalWrapper = () => {
    const {
      classes,
      dimmerEnabled,
      modalWrapperRef,
      position,
    } = this.props;
    const { isInnerOpen } = this.state;
    return (
      <div
        className={
          classnames({
            'hyper-modal-wrapper': true,
            visible: isInnerOpen,
            [(classes && classes.wrapperClassName) || '']: true,
          })
        }
        ref={modalWrapperRef}
        style={buildContentStyle(position)}
      >
        {dimmerEnabled && this.renderDimmer()}
        {this.renderModalContent()}
      </div>
    );
  }

  renderModal = () => {
    const { portalMode, portalNode, classes, unmountOnClose } = this.props;
    const { isInnerOpen } = this.state;

    if (!isInnerOpen && unmountOnClose) {
      return (null);
    }
    if (portalMode && ReactDOM.createPortal) {
      const node = portalNode || createElement(classes && classes.portalWrapperClassName);
      return ReactDOM.createPortal(
        this.renderModalWrapper(),
        node
      );
    }
    return this.renderModalWrapper();
  }

  render() {
    return (
      <React.Fragment>
        {this.renderButton()}
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

export default HyperModal;
