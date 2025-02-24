import PersonList from './components/PersonList'
import ContactTypeList from './components/ContactTypeList';
import { useState, useEffect } from 'react';
import { Person } from './models/Person';
import { ContactType } from './models/ContactType';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  const [persons, setPersons] = useState<Person[]>([]);
  const [contactTypes, setContactTypes] = useState<ContactType[]>([]);


  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await fetch("http://localhost:3000/persons");
        if (!response.ok) throw new Error("Failed to fetch persons");

        const data = await response.json();

        const personList: Person[] = data.persons;

        setPersons(personList);
      } catch (error) {
        console.error("Error fetching persons:", error);
      }
    };

    fetchPersons();
  }, []);

  const personAddHandler = (name: string) => {
    setPersons(prevPersons => 
      [...prevPersons,
      {id: Math.random(), name: name}])
  }

  const contactTypeAddHandler = (type: string) => {
    setContactTypes(prevContactTypes => 
      [...prevContactTypes, 
      {id: Math.random(), type: type}])
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/persons"
            element={<PersonList persons={persons} onAddPerson={personAddHandler} />}
          />
          <Route
            path="/contacttypes"
            element={<ContactTypeList contactTypes={contactTypes} onAddContactType={contactTypeAddHandler} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
