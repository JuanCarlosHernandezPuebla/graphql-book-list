import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

function App() {
  return (
    <div className="p-0 box-border w-3/5 h-full">
      <h1>Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
