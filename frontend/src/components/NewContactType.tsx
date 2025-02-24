import React, { useRef } from "react";

interface NewContactTypeProps {
  onAddContactType: (type: string) => void;
}

const NewContactType: React.FC<NewContactTypeProps> = ({ onAddContactType }) => {
  const typeInputRef = useRef<HTMLInputElement>(null);

  const typeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredType = typeInputRef.current!.value;

    onAddContactType(enteredType);
  };

  return (
    <form
      onSubmit={typeSubmitHandler}
      className="mb-4 flex items-center space-x-2"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-type-name"
          className="text-lg font-medium mb-1"
        >
          Contact Type Name:
        </label>
        <input
          type="text"
          id="contact-type-name"
          ref={typeInputRef}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter contact type.."
        />
        <button
          type="submit"
          className="p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-700 focus:outline-none"
        >
          Add Contact Type
        </button>
      </div>
    </form>
  );
};

export default NewContactType;
