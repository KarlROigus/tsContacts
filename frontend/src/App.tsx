import PersonList from './components/PersonList'
import ContactTypeList from './components/ContactTypeList';
import { useState, useEffect } from 'react';
import { Person } from './models/Person';
import { ContactType } from './models/ContactType';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'



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

  useEffect(() => {
    const fetchContactTypes = async () => {
      try {
        const response = await fetch('http://localhost:3000/contacttypes');
        if (!response.ok) throw new Error('Failed to fetch contact types');

        const data = await response.json();

        const contactTypeList: ContactType[] = data.contactTypes;

        setContactTypes(contactTypeList);
      } catch (error) {
        console.error("Error fetching contacttypes: ", error);
      }
    
    }

    fetchContactTypes();
  }, []);

  const personAddHandler = async (name: string) => {
    const newPerson = { name };
  
    try {
      
      const response = await fetch("http://localhost:3000/persons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add person to backend");
      }
  
      const addedPerson = await response.json(); 

      setPersons((prevPersons) => [...prevPersons, addedPerson]);
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };
  

  const contactTypeAddHandler = (type: string) => {
    setContactTypes(prevContactTypes => 
      [...prevContactTypes, 
      {id: Math.random(), type: type}])
  }

  return (
    <Router>
      <Navbar />
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
