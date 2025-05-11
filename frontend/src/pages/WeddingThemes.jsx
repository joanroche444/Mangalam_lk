export default function WeddingThemes() {
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-full">
          <h1 className="text-2xl font-bold mb-4">Wedding Themes</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <div key={theme.id} className="p-4 bg-white rounded-lg shadow-lg">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="text-lg font-semibold mt-2">{theme.name}</h2>
                <p className="text-sm mb-2">{theme.description}</p>
                <h3 className="text-md font-semibold">Available Options:</h3>
                <ul className="list-disc ml-5 mb-2">
                  {theme.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
                <h3 className="text-md font-semibold">Services Included:</h3>
                <ul className="list-disc ml-5">
                  {theme.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
                {/* Centering Read More Button */}
                <div className="flex justify-center mt-4">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  