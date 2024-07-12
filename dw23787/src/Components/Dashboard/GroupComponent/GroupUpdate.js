import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UpdateGroupService } from '../../../Services/GroupsService';
import { useAppContext } from '../../AppContext';

function GroupUpdate({ show, onHide, group, setAlert, updateGroup }) {

  const [groupName, setGroupName] = useState('');

  const { language } = useAppContext();

  useEffect(() => {
    if (group) {
      setGroupName(group.groupName);
    }
  }, [group]);

  const handleCreateGroup = async () => {
    const formData = new FormData();
    formData.append('GroupName', groupName);

    await UpdateGroupService(group.groupId, formData).then((updatedGroup) => {
      setAlert({
        show: true,
        message:
          language !== 'pt'
            ? 'Group updated successfully'
            : 'Grupo atualizado com sucesso',
        variant: 'success'
      });
      updateGroup(updatedGroup);
      onHide();
    });
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="groupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateGroup}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GroupUpdate;
