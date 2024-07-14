import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UpdateGroupService } from '../../../Services/GroupsService';
import { useAppContext } from '../../AppContext';

function GroupUpdate({ show, onHide, group, setAlert, updateGroup }) {

  // App context variables for language conversion.
  const { language } = useAppContext();
  
  // UseState variable
  const [groupName, setGroupName] = useState('');

  // the group is passed in order to pass the groupName to the useSate.
  useEffect(() => {
    if (group) {
      setGroupName(group.groupName);
    }
  }, [group]);

  // Function responsible to handle createGroup form.
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
          {
            language != 'pt' ? ('Close') : ('Fechar')
           }
          </Button>
          <Button variant="primary" onClick={handleCreateGroup}>
           {
            language != 'pt' ? ('Update') : ('Atualizar')
           }
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GroupUpdate;
