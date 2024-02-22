import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const ImageViewerModal = ({ imageUrl, isOpen, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

  }, [isOpen, onClose]);
  return (
    <div  className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
      <div ref={modalRef}>
      <button className='text-white absolute top-2 right-2' onClick={onClose}><X className='size-6' /></button>
      <div>
        <div className="w-80 h-80 mx-auto overflow-hidden rounded-full">
          <img
            src={imageUrl}
            alt="User Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default ImageViewerModal;
