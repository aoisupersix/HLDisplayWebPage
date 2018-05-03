var updateTime = 2000 //更新間隔[ms]

$(function() {
  for(var i = 0; i < 14; i++){
    addCard("CardName-" + i, "外出", "コメント")
  }
})

/*
 * 初期化処理を行います
 */
function init() {
}

/*
 * Htmlにカードを追加します
 */
function addCard(name, statusText, comment){
  $('#memberStatus').append(
    $('<div class="card text-white bg-success col-xs-1" style="margin: 10pt;width: 13rem;"></div>')
    .append($('<h4 class="card-header"></h4>').text(name))
    .append($('<div class="card-body"></div>')
      .append($('<h1 class="card-title"></h1>').text(statusText))
      .append($('<p class="card-text"></p>').text(comment))
    )
  );
}
