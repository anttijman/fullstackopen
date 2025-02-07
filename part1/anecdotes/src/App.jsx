import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [arr, setArr] = useState(new Uint8Array(8))
  
  const handleVote = () => {
    const copy = [...arr]
    copy[selected] += 1
    setArr(copy)
  }
  // There is a more efficient way to do this but it works and efficiency doesnt matter much here
  let mostVotes = Math.max(...arr)
  let arrLocation = null

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === mostVotes) {
        arrLocation = i;
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      has {arr[selected]} votes
      <br></br>
      <Button onClick={handleVote} text="vote" />
      <Button onClick={() => setSelected(Math.floor(Math.random() * 8))} text="next anedcote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[arrLocation]}
      <br></br>
      has {mostVotes} votes
    </div>
  )
}

export default App