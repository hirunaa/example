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
    let recomList3 = ["html","css","가변저항","다이오드","RDX", "리눅스", "스플렁크","스플렁크" ];
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
        var set = new Set(recomList);
        recomList = [...set];
    }

    function input_radius_off()
    {
        searchInput.style.borderTopLeftRadius="11px";
        searchInput.style.borderTopRightRadius="11px";
        searchInput.style.borderBottomRightRadius = "0";
        searchInput.style.borderBottomLeftRadius = "0";

        // => searchInput.style = {borderTypLeftRdadius : "ddd", ddd}
    }
    function input_radius_on()
    {
        searchInput.style.borderRadius="22px";
    }

    searchInput.onblur = function(e) {
        //console.log(e.currentTarget);
        //console.log(e.relatedTarget);
        if(e.relatedTarget === null) { 
            container.removeClass('onFocus');
            input_radius_on();
        }
    }

    searchInput.onkeydown = function(event){
        if(event.key=="Escape"){
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

    /**
     * input에 입력한 단어와 동일한 단어를 리스트에 정렬하는 함수
     * @param {String} equalkeywords 검색할 단어 
     */
    function keywordsList(equalkeywords) {
        //console.log("keywordsList");
        removeKeywords();
        for (var i = 0; i < recomList.length; i++) {
            if (recomList[i].toUpperCase().indexOf(equalkeywords.toUpperCase()) == 0) {
                var keywords = document.getElementsByClassName("keywords")[0].cloneNode(true);
                var keywordsContainer = document.getElementById("search_keywords");
                keywords.querySelector(".keywordName").innerText = recomList[i];
                //keywords.setAttribute('tabindex',i);
                keywordsContainer.appendChild(keywords);
                
            }
        }       
    }

    //removeKeyword
    function removeKeywords() {
        var rmlist = document.querySelectorAll(".keywords");
        for (var i = 1; i < rmlist.length; i++) {
            rmlist[i].remove();
        }
    }

    searchInput.oninput = function (e) {
        //console.log(e.keyCode)    
        if(e.keyCode!=40 && e.keyCode!=38 && e.keyCode!=37 && e.keyCode!=39){
            listIndex=0;
            removeKeywords();
            var searchValue = document.getElementById("input").value;
            var blankKeyword = document.getElementsByClassName("keywords")[0];
            blankKeyword.querySelector("p").style.display="";
            for (var i = 0; i < recomList.length; i++) {
                //console.log(recomList[i].toUpperCase().indexOf(searchValue.toUpperCase()));
                if (searchValue == "" || searchValue == " ") {
                    removeKeywords();
                    search_keywords.style.opacity = "0";
                    search_keywords.style.zIndex = "-2";
                    container.removeClass("onFocus");
                    input_radius_on();
                }
                else if (recomList[i].toUpperCase().indexOf(searchValue.toUpperCase()) == 0) {
                    container.addClass("onFocus");
                    removeKeywords();
                    input_radius_off();
                    keywordsList(searchValue);
                    search_keywords.style.opacity = "1";
                    search_keywords.style.zIndex = "2";
                }

                if(document.getElementsByClassName("keywordName").length==1)
                {
                    removeKeywords();
                    search_keywords.style.opacity = "0";
                    search_keywords.style.zIndex = "-2";
                    container.removeClass("onFocus");
                    input_radius_on();
                }
                
            }
            blankKeyword.querySelector("p").style.display="none";
        }

        
        var inputText = document.getElementById("input");
        var keyNames = document.querySelectorAll(".keywords");
        // for (of )문법 설명
        // e.currentTarget 이나 e.target 으로 변경
        for (const keyName of keyNames) {
            keyName.addEventListener('click', function (event) {
                //console.log(event.currentTarget.innerText);
                searchText = event.currentTarget.innerText;
                inputText.value = searchText;
                document.getElementById("search").submit();
            })
        }
        
    }
    
    var listIndex = 0;
    searchInput.addEventListener("keydown", function(e){
        //console.log("input");
        var keywordList = document.querySelectorAll(".keywords");
        var inputText = document.getElementById("input");
        listColorInit();
        var keycode = e.keyCode;
        if(keycode==40){
            listIndex++;
            if(listIndex >= keywordList.length)
            {
                listIndex=1;
            }
            document.getElementsByClassName("keywords")[listIndex].focus();
            document.getElementsByClassName("keywords")[listIndex].style.backgroundColor="#dddddd";
            inputText.value = document.getElementsByClassName("keywords")[listIndex].innerText;
            //console.log(listIndex)
            e.preventDefault();
            //e.propagation
            //이벤트 버블링, 캡쳐링
            }

        else if(e.keyCode==38)
        {
            listIndex--;
            if(listIndex<=0)
            {
                listIndex=keywordList.length-1;
            }
            document.getElementsByClassName("keywords")[listIndex].focus();
            document.getElementsByClassName("keywords")[listIndex].style.backgroundColor="#dddddd";
            inputText.value = document.getElementsByClassName("keywords")[listIndex].innerText
            e.preventDefault(); 
        }
        else if(e.keyCode==37 || e.keyCode==39)
        {
            document.getElementsByClassName("keywords")[listIndex].focus();
            document.getElementsByClassName("keywords")[listIndex].style.backgroundColor="#dddddd";
        }
        searchInput.focus();
    });

        function listColorInit(){
            for(var i=0; i<document.querySelectorAll(".keywords").length; i++)
            {
                document.getElementsByClassName("keywords")[i].style.backgroundColor="white";
            }
        }
    
    document.getElementById("search_keywords").addEventListener("mouseover", function(e){
        e.target.style.backgroundColor="#f0f0f0";
    });
    document.getElementById("search_keywords").addEventListener("mouseout", function(e){
        e.target.style.backgroundColor="transparent";
    });
    
    //추천 검색어 화살표 이동 가능 
    //이동시 input에 해당 텍스트 배치 및 선택 항목 하이라이팅
    //유투 검색 했을때 빈 칸 표출 디버깅
    //.hide .show() 이용하여 첫번째 더미 데이터 지우기
});



//var let const 
//hoisting
//**scope */
//전개 연산자
