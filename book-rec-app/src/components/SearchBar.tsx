import React, { useState } from "react";
import styled from "styled-components";


const SearchBarWrapper = styled.div`
`
const SearchInputDiv = styled.div`
    display: flex;
`

const StyledInput = styled.input`
    background-color: white;
    border: 0px;
    border-radius: 2px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 10px;
    height: auto;
    width: 300px;
    font-size: 16px;
`
const DataResultDiv = styled.div`
    margin-top: 5px;
    width: 300px;
    max-height: 300px;
    background-color: white;
    box-shadow: rgba(0,0,0,0.35) 0px 5px 15px;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`

const DataItem = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    color: black;
    &:hover {
        background-color: lightgrey;
    }
    cursor: pointer;
    padding: 4px;
    margin: 0 6px 0 6px;
`

type BookDataProps = {
    title: string;
}

type SearchBarProps = {
    placeholder: string;
    data: BookDataProps[];
}

export function SearchBar(props: SearchBarProps) {
    const { placeholder, data } = props;
    const [filteredData, setFilteredData] = useState<BookDataProps[]>([]);

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputEntered = event.target.value;
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(inputEntered.toLowerCase());
        });

        if (inputEntered == "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter);
        }
    }

    const handleBookClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // navigate(/book_id)
    }

    return (
        <SearchBarWrapper>
            <SearchInputDiv>
                <StyledInput 
                    type="text" 
                    placeholder={placeholder} 
                    onChange={(e) => handleFilter(e)}
                />
            </SearchInputDiv>
            { filteredData.length != 0 &&
                <DataResultDiv>
                    {filteredData.slice(0, 15).map((value, key) => {
                        return(
                            <DataItem onClick={handleBookClick}>
                                <p>{value.title}</p>
                            </DataItem>
                        );
                    })}
                </DataResultDiv>
            }
        </SearchBarWrapper>
    )
}
