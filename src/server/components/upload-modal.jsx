import React from 'react'
import Modal from './modal'
import ModalTitle from './modal-title'
import ModalContent from './modal-content'
import ModalCall from './modal-call'
import { TextButton } from './buttons'

export default class UploadModal extends React.Component {
  render() {
    return (
      <Modal visible={this.props.visible} onClose={this.props.onClose}>
        <ModalTitle>{`replace notebook file  "${(this.props.oldFile && this.props.oldFile.filename) || ''}"?`}</ModalTitle>
        <ModalContent>This action will replace the file associated
          with this notebook, and cannot be undone.
          Any other files with the same name associated
          with other notebooks will not be affected.
        </ModalContent>
        <ModalCall>
          <TextButton onClick={this.props.onCancel || this.props.onClose}>Cancel
          </TextButton>
          <TextButton onClick={this.props.onUpdateFile}>Replace File
          </TextButton>
        </ModalCall>
      </Modal>
    )
  }
}
