import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../../App.css';
import DisplayEachInventory from '../content/DisplayEachInventory'

export default function Chat({ user }) {
    const [socket] = useState(() => io('http://localhost:5000'));
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [chatBoxOpen, setChatBoxOpen] = useState(false);
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // console.log(chat)
    // console.log(user.id)

    const fetchWarehouses = async () => {
        try {
            const response = await fetch('http://localhost:5000/warehouses');
            const data = await response.json();
            setWarehouses(data);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    };
    const fetchitem = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/inventory/${id}`);
            const data = await response.json();
            setSelectedItem(data);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error fetching item:', error);
            alert('Item with that id not found')
        }
    };
    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
};

;

    const fetchHistory = async () => {
        if (selectedWarehouseId) {
            try {
                const response = await fetch(`http://localhost:5000/chat/history/${selectedWarehouseId}`);
                const data = await response.json();
                setChat(data);
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        }
    };

    useEffect(() => {
        console.log("Setting up socket listeners");
        fetchWarehouses();
        fetchHistory();
    
        socket.on('new message', (newMessage) => {
            console.log('New message received:', newMessage);
            setChat(prevChat => [...prevChat, newMessage]);
        });
    
        return () => {
            console.log("Removing socket listeners");
            socket.off('new message');
        };
    }, [socket, selectedWarehouseId]);
    

    // Send a message
    const sendMessage = () => {
        if (message.trim() && selectedWarehouseId && user.id) {
            const newMessage = {
                message: message,
                users_id: user.id,
                warehouses_id: selectedWarehouseId,
                created_at: new Date().toISOString(), 
                user: { ...user }
            };
            socket.emit('send message', newMessage, (response) => {
                console.log('Server response:', response);
            });
            setChat(prevChat => [...prevChat, newMessage]);
            setMessage('');
        } else {
            console.error('Message, user ID, or warehouse ID is missing');
        }
    };

    const toggleChatBox = () => {
        setChatBoxOpen(!chatBoxOpen);
        setSelectedWarehouseId(1);
    };
    // Handle warehouse selection
    const selectWarehouse = (warehouseId) => {
        setSelectedWarehouseId(warehouseId);
        fetchHistory();
    };
    const formatDateTime = (dateTimeString) => {
        const options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    };

    const MessageComponent = ({ msg, fetchitem }) => {
        const isLink = msg.startsWith('<find>');
        const linkText = isLink ? msg.substring(7) : '';    
        return (
            <p className="text-white" onClick={isLink ? () => fetchitem(linkText) : undefined}>
                {isLink ? <a href="#" className="underline">{linkText}</a> : msg}
            </p>
        );
    };
    
    return (
        <div className="relative">
            <button onClick={toggleChatBox} className="bg-blue-600 hover:bg-blue-800 text-white font-bold p-4 rounded-full fixed bottom-4 right-4 focus:outline-none focus:shadow-outline hover:shadow-xl" style={{ zIndex: 1000 }}>
                Chat
            </button>
    
            {chatBoxOpen && (
                <div className="bg-blue-900 p-6 text-white rounded-lg shadow-md fixed bottom-20 right-4 w-96" style={{ height: '750px', zIndex: 999 }}>
                    {selectedWarehouseId === 1 ? <h2 className="text-xl font-bold mb-3">Main Chat</h2> : <h2 className="text-xl font-bold mb-3">Warehouse Chat</h2>}
                    <div className="mb-4 flex flex-wrap">
                        {warehouses.map(warehouse => (
                            <button key={warehouse.id} onClick={() => selectWarehouse(warehouse.id)} className="m-1 bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none">
                                {warehouse.location}
                            </button>
                        ))}
                    </div>
                    <input type="text" value={message} onChange={e => setMessage(e.target.value)} className="p-2 w-full rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-700 bg-white mb-4" placeholder="Type a message..." />
                    <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
                        Send
                    </button>
                    <div className="overflow-y-auto max-h-[480px] scrollbar-custom"> 
                        {chat.map((msg, index) => (
                            <div key={index}>
                                <div className={`max-w-full p-2 my-2 rounded ml-auto ${user.id === msg.user?.id ? 'bg-blue-700 text-right' : 'bg-gray-700 text-left'}`}>
                                    <MessageComponent msg={msg.message} fetchitem={fetchitem} />
                                </div>
                                <div className="flex justify-between text-gray-300 text-sm">
                                    <p>{formatDateTime(msg.created_at)}</p>
                                    <p>{msg.user?.first_name}</p>
                                </div>
                            </div>
                        ))}
                        {isModalVisible && selectedItem && (
                            <DisplayEachInventory item={selectedItem} onClose={closeModal} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}  
