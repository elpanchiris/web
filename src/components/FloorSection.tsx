import React from 'react';
import { Section } from '../types';
import { RoomCard } from './RoomCard';

interface FloorSectionProps {
  section: Section;
  onRoomClick: (roomId: string) => void;
}

export const FloorSection: React.FC<FloorSectionProps> = ({ section, onRoomClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Sección {section.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {section.rooms.map((room) => (
          <RoomCard key={room.id} room={room} onClick={() => onRoomClick(room.id)} />
        ))}
      </div>
    </div>
  );
}