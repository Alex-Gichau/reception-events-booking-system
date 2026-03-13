"use client";
import { useState } from 'react';
import { Plus, Edit2, Trash2, DollarSign, CheckCircle } from 'react-feather';

export default function SettingsPage() {
  const [roomName, setRoomName] = useState('');
  const [roomNames, setRoomNames] = useState<string[]>(['Main Hall', 'Conference Room A', 'Meeting Room 1']);
  const [editingRoomIndex, setEditingRoomIndex] = useState<number | null>(null);
  const [editingRoomName, setEditingRoomName] = useState('');

  const [hourlyRate, setHourlyRate] = useState<string>('50');
  const [dailyRate, setDailyRate] = useState<string>('400');
  const [eventPackagePrice, setEventPackagePrice] = useState<string>('1500');

  const handleAddRoom = () => {
    if (roomName.trim() !== '' && !roomNames.includes(roomName.trim())) {
      setRoomNames([...roomNames, roomName.trim()]);
      setRoomName('');
    }
  };

  const handleEditRoom = (index: number) => {
    setEditingRoomIndex(index);
    setEditingRoomName(roomNames[index]);
  };

  const handleSaveRoomEdit = () => {
    if (editingRoomIndex !== null && editingRoomName.trim() !== '') {
      const updatedRoomNames = [...roomNames];
      updatedRoomNames[editingRoomIndex] = editingRoomName.trim();
      setRoomNames(updatedRoomNames);
      setEditingRoomIndex(null);
      setEditingRoomName('');
    }
  };

  const handleDeleteRoom = (index: number) => {
    setRoomNames(roomNames.filter((_, i) => i !== index));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your event booking settings</p>
      </div>

      {/* Room Management */}
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Room Management</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              placeholder="Add new room name"
              className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddRoom();
                }
              }}
            />
            <button
              onClick={handleAddRoom}
              className="flex items-center bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </button>
          </div>

          <ul className="divide-y divide-gray-200">
            {roomNames.map((room, index) => (
              <li key={index} className="flex items-center justify-between py-3">
                {editingRoomIndex === index ? (
                  <input
                    type="text"
                    value={editingRoomName}
                    onChange={(e) => setEditingRoomName(e.target.value)}
                    onBlur={handleSaveRoomEdit}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveRoomEdit();
                      }
                    }}
                    className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <span className="text-gray-900 font-medium">{room}</span>
                )}
                <div className="flex space-x-2">
                  {editingRoomIndex === index ? (
                    <button
                      onClick={handleSaveRoomEdit}
                      className="text-green-600 hover:text-green-800 p-1 rounded-full"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditRoom(index)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-full"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteRoom(index)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing Management */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Pricing Management</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
              Hourly Rate (KSh)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="hourlyRate"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="0.00"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="dailyRate" className="block text-sm font-medium text-gray-700 mb-1">
              Daily Rate (KSh)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="dailyRate"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="0.00"
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="eventPackagePrice" className="block text-sm font-medium text-gray-700 mb-1">
              Event Package Price (KSh)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="eventPackagePrice"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="0.00"
                value={eventPackagePrice}
                onChange={(e) => setEventPackagePrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}