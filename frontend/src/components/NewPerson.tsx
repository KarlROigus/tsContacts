import React, { useRef } from "react";

interface NewPersonProps {
  onAddPerson: (name: string) => void;
}

const NewPerson: React.FC<NewPersonProps> = ({ onAddPerson }) => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const personSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredName = nameInputRef.current!.value;
    onAddPerson(enteredName);
    nameInputRef.current!.value = "";
  };

  return (
    <form onSubmit={personSubmitHandler} className="mb-4 flex items-center space-x-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="person-name" className="text-lg font-medium mb-1">Person Name:</label>
        <input
          type="text"
          id="person-name"
          ref={nameInputRef}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter person's name"
        />
        <button
        type="submit"
        className="p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-700  focus:outline-none"
      >
        Add Person
      </button>
      </div>

      
    </form>
  );
};

export default NewPerson;
