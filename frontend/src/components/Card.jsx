import Button from "./Button";

export default function Card({ project, onEdit, onDelete }) {
  return (
    <div className="p-4 shadow-lg bg-white rounded-lg">
      {project?.image ? (
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-40 object-cover rounded-lg"
        />
      ) : null}
      {project?.name ? (
        <h2 className="text-lg font-semibold mt-2">{project.name}</h2>
      ) : null}
      <div className="mt-3">
        {/* Passing children to allow custom elements like the buttons */}
      </div>
      {project ? (
        <div className="mt-3 flex gap-2">
          <Button
            onClick={() => onEdit(project.id)} // Trigger edit action
            variant="outline"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(project.id)} // Trigger delete action
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      ) : null}
    </div>
  );
}
