export default function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img
        className="h-48 w-full object-cover"
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={photo.author}
      />
      <div className="flex items-center justify-between p-3">
        <p className="font-medium text-slate-700">{photo.author}</p>

        <button className="text-2xl transition hover:scale-125" onClick={onToggle}>{isFavourite ? "❤️" : "🤍"}</button>
      </div>
    </div>
  );
}
