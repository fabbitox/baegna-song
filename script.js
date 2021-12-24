const title = [{"singer": "배그나(은하수)", "songs": ["나란여자", "너라는마법", "뚝뚝뚝", "못참아", "소꿉친구",
        "숨겨온 마음", "안돼요돼요", "애태우다", "옛사랑", "좋아요", "팽이같은인생"]},
    {"singer": "장윤정", "songs": ["꽃", "너떠난후에", "다시한번", "당신편", "돼지토끼", "목포행 완행열차", "바람길",
        "반창고", "벚꽃길", "불나비", "사랑아", "사랑참", "세월아", "송인", "애가타", "약속", "어머나", "어부바", "옆집누나",
        "올래", "운명에게", "장윤정 트위스트", "좋은당신", "짠짜라", "첫사랑", "초혼", "케세라세라", "콩깍지", "해바라기"]},
    {"singer": "지아", "songs": ["가끔", "감기때문에", "그대만 보여요", "그런다면서", "그런줄알았어", "그립습니다",
        "난행복해", "낡은옷", "너를기억한다", "누군가의 무엇이 되어", "눈물", "더만나봤자 뭐해", "먼발치", "물끄러미",
        "물론", "바이올린", "사랑만 알아서", "사랑해미안해", "술한잔해요", "술한잔해요오늘", "엄마미안해요", "우두커니",
        "웃게해줄게", "웃어줄래", "웃음만", "인형", "헤어진첫날", "The Day/더데이", "Only One/온리원"]}];

var songsPerRow;

var allHtml = null;

function changecolor(x) {
    x.style.color = "#000000";
}
function returncolor(x) {
    x.style.color = "#ffffff";
}

function cleartext() {
    document.getElementById("searchBox").value = null;
}

function showAll() {
    //pc, mobile 구분 - 보기 편하게, 일단 pc에 맞춰서
    var filter = "win16|win32|win64|mac|macintel";
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            songsPerRow = 3;
        }
        else {
            songsPerRow = 6;
        }
    }

    htmlText = "<table align=\"center\">";
    for (let i = 0; i < title.length; i++) {
        var songslen = title[i].songs.length;
        var spannum = spanCalc(songslen);
        htmlText += "<tr><td rowspan=\"" + spannum + "\">" + title[i].singer + "</td>";
        for (let j = 0; j < songslen; j++) {
            htmlText += "<td>" + title[i].songs[j].split("/")[0] + "</td>";
            if (j % songsPerRow == songsPerRow - 1) {
                htmlText += "</tr>"
                if (j != songslen - 1) {
                    htmlText += "<tr>";
                }
            }
        }
        if (songslen % songsPerRow != 0) {
            htmlText += "</tr>";
        }
    }
    htmlText += "</table>"
    document.getElementById("show").innerHTML = htmlText;
    allHtml = htmlText;
}

function spanCalc(x) {
    var remainder = x % songsPerRow;
    if (remainder == 0) {
        return x / songsPerRow;
    }
    else return (x - remainder) / songsPerRow + 1;
}

function search(str) {
    if (str == '') {
        document.getElementById("show").innerHTML = allHtml;
    }
    else {
        var searchedSinger = "<table align=\"center\">";
        var searchedSong = "<table align=\"center\">";
        for (let i = 0; i < title.length; i++) {
            var songslen = title[i].songs.length;
            var spannum = spanCalc(songslen);
            if (title[i].singer.search(str) != -1) {
                searchedSinger += "<tr><td rowspan=\"" + spannum + "\">" + title[i].singer + "</td>";
                for (let j = 0; j < songslen; j++) {
                    searchedSinger += "<td>" + title[i].songs[j].split("/")[0] + "</td>";
                    if (j % songsPerRow == songsPerRow - 1) {
                        searchedSinger += "</tr>";
                        if (j != songslen - 1) {
                            searchedSinger += "<tr>";
                        }
                    }
                }
                if (songslen % songsPerRow != 0) {
                    searchedSinger += "</tr>";
                }
            }
            else {
                for (let j = 0; j < songslen; j++) {
                    if (title[i].songs[j].search(str) != -1) {
                        searchedSong += "<tr><td>" + title[i].singer + "</td>";
                        searchedSong += "<td>" + title[i].songs[j].split("/")[0] + "</td></tr>";
                    }
                }
            }
        }
        document.getElementById("show").innerHTML = searchedSinger + searchedSong;
    }
}