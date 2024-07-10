// src/Components/Dashboard/Groups.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Pagination, Container } from 'react-bootstrap';
import { GetAllGroupsForUser } from '../../Services/GroupsService';

const Groups = () => {
  const { id } = useParams();
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(5);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    GetAllGroupsForUser(id).then((data) => {
      console.log(data.$values)
      setGroups(data.$values);
    }).catch((error) => {
      console.error('Error fetching trips:', error);
    });
  }, [id]);

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const userName = user && user.name ? user.name : "";

  return (
    <Container className="mt-4">
      <h1>Groups for {userName}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Group ID</th>
            <th>Name</th>
            <th>Users in Group</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentGroups.map((group, index) => (
            <tr key={group.groupId}>
              <td>{indexOfFirstGroup + index + 1}</td>
              <td>{group.groupId}</td>
              <td>{group.groupName}</td>
              <td>{group.userCount}</td>
              <td className='text-center'><button type="button" class="btn btn-danger">Delete</button></td>
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
    </Container>
  );
};

export default Groups;
