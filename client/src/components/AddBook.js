import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, GET_BOOKS, ADD_BOOK } from "../queries/queries";
import { useState } from "react";

const AddBook = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [bookForm, setBookForm] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const [addBook] = useMutation(ADD_BOOK);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    addBook({
      variables: { ...bookForm },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="form-field">
        <label className="form-label">Book name:</label>
        <input
          type="text"
          onChange={(event) =>
            setBookForm((prevBook) => ({
              ...prevBook,
              name: event.target.value,
            }))
          }
        />
      </div>
      <div className="form-field">
        <label className="form-label">Genre:</label>
        <input
          type="text"
          onChange={(event) =>
            setBookForm((prevBook) => ({
              ...prevBook,
              genre: event.target.value,
            }))
          }
        />
      </div>
      <div className="form-field">
        <label className="form-label">Author:</label>
        <select
          onChange={(event) =>
            setBookForm((prevBook) => ({
              ...prevBook,
              authorId: event.target.value,
            }))
          }
        >
          <option>Select author</option>
          {loading ? (
            <option disabled>Loading Authors...</option>
          ) : (
            data?.authors?.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))
          )}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
