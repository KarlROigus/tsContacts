import React, { useRef } from "react";


interface NewPersonProps {
    onAddPerson: (name: string) => void;
}

const NewPerson: React.FC<NewPersonProps> = ({onAddPerson}) => {

    const nameInputRef = useRef<HTMLInputElement>(null);

    const personSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredName = nameInputRef.current!.value;

        onAddPerson(enteredName);

    };

    return <form onSubmit={personSubmitHandler}>
        <div>
            <label htmlFor="person-name">Person name:</label>
            <input type="text" id="person-name" ref={nameInputRef}/>
        </div>
        <button type="submit">ADD PERSON</button>
    </form>
};

export default NewPerson