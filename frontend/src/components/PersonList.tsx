import React from "react";
import NewPerson from "./NewPerson";

interface PersonListProps {
    persons: {id: number, name: string}[]
    onAddPerson: (name: string) => void;
}

const PersonList: React.FC<PersonListProps> = ({persons, onAddPerson}) => {

    return (
        <div>
          <h1>Person List</h1>
          <NewPerson onAddPerson={onAddPerson} /> 
          <ul>
            {persons.map((each) => (
              <li key={each.id}>{each.name}</li>
            ))}
          </ul>
        </div>
      );

}
export default PersonList