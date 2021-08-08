const Authors = ({ authors }) => {
  return (
    <ul>
      {authors.map((authors) => (
        <li key={authors.id}>{authors.name}</li>
      ))}
    </ul>
  );
};

export default Authors;
