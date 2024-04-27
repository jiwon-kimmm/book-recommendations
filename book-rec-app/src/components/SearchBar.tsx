import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const SearchBarWrapper = styled.div`
`
const SearchInputDiv = styled.div`
    display: flex;
`

const StyledInput = styled.input`
    background-color: #b9978540;
    border: 0px;
    border-radius: 2px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 10px;
    height: auto;
    width: 300px;
    font-size: 16px;
    &:focus {
        outline: none;
    };
    &::placeholder {
        color: #989BA0;
        font-weight: normal;
    };
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
        background-color: #b9978540;
    }
    cursor: pointer;
    padding: 4px;
    margin: 0 6px 0 6px;
    transition: 0.3s;
`

type BookDataProps = {
    title: string;
    book_id: string;
}

type SearchBarProps = { 
    placeholder: string;
    data: BookDataProps[];
}

export function SearchBar(props: SearchBarProps) {
    const { placeholder, data } = props;
    const [hideSearch, setHideSearch] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<BookDataProps[]>([]);
    const navigate = useNavigate();

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputEntered = event.target.value;
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(inputEntered.toLowerCase());
        });

        if (inputEntered == "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }

    const handleBookClick = (bookId: string) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        // event.preventDefault();
        navigate(`/${bookId}`);
        window.location.reload();
    };

    const hideSearchFunction = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        setHideSearch(true);
    }

    const appearSearchFunction = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        setHideSearch(false);
    }

    return (
        <SearchBarWrapper onBlur={hideSearchFunction} onFocus={appearSearchFunction}>
            <SearchInputDiv>
                <StyledInput 
                    type="text" 
                    placeholder={placeholder} 
                    onChange={(e) => handleFilter(e)}
                />
            </SearchInputDiv>
            {/* { filteredData.length != 0 && !hideSearch && */}
            { filteredData.length != 0 &&
                <DataResultDiv>
                    {filteredData.slice(0, 15).map((value, key) => {
                        return(
                            <DataItem key={value.book_id} onClick={handleBookClick(value.book_id)}>
                                <p>{value.title}</p>
                            </DataItem>
                        );
                    })}
                </DataResultDiv>
            }
        </SearchBarWrapper>
    )
}
