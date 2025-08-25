import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function BookDetails() {
  const { bookId } = useParams();
  console.log(bookId);
  console.log(bookId);

  return (
    <div>
      <div className="flex flex-row justify-between pt-6 items-center">
        <h1 className="h1-style">Book Details</h1>
        <button className="w-[24px] h-[24px]">
          <FaHeart className="icon" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6 mt-10 text-[#212121] text-[16px]">
        <div className="bg-[#F7FCFF] rounded-2xl w-[348px] h-[400px]  md:w-[352px] md:h-[492px] flex justify-center items-center col-span-1">
          <img
            className="w-[256px] h-[354px] md:w-[284px] md:h-[418px]"
            src="./book-cover.jpeg"
            alt=""
          />
        </div>

        <div className="col-span-2">
          <h2 className=" h2-style">Roots</h2>
          <p className="mb-6">Soyayya Ruwan Zuma</p>
          <h2 className="h2-style">Description</h2>
          <p className="leading-12 mb-6">
            In a village where tradition runs deep and silence hides
            generational truths, young Amina embarks on a journey to uncover the
            tangled roots of her family’s past. "Roots" is a powerful tale of
            identity, memory, and the quiet resilience of women who carry
            history in their bones. Soyaya Runan Zuma weaves a rich narrative of
            love, betrayal, and the search for belonging in a world where the
            past is never truly buried.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p>
              <strong>Publication Date:</strong>
            </p>
            <p>
              <strong>ISBN:</strong>
            </p>
            <p>
              <strong>Number of Pages:</strong>
            </p>
            <p>
              <strong>Subjects:</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
