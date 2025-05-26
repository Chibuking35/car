// /components/ConfirmRoleChangeModal.tsx

interface ConfirmRoleChangeModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName?: string;
  newRole: string;
}

export default function ConfirmRoleChangeModal({
  isOpen,
  onCancel,
  onConfirm,
  userName,
  newRole,
}: ConfirmRoleChangeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/20 backdrop-blur bg-opacity-50 flex justify-center items-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl p-6 w-80 max-w-full shadow-xl "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-center mb-4">Confirm Role Change</h2>
        <p className="mb-4 text-sm ">
          Are you sure you want to change <strong>{userName}</strong>&apos;s
          role to <strong>{newRole}</strong>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-1 text-sm rounded-full bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
