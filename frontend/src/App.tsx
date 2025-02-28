import PersonList from './components/PersonList'
import ContactTypeList from './components/ContactTypeList';
import ContactList from './components/ContactList'
import { useState, useEffect } from 'react';
import { Person } from './models/Person';
import { ContactType } from './models/ContactType';
import { Contact } from './models/Contact'
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchContacts, fetchPersons, fetchContactTypes } from './utils/api';
import './index.css'


function App() {

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  
  const [persons, setPersons] = useState<Person[]>([]);
  const [contactTypes, setContactTypes] = useState<ContactType[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [contactsData, personsData, contactTypesData] = await Promise.all([
          fetchContacts(),
          fetchPersons(),
          fetchContactTypes(),
        ]);
  
        setContacts(contactsData);
        setPersons(personsData);
        setContactTypes(contactTypesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchInitialData();
  }, []);

  const personAddHandler = async (name: string) => {
    const newPerson = { name };

    try {
      
      const response = await fetch(`${API_BASE_URL}/persons`, {
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
  

  const contactTypeAddHandler = async (type: string) => {
    
    const newContactType = { type };
    try {

      const response = await fetch(`${API_BASE_URL}/contacttypes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContactType)
      })

      if (!response.ok) {
        throw new Error("Failed to add contact type to backend");
      }

      const addedContactType = await response.json();
      setContactTypes((prevContactTypes) => [...prevContactTypes, addedContactType]);

    } catch (e) {
      console.error("Error adding person:", e);
    }
  }

  const onAddContact = async (chosenPersonId: string, chosenTypeId: string, value: string) => {

    const newContact = { value, chosenPersonId, chosenTypeId}
        
    try {

      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact)
      })

      if (!response.ok) {
        throw new Error("Failed to add contact to backend");
      }

      const contacts = await fetchContacts();
      setContacts(contacts);

    } catch (e) {
      console.error("Error adding person:", e);
    }
  }

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
        <Route
            path="/"
            element={<ContactList contacts={contacts} persons={persons} contactTypes={contactTypes} onAddContact={onAddContact} />}
          />
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
