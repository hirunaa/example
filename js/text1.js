//document.ready
$( document ).ready(function() {
    
    //console.log("dd");
    var searchInput= document.getElementById("input");
    // var container= document.getElementsByClassName("container")[0];
    var container = $(".container");
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

    var icon_src=["../images/add_icon.png", "../images/Instagram_Icon.png"]
    for(var i=0; i<2; i++)
    {
        let iconList=document.getElementsByClassName("icon_table")[0].cloneNode(true);
        let icon=document.getElementsByClassName("icon")[0];
        icon.setAttribute('src',icon_src[i]);
        let mstbox=document.getElementById("icon_container");
        mstbox.appendChild(iconList);

        let iconName=document.getElementsByClassName("icon_name")[0].cloneNode(true);
        
        let iconNamebox=document.getElementById("icon_name_container");
        iconNamebox.appendChild(iconName);
    }

});
