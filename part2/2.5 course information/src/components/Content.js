import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return <Part key={Math.random()} part={part} />;
      })}
      <p>
        <b>
          total of{" "}
          {parts.reduce((sum, part) => {
            return (sum += part.exercises);
          }, 0)}{" "}
          exercises
        </b>
      </p>
    </>
  );
};

export default Content;
