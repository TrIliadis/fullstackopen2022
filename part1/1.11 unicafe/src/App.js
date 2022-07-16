import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  if (Number.isNaN(value)) return <p>{text}</p>;
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
};

const Statistics = ({ good, neutral, bad, score }) => {
  if (good + neutral + bad === 0) return <p>No feedback given</p>;
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={good + neutral + bad} />
          </tr>
          <tr>
            <StatisticLine
              text="average"
              value={score / (good + neutral + bad)}
            />
          </tr>
          <tr>
            <StatisticLine
              text="positive"
              value={(good / (good + neutral + bad)) * 100}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [score, setScore] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setScore(score + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setScore(score - 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <Statistics good={good} bad={bad} neutral={neutral} score={score} />
    </div>
  );
};

export default App;
