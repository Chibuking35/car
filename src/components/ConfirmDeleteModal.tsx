// components/ConfirmDeleteModal.tsx
"use client";

import { useEffect, useRef } from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onCancel,
  onConfirm,
  userName,
}: ConfirmDeleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCancel();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-2xl w-80 text-center space-y-4"
      >
        <h2 className="font-semibold text-gray-800 text-sm">Delete User</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <strong>{userName}</strong>?
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
