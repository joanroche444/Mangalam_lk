import React, { useState } from "react";

export default function Dialog({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { isOpen, setIsOpen })
          : child
      )}
    </>
  );
}

export function DialogTrigger({ children, setIsOpen }) {
  return <div onClick={() => setIsOpen(true)}>{children}</div>;
}

export function DialogContent({ children, isOpen, setIsOpen }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        {children}
        <button onClick={() => setIsOpen(false)} className="mt-4 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
}
