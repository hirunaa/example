import React, { useState } from 'react'
import keywords from '../keyword/keyword'

const body = {
    display: "flex", justifyContent: "flex-start", alignItems: "center",
    width: "100%", height: "100vh", flexDirection: "column", position: "fixed", top: "45%"
}
const listContainer = {
    border: "1px solid #000000", width: "330px",
    height: "auto", flexDirection: "column", display: "none", fontSize: "14px"
}
const keywordBox = {
    marginBlockEnd: "0", marginBlockStart: "0",
    paddingTop: "10px", paddingBottom: "10px", paddingLeft: "3px",
    cursor: "pointer", backgroundColor: "#ffffff"
}
const Keyword = [];
let keywordList = [];
let listIndex = -1;

function MainPage() {
    const [SearchCommend, setSearchCommend] = useState("")
    const onSearchHandler = (event) => {
        setSearchCommend(event.currentTarget.value)
        let SearchValue = event.currentTarget.value;
        Keyword.splice(0, Keyword.length);
        if (SearchValue !== "" && SearchValue !== " ") {
            FindEqualKeyword(SearchValue)
        }
        else {
            document.getElementById("keywordContainer").style.display = "none"
        }

    }

    const onSubmitHandler = (event) => {
        document.getElementById("search").submit()
    }

    const onBlurHandler = (event) => {
        //console.log(event.relatedTarget)
        if (event.relatedTarget === null) {
            document.getElementById("keywordContainer").style.display = "none"
        }

    }
    const onClickHandler = (event) => {
        //console.log(event.target)
        document.getElementById("input").value = event.target.innerText
        document.getElementById("search").submit()
    }
    const onInputHandler = (e) => {
        //console.log("input")
        //console.log(e.key)
        keywordBoxColorInit()
        if (e.key === "ArrowDown") {
            if (listIndex === document.querySelectorAll("p").length - 1) {
                listIndex = 0
            }
            else {
                listIndex++
            }
            document.querySelectorAll("p")[listIndex].focus()
            document.querySelectorAll("p")[listIndex].style.backgroundColor="#cccccc"
            document.getElementById("input").value = document.querySelectorAll("p")[listIndex].innerText
        }
        else if (e.key === "ArrowUp") {
            if (listIndex === 0) {
                listIndex = document.querySelectorAll("p").length - 1
            }
            else {
                listIndex--
            }
            document.querySelectorAll("p")[listIndex].focus()
            document.querySelectorAll("p")[listIndex].style.backgroundColor="#cccccc"
            document.getElementById("input").value = document.querySelectorAll("p")[listIndex].innerText
            e.preventDefault();
        }
    }

    const onMouseEnterHandler = (e) => {
        e.target.style.backgroundColor = "#dddddd"
    }
    const onMouseLeaveHandler = (e) => {
        e.target.style.backgroundColor = "#ffffff"
    }

    function keywordBoxColorInit()
    {  
        for(var i=0; i<document.querySelectorAll("p").length; i++)
        {
            document.querySelectorAll("p")[i].style.backgroundColor="#ffffff"
        }
    }

    function FindEqualKeyword(input) {
        for (var i = 0; i < keywords.length; i++) {

            if (keywords[i].keyword.toUpperCase().indexOf(input.toUpperCase()) === 0) {
                document.getElementById("keywordContainer").style.display = ""
                Keyword.push(keywords[i].keyword)
            }

        }

    }


    keywordList = Keyword.map((keyword, index) => (<p key={index} style={keywordBox}
        onMouseLeave={onMouseLeaveHandler}
        onMouseEnter={onMouseEnterHandler}
        >{keyword}</p>))

    return (
        <div style={body}>
            <div style={{ display: "flex" }}>
                <form id="search" action="https://www.google.com/search" method="get">
                    <input name="q" type="search" placeholder="Google검색 또는 URL입력" spellCheck="false" id="input" value={SearchCommend}
                        onChange={onSearchHandler} onBlur={onBlurHandler} onKeyDown={onInputHandler} autoComplete="off"
                        style={{ width: "330px", height: "30px" }} />
                </form>
            </div>
            <div id="keywordContainer" style={listContainer} tabIndex={0} onClick={onClickHandler} >
                {keywordList}
            </div>
        </div>

    )
}

export default MainPage