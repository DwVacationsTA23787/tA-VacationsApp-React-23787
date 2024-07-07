import React, { useState } from 'react';
import './Chat.css'


// groups
const users = [
    { id: 1, name: 'Marie Horwitz', message: 'Hello, Are you there?', time: 'Just now', avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp', status: 'online', notifications: 3 },
    { id: 2, name: 'Alexa Chung', message: 'Lorem ipsum dolor sit.', time: '5 mins ago', avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp', status: 'away', notifications: 2 },
    { id: 3, name: 'Danny McChain', message: 'Lorem ipsum dolor sit.', time: 'Yesterday', avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp', status: 'online', notifications: 0 },
    { id: 4, name: 'Ashley Olsen', message: 'Lorem ipsum dolor sit.', time: 'Yesterday', avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp', status: 'offline', notifications: 0 },
    { id: 5, name: 'Kate Moss', message: 'Lorem ipsum dolor sit.', time: 'Yesterday', avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp', status: 'away', notifications: 0 },
    { id: 6, name: 'Ben Smith', message: 'Lorem ipsum dolor sit.', time: 'Yesterday', avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp', status: 'online', notifications: 0 },
];

//mensages
const messages = [
    { sender: 'Ben Smith', time: '12:00 PM | Aug 13', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', align: 'start' },
    { sender: 'You', time: '12:00 PM | Aug 13', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', align: 'end' },
    { sender: 'Ben Smith', time: '12:00 PM | Aug 13', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', align: 'start' },
    { sender: 'You', time: '12:00 PM | Aug 13', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', align: 'end' },
    { sender: 'Ben Smith', time: '12:00 PM | Aug 13', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', align: 'start' },
    { sender: 'You', time: '12:00 PM | Aug 13', content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', align: 'end' },
    { sender: 'Ben Smith', time: '12:00 PM | Aug 13', content: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.', align: 'start' },
    { sender: 'You', time: '12:00 PM | Aug 13', content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?', align: 'end' },
];

function ChatPage() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [messageInput, setMessageInput] = useState('');

    const handleFileUpload = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        // Handle the selected file here, e.g., upload it to a server, display it, etc.
        console.log('Selected file:', selectedFile);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (messageInput.trim() !== '') {
            messages.push({ sender: 'You', time: 'Now', content: messageInput, align: 'end' });
            setMessageInput('');
        }
    };

    // filtro dos Groups
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section style={{ backgroundColor: '#2f3e23' }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card" id="chat3" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                                        <div className="p-3">
                                            <div className="input-group rounded mb-3">
                                                <input
                                                    type="search"
                                                    className="form-control rounded"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    aria-describedby="search-addon"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                />
                                                <span className="input-group-text border-0" id="search-addon">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                            </div>
                                            <div className="user-list" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                                                <ul className="list-unstyled mb-0">
                                                    {filteredUsers.map((user) => (
                                                        <li key={user.id} className="p-2 border-bottom" onClick={() => handleUserClick(user)}>
                                                            <a href="#!" className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row">
                                                                    <div>
                                                                        <img src={user.avatar} alt="avatar" className="d-flex align-self-center me-3" width="60" />
                                                                        <span className={`badge bg-${user.status === 'online' ? 'success' : user.status === 'away' ? 'warning' : 'danger'} badge-dot`}></span>
                                                                    </div>
                                                                    <div className="pt-1">
                                                                        <p className="fw-bold mb-0">{user.name}</p>
                                                                        <p className="small text-muted">{user.message}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="small text-muted mb-1">{user.time}</p>
                                                                    {user.notifications > 0 && <span className="badge bg-danger rounded-pill float-end">{user.notifications}</span>}
                                                                </div>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-7 col-xl-8">
                                        <div className="pt-3 pe-3" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                                            {messages.map((message, index) => (
                                                <div className={`d-flex flex-row justify-content-${message.align}`} key={index}>
                                                    <img src={message.align === 'start' ? selectedUser.avatar : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'} alt="avatar" style={{ width: '45px', height: '100%' }} />
                                                    <div>
                                                        <p className={`small p-2 ms-3 mb-1 rounded-3 ${message.align === 'start' ? 'bg-body-tertiary' : 'bg-primary text-white'}`}>{message.content}</p>
                                                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{message.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                            <img src={selectedUser.avatar} alt="avatar 3" style={{ width: '40px', height: '100%' }} />
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Type message"
                                                value={messageInput}
                                                onChange={handleMessageChange}
                                            />
                                            <div>
                                                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileSelect} />
                                                <i className="fas fa-paperclip" style={{ cursor: 'pointer' }} onClick={handleFileUpload}></i>
                                            </div>
                                            {/* <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a> */}
                                            <a className="ms-3" href="#!" onClick={handleSendMessage}><i className="fas fa-paper-plane"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChatPage
