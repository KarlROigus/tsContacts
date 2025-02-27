import React from "react";
import NewContact from "./NewContact";

interface ContactListProps {
    contacts: { id: number; value: string, personname: string, contacttypevalue: string }[];
    persons: {id: number, name: string}[];
    contactTypes: {id: number, type: string}[],
    onAddContact: (chosenPerson: string, chosenType: string, value: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, persons, contactTypes, onAddContact }) => {
    return (
        <div className="p-6">
            <NewContact persons={persons} contactTypes={contactTypes} onAddContact={onAddContact}/>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Value</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Person</th>
                            <th className="px-6 py-3 text-left text-gray-700 font-semibold">ContactType</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr
                                key={contact.id}
                                className={`border-b ${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-100 transition`}
                            >
                                <td className="px-6 py-4 text-gray-800">{contact.value}</td>
                                <td className="px-6 py-4 text-gray-800">{contact.personname}</td>
                                <td className="px-6 py-4 text-gray-800">{contact.contacttypevalue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
            
            
        </div>
    );
};

export default ContactList;
