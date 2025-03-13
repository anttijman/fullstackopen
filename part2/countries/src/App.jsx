import { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const Filter = (props) => (
  <div>
    find countries <input 
      value={props.filter}
      onChange={props.handleFilterChange}
    />
  </div>
)

const CountryName = (props) => (
  <div>{props.name}<button onClick={props.setCountry}>Show</button></div>
)

const Country = (props) => {
  const langs = props.languages
  const languages = [...new Set(Object.values(langs))];
  console.log(languages)
  return(<div>
    <h1>{props.name}</h1>
    Capital {props.capital}
    <br></br>
    Area {props.area}
    <h2>Languages</h2>
    <ul>
      {languages.map(language => 
        <li key={language}>{language}</li>
      )}
    </ul>
    <img 
      src={props.flag}
      alt="new"
      />
  </div>)
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [oneCountry, setoneCountry] = useState('')
  //const [tenOrLess, setTenOrLess] = useState(false)

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setoneCountry('')
  }

  const setCountry = (countryName) => {
    console.log(`setCountry ${countryName}`)
    setoneCountry(countryName)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get(`${baseUrl}/all`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        console.log(typeof countries)
        console.log(countries[0])
      })
  }, [])
  console.log('countriesToShow')
  var countriesFiltered = []
  if (oneCountry.length > 0) {
    console.log(`oneCountry length > 0`)
    countriesFiltered = countries.filter(country => country.name.common.includes(oneCountry))
    console.log(`set oneCountry back to ''`)
  }
  else {
    console.log(`oneCountry length = 0`)
    countriesFiltered = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  }
  console.log(`countriesFiltered ${countriesFiltered}`)
  console.log(`countriesFiltered length ${countriesFiltered.length}`)

  if (countriesFiltered.length === 0) {
    return null
  }

  var tenOrLess = false
  var onlyOne = false
  var moreThanTen = true

  if (countriesFiltered.length === 1) {
    onlyOne = true
    moreThanTen = false
  } else if (countriesFiltered.length <= 10) {
    tenOrLess = true
    moreThanTen = false
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {moreThanTen && <p>Too many matches, specify another filter</p>}
      {tenOrLess && countriesFiltered.map(country => 
          <CountryName
          key={country.name.common}
          name={country.name.common}
          setCountry={() => setCountry(country.name.common)}
          />
        )}
      {onlyOne && countriesFiltered.map(country => 
          <Country
          key={country.name.common}
          name={country.name.common}
          capital={country.capital}
          area={country.area}
          languages={country.languages}
          flag={country.flags.png}
          />
        )}
    </div>
  )
}

export default App
