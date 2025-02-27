import React from "react";
import NewPerson from "./NewPerson";

interface PersonListProps {
    persons: {id: number, name: string}[]
    onAddPerson: (name: string) => void;
}

const PersonList: React.FC<PersonListProps> = ({persons, onAddPerson}) => {

  return (
    <div className="p-6" >
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-semibold mb-4">Person List</h1>
        <NewPerson onAddPerson={onAddPerson}/>

        {/* Table for displaying the persons */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((each) => (
              <tr key={each.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{each.name}</td>
                <td className="px-4 py-2">
                  {/* You can add more actions here if necessary */}
                  <button className="text-cyan-500 hover:text-cyan-700">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default PersonList