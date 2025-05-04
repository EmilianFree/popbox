import { useState, useEffect } from "react";
import './App.css';

function Gallery({ onBack }) {
  const [images, setImages] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("popboxMessages");
    if (saved) {
      const all = JSON.parse(saved);
      const onlyImages = all.filter((msg) => msg.image).map((msg) => ({
        src: msg.image,
        user: msg.user,
        time: msg.time,
      }));
      setImages(onlyImages);
    }
  }, []);

  return (
    <>
      {/* Lightbox */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setZoomImage(null)}
        >
          <img
  src={img.src}
  alt={`Poză ${index + 1}`}
  style={{
    maxWidth: '200px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    margin: '0 auto',
    display: 'block'
  }}
/>
        </div>
      )}

      {/* Galerie */}
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-900">🖼️ Galerie foto PopBox</h2>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            ⬅ Înapoi
          </button>
        </div>

        {images.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">Nicio fotografie încă...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
            {images.map((img, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => setZoomImage(img.src)}
              >
              <img
                src={img.src}
                alt={`Poză ${index + 1}`}
                className="gallery-image cursor-pointer"
                onClick={() => setZoomImage(img.src)}
              />


                <div className="text-xs text-gray-600 text-center mt-1 truncate">
                  {img.user} – {img.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Gallery;
