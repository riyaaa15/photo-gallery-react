export default function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="overflow-hidden rounded border shadow">
      <img
        className="h-48 w-full object-cover"
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={photo.author}
      />
      <div className="flex items-center justify-between p-3">
        <p>{photo.author}</p>

        <button onClick={onToggle}>{isFavourite ? "❤️" : "🤍"}</button>
      </div>
    </div>
  );
}
