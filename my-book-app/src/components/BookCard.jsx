function BookCard({ img, title, author }) {
  return (
    <div className="bg-[#F7FCFF] mb-2 rounded-sm shadow-xl px-2 py-8 md:p-4 w-[330px] md:w-[248px]  h-[264px] md:h-[400px] flex flex-row md:flex-col gap-2 ">
      <img
        className="w-[134px] md:w-[188px] h-[192px] md:h-[236px]"
        src={img}
        alt={title || "Book Cover"}
      />
      <div>
        <h2 className="text-base font-bold text-[#212121] mt-2">{author}</h2>
        <p className="p-style">{title}</p>
      </div>
    </div>
  );
}

export default BookCard;
