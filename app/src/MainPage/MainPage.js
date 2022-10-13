import React, { useEffect, useState } from 'react'
import keywords from '../keyword/keyword'
//import { Axios } from 'axios'
//import { PromiseProvider } from 'mongoose';
//import {useDispatch} from 'react-redux'
const body= {
    display: "flex", justifyContent: "flex-start", alignItems: "center",
    width: "100%", height: "100vh", flexDirection: "column", position:"absolute", top: "45%"
}
const listContainer = {
    border: "1px solid #000000", width: "210px",
    height: "auto", display: "flex", flexDirection: "column"
}

const Keyword = [];
let keywordList;


function MainPage() {
    const [SearchCommend, setSearchCommend] = useState("")
    const onSearchHandler = (event) => {
        setSearchCommend(event.currentTarget.value)
        let SearchValue = event.currentTarget.value;
        Keyword.splice(0, Keyword.length);
        if(SearchValue !== "" && SearchValue !==" ")
        {
            FindEqualKeyword(SearchValue)
        }
    }
    keywordList = Keyword.map((keyword, index) => <p key={index}>{keyword}</p>)
    
    const onSubmitHandler = (event) => {
        document.getElementById("search").submit()
    }

    const onBlurHandler = () => {
        console.log("dd")
        console.log(Keyword)
        Keyword.splice(0, Keyword.length);
    }

    function FindEqualKeyword(input){
        for(var i=0; i<keywords.length; i++)
        {
            
            if(keywords[i].keyword.toUpperCase().indexOf(input.toUpperCase())===0)
            {
                Keyword.push(keywords[i].keyword)
            }
        }
    }
    
    return (
        <div style={body}>
            <div style={{display: "flex"}}>
                <form id="search" action="https://www.google.com/search" method="get">
                    <input name="q" type="search" placeholder="Google검색 또는 URL입력" id="input" value={SearchCommend} onChange={onSearchHandler} onBlur={onBlurHandler} autoComplete="off"/>
                </form>
            <button type="submit" onClick={onSubmitHandler}>검색</button>
            </div>
            <div id="keywordContainer" style={listContainer} >
                {keywordList}
            </div>    
        </div>

    )
}

export default MainPage