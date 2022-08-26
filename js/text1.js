//document.ready
$( document ).ready(function() {
    
    //console.log("dd");
    var searchInput= document.getElementById("input");
    // var container= document.getElementsByClassName("container")[0];
    var container = $(".keywordsBox");
    searchInput.onfocus=function() {
        // container.style.border="1px solid #000000";
        // container.style.opacity="1";
        // container.style.zIndex="1";
        container.addClass("onFocus");
    }
    searchInput.onblur=function() {
        // container.style.border="0px solid #000000";
        // container.style.opacity="0";
        // container.style.zIndex="-1";
        container.removeClass("onFocus");
    }

    var icon_src=["../images/Instagram_Icon.png", "../images/Chrome.png", "../images/add_icon.png"];
    var site_name=["Instagram","Chrome", "add"];

    for(var i=0; i<icon_src.length; i++)
    {
        
        let iconList = document.getElementsByClassName("icon_table")[0].cloneNode(true);
        let iconbox  = document.getElementById("icon_container");

        iconList.querySelector(".icon").setAttribute('src',icon_src[i]);
        iconList.querySelector(".siteName").innerText=site_name[i];
        iconbox.appendChild(iconList);
        
        
    }
    // input창에 "유"입력 시 연관검색어 출력. 글자를 지울 경우 리스트 삭제
    
    let recomList = ["유튜브 프리미엄","유튜브 미리보기","유튜브 검색하는 법"];
    var search_keywords= document.getElementsByClassName("showKeywords")[0];
    //var search_keywords = $(".showKeywords");
    //var search_keywords = $("search_keywords");
    function keywordsList(eqkeywords)
    {
        rmkeywords();
        for(var i=0; i<recomList.length; i++)
        {
            //console.log(i);
            if(recomList[i].indexOf(eqkeywords)!=-1)
            {
                console.log(i);
                var keywords = document.getElementsByClassName("keywords")[0].cloneNode(true);
                var keywordsContainer = document.getElementById("search_keywords");
                
                keywords.querySelector(".keywordName").innerText=recomList[i];
                keywordsContainer.appendChild(keywords);
            }
        }
    }

    function rmkeywords()
    {
        var rmlist = document.querySelectorAll(".keywords");
        for(var i=1; i<rmlist.length; i++)
        {
            rmlist[i].remove();
        }

    }

    
    searchInput.onkeyup=function()
    {
        //console.log("keyup");
        rmkeywords();
        var searchValue = document.getElementById("input").value;
        for(var i=0; i<recomList.length; i++)
        {
            if(searchValue=="" || searchValue==" ")
            {
                search_keywords.style.opacity="0";
                search_keywords.style.zIndex="-2";
            }
            else if(recomList[i].indexOf(searchValue)!=-1)
            {
                console.log(searchValue);
                console.log("ㅇㅇ");
                keywordsList(searchValue);
                //search_keywords.addClass("onKeyup");
                search_keywords.style.opacity="1";
                search_keywords.style.zIndex="2";
                //search_keywords.attr("id", "onKeyup");
            }
            /*
            else
            {
                console.log("ㄴㄴ");
                //search_keywords.removeClass("onKeyup");
                //rmkeywords();
                search_keywords.style.opacity="0";
                search_keywords.style.zIndex="-2";
                //search_keywords.removeAttr("id", "onKeyup");
            }*/
        }
        
    }
    //keyup
    //indexOf
    // '유'를 다 쳤을 때 밑에 검색어 리스트 모두 렌더
    // 검색창에 글씨를 다 지웠을 때 리스트 모두 삭제
    



    //9월 1주차
    //추천 목록 여러개 추가 
    // 유동적으로 받아서 검색 추천
    //검색된 리스트 클릭 시 해당 단어 input 창 세팅 후 검색







});
