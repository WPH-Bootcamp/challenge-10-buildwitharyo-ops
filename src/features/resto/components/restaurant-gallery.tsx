import Image from "next/image";

interface RestaurantGalleryProps {
  images: string[];
  name: string;
}

export function RestaurantGallery({ images, name }: RestaurantGalleryProps) {
  const [main, ...rest] = images;
  const thumbnails = rest.slice(0, 4);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
        <Image
          src={main}
          alt={name}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {thumbnails.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {thumbnails.map((image, index) => (
            <div
              key={image}
              className="relative aspect-square overflow-hidden rounded-2xl bg-muted"
            >
              <Image
                src={image}
                alt={`${name} photo ${index + 2}`}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
