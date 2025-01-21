import React, { useState } from 'react';
import { Room, PaymentStatus } from '../types';
import { X } from 'lucide-react';

interface PaymentModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
  onSave: (roomId: string, updates: Partial<Room>) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  room,
  isOpen,
  onClose,
  onSave,
}) => {
  const [status, setStatus] = useState<PaymentStatus>(room.status);
  const [partialAmount, setPartialAmount] = useState(room.lastPartialPayment || 0);
  const [pendingAmount, setPendingAmount] = useState(room.pendingAmount || 0);
  const [paymentDate, setPaymentDate] = useState(room.lastPayment);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updates: Partial<Room> = {
      status,
      lastPayment: paymentDate,
    };

    if (status === 'parcial') {
      updates.lastPartialPayment = partialAmount;
      updates.pendingAmount = pendingAmount;
    } else {
      updates.lastPartialPayment = undefined;
      updates.pendingAmount = undefined;
    }

    onSave(room.id, updates);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            Editar Pago - Habitación {room.number}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado del Pago
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PaymentStatus)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="pagado">Pagado</option>
                <option value="atrasado">Atrasado</option>
                <option value="extension">Extensión</option>
                <option value="parcial">Pago Parcial</option>
                <option value="pendiente">Pendiente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Pago
              </label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {status === 'parcial' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monto Pagado
                  </label>
                  <input
                    type="number"
                    value={partialAmount}
                    onChange={(e) => setPartialAmount(Number(e.target.value))}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Saldo Pendiente
                  </label>
                  <input
                    type="number"
                    value={pendingAmount}
                    onChange={(e) => setPendingAmount(Number(e.target.value))}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}