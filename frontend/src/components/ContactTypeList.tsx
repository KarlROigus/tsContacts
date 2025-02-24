import React from "react";
import NewContactType from "./NewContactType";

interface ContactTypeListProps {
  contactTypes: { id: number; type: string }[];
  onAddContactType: (type: string) => void;
}

const ContactTypeList: React.FC<ContactTypeListProps> = ({
  contactTypes,
  onAddContactType,
}) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Contact Type List</h1>
      <NewContactType onAddContactType={onAddContactType} />

      {/* Table for displaying the contact types */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {contactTypes.map((each) => (
            <tr key={each.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{each.type}</td>
              <td className="px-4 py-2">
                {/* You can add more actions here if necessary */}
                <button className="text-cyan-500 hover:text-cyan-700">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTypeList;
