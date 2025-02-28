import { Contact } from "../models/Contact";
import { Person } from "../models/Person";
import { ContactType } from "../models/ContactType";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    if (!response.ok) throw new Error("Failed to fetch contacts");

    const data = await response.json();
    return data.contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export const fetchPersons = async (): Promise<Person[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/persons`);
      if (!response.ok) throw new Error("Failed to fetch persons");
  
      const data = await response.json();
      return data.persons;
    } catch (error) {
      console.error("Error fetching persons:", error);
      return [];
    }
  };

  export const fetchContactTypes = async (): Promise<ContactType[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacttypes`);
      if (!response.ok) throw new Error("Failed to fetch contact types");
  
      const data = await response.json();
      return data.contactTypes;
    } catch (error) {
      console.error("Error fetching contact types:", error);
      return []; 
    }
  };