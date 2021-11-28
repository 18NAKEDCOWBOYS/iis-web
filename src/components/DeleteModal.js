import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DeleteModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#0d6efd" }}>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.bodyText}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Zrušit</Button>
        <Button variant="danger" onClick={() => props.action(props)}>Vymazat</Button>
      </Modal.Footer>
    </Modal>
  );
}