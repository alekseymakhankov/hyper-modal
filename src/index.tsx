import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DefaultCloseIcon, DefaultModalContent } from './components';
import {
  buildContentStyle,
  classnames,
  createElement,
  defaultProps,
  defferCall,
} from './helpers';
import { IModalProps, IModalState } from './types';
import './style.scss';

const ESC_KEY = 27;

class Modal extends React.Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);
    this.state = {
      isInnerOpen: false,
    };
  }

  static defaultProps = defaultProps;

  static getDerivedStateFromProps(props: IModalProps, state: IModalState) {
    if (props.isOpen !== state.isInnerOpen && !props.unmountOnClose) {
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
  };

  closeModal = () => this.setState({ isInnerOpen: false });

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
      defferCall(
        () => {
          this.closeModal();
          requestClose();
          this.handleAfterClose();
        },
        closeDebounceTimeout,
      );
      return;
    }
    requestClose();
    this.handleAfterClose();
  }

  renderDimmer = () => {
    const { classes, closeOnDimmerClick } = this.props;
    return (
      <div
        className={
          classnames('hyper-dimmer-wrapper', classes && classes.contentClassName)
        }
        onClick={closeOnDimmerClick ? this.handleClose : undefined}
      />
    );
  }

  renderCloseIcon = () => {
    const { renderCloseIcon, closeOnCloseIconClick, closeIconPosition } = this.props;
    const iconClassNames = closeIconPosition
      ? classnames(
          'hyper-close-icon-wrapper',
          closeIconPosition.horizontal,
          closeIconPosition.vertical,
        )
      : 'hyper-close-icon-wrapper';
    return (
      <div
        className={iconClassNames}
        onClick={closeOnCloseIconClick ? this.handleClose : undefined}
        tabIndex={0}
      >
        {renderCloseIcon ? renderCloseIcon() : (<DefaultCloseIcon />)}
      </div>
    );
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
    return this.renderModal();
  }
}

export default Modal;
