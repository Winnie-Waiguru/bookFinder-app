function BookCard() {
  return (
    <div className="bg-[#F7FCFF] rounded-sm shadow-xl px-2 py-8 nmd:p-4 w-[336px] md:w-[248px]  h-[264px] md:h-[400px] flex flex-row md:flex-col gap-2 ">
      <img
        className="w-[134px] md:w-[188px] h-[192px] md:h-[236px]"
        src="/book-cover.jpeg"
        alt="title"
      />
      <div>
        <h2 className="text-base font-bold text-[#212121] mt-2">
          Soyaya Runan Zuma
        </h2>
        <p className="p-style">Title</p>
        <p className="p-style">Category</p>
      </div>
    </div>
  );
}

export default BookCard;
