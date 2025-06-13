import React, { useState } from 'react'
import { Dialog } from "@headlessui/react";
import { X } from 'lucide-react';
import Spinner from '../Spinner/Spinner';

const DeleteConformation = ({deleteModalVisible, setDeleteModalVisible, confirmDelete, loader=false})=> {

  const handleClose = () => {
    setDeleteModalVisible(false)
  };
  

  return (
    <Dialog open={deleteModalVisible} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-large font-semibold text-text">
              Confirm Deletion
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="text-text hover:text-gray transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-ratio2 text-small text-gray">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>

          <div className="mt-ratio1 flex justify-end gap-3">
            <button
              className="rounded-medium border border-border bg-white px-ratio1 py-ratio2 text-small font-medium text-text hover:bg-gray-100 transition"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="rounded-medium bg-red-500 px-ratio1 py-ratio2 text-small font-medium !text-white hover:bg-red-700 transition"
              onClick={() => confirmDelete(1)}
            >
              {loader ? (
                <Spinner size={16} style={{ color: "white" }} />
              ) : "Delete"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default DeleteConformation;
