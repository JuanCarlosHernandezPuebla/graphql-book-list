import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <ul className="book-list">
        {loading ? (
          <div>Loading books...</div>
        ) : (
          data?.books?.map((book) => (
            <li
              className="book-item"
              key={book.id}
              onClick={() => setSelected(book.id)}
            >
              {book.name}
            </li>
          ))
        )}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
