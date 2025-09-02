import CropCard from "../CropCard/CropCard";

const PredictionResult = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-400">
        <p>No recommendations found.</p>
      </div>
    );
  }

  // Normalize results so CropCard always gets { name, score }
  const safeResults = results.map((res, index) => {
    if (typeof res === "string") {
      return { crop: { name: res }, score: 0 }; // string case
    } else if (res.name) {
      return { crop: { name: res.name, image: res.image }, score: res.score ?? 0 };
    } else if (res.crop && res.crop.name) {
      return { crop: res.crop, score: res.score ?? res.confidence ?? 0 };
    } else {
      return { crop: { name: `Crop #${index + 1}` }, score: 0 };
    }
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-agri-green-800 mb-6 text-center">
        Recommended Crops
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {safeResults.map((result, index) => (
          <CropCard
            key={index}
            crop={result.crop}
            score={result.score}
            rank={index + 1}
          />
        ))}   
      </div>
    </div>
  );
};

export default PredictionResult;
