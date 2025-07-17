export interface Movie {
  title: string;
  year: number;
  description: string;
}

interface ResultProps {
  movie: Movie;
}

export const Result = ({ movie }: ResultProps) => {
  const { title, year, description } = movie;
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 mt-6 space-y-4">
      <h3 className="text-2xl font-bold">
        {title} <span className="text-gray-400 text-lg">({year})</span>
      </h3>
      <p className="text-gray-300">{description}</p>
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition duration-200">
        Next Movie
      </button>
    </div>
  );
};
