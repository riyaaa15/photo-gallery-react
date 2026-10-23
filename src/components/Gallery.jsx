import { useCallback, useMemo, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");

  const inputValHandler = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase()),
    );
  }, [photos, search]);

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
    <div className="mx-auto max-w-7xl p-4">
      <input
        type="text"
        value={search}
        onChange={inputValHandler}
        placeholder="Search by author"
        className="mb-4 w-full rounded border p-2"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={false}
            onToggle={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
