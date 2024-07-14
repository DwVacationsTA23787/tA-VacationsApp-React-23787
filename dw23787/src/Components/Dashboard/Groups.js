import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Pagination, Container, Alert } from 'react-bootstrap';
import { GetAllGroupsForUser, DeleteGroup } from '../../Services/GroupsService';
import { useAppContext } from '../AppContext';
import { DashGroupsphrases } from '../../Utils/language';
import GroupUpdate from './GroupComponent/GroupUpdate';

const Groups = () => {

  // App context variables for language conversion.
  const { language } = useAppContext();
  const {
    Groups,
    List,
    GroupName,
    UsersGroup,
    GroupID,
    Delete,
    Update
  } = DashGroupsphrases[language];

  // useParams variable to save id of URL param.
  const { id } = useParams();

  // UseState Variables
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(5);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Gets user from localstorage so it can grab all the groups is admin, if its global admin it can see all the groups.
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    GetAllGroupsForUser(id).then((data) => {
      setGroups(data);
    }).catch((error) => {
      console.error('Error fetching groups:', error);
    });
  }, [id]);

  // Pagination variables
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Variables to not give error while loading the page.
  const userName = user && user.name ? user.name : "";
  const isAdmin = user && user.isAdmin ? user.isAdmin : false;

  // Delete Group function, a group just can be deleted if the trip already as been deleted.
  const handleDelete = (groupId) => {
    DeleteGroup(groupId)
      .then((data) => {
        setAlert({
          show: true,
          message: language !== 'pt' ? data.message : 'Grupo apagado com sucesso',
          variant: 'success'
        });
        setGroups(groups.filter(group => group.groupId !== groupId));
      })
      .catch((error) => {
        setAlert({
          show: true,
          message: language !== 'pt' ? error.message : 'Apague primeiro a viagem correspondente ao grupo associado.',
          variant: 'danger'
        });
      });
  };

  const handleUpdate = (groupId) => {
    const groupToUpdate = groups.find((group) => group.groupId === groupId);
    setSelectedGroup(groupToUpdate);
    setShowModal(true);
  };

  const updateGroup = (updatedGroup) => {
    const updatedGroups = groups.map((group) =>
      group.groupId === updatedGroup.groupId ? { ...group, ...updatedGroup } : group
    );
    setGroups(updatedGroups);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      {
        isAdmin ? <h1>{List}</h1> : <h1>{Groups} {userName}</h1>
      }
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>{GroupID}</th>
            <th>{GroupName}</th>
            <th>{UsersGroup}</th>
            <th>{Update}</th>
            <th>{Delete}</th>
          </tr>
        </thead>
        <tbody>
          {currentGroups.map((group, index) => (
            <tr key={group.groupId}>
              <td>{indexOfFirstGroup + index + 1}</td>
              <td>{group.groupId}</td>
              <td>{group.groupName}</td>
              <td>{group.userCount}</td>
              <td className='text-center'><button onClick={() => handleUpdate(group.groupId)} type="button" className="btn btn-info">{Update}</button></td>
              <td className='text-center'><button onClick={() => handleDelete(group.groupId)} type="button" className="btn btn-danger">{Delete}</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: Math.ceil(groups.length / groupsPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      {selectedGroup && (
        <GroupUpdate
          show={showModal}
          onHide={handleCloseModal}
          group={selectedGroup}
          setAlert={setAlert}
          updateGroup={updateGroup}
        />
      )}
    </Container>
  );
};

export default Groups;
