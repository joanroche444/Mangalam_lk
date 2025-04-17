
export default function Testimonial({ quote, author, image }) {
    return (
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-[#f8e6d8]">
        <img
          src={image}
          alt={author}
          className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-[#f8e6d8]"
        />
        <p className="text-gray-700 italic mb-4 text-center">"{quote}"</p>
        <p className="font-medium text-[#b06a5d]">{author}</p>
      </div>
    );
  }
  
