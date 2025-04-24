// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform } from "framer-motion";
import { X, Heart, Bookmark } from "lucide-react";
import PropTypes from "prop-types";

const SWIPE_THRESHOLD = 150; // pixels

/**
 * Meme card component.
 * @param {{
 *   meme: { id: string|number; url: string; caption?: string },
 *   onLike?: (meme) => void,
 *   onDislike?: (meme) => void,
 *   onSave?: (meme) => void,
 * }} props
 */
function Meme({ meme, onLike, onDislike, onSave }) {
  // Horizontal position of the card while dragging
  const x = useMotionValue(0);
  // Rotate card slightly as it moves left/right
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);

  // Fade-in labels depending on drag distance
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const handleDragEnd = (_, info) => {
    const { offset } = info;

    if (offset.x > SWIPE_THRESHOLD) {
      onLike?.(meme);
    } else if (offset.x < -SWIPE_THRESHOLD) {
      onDislike?.(meme);
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto bg-[#121212] rounded-3xl overflow-hidden shadow-xl"
      drag="x"
      style={{ x, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, y: 50 }}
    >
      {/* Meme image */}
      <img
        src={meme.url}
        alt={meme.caption ?? "meme"}
        className="w-full h-[26rem] object-contain bg-black select-none pointer-events-none"
      />

      {/* Caption overlay */}
      {meme.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-white text-base leading-snug break-words">
            {meme.caption}
          </p>
        </div>
      )}

      {/* NOPE label */}
      <motion.div
        className="absolute left-6 top-6 text-[#08D9D6] border-4 border-[#08D9D6] rounded-lg px-3 py-1 font-bold uppercase text-lg select-none"
        style={{ opacity: nopeOpacity }}
      >
        Nope
      </motion.div>

      {/* LIKE label */}
      <motion.div
        className="absolute right-6 top-6 text-[#FF2E63] border-4 border-[#FF2E63] rounded-lg px-3 py-1 font-bold uppercase text-lg select-none"
        style={{ opacity: likeOpacity }}
      >
        Like
      </motion.div>

      {/* Bottom action buttons */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6 pointer-events-auto z-10">
        <button
          onClick={() => onDislike?.(meme)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#08D9D6] text-[#121212] hover:scale-110 transition active:scale-95"
        >
          <X size={32} />
        </button>
        <button
          onClick={() => onLike?.(meme)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#FF2E63] text-white hover:scale-110 transition active:scale-95"
        >
          <Heart size={28} />
        </button>
        <button
          onClick={() => onSave?.(meme)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#08D9D6] text-[#121212] hover:scale-110 transition active:scale-95"
        >
          <Bookmark size={28} />
        </button>
      </div>
    </motion.div>
  );
}

Meme.propTypes = {
  meme: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    url: PropTypes.string.isRequired,
    caption: PropTypes.string,
  }).isRequired,
  onLike: PropTypes.func,
  onDislike: PropTypes.func,
  onSave: PropTypes.func,
};

export default Meme;
