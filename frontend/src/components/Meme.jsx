const Meme = ({ meme }) => {
  return (
    <div className="border-[1px] border-[#08D9D6] rounded-md p-7 pb-20 flex flex-col items-center gap-4 bg-[#121212] shadow-lg">
      <img src={meme.url} alt="meme" />
        <div className="flex items-center gap-2">
            <button>Like</button>
            <button>Save</button>
            <button>Dislike</button>
        </div>
    </div>
  );
};

export default Meme;
