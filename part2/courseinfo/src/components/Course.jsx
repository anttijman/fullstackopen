const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => (
  <div>
    {props.parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Course = (props) => {
  console.log(props);
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total total={props.course.parts} />
    </div>
  )
}

const Total = (props) => {
  const total = props.total.reduce((sum, part) => sum + part.exercises, 0)
  /*var totalAmount = props.total.reduce(function(sum, part){
    return sum + part.exercises
  }, 0)*/
  console.log(total);
  return (
    <p>Total of {total} exercises</p>
  )
}

export default Course