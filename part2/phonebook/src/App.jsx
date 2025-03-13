import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => (
  <div>
    filter shown with <input 
      value={props.filter}
      onChange={props.handleFilterChange}
    />
  </div>
)

const PersonForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      name: <input 
        value={props.nameValue}
        onChange={props.nameOnChange}
      />
    </div>
    <div>
      number: <input 
        value={props.numberValue}
        onChange={props.numberOnChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = (props) => (
  <ul>
    {props.persons.map(person => 
      <div key={person.id}>{person.name} {person.number}</div>
    )}
  </ul>
)

const Person = (props) => (
  <div>{props.name} {props.number}<button onClick={props.deletePerson}>delete</button></div>
  
)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: 'green',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message.startsWith("Information")) {
    notificationStyle.color = 'red'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(obj => obj.name === newName)) {
      if (!confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }
      console.log(`Updating phonebook for ${newName}`)
      const person = persons.find(p => p.name === newName)
      const changedPerson = {...person, number: newNumber}
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.name === returnedPerson.name ? returnedPerson : p ))
          setErrorMessage(
            `Updated ${person.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of  ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
      return
    }
    console.log(`Creating new person with ${newName}`)

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log('promise fulfilled for adding person')
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setErrorMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of  ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const deletePersonOf = (person) => {
    console.log(`delete person with id: ${person.id}`)
    if (!confirm(`Delete ${person.name}?`)) {
      return
    }
    personService
      .delPerson(person.id)
      .then(deletedPerson => {
        console.log('promise fulfilled for adding person')
        console.log(deletedPerson)
        setPersons(persons.filter(p => p.id !== deletedPerson.id))
      })
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => deletePersonOf(person)}
          />
        )}
      </ul>
    </div>
  )
}

export default App