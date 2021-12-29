const title = [{"singer": "배그나(은하수)", "songs": ["나란여자", "너라는마법", "뚝뚝뚝", "못참아",
        "소꿉친구", "숨겨온마음", "안돼요돼요", "애태우다", "옛사랑", "좋아요", "팽이같은인생"]},
    {"singer": "가비엔제이", "songs": ["그래도살아가겠지", "널사랑하는데", "눈사람", "반대편에서서", "연애소설",
        "이별주의보", "절애", "해바라기", "Everyday/에브리데이", "Happiness/해피니스", "LOVE ALL/러브올"]},
    {"singer": "다비치", "songs": ["거북이", "그냥안아달란말야", "그대니까요", "나의오랜연인에게", "남자도우나요",
        "너라서", "너없는시간들", "너에게못했던내마지막말은", "또운다또", "모르시나요", "미워도사랑하니까",
        "사고쳤어요", "사랑과전쟁", "시간아멈춰라", "여성시대", "오늘도 그리워그리워", "이사랑", "화이트/WHITE", "8282"]},
    {"singer": "씨야", "songs":["구두", "그사람이나를사랑해요", "미워요", "미친사랑의노래", "사랑의인사",
        "슬픈발걸음(구두2)", "얼음인형", "여인의향기", "정", "Promise U/프로미스유", "The Last/더라스트"]},
    {"singer": "장윤정", "songs": ["꽃", "너떠난후에", "다시한번", "당신편", "돼지토끼", "목포행완행열차", "바람길",
        "반창고", "벚꽃길", "불나비", "사랑아", "사랑참", "세월아", "송인", "애가타", "약속", "어머나", "어부바", "옆집누나",
        "올래", "운명에게", "장윤정트위스트", "좋은당신", "짠짜라", "첫사랑", "초혼", "케세라세라", "콩깍지", "해바라기"]},
    {"singer": "지아", "songs": ["가끔", "감기때문에", "그대만보여요", "그런다면서", "그런줄알았어", "그립습니다",
        "난행복해", "낡은옷", "너를기억한다", "누군가의무엇이되어", "눈물", "더만나봤자뭐해", "먼발치", "물끄러미",
        "물론", "바이올린", "사랑만알아서", "사랑해미안해", "술한잔해요", "술한잔해요오늘", "엄마미안해요", "우두커니",
        "웃게해줄게", "웃어줄래", "웃음만", "인형", "헤어진첫날", "The Day/더데이", "Only One/온리원"]},
    {"singer": "홍진영", "songs": ["그대오는날", "눈물비", "달의그림자/클랜즈: 달의그림자 OST", "따르릉",
        "부기맨", "사랑은꽃잎처럼", "사랑은다이러니", "사랑의배터리", "사랑의와이파이", "사랑이좋아",
        "산다는건", "안돼요", "엄지척", "오늘밤에", "잘가라"]}];

let songsPerRow; // 한 줄에 몇 개까지 나열할 건지

let allHtml = null;

function changecolor(x) {// mouseenter
    x.style.color = "#000000";
}
function returncolor(x) {// mouseleave
    x.style.color = "#ffffff";
}

function cleartext() {// 초기화
    document.getElementById("searchBox").value = null;
    document.getElementById("show").innerHTML = allHtml;
}

function distinguish() {// 모바일 환경 고려
    let filter = "win16|win32|win64|mac|macintel";
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            songsPerRow = 2;
        }
        else {
            songsPerRow = 6;
        }
    }
}

function showAll() {// 목록 전부 보여주기
    distinguish();

    htmlText = "<table align=\"center\">";
    for (let i = 0; i < title.length; i++) {
        let songslen = title[i].songs.length;
        let spannum = spanCalc(songslen);
        htmlText += "<tr><td rowspan=\"" + spannum + "\">" + title[i].singer.split("/")[0] + "</td>";// 가수
        for (let j = 0; j < songslen; j++) {// 노래들
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

function spanCalc(x) {// 몇 줄인지 계산
    let remainder = x % songsPerRow;
    if (remainder == 0) {
        return x / songsPerRow;
    }
    else return (x - remainder) / songsPerRow + 1;
}

function search(str) {// 검색 결과 띄우기
    str = str.trim();
    if (str == '') {// 빈 칸이면 전체 보여줌
        document.getElementById("show").innerHTML = allHtml;
    }
    else {
        let searchedSinger = "<table align=\"center\">";
        let searchedSong = "<table align=\"center\">";
        let words = str.split(" ");// 띄어쓰기 검색 고려, 단어로 나눔
        let strlen = [];// 단어의 길이
        let numwords = words.length;// 단어 수
        for (let i = 0; i < numwords; i++) {// 각 단어 길이 구하기
            let wordlen = words[i].length;
            strlen.push(wordlen);
        }
        for (let i = 0; i < title.length; i++) {
            let singer = title[i].singer.split("/")[0];// 가수 이름
            let songs = title[i].songs;// 노래들
            let songslen = songs.length;// 노래 수
            let spannum = spanCalc(songslen);
            let searchResult = [];// 검색 결과
            for (let j = 0; j < numwords; j++) {// 가수 검색
                let wordSearch = singer.toLowerCase().search(words[j].toLowerCase());
                if (wordSearch != -1) {
                    searchResult.push(wordSearch);
                }
            }
            if (numwords == searchResult.length) {// 가수에서 단어들이 다 검색되면
                searchedSinger += "<tr><td rowspan=\"" + spannum + "\">" + singer.substring(0, searchResult[0]);// 첫 단어 검색 전
                for (let j = 0; j < numwords; j++) {
                    searchedSinger +=  "<b>" + singer.substr(searchResult[j], strlen[j]) + "</b>";// 검색된 부분
                    if (j != numwords - 1) {// 마지막 단어가 아니면
                        if (searchResult[j] + strlen[j] < searchResult[j + 1]) {// 다음 단어 검색 전
                            searchedSinger += singer.substring(searchResult[j] + strlen[j], searchResult[j + 1]);
                        }
                    }
                }
                searchedSinger += singer.substr(searchResult[numwords - 1] + strlen[numwords - 1]) + "</td>";// 마지막 단어 검색 후
                
                for (let j = 0; j < songslen; j++) {
                    let songResult = [];// 가수 노래 검색
                    let index = [];
                    for (let k = 0; k < numwords; k++) {// 노래에서도 검색되는지
                        let songSearch = songs[j].toLowerCase().search(words[k].toLowerCase());
                        if (songSearch != -1) {
                            songResult.push(songSearch);
                            index.push(k);
                        }
                    }
                    let song = songs[j].split("/")[0];
                    let inlen = index.length;
                    if (inlen != 0) {// 노래에서 검색된 게 있음
                        searchedSinger += "<td>" + song.substring(0, songResult[0]);
                        for (let k = 0; k < inlen; k++) {
                            inK = index[k];
                            searchedSinger += "<b>" + song.substr(songResult[k], strlen[inK]) + "</b>";// 검색된 부분
                            if (k != inlen - 1) {
                                if (songResult[k] + strlen[inK] < songResult[k + 1]) {
                                    searchedSinger += song.substring(songResult[k] + strlen[inK], songResult[k + 1]);
                                }
                            }
                        }
                        searchedSinger += song.substr(songResult[inlen - 1] + strlen[index[inlen - 1]]) + "</td>";
                    }
                    else {// 없음
                        searchedSinger += "<td>" + song + "</td>";
                    }
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
                    searchResult = [];
                    for (let k = 0; k < numwords; k++) {
                        let wordSearch = songs[j].toLowerCase().search(words[k].toLowerCase());
                        if (wordSearch != -1) {
                            searchResult.push(wordSearch);
                        }
                    }
                    if (numwords == searchResult.length) {
                        let song = songs[j].split("/")[0];
                        searchedSong += "<tr><td>" + singer + "</td>" + "<td>" + song.substring(0, searchResult[0]);
                        for (let k = 0; k < numwords; k++) {
                            searchedSong += "<b>" + song.substr(searchResult[k], strlen[k]) + "</b>";
                            if (k != numwords - 1) {
                                if (searchResult[k] + strlen[k] < searchResult[k + 1]) {
                                    searchedSong += song.substring(searchResult[k] + strlen[k], searchResult[k + 1]);
                                }
                            }
                        }
                        searchedSong += song.substr(searchResult[numwords - 1] + strlen[numwords - 1]) + "</td></tr>";
                    }
                }
            }
        }
        document.getElementById("show").innerHTML = searchedSinger + searchedSong;
    }
}