var updateTime = 2000 //更新間隔[ms]

$(function() {
  for(var i = 1; i <= 14; i++){
    addCard("Card-" + i, "外出", "bg-secondary")
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
function addCard(name, statusText, color){
  $('#memberStatus').append(
    $('<div class="card" style="margin: 5pt;width: 11rem;height: 9rem;"></div>').addClass(color)
    .append($('<h4 class="card-header"></h4>').text(name))
    .append($('<div class="card-body"></div>')
      .append($('<h1 class="card-title" style="font-weight: bold;"></h1>').text(statusText))
    )
  );
}
