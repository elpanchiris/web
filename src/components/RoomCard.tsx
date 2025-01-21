import React from 'react';
import { Room } from '../types';
import { Calendar, User, DollarSign } from 'lucide-react';

const statusColors = {
  pagado: 'bg-green-100 border-green-500 text-green-700',
  atrasado: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  extension: 'bg-pink-100 border-pink-500 text-pink-700',
  parcial: 'bg-blue-100 border-blue-500 text-blue-700',
  pendiente: 'bg-gray-100 border-gray-500 text-gray-700',
};

const statusText = {
  pagado: 'Pagado',
  atrasado: 'Atrasado',
  extension: 'Extensión',
  parcial: 'Pago Parcial',
  pendiente: 'Pendiente',
};

interface RoomCardProps {
  room: Room;
  onClick: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  return (
    <div
      className={`p-4 rounded-lg border-2 ${statusColors[room.status]} cursor-pointer transition-transform hover:scale-105`}
      onClick={() => onClick(room)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">Habitación {room.number}</h3>
        <span className="text-sm font-medium px-2 py-1 rounded-full bg-white/50">
          {statusText[room.status]}
        </span>
      </div>
      {room.tenant && (
        <div className="flex items-center gap-2 text-sm mb-2">
          <User size={16} />
          <span>{room.tenant}</span>
        </div>
      )}
      <div className="flex items-center gap-2 text-sm mb-2">
        <Calendar size={16} />
        <span>Último pago: {room.lastPayment}</span>
      </div>
      {room.status === 'parcial' && (
        <div className="flex flex-col gap-1 mt-2 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign size={16} />
            <span>Pago parcial: ${room.lastPartialPayment?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <DollarSign size={16} />
            <span>Saldo pendiente: ${room.pendingAmount?.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}