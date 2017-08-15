jQuery.ajaxSetup({
    async: false
});

var allGames = {};

var parseParts = ["[White ", "[Black ", "[Result ", "[WhiteTitle ", "[BlackTitle ", "[WhiteElo ", "[BlackElo "];
var parsePartsKeys = ["white", "black", "result", "whiteTitle", "blackTitle", "whiteElo", "blackElo"];
var siralama = [0, 3, 7, 8, 21, 27, 28, 29, 30];
var siralamaAdlar = ["Sıra", "Ad Soyad", "UKD", "ELO", "Puan", "BH.", "SB", "Vict", "MBl"];


function loadGames(categories, collname) {

    allGames = {};

    categoryList = categories.split(",");

    for (var c = 0; c < categoryList.length; c++) {
        var category = categoryList[c].trim();
        var pgnFileName = collname + "-" + category + ".pgn";
        var resultsFileName = collname + "-siralama-" + category + ".txt";
        var games = [[]];

        $.get(pgnFileName, function(data) {

            var lines = data.split('[Event ');
            for (var line = 0; line < lines.length; line++) {
                parseGame(lines[line], games);
            }
            console.log(games);
            writeGamestoTabs(resultsFileName, category, games);
            fillGamesCombobox(category, games);
        }, "text");

        allGames[category] = games;
    }


}

function parseGame(rawGame, games) {

    var lines = rawGame.split("\n");
    var game = {};
    var round = 0;
    var notation = "";
    for (var line = 0; line < lines.length; line++) {

        if (lines[line].startsWith("[Round ")) {

            var roundTableStr = lines[line].replace("[Round ", "").replace("]", "").replace('"', "").replace('"', "").trim();
            var roundTable = roundTableStr.split(".");
            round = roundTable[0];
            game["round"] = roundTable[0];
            game["table"] = roundTable[1];
        }
        for (var part = 0; part < parseParts.length; part++) {

            if (lines[line].startsWith(parseParts[part])) {

                game[parsePartsKeys[part]] = lines[line].replace(parseParts[part], "").replace("]", "").replace('"', "").replace('"', "").trim();
            }
        }

        if (!lines[line].trim().endsWith("]")) {
            notation = notation + lines[line] + " ";
        }
    }
    game["notation"] = notation;
    if (typeof games[round] !== 'undefined' && games[round].length > 0) {
        games[round].push(game);
    } else {
        games[round] = [game];
    }
}

function writeGamestoTabs(resultsFileName, category, games) {

    var text = '<ul class="nav nav-tabs">' + '\n';
    text += '<li role="presentation" class="active"><a href="#siralama-' + category + '" aria-controls="siralama" role="tab" data-toggle="tab">Sıralama</a></li>' + '\n';

    for (var tour = 1; tour < games.length; tour++) {
        text += '<li role="presentation"><a href="#tur' + tour + '-' + category + '" aria-controls="tur' + tour + '-' + category + '" role="tab" data-toggle="tab">' + tour + '.Tur</a></li>' + '\n';
    }
    text += '</ul>' + '\n';
    text += '<div class="tab-content" style="margin-top:20px">' + '\n';
    text += '<div role="tabpanel" class="tab-pane active" id="siralama-' + category + '">';
    text += parseResults(resultsFileName);
    text += '</div>' + '\n';
    for (var tour = 1; tour < games.length; tour++) {
        text += '<div role="tabpanel" class="tab-pane" id="tur' + tour + '-' + category + '">' + '\n';

        text += '<table class="table table-bordered table-striped">' + '\n';
        text += '<tbody>' + '\n';

        text += `<tr>
                  <th>Masa</th>
                  <th>Beyaz</th>
                  <th>Sonuç</th>
                  <th>Siyah</th>
                </tr>`;

        for (var g = 0; g < games[tour].length; g++) {
            var whiteName = games[tour][g]["white"];
            if (games[tour][g]["whiteTitle"] !== "" && games[tour][g]["whiteTitle"] !== undefined) {
                whiteName = games[tour][g]["whiteTitle"] + " " + whiteName;
            }
            var blackName = games[tour][g]["black"];
            if (games[tour][g]["blackTitle"] !== "" && games[tour][g]["blackTitle"] !== undefined) {
                blackName = games[tour][g]["blackTitle"] + " " + blackName;
            }
            if (games[tour][g]["whiteElo"] !== "" && games[tour][g]["whiteElo"] !== undefined && games[tour][g]["whiteElo"] !== 0 && games[tour][g]["whiteElo"] !== "0") {
                whiteName = whiteName + " (" + games[tour][g]["whiteElo"] + ")";
            }
            if (games[tour][g]["blackElo"] !== "" && games[tour][g]["blackElo"] !== undefined && games[tour][g]["blackElo"] !== 0 && games[tour][g]["blackElo"] !== "0") {
                blackName = blackName + " (" + games[tour][g]["blackElo"] + ")";
            }
            text += '<tr>' + '\n';
            text += '<th scope = "row" class="col-md-1" >' + games[tour][g]["table"] + '</th>' + '\n';
            text += '<td class="col-md-5">' + whiteName + '</td>' + '\n';
            text += '<td class="col-md-2">' + games[tour][g]["result"] + '</td>' + '\n';
            text += '<td class="col-md-4">' + blackName + '</td>' + '\n';
            text += '</tr>' + '\n';

        }
        text += '</tbody>' + '\n';
        text += '</table>' + '\n';
        text += '</div>' + '\n';
    }

    $('#kategori-' + category).html(text);
}

function fillGamesCombobox(category, games) {

    var text = "<option>Oyun seçiniz</option>";
    for (var tour = 1; tour < games.length; tour++) {
        for (var g = 0; g < games[tour].length; g++) {

            if (games[tour][g]["notation"].trim() !== "" && games[tour][g]["notation"].trim() !== "*") {
                text += '<option value="' + category + '.' + games[tour][g]["round"] + '.' + games[tour][g]["table"] + '">';
                text += games[tour][g]["round"] + '.' + games[tour][g]["table"] + " ";
                text += games[tour][g]["white"] + " ";
                text += games[tour][g]["result"] + " ";
                text += games[tour][g]["black"];
                text += '</option>' + '\n';
            }
        }
    }
    $('#oyunsec-' + category).html(text);
}


$('[id^=oyunsec]').click(function(e) {
    var roundTable = $(e.target).val();
    roundTable = roundTable.split(".");
    var category = roundTable[0];
    var round = roundTable[1];
    var table = roundTable[2];
    var pgn = allGames[category][round][table - 1]["notation"];
    var cfg = {
        pgn: pgn,
        locale: 'en',
        pieceStyle: 'merida'
    };
    var board = pgnView('board', cfg);

    var text = allGames[category][round][table - 1]["white"] + " ";
    text += allGames[category][round][table - 1]["result"] + " ";
    text += allGames[category][round][table - 1]["black"] + " ";
    text = "<p>" + text + "</p>";
    $('#oyun').html(text);
});


function parseResults(resultsFileName) {


    var text = "Sıralama yüklenmedi.";

    $.get(resultsFileName, function(data) {

        text = "";
        var tourNo = "";
        var headerLine = 0;
        var lines = data.split("\n");

        for (var line = 0; line < lines.length; line++) {
            if (lines[line].startsWith("sira turdan sonra")) {
                tourNo = lines[line].replace("sira turdan sonra", "").trim();

            }
            if (lines[line].startsWith("Sira;")) {
                headerLine = line;
                break;
            }
        }

        text += '<h4>' + tourNo + '. tur sonrası sıralama' + '</h4>' + '\n';

        text += '<table class="table table-bordered table-striped">' + '\n';
        text += '<tbody>' + '\n';
        text += '<tr>';
        for (var h = 0; h < siralamaAdlar.length; h++) {
            text += '<th>' + siralamaAdlar[h] + '</th>';
        }
        text += '</tr>';

        for (var line = headerLine + 1; line < lines.length - 1; line++) {
            var l = lines[line].split(";");
            console.log(l);
            text += '<tr>' + '\n';
            for (var i = 0; i < siralama.length; i++) {

                var v = l[siralama[i]];
                if (siralama[i] === 3) {
                    v = v + " " + l[4];
                }
                text += '<td scope = "row" >' + v + '</td>' + '\n';
            }
            text += '</tr>' + '\n';
        }

        text += '</tbody>' + '\n';
        text += '</table>' + '\n';

    }, "text");

    return text;
}
