// src/components/Dashboard.js
import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import Home from './Home';
import Travels from './Travels';
import Groups from './Groups';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Tab.Container id="dashboard-tabs" activeKey={activeTab} onSelect={handleSelect}>
      <div className="row">
        <div className="col-md-3">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="travels">Travels</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="groups">Groups</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="col-md-9">
          <Tab.Content>
            <Tab.Pane eventKey="home">
              <Home />
            </Tab.Pane>
            <Tab.Pane eventKey="travels">
              <Travels />
            </Tab.Pane>
            <Tab.Pane eventKey="groups">
              <Groups />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </div>
    </Tab.Container>
  );
}

export default Dashboard;
