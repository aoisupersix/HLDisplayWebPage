var updateTime = 2000 //更新間隔[ms]

$(function() {
  getStatus();

  /*
   * イベントハンドラ登録
   * カードのクリックでステータス詳細モーダルを表示
   */
  $('.card').on('click', function(event) {
  });
})

function showStatusDetail(obj) {
  $('#statusDetailModal').modal();
}

/*
 * ステータス等の情報を取得を要求します
 */
function getStatus() {
  $.ajax({
    url:'https://script.google.com/macros/s/AKfycbwtEGgAOQ6LA3rcvsLcQFrrg8uVE1v5lkg8eNn40YjwAASTwmc/exec?returns=jsonp',
    dataType: 'jsonp',
    jsonpCallback: 'updateLayout',
  });
  //setTimeout(function() { getStatus()}, updateTime);
}

/*
 * ステータス情報を適用させます
 * Jsonpのコールバック関数
 */
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
    .append($('<a href="#" class="btn btn-fix"></a>')
      .attr({
        'onClick': 'showStatusDetail(this)',
        'data-name': name,
        'data-statusText': statusText,
        'data-color': color
      })
      .append($('<h4 class="card-header"></h4>').text(name))
      .append($('<div class="card-body"></div>')
        .append($('<h1 class="card-title" style="font-weight: bold;"></h1>').text(statusText))
      )
    )
  );
}
