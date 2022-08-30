//document.ready
$(document).ready(function () {

    var searchInput = document.getElementById("input");
    var container = $(".keywordsBox");

    var keywordfocus = document.getElementsByClassName("keywordsBox")[0];
    var icon_src = ["../images/Instagram_Icon.png", "../images/Chrome.png", "../images/add_icon.png"];
    var site_name = ["Instagram", "Chrome", "add"];
    var search_keywords = document.getElementsByClassName("showKeywords")[0];

    let recomList = ["유튜브 프리미엄", "유튜브 미리보기", "유튜브 검색하는 법","물리2","물리학", "리튬", "스칸듐"];
    let recomList2 = ["아인슈타이늄","갈륨","인듐","사마륨","jQuery","javascript","YouTube","나무위키","네이버"];
    let recomList3 = ["html","css","가변저항","다이오드","RDX", "리눅스", "스플렁크" ];
    let recomList4 = ["Ornithorhynchus anatinus", "Steam", "Google", "Visual Studio Code"];

    recomListAdd(recomList2);
    recomListAdd(recomList3);
    recomListAdd(recomList4);

    function recomListAdd(addList)
    {
        for(var i=0; i<addList.length; i++)
        {
            recomList.push(addList[i]);
        }
    }

    function input_radius_off()
    {
        searchInput.style.borderTopLeftRadius="11px";
        searchInput.style.borderTopRightRadius="11px";
        searchInput.style.borderBottomRightRadius = "0";
        searchInput.style.borderBottomLeftRadius = "0";
    }
    function input_radius_on()
    {
        searchInput.style.borderRadius="22px";
    }

    searchInput.onblur = function(e) {
        console.log(e.currentTarget);
        console.log(e.relatedTarget);
        if(e.relatedTarget === null) {
            container.removeClass('onFocus');
            input_radius_on();
        }
    }

    searchInput.onkeydown = function(event){
        if(event.key=="Escape" || event.key=="Tab"){
            container.removeClass("onFocus");
            input_radius_on();
        }
    }

    for (var i = 0; i < icon_src.length; i++) {
        let iconList = document.getElementsByClassName("icon_table")[0].cloneNode(true);
        let iconbox = document.getElementById("icon_container");
        iconList.querySelector(".icon").setAttribute('src', icon_src[i]);
        iconList.querySelector(".siteName").innerText = site_name[i];
        iconbox.appendChild(iconList);
    }
    // input창에 "유"입력 시 연관검색어 출력. 글자를 지울 경우 리스트 삭제
    function keywordsList(eqkeywords) {
        rmkeywords();
        for (var i = 0; i < recomList.length; i++) {
            if (recomList[i].toUpperCase().indexOf(eqkeywords.toUpperCase()) == 0) {
                var keywords = document.getElementsByClassName("keywords")[0].cloneNode(true);
                var keywordsContainer = document.getElementById("search_keywords");
                keywords.querySelector(".keywordName").innerText = recomList[i];
                keywordsContainer.appendChild(keywords);
            }
        }
    }

    function rmkeywords() {
        var rmlist = document.querySelectorAll(".keywords");
        for (var i = 1; i < rmlist.length; i++) {
            rmlist[i].remove();
        }
    }

    searchInput.onkeyup = function () {
        rmkeywords();
        var searchValue = document.getElementById("input").value;
        for (var i = 0; i < recomList.length; i++) {
            if (searchValue == "" || searchValue == " ") {
                search_keywords.style.opacity = "0";
                search_keywords.style.zIndex = "-2";
                container.removeClass("onFocus");
                input_radius_on();
            }
            else if (recomList[i].toUpperCase().indexOf(searchValue.toUpperCase()) == 0) {
                container.addClass("onFocus");
                input_radius_off();
                keywordsList(searchValue);
                search_keywords.style.opacity = "1";
                search_keywords.style.zIndex = "2";
            }
        }
        var inputText=document.getElementById("input");
        var keyNames = document.querySelectorAll(".keywordName");
        for (const keyName of keyNames) {
            keyName.addEventListener('click', function (event) {
                
                index = [].slice.call(keyNames).indexOf(keyName); //유사배열
                searchText = keyNames[index].innerText;
                inputText.value = searchText;
                document.getElementById("search").submit();
            })
        }
    }
    
    //9월 1주차
    //추천 목록 여러개 추가 
    //유동적으로 받아서 검색 추천
    //검색된 리스트 클릭 시 해당 단어 input 창 세팅 후 검색
});