var updateTime = 2000 //更新間隔[ms]

$(function() {
  getStatus();
  for(var i = 1; i <= 14; i++){
    addCard("Card-" + i, "外出", "bg-secondary")
  }
})

/*
 * ステータス等の情報を取得を要求します
 */
function getStatus() {
  $.ajax({
    url:'https://script.google.com/macros/s/AKfycbwtEGgAOQ6LA3rcvsLcQFrrg8uVE1v5lkg8eNn40YjwAASTwmc/exec?returns=jsonp',
    dataType: 'jsonp',
    jsonpCallback: 'updateLayout',
  });
}

function updateLayout(json){
  console.log(json);
  //ステータスの削除
  $("#memberStatus").empty();

  //ステータスの生成
  var member = json["member"];
  var status = json["status"];
  for(var i = 0; i < member.length; i++){
    var stateId = parseInt(member[i].status);
    addCard(member[i].name, status[stateId].name, status[stateId].color);
  }
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
