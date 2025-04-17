export default function Button({ children, variant = "default", className = "", ...props }) {
    const baseStyles = "px-4 py-2 rounded font-semibold transition";
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  