# React hyper modal
#### Fully customizable and accessible modal react component

Welcome to the react hyper modal repository 😄
I want to introduce you to an awesome react component for displaying modal windows

![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)
[![Coverage Status](https://coveralls.io/repos/github/alekseymakhankov/hyper-modal/badge.svg?branch=master)](https://coveralls.io/github/alekseymakhankov/hyper-modal?branch=master&service=github)
[![Build Status](https://travis-ci.org/alekseymakhankov/hyper-modal.svg?branch=master)](https://travis-ci.org/alekseymakhankov/hyper-modal)
![min](https://img.shields.io/bundlephobia/min/react-hyper-modal.svg)
![minzip](https://img.shields.io/bundlephobia/minzip/react-hyper-modal.svg)

## [Live demo](https://alekseymakhankov.github.io/packages/?package=hyper-modal)


## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Properties](#properties)
  - [Default properties](#default-properties)
  - [Types](#types)
- [Contributing](#contributing)
- [License](#license)

## <a id="installation"></a>Installation

###### You can use [![npm](https://api.iconify.design/logos:npm.svg?height=14)](https://www.npmjs.com/get-npm) or [![yarn](https://api.iconify.design/logos:yarn.svg?height=14)](https://yarnpkg.com/lang/en/docs/install) package managers

```console
$ npm i --save react-hyper-modal
```
__or__
```console
$ yarn add react-hyper-modal
```

## <a id="usage"></a>Usage

#### Controlled modal component

```javascript
import React from 'react';
import HyperModal from 'react-hyper-modal';

...

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  ...

  openModal => this.setState({ isModalOpen: true });
  closeModal => this.setState({ isModalOpen: false });

  ...

  render() {
    const { isModalOpen } = this.state;
    return (
      <HyperModal
        isOpen={isModalOpen}
        requestClose={this.closeModal}
      >
        Your awesome modal content
      </HyperModal>
    );
  }
}
```

#### Uncontrolled modal component

```javascript
import React from 'react';
import HyperModal from 'react-hyper-modal';

...

const MyComponent = () => {
  return (
    <HyperModal
      renderOpenButton={(requestOpen) => {
        return (
          <button onClick={requestOpen}>Open uncontrolled modal</button>
        );
      }
    />
  );
}
```

### That's it! 🍰✨

## <a id="properties"></a>Properties
You can find props types and default props below the table.

##### **\*** - required for controlled modal component

Props | Description
------------ | -------------
afterClose | callback that is called after closing
ariaEnabled | enable [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) properties
ariaProps | custom [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) properties
beforeClose | callback that is called before closing
childrenMode | describing if the modal content should be rendered as [React Children](https://reactjs.org/docs/react-api.html#reactchildren)
classes | overriding default modal class names
closeDebounceTimeout | time to close modal
closeIconPosition | position of close button
closeOnCloseIconClick | close the modal by pressing close button
closeOnDimmerClick | close the modal by pressing on dimmer
closeOnEscClick | close the modal by pressing ESC
dimmerEnabled | describing if the dimmer should be shown or not
isFullscreen | describing if the modal should be shown in full screen or not
isOpen **\*** | describing if the modal should be shown or not
modalContentRef | [reference](https://reactjs.org/docs/refs-and-the-dom.html) to the modal content `div`
modalWrapperRef | [reference](https://reactjs.org/docs/refs-and-the-dom.html) to the modal wrapper `div`
portalMode | describing if the modal should be rendered in [React Portal](https://reactjs.org/docs/portals.html) or not
portalNode | HTML node to create [React Portal](https://reactjs.org/docs/portals.html)
position | setting the modal position
renderCloseIcon | callback for rendering custom close button
renderContent | callback for rendering custom modal content
renderOpenButton | callback or boolean describing if the modal should be uncontrolled component
requestClose **\*** | callback to close the modal
unmountOnClose | describing if the modal should be unmounted when close

### <a id="default-properties"></a>Default properties
```javascript
{
  ariaEnabled: true,
  ariaProps: {
    'aria-describedby': 'hyper-modal-description',
    'aria-labelledby': 'hyper-modal-title',
    role: 'dialog',
  },
  childrenMode: true,
  closeDebounceTimeout: 0,
  closeIconPosition: {
    vertical: 'top',
    horizontal: 'right',
  },
  closeOnCloseIconClick: true,
  closeOnDimmerClick: true,
  closeOnEscClick: true,
  dimmerEnabled: true,
  isFullscreen: false,
  portalMode: false,
  position: {
    alignItems: 'center',
    justifyContent: 'center',
  }
}
```

### <a id="types"></a>Types
```typescript
type TModalPosition = 'flex-start' | 'center' | 'flex-end';
type THorizontalPosition = 'left' | 'center' | 'right';
type TVerticalPosition = 'top' | 'middle' | 'bottom';

interface IClassNamesProps {
  closeIconClassName?: string;
  contentClassName?: string;
  dimmerClassName?: string;
  portalWrapperClassName?: string;
  wrapperClassName?: string;
}

interface IARIAProps {
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  role?: string;
}

interface IPositionProps {
  alignItems?: TModalPosition;
  justifyContent?: TModalPosition;
}

interface ICloseIconPosition {
  horizontal?: THorizontalPosition;
  vertical?: TVerticalPosition;
}

interface IModalProps {
  afterClose?: () => void;
  ariaEnabled?: boolean;
  ariaProps?: IARIAProps;
  beforeClose?: () => void;
  childrenMode?: boolean;
  classes?: IClassNamesProps;
  closeDebounceTimeout?: number;
  closeIconPosition?: ICloseIconPosition;
  closeOnCloseIconClick?: boolean;
  closeOnDimmerClick?: boolean;
  closeOnEscClick?: boolean;
  dimmerEnabled?: boolean;
  isFullscreen?: boolean;
  isOpen: boolean;
  modalContentRef?: React.RefObject<HTMLDivElement>;
  modalWrapperRef?: React.RefObject<HTMLDivElement>;
  portalMode?: boolean;
  portalNode?: HTMLElement;
  position?: IPositionProps;
  renderCloseIcon?: () => JSX.Element | null | string;
  renderContent?: () => JSX.Element | JSX.Element[] | null | string;
  renderOpenButton?: boolean | ((requestOpen: () => void) => JSX.Element | string);
  requestClose: () => void;
  unmountOnClose?: boolean;
}
```

## <a id="contributing"></a>Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## <a id="license"></a>License
[MIT](https://choosealicense.com/licenses/mit/)
