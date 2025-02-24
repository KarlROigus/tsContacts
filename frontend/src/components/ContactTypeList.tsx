import React from "react";
import NewContactType from "./NewContactType"

interface ContactTypeListProps {
    contactTypes: {id: number, type: string}[]
    onAddContactType: (type: string) => void;
}


const ContactTypeList: React.FC<ContactTypeListProps> = ( {contactTypes, onAddContactType}) => {
    return (
        <div>
          <h1>Contact Type List</h1>
          <NewContactType onAddContactType={onAddContactType} /> 
          <ul>
            {contactTypes.map((each) => (
              <li key={each.id}>{each.type}</li>
            ))}
          </ul>
        </div>
      );
}


export default ContactTypeList