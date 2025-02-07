import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  console.log(props)
  if (props.total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  let positive=props.good / props.total * 100
  positive=positive+ " %"
  console.log(positive)
  return (
    <div>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.total} />
          <StatisticLine text="average" value={(props.good - props.bad) / props.total} />
          <StatisticLine text="positive" value={positive} />
        </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)

  const handleGood = () => {
    console.log('value now', good)  // print the new value to console
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutral = () => {
    console.log('value now', neutral)  // print the new value to console
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBad = () => {
    console.log('value now', bad)  // print the new value to console
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App