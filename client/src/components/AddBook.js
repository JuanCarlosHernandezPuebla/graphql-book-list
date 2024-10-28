import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, GET_BOOKS, ADD_BOOK } from "../queries/queries";
import { useState } from "react";

const AddBook = () => {
  const { loading, error: getAuthorError, data } = useQuery(GET_AUTHORS);
  const [bookForm, setBookForm] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const [addBook, { error: addBookError }] = useMutation(ADD_BOOK, {
    errorPolicy: "all",
  });

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      await addBook({
        variables: { ...bookForm },
        refetchQueries: [{ query: GET_BOOKS }],
      });
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  return (
    <div>
      {addBookError && (
        <div className="m-3" role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Errors
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <ul>
              {addBookError?.graphQLErrors?.map(({ message }, i) => (
                <li className="py-2" key={i}>
                  {message}
                </li>
              ))}
              {addBookError?.networkError?.result?.errors?.map(
                ({ message }, i) => (
                  <li className="py-2" key={i}>
                    {message}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
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
    </div>
  );
};

export default AddBook;
