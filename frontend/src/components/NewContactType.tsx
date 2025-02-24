import React, {useRef} from "react";

interface NewContactTypeProps {
    onAddContactType: (type: string) => void;
}

const NewContactType: React.FC<NewContactTypeProps> = ( {onAddContactType }) => {
    const typeInputRef = useRef<HTMLInputElement>(null);

    const typeSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredName = typeInputRef.current!.value;

        onAddContactType(enteredName);

    };

    return <form onSubmit={typeSubmitHandler}>
        <div>
            <label htmlFor="contact-type-name">Contact Type Name:</label>
            <input type="text" id="contact-type-name" ref={typeInputRef}/>
        </div>
        <button type="submit">ADD CONTACT TYPE</button>
    </form>
}

export default NewContactType