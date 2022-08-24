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
        let iconName = document.getElementsByClassName("icon_name")[0].cloneNode(true);
        let iconNamebox = document.getElementById("icon_name_container");

        iconList.querySelector(".icon").setAttribute('src',icon_src[i]);
        iconbox.appendChild(iconList);
        iconName.querySelector(".siteName").innerText=site_name[i];
        iconNamebox.appendChild(iconName);

        
        
    }
    let recomList = ["유튜브 프리미엄","유튜브 미리보기","유튜브 검색하는 법"];
    var search_keywords = document.getElementById("search_keywords");
    function keywordsList()
    {
        for(var i=0; i<recomList.length; i++)
        {
            console.log(i);
            keywords = document.getElementsByClassName("keywords")[0].cloneNode(true);
            keywordsContainer = document.getElementById("search_keywords");

            keywords.querySelector(".keywordName").innerText=recomList[i];
            keywordsContainer.appendChild(keywords);
        }
    }

    searchInput.onkeyup=function()
    {
        console.log("keyup");
        var searchValue = document.getElementById("input").value;
        if(searchValue.indexOf("유")!=-1)
        {
            console.log("ㅇㅇ");
            keywordsList();
            search_keywords.style.opacity="1";
            search_keywords.style.zIndex="2";
        }
        else
        {
            console.log("ㄴㄴ");
            search_keywords.style.opacity="0";
            search_keywords.style.zIndex="-2";
        }
        
    }
    //keyup
    //indexOf
    // '유'를 다 쳤을 때 밑에 검색어 리스트 모두 렌더
    // 검색창에 글씨를 다 지웠을 때 리스트 모두 삭제
    





});
