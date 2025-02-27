import React, {useRef} from "react";

interface NewContactProps {

    persons: {id: number, name: string}[],
    contactTypes: {id: number, type: string}[],
    onAddContact: (chosenPerson: string, chosenType: string, value: string) => void;

}


const NewContact: React.FC<NewContactProps> = ({persons, contactTypes, onAddContact}) => {

    const personSelectRef = useRef<HTMLSelectElement>(null);
    const contactTypeSelectRef = useRef<HTMLSelectElement>(null);
    const contactValueInputRef = useRef<HTMLInputElement>(null);

    const handleAddContact = (event: React.FormEvent) => {

        event.preventDefault();

        const chosenPerson = personSelectRef.current!.value;
        const chosenType = contactTypeSelectRef.current!.value;
        const value = contactValueInputRef.current!.value;

        if (value === "") {
            alert("WHAT THE F??");
            return;
        }

        onAddContact(chosenPerson, chosenType, value);

    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 ">Add New Contact</h2>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Value:</label>
            <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter contact type.."
                ref={contactValueInputRef}
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Person:</label>
            <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                ref={personSelectRef}
            >
                <option value=""></option>
                {persons.map((person) => (
                    <option key={person.id} value={person.id}>
                        {person.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium">Contact Type:</label>
            <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                ref={contactTypeSelectRef}
            >
                <option value=""></option>
                {contactTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.type}
                    </option>
                ))}
            </select>
        </div>

        <button
            className="w-full bg-cyan-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleAddContact}
        >
            Add Contact
        </button>
    </div>)

};

export default NewContact