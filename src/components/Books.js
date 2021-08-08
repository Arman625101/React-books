const Books = ({ books }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default Books;
