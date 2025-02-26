import PersonList from './components/PersonList'
import ContactTypeList from './components/ContactTypeList';
import ContactList from './components/ContactList'
import { useState, useEffect } from 'react';
import { Person } from './models/Person';
import { ContactType } from './models/ContactType';
import { Contact } from './models/Contact'
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'



function App() {

  const [persons, setPersons] = useState<Person[]>([]);
  const [contactTypes, setContactTypes] = useState<ContactType[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:3000/contacts");
        if (!response.ok) throw new Error("Failed to fetch contacts");

        const data = await response.json();

        const contactList: Contact[] = data.contacts;

        setContacts(contactList);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);



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
  

  const contactTypeAddHandler = async (type: string) => {
    
    const newContactType = { type };


    try {

      const response = await fetch('http://localhost:3000/contacttypes', {
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

      const response = await fetch('http://localhost:3000/contacts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact)
      })

      if (!response.ok) {
        throw new Error("Failed to add contact to backend");
      }

      const addedContact = await response.json();

      console.log(addedContact);

      setContacts((prevContacts) => [...prevContacts, addedContact]);


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
