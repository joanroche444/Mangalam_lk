import React from "react";

const Card = ({ project, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between min-h-[180px]">
      <div>
        <h3 className="text-lg font-semibold text-[#8d5347] mb-2">
          {project.name}
        </h3>
      </div>
      <div className="flex justify-between gap-2 mt-4">
        <button
          onClick={() => onEdit(project._id)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
