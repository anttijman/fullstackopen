const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.p} {props.e}
      </p>
    </>
  )
}

/* const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part p={props.part1.name} e={props.part1.exercises} />
      <Part p={props.part2.name} e={props.part2.exercises} />
      <Part p={props.part3.name} e={props.part3.exercises} />
    </>
  )
} */

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part p={props.parts[0].name} e={props.parts[0].exercises} />
      <Part p={props.parts[1].name} e={props.parts[1].exercises} />
      <Part p={props.parts[2].name} e={props.parts[2].exercises} />
    </>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

/* const Total = (props) => {
  console.log(props)
  return (
    <>
      <p>
        Number of exercises {props.p1.exercises + props.p2.exercises + props.p3.exercises}
      </p>
    </>
  )
} */

const Total = (props) => {
  console.log(props)
  return (
    <>
      <p>
        Number of exercises {props.p[0].exercises + props.p[1].exercises + props.p[2].exercises}
      </p>
    </>
  )
}

const App = () => {
  /* const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ] */
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total p={course.parts} />
    </div>
  )
}

export default App