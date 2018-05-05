/**
 * ステータス情報の更新間隔[ms]
 */
var UPDATE_TIME = 2000

/**
 * 初期化処理を行います
 */
$(function() { getStatus(); })

/*
 * ステータス詳細モーダルを表示します
 */
function showStatusDetail(obj) {
  $('#statusDetail-Name').text($(obj).attr('data-name'));
  $('#statusDetail-Status').text($(obj).attr('data-statusText'));
  $('#statusDetailModal').attr('data-id', $(obj).attr('data-id'));
  $('#statusDetailModal').modal();
}

/**
 * ステータス更新ボタン押下時にステータスを更新します
 * @param {object} obj - クリックされたステータス更新ボタン
 */
function statusChange(obj) {
  var userId = $('#statusDetailModal').attr('data-id');
  var stateId = $(obj).attr('data-id');
  pushStatus(userId, stateId);
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
  setTimeout(function() { getStatus()}, updateTime);
}

/*
 * ステータス情報を更新します
 */
function pushStatus(userId, statusId) {
  var dataDict = {"id": userId, "status": statusId};
  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbwtEGgAOQ6LA3rcvsLcQFrrg8uVE1v5lkg8eNn40YjwAASTwmc/exec?returns=jsonp&update=true',
    dataType: 'jsonp',
    data: dataDict,
    jsonpCallback: 'updateLayout'
  }).done(function(data) {
    $('#statusDetailModal').modal('hide');
    alert('ステータス更新に成功しました。')
    console.log(data);
  });
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
    addCard(member[i].id, member[i].name, status[stateId].name, status[stateId].color);
  }
  initStatusDetailButton(status);
}

/*
 * Htmlにカードを追加します
 */
function addCard(id, name, statusText, color){
  $('#memberStatus').append(
    $('<div class="card" style="margin: 5pt;width: 11rem;height: 9rem;"></div>').addClass('bg-' + color)
    .append($('<a href="#" class="btn btn-fix"></a>')
      .attr({
        'onClick': 'showStatusDetail(this)',
        'data-id': id,
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

/*
 * ステータス更新用のボタンを作成します
 */
function initStatusDetailButton(status){
  $('#statusButtons').empty();
  for(var i = 0; i < status.length; i++){
    $('#statusButtons').append(
      $('<Button class="btn btn-lg" style="width: 7em;height: 5em; margin: 3pt;"></Button>').addClass('btn-' + status[i].color)
      .text(status[i].name)
      .attr({
        'data-id': i,
        'onClick': 'statusChange(this)'
      })
    );
  }
}
