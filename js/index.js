var updateTime = 2000 //更新間隔[ms]

$(function() {
  for(var i = 0; i < 14; i++){
    addCard("Card-" + i, "外出", "bg-secondary", "コメント")
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
function addCard(name, statusText, color, comment){
  $('#memberStatus').append(
    $('<div class="card" style="margin: 5pt;width: 10rem;height: 10rem;"></div>').addClass(color)
    .append($('<h4 class="card-header"></h4>').text(name))
    .append($('<div class="card-body"></div>')
      .append($('<h1 class="card-title" style="font-weight: bold;"></h1>').text(statusText))
      .append($('<p class="card-text"></p>').text(comment))
    )
  );
}
