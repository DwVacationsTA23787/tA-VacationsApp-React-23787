import React, { useEffect, useState } from 'react';
import './Chat.css';
import { GetGroupMessages, handleMessagePost } from '../Services/MessageService';
import { GetAllGroupsMessages } from '../Services/MessageService';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../Components/AppContext';
import { Alert } from 'react-bootstrap';

function ChatPage() {
    // useParams variable to save id of URL param.
    const { id } = useParams();

    // App context variables for language conversion.
    const { language, ImageDir } = useAppContext();

    // useSates for data hnadling
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [groups, setGroups] = useState([]);
    const [messages, setMessages] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

    // Handle Event Functions
    // handleFileUpload - function made beacuse was not being able to click in the clip icon to send photo.
    // handleFileSelect - get data from file inserted.
    // handleGroupClick - gets the group that user chosse in the left side.
    // handleSearchChange - search for group.
    // handleMessageChange - Write the message.
    // handleSendMessage - If the message is empty, it will not be sent.
    //      If not, create a form so that the data can be sent in multipart/form, in case of success it displays the new message.
    // In case of error gets an alert.
    const handleFileUpload = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleGroupClick = (group) => {
        setSelectedUser(group);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (messageInput.trim() === ''){
            return setAlert({
                show: true,
                message: language !== 'pt' ? 'Message was Blanck, please write something' : 'Mensagem esta vazia, por favor escreva algo.',
                variant: 'danger'
              }); ;

        }

        const storedUser = JSON.parse(localStorage.getItem('user'));

        const formData = new FormData();
        const messageTitle = messageInput.substring(0, 20);
        formData.append('MessageTitle', messageTitle);
        formData.append('Description', messageInput);
        formData.append('GroupFK', selectedUser.groupId);
        formData.append('UserFK', storedUser.id);

        if (selectedFile) {
            formData.append('Picture', selectedFile);
        }

        try {
            const response = await handleMessagePost(formData);

            const newMessage = {
                sender: 'You',
                time: 'Now',
                content: messageInput,
                align: 'end'
            };

            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessageInput('');
            setSelectedFile(null);
        } catch (error) {
            console.error('Error sending message:', error);
            setAlert({
                show: true,
                message: language !== 'pt' ? 'Message was not send, Please try again' : 'Mensagem não foi enviada, por favor tente novamente.',
                variant: 'danger'
              });
        }
    };

    // To load page without error.
    const userProfilePicture = user ? user.profilePicture : null;

    // Filter groups based on search term
    const filteredGroups = groups.filter(group => {
        const groupNameMatch = group.groupName.toLowerCase().includes(searchTerm.toLowerCase());
        const lastMessageMatch = group.lastMessage && group.lastMessage.messageTitle.toLowerCase().includes(searchTerm.toLowerCase());
        return groupNameMatch || lastMessageMatch;
    });

    // UseEffect - lifeCycle function.
    // Grab the user from localStorage so the endpoint can grab all groups for that specific user. to be displayed in the left of the screen.
    // then will set the default group, and get all messages from the group itself, to be displayed at the right of the screen.
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        // Fetch all groups and their last messages
        GetAllGroupsMessages(storedUser.id)
            .then((data) => {
                const mappedGroups = data.map(group => ({
                    id: group.id,
                    groupId: group.groupId,
                    groupName: group.groupName,
                    lastMessage: group.lastMessage ? {
                        id: group.lastMessage.id,
                        messageTitle: group.lastMessage.messageTitle,
                        senderAvatar: group.lastMessage.senderAvatar,
                        senderName: group.lastMessage.senderName,
                        time: new Date(group.lastMessage.time).toLocaleString()
                    } : null
                }));

                setGroups(mappedGroups);

                // Find and set the selected group based on id from URL params
                let index = mappedGroups.findIndex(g => g.groupId == id);
                if (index !== -1) {
                    setSelectedUser(mappedGroups[index]);
                } else {
                    console.error(`Group with id ${id} not found in mappedGroups.`);
                }

                // Fetch messages for the selected group
                if (id) {
                    GetGroupMessages(id)
                        .then((res) => {
                            const messagesWithAlign = res.map(message => ({
                                ...message,
                                align: message.userId === storedUser.id ? 'end' : 'start'
                            }));
                            setMessages(messagesWithAlign);
                        })
                        .catch(error => {
                            console.error('Error fetching messages:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
            });

    }, [id]);

    // Renders the messages if they exist in the group based on the length > 0 and in case of not exist any is insert a card.
    return (
        <section style={{ backgroundColor: '#2f3e23' }}>
            {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                    {alert.message}
                </Alert>
            )}
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
                                            {/* List of groups */}
                                            <div className="user-list" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                                                <ul className="list-unstyled mb-0">
                                                    {filteredGroups.map(group => (
                                                        <li key={group.id} className={`p-2 border-bottom ${selectedUser && selectedUser.id === group.id ? 'selected' : ''}`} onClick={() => handleGroupClick(group)}>
                                                            <a className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row">
                                                                    <div>
                                                                        <img src={group.lastMessage ? `${ImageDir}/${group.lastMessage.senderAvatar}` : '/profile.jpeg'} alt="avatar" className="d-flex align-self-center me-3" width="60" />
                                                                        <span className="badge bg-primary badge-dot"></span>
                                                                    </div>
                                                                    <div className="pt-1">
                                                                        <p className="fw-bold mb-0">{group.groupName}</p>
                                                                        {group.lastMessage && <p className="small text-muted">{group.lastMessage.messageTitle}</p>}
                                                                    </div>
                                                                </div>
                                                                <div className="pt-1">
                                                                    {group.lastMessage && <p className="small text-muted mb-1">{group.lastMessage.time}</p>}
                                                                </div>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {/* End list of groups */}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-7 col-xl-8">
                                        <div className="pt-3 pe-3" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>

                                            {/* Render messages based on selected group */}
                                            {
                                                messages.length > 0 ? (
                                                    messages.map((message, index) => (
                                                        <div className={`d-flex flex-row justify-content-${message.align}`} key={index}>
                                                            <img src={`${ImageDir}/${message.userProfilePicture}`} alt="avatar" style={{ width: '45px', height: '100%' }} />
                                                            <div>
                                                                <p className={`small p-2 ms-3 mb-1 rounded-3 ${message.align === 'start' ? 'bg-body-tertiary' : 'bg-primary text-white'}`}>{message.content}</p>
                                                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                                                    {message.time}
                                                                    {
                                                                        message.Picture == null ? ('') : (<img src={`${ImageDir}/${message.Picture}`} alt="avatar" style={{ width: '45px', height: '100%' }} />)
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title">No messages in this group yet</h5>
                                                            <p className="card-text">Be the first to add one!</p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        {/* Input area for typing messages */}
                                        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                            <img src={`${ImageDir}/${userProfilePicture}`} alt="avatar" style={{ width: '40px', height: '100%' }} />
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
                                            <a className="ms-3" onClick={handleSendMessage}><i className="fas fa-paper-plane"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChatPage;
