import React, { useState } from 'react'
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
    height: "auto", flexDirection: "column", display:"none"
}
const keywordBox = {
    marginBlockEnd: "0", marginBlockStart: "0",
    paddingTop : "10px", paddingBottom: "10px", paddingLeft: "3px",
    cursor :"pointer", backgroundColor: "#ffffff"
}
const Keyword = [];
let keywordList = [];
let listIndex=-1;

function MainPage() {
    const [SearchCommend, setSearchCommend] = useState("")
    const onSearchHandler = (event) => {
        console.log("ㅇㅇ")
        setSearchCommend(event.currentTarget.value)
        let SearchValue = event.currentTarget.value;
        Keyword.splice(0, Keyword.length);
        if(SearchValue !== "" && SearchValue !==" ")
        {
            FindEqualKeyword(SearchValue)
        }
        else
        {
            document.getElementById("keywordContainer").style.display="none"
        }
    }
    
    const onSubmitHandler = (event) => {
        document.getElementById("search").submit()
    }

    const onBlurHandler = (event) => {
        console.log(event.relatedTarget)
        if(event.relatedTarget===null)
        {
            document.getElementById("keywordContainer").style.display="none"
        }
        
    }
    const onClickHandler = (event) => {
        console.log(event.target)
        document.getElementById("input").value=event.target.innerText
        document.getElementById("search").submit()
    }
    const onInputHandler = (e) => {
        console.log("input")
        console.log(e.key)
        if(e.key==="ArrowDown")
        {
            if(listIndex==document.querySelectorAll("p").length-1)
            {
                listIndex=0
            }
            else
            {
                listIndex++
            }
            document.querySelectorAll("p")[listIndex].focus()
            document.getElementById("input").value=document.querySelectorAll("p")[listIndex].innerText
        }
    }

    function FindEqualKeyword(input){
        for(var i=0; i<keywords.length; i++)
        {
            
            if(keywords[i].keyword.toUpperCase().indexOf(input.toUpperCase())===0)
            {
                document.getElementById("keywordContainer").style.display=""
                Keyword.push(keywords[i].keyword)
            }
            
        }
        
    }


    keywordList = Keyword.map((keyword, index) => <p key={index} style={keywordBox}>{keyword}</p>)
        
    return (
        <div style={body}>
            <div style={{display: "flex"}}>
                <form id="search" action="https://www.google.com/search" method="get">
                    <input name="q" type="search" placeholder="Google검색 또는 URL입력" id="input" value={SearchCommend} 
                    onChange={onSearchHandler} onBlur={onBlurHandler} onKeyDown={onInputHandler} autoComplete="off"/>
                </form>
            <button type="submit" onClick={onSubmitHandler}>검색</button>
            </div>
            <div id="keywordContainer" style={listContainer} tabIndex={0} onClick={onClickHandler} >
                {keywordList}
            </div>    
        </div>

    )
}

export default MainPage