import React, { useState } from 'react';
import { Room, Section } from './types';
import { FloorSection } from './components/FloorSection';
import { PaymentModal } from './components/PaymentModal';
import { Building } from 'lucide-react';

const initialRooms: Section[] = [
  {
    name: 'Planta Baja',
    rooms: Array.from({ length: 4 }, (_, i) => ({
      id: `pb-${i + 1}`,
      number: `${i + 1}`,
      floor: 'PB',
      section: 'PB',
      status: i === 2 ? 'parcial' : i === 3 ? 'pendiente' : 'pagado',
      lastPayment: '2024-03-01',
      tenant: `Inquilino ${i + 1}`,
      ...(i === 2 ? {
        lastPartialPayment: 2500,
        pendingAmount: 1500
      } : {}),
    })),
  },
  {
    name: 'Piso 1 Sección A',
    rooms: Array.from({ length: 6 }, (_, i) => ({
      id: `1a-${i + 1}`,
      number: `${i + 1}`,
      floor: '1',
      section: 'A',
      status: i % 4 === 0 ? 'pagado' : i % 4 === 1 ? 'atrasado' : i % 4 === 2 ? 'extension' : 'parcial',
      lastPayment: '2024-02-28',
      tenant: `Inquilino 1A-${i + 1}`,
      ...(i % 4 === 3 ? {
        lastPartialPayment: 3000,
        pendingAmount: 2000
      } : {}),
    })),
  },
  {
    name: 'Piso 1 Sección C',
    rooms: Array.from({ length: 8 }, (_, i) => ({
      id: `1c-${i + 1}`,
      number: `${i + 1}`,
      floor: '1',
      section: 'C',
      status: i % 5 === 0 ? 'pagado' : i % 5 === 1 ? 'atrasado' : i % 5 === 2 ? 'pendiente' : i % 5 === 3 ? 'extension' : 'parcial',
      lastPayment: '2024-02-25',
      tenant: `Inquilino 1C-${i + 1}`,
      ...(i % 5 === 4 ? {
        lastPartialPayment: 2800,
        pendingAmount: 1700
      } : {}),
    })),
  },
  {
    name: 'Piso 2 Sección A',
    rooms: Array.from({ length: 10 }, (_, i) => ({
      id: `2a-${i + 1}`,
      number: `${i + 1}`,
      floor: '2',
      section: 'A',
      status: i % 5 === 0 ? 'pagado' : i % 5 === 1 ? 'atrasado' : i % 5 === 2 ? 'pendiente' : i % 5 === 3 ? 'extension' : 'parcial',
      lastPayment: '2024-02-20',
      tenant: `Inquilino 2A-${i + 1}`,
      ...(i % 5 === 4 ? {
        lastPartialPayment: 3200,
        pendingAmount: 1800
      } : {}),
    })),
  },
  {
    name: 'Piso 2 Sección B',
    rooms: Array.from({ length: 14 }, (_, i) => ({
      id: `2b-${i + 1}`,
      number: `${i + 1}`,
      floor: '2',
      section: 'B',
      status: i % 5 === 0 ? 'pagado' : i % 5 === 1 ? 'atrasado' : i % 5 === 2 ? 'pendiente' : i % 5 === 3 ? 'extension' : 'parcial',
      lastPayment: '2024-02-18',
      tenant: `Inquilino 2B-${i + 1}`,
      ...(i % 5 === 4 ? {
        lastPartialPayment: 2700,
        pendingAmount: 2300
      } : {}),
    })),
  },
];

function App() {
  const [sections, setSections] = useState<Section[]>(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRoomClick = (roomId: string) => {
    const room = sections.flatMap(s => s.rooms).find(r => r.id === roomId);
    if (room) {
      setSelectedRoom(room);
      setIsModalOpen(true);
    }
  };

  const handleSavePayment = (roomId: string, updates: Partial<Room>) => {
    setSections(currentSections =>
      currentSections.map(section => ({
        ...section,
        rooms: section.rooms.map(room =>
          room.id === roomId
            ? { ...room, ...updates }
            : room
        ),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Building className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Sistema de Gestión de Pagos
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Estado de Pagos</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { status: 'pagado', text: 'Pagado', color: 'bg-green-100 text-green-800' },
              { status: 'atrasado', text: 'Atrasado', color: 'bg-yellow-100 text-yellow-800' },
              { status: 'extension', text: 'Extensión', color: 'bg-pink-100 text-pink-800' },
              { status: 'parcial', text: 'Pago Parcial', color: 'bg-blue-100 text-blue-800' },
              { status: 'pendiente', text: 'Pendiente', color: 'bg-gray-100 text-gray-800' },
            ].map((item) => (
              <div
                key={item.status}
                className={`${item.color} px-4 py-2 rounded-lg text-center`}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {sections.map((section) => (
          <FloorSection
            key={section.name}
            section={section}
            onRoomClick={handleRoomClick}
          />
        ))}
      </main>

      {selectedRoom && (
        <PaymentModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRoom(null);
          }}
          onSave={handleSavePayment}
        />
      )}
    </div>
  );
}

export default App;