import React from 'react';
import { X } from 'lucide-react';

const ImageViewerModal = ({ imageUrl, isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
      {/* <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl"> */}
        <button className='text-white absolute top-2 right-1' onClick={onClose}><X /></button>
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
    // </div>
  );
};

export default ImageViewerModal;
