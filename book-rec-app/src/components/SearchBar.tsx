import React from "react";

type SearchBarProps = {
    placeholder: string;
    data: string;
}

export function SearchBar(props: SearchBarProps) {
    const { placeholder, data } = props;

    return (
        <div>
            <div>
                <input type="text" placeholder={placeholder} />
                <div></div>
            </div>
        </div>
    )
}
