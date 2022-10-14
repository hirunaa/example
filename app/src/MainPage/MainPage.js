import React, { useState } from 'react'
import keywords from '../keyword/keyword'
import micIcon from "../image/mic_icon.png"
import searchIcon from "../image/search_icon.png"
import ChromeLogo from "../image/logo.png"
const body = {
    display: "flex", justifyContent: "flex-start", alignItems: "center",
    width: "100%", height: "100vh", flexDirection: "column", position: "fixed", top: "30%"
}
const listContainer = {
    width: "453px", boxShadow: "0 3.3px 4px #9e9e9e",
    height: "auto", flexDirection: "column", display: "none", fontSize: "15px",
    border: "1px solid #aaaaaa", borderTop: "0px",position: "relative",
    left: "7px" 
    
}
const keywordBox = {
    marginBlockEnd: "0", marginBlockStart: "0",
    paddingTop: "10px", paddingBottom: "10px", paddingLeft: "5px",
    cursor: "pointer", backgroundColor: "", paddingInlineStart: "44px"
}
const inputBox = {
    width: "357px", height: "40px", paddingInlineStart: "44px", paddingInlineEnd: "52px", fontSize:"15px",
    borderRadius: "22px", border: "1px solid #aaaaaa", outline: "none", boxShadow: "0 1 4px #9e9e9e", position: "relative",
    left: "30px", marginRight: "0"

}
const micImg = {
    width: "30px", height: "30px", position: "relative", top: "8px", right: "26px"
}
const searchImg = {
    width: "17px", height: "17px", position: "relative", top: "3px", right: "410px"
}
const ChromeImg = {
    width :"300px", marginBottom: "50px", marginTop: "50px"
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

        if(Keyword.length===0)
        {
            removeKeywordContainer()
        }

    }

    const onBlurHandler = (event) => {
        //console.log(event.relatedTarget)
        if (event.relatedTarget === null) {
            removeKeywordContainer()
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
            document.getElementsByClassName("listBox")[listIndex].style.backgroundColor="#cccccc"
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
            document.getElementsByClassName("listBox")[listIndex].style.backgroundColor="#cccccc"
            document.getElementById("input").value = document.querySelectorAll("p")[listIndex].innerText
            e.preventDefault();
        }
    }

    const onMouseEnterHandler = (e) => {
        e.target.style.backgroundColor = "#dddddd"
    }
    const onMouseLeaveHandler = (e) => {
        e.target.style.backgroundColor = ""
    }
    function removeKeywordContainer()
    {
        document.getElementById("keywordContainer").style.display = "none"
        document.getElementById("input").style.borderRadius="22px"
        document.getElementById("input").style.borderBottom="1px solid #aaaaaa"
    }
    function setKeywordContainer()
    {
        document.getElementById("keywordContainer").style.display = ""
        document.getElementById("input").style.borderBottom="0px"
        document.getElementById("input").style.borderTopLeftRadius="7px"
        document.getElementById("input").style.borderTopRightRadius="7px"
        document.getElementById("input").style.borderBottomLeftRadius="0px"
        document.getElementById("input").style.borderBottomRightRadius="0px"
    }

    function keywordBoxColorInit()
    {  
        for(var i=0; i<document.querySelectorAll("p").length; i++)
        {
            document.getElementsByClassName("listBox")[i].style.backgroundColor=""
        }
    }
    /**
     * 입력받은 단어로 시작되는 키워드를 찾아내는 함수.
     * @param {String} input 
     */
    function FindEqualKeyword(input) {
        for (var i = 0; i < keywords.length; i++) {

            if (keywords[i].keyword.toUpperCase().indexOf(input.toUpperCase()) === 0) {
                setKeywordContainer()
                Keyword.push(keywords[i].keyword)
            }

        }

    }


    keywordList = Keyword.map((keyword, index) => (<div className='listBox' key={index}><p key={index} style={keywordBox}
        onMouseLeave={onMouseLeaveHandler}
        onMouseEnter={onMouseEnterHandler}
        >{keyword}</p></div>))

    return (
        <div style={body}>
            <div><img src={ChromeLogo} style={ChromeImg} alt=""/></div>
            <div style={{ display: "flex" }}>
                <form id="search" action="https://www.google.com/search" method="get">
                    <div>
                        <input name="q" type="text" placeholder="Google검색 또는 URL입력" spellCheck="false" id="input" value={SearchCommend}
                            onChange={onSearchHandler} onBlur={onBlurHandler} onKeyDown={onInputHandler} autoComplete="off"
                            style={inputBox} />
                        <img src={searchIcon} style={searchImg} alt="" />
                        <img src={micIcon} style={micImg} alt="" />
                    </div>
                </form>
            </div>
            <div id="keywordContainer" style={listContainer} tabIndex={0} onClick={onClickHandler} >
                {keywordList}
            </div>
        </div>

    )
}

export default MainPage