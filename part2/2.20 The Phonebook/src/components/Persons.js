const Persons = ({ persons, filter, handleDelete }) => {
  if (filter) {
    const copy = persons.filter((person) => person.name.includes(filter));
    return copy.map((person) => {
      return (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
      );
    });
  }
  return persons.map((person) => {
    return (
      <p key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDelete(person.id)}>delete</button>
      </p>
    );
  });
};

export default Persons;
