//document.ready
$(document).ready(function () {


    var searchInput = $("#input");
    var container = $(".keywordsBox");

    var keywordfocus = $(".keywordsBox");
    var iconSrc = ["../images/Instagram_Icon.png", "../images/Chrome.png", "../images/add_icon.png"];
    var siteName = ["Instagram", "Chrome", "add"];
    var searchKeywords = $(".showKeywords");

    let recomList = ["유튜브 프리미엄", "유튜브 미리보기", "유튜브 검색하는 법","물리2","물리학", "리튬", "스칸듐"];
    let recomList2 = ["아인슈타이늄","갈륨","인듐","사마륨","jQuery","javascript","YouTube","나무위키","네이버"];
    let recomList3 = ["html","css","가변저항","다이오드","RDX", "리눅스", "스플렁크","스플렁크","우라늄" ];
    let recomList4 = ["Ornithorhynchus anatinus", "Steam", "Google", "Visual Studio Code","트라이메틸렌트라이나이트라민"];

    const ArrowUp = 38;
    const ArrowDown = 40;
    const ArrowLeft = 37;
    const ArrowRight = 39;

    const focusColor = "#dddddd";
    const mouseoverColor = "#f0f0f0";

    recomListAdd(recomList2);
    recomListAdd(recomList3);
    recomListAdd(recomList4);
    /**
     * 추천검색어를 병합시키고, 중복 단어를 없애는 함수.
     * @param {string} addList 
     */
    function recomListAdd(addList)
    {
        for(var i=0; i<addList.length; i++)
        {
            recomList.push(addList[i]);
        }
        var set = new Set(recomList);
        recomList = [...set];
    }

    function inputRadiusOff()
    {
        searchInput.css({
            'border-top-left-radius':"11px",
            'border-top-right-radius':"11px",
            'border-bottom-left-radius':"0",
            'border-bottom-right-radius':"0"
        });

        // => searchInput.style = {borderTypLeftRdadius : "ddd", ddd}
    }
    function inputRadiusOn()
    {
        searchInput.css("border-radius","22px");
    }
    
    searchInput.on("blur",function(e) {
        //console.log(e.currentTarget);
        //console.log(e.relatedTarget);
        if(e.relatedTarget === null) { 
            container.removeClass('onFocus');
            inputRadiusOn();
        }
    });

    searchInput.on("keydown",function(event){
        if(event.key=="Escape"){
            container.removeClass("onFocus");
            inputRadiusOn();
        }
    });

    for (var i = 0; i < iconSrc.length; i++) {
        let iconList = $(".icon_table:eq(0)").clone(true);
        let iconbox = $("#icon_container"); // $("#icon_container")
        iconList.find(".icon").attr('src', iconSrc[i]);
        iconList.find(".siteName").text(siteName[i]);
        iconbox.append(iconList);
    }

    /**
     * input에 입력한 단어와 동일한 단어를 리스트에 정렬하는 함수.
     * @param {String} equalkeywords 검색할 단어 
     */
    function keywordsList(equalkeywords) {
        //console.log("keywordsList");
        removeKeywords();
        for (var i = 0; i < recomList.length; i++) {
            if (recomList[i].toUpperCase().indexOf(equalkeywords.toUpperCase()) == 0) {
                var keywords = $(".keywords:eq(0)").clone(true);
                var keywordsContainer = $("#search_keywords");
                keywords.find(".keywordName").text(recomList[i]);
                keywordsContainer.append(keywords);
                
            }
        }       
    }

    //removeKeyword
    function removeKeywords() {
        var rmlist = $(".keywords");
        for (var i = 1; i < rmlist.length; i++) {
            rmlist[i].remove();
        }
    }
    searchInput.on("input",function (e) {  
        if(e.keyCode!= ArrowDown && e.keyCode!=ArrowUp && e.keyCode!=ArrowLeft && e.keyCode!=ArrowRight){
            listIndex=0;
            removeKeywords();
            var searchValue = $("#input").val();
            var blankKeyword = $(".keywords");
            blankKeyword.find("p").css("display","");
            for (var i = 0; i < recomList.length; i++) {
                
                if (searchValue == "" || searchValue == " ") {
                    removeKeywords();
                    searchKeywords.css({
                        "opacity":"0",
                        "z-index" : "-2"
                    });
                    container.removeClass("onFocus");
                    inputRadiusOn();
                }
                else if (recomList[i].toUpperCase().indexOf(searchValue.toUpperCase()) == 0) {
                    container.addClass("onFocus");
                    removeKeywords();
                    inputRadiusOff();
                    keywordsList(searchValue);
                    searchKeywords.css({
                        "opacity":"1",
                        "z-index" : "2"
                    });
                }

                if($(".keywordName").length==1)
                {
                    searchKeywords.css({
                        "opcity":"0",
                        "z-index" : "-2"
                    });
                    container.removeClass("onFocus");
                    inputRadiusOn();
                    removeKeywords();
                }
                
            }
            blankKeyword.find("p").css("display","none");
        }

        
        var inputText = $("#input");
        var keyNames = $(".keywords");
        // for (of )문법 설명
        // e.currentTarget 이나 e.target 으로 변경
        for (const keyName of keyNames) {
            keyName.addEventListener('click', function (event) {
                inputText.val($(event.currentTarget).text());
                $("#search").submit();
            });
        }
        
    });
    var listIndex = 0;
    searchInput.on("keydown", function(e){
        var keywordList = $(".keywords");
        listColorInit();
        if(e.keyCode==ArrowDown){
            listIndex++;
            if(listIndex >= keywordList.length)
            {
                listIndex=1;
            }
            $(".keywords:eq("+listIndex+")").focus();
            $(".keywords:eq("+listIndex+")").css("background-color",focusColor);
            $("#input").val($(".keywords:eq("+listIndex+")").text());
            console.log(listIndex);
            e.preventDefault();
            //e.propagation
            //이벤트 버블링, 캡쳐링
            }

        else if(e.keyCode==ArrowUp)
        {
            listIndex--;
            if(listIndex<=0)
            {
                listIndex=keywordList.length-1;
            }
            $(".keywords:eq("+listIndex+")").focus();
            $(".keywords:eq("+listIndex+")").css("background-color",focusColor);
            $("#input").val($(".keywords:eq("+listIndex+")").text());
            console.log(listIndex);
            e.preventDefault(); 
        }
        else if(e.keyCode==ArrowLeft || e.keyCode==ArrowRight)
        {
            $(".keywords:eq("+listIndex+")").focus();
            $(".keywords:eq("+listIndex+")").css("background-color",focusColor);
        }
        searchInput.focus();
    });

        function listColorInit(){
            for(var i=0; i<$(".keywords").length; i++)
            {
               $(".keywords:eq("+i+")").css("background-color","white");
            }
        }
    
    $("#search_keywords").mouseover(function(e){
        $(e.target).css("backgroundColor",mouseoverColor);
    });
    $("#search_keywords").mouseout(function(e){
        $(e.target).css("backgroundColor","transparent");
    });
});
//on, bind delegate 
//차이점