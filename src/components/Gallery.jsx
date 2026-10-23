import { useCallback, useMemo, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";
import { useEffect, useReducer } from "react";
import { favouritesReducer } from "../reducers/favouritesReducer";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(favouritesReducer, [], () => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  const inputValHandler = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase()),
    );
  }, [photos, search]);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
      </div>
    );
  }

  if (error) {
    return <p className="p-10 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="mx-auto max-w-7xl p-4">
        <input
          type="text"
          value={search}
          onChange={inputValHandler}
          placeholder="Search by author"
          className="mb-6 w-full rounded-full border border-sky-200 bg-white px-5 py-3 shadow-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={() =>
                dispatch({ type: "TOGGLE_FAVOURITE", payload: photo.id })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
