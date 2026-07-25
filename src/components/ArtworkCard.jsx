import { getResizedImageUrl } from "../utils/cloudinaryHelper.js";

const ArtworkCard = ({ artwork }) => {
    // Transform the raw database URL into a lightweight 400px WebP thumbnail
    const optimizedThumb = getResizedImageUrl(artwork.imageUrl, {
        width: 400,
        height: 400,
        crop: 'fill'
    });

    return (
        <div className="artwork-card">
            <img
                src={optimizedThumb}
                alt={artwork.title}
                loading="lazy" // Keeps initial load blazing fast
            />
            <h3>{artwork.title}</h3>
        </div>
    );
};

export default ArtworkCard;