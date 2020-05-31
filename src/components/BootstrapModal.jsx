import React from 'react'
import { Modal, Fade, utils } from 'react-bootstrap'
import { Modal as ReactOverlayModal } from 'react-overlays'
import classNames from 'classnames'

class BaseModal extends ReactOverlayModal {
  focus = () => {}
}

class BootstrapModal extends Modal {
  render () {
    const {
      backdrop,
      backdropClassName,
      animation,
      show,
      dialogComponentClass: Dialog,
      className,
      style,
      children, // Just in case this get added to BaseModal propTypes.
      onEntering,
      onExited,
      ...props
    } = this.props

    const [baseModalProps, dialogProps] = splitComponentProps(props, BaseModal)

    const inClassName = show && !animation && 'in'

    return (
      <BaseModal
        {...baseModalProps}
        ref={c => {
          this._modal = c
        }}
        show={show}
        onEntering={utils.createChainedFunction(
          onEntering,
          this.handleEntering
        )}
        onExited={utils.createChainedFunction(onExited, this.handleExited)}
        backdrop={backdrop}
        backdropClassName={classNames(
          utils.bootstrapUtils.prefix(props, 'backdrop'),
          backdropClassName,
          inClassName
        )}
        containerClassName={utils.bootstrapUtils.prefix(props, 'open')}
        transition={animation ? Fade : undefined}
        dialogTransitionTimeout={Modal.TRANSITION_DURATION}
        backdropTransitionTimeout={Modal.BACKDROP_TRANSITION_DURATION}
      >
        <Dialog
          {...dialogProps}
          style={{ ...this.state.style, ...style }}
          className={classNames(className, inClassName)}
          onClick={backdrop === true ? this.handleDialogClick : null}
        >
          {children}
        </Dialog>
      </BaseModal>
    )
  }
}

const splitComponentProps = (props, Component) => {
  const componentPropTypes = Component.propTypes

  const parentProps = {}
  const childProps = {}

  Object.entries(props).forEach(([propName, propValue]) => {
    if (componentPropTypes[propName]) {
      parentProps[propName] = propValue
    } else {
      childProps[propName] = propValue
    }
  })

  return [parentProps, childProps]
}

export default BootstrapModal
