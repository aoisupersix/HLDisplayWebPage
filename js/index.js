/**
 * ステータス情報のJSON
 */
var statusSnap;

$(function(){
  initDb();
})

/**
 * HLDisplay_WebPage_Extra
 * DBの取得設定を行います。
 */
function initDb() {
  var db = firebase.database();
  //初期データ取得
  db.ref('/').once('value').then(function(snapshot) {
    init(snapshot.val());
  });

  //メンバー情報更新
  db.ref('members').on('value', function(snapshot) {
    snapshot.forEach(function(member) {

      updateMemberStatus(member.key, member.val());
    });
  });
}

/**
 * 初期化処理を行います。
 * AndroidApp側から呼び出される関数です。
 * @param {DataSnapShot} rootSnap DBのルート
 */
function init(rootSnap) {
  //ステータスの削除
  $("#memberStatus").empty();

  //ステータスの生成
  var members = rootSnap["members"];
  var status = rootSnap["status"];
  statusSnap = status;
  for(var i = 0; i < members.length; i++){
    var stateId = parseInt(members[i]["status"]);
    addMemberRow(i, members[i]["last_name"] + "　" + members[i]["first_name"], status[stateId]["name"], status[stateId]["color"]);
  }
  //initStatusDetailButton(status);
}
/**
 * メンバー情報の更新を行います。
 * AndroidApp側から呼び出される関数です。
 * @param {Number} memberId メンバーのID
 * @param {DataSnapShot} memberSnap メンバー情報
 */
function updateMemberStatus(memberId, memberSnap) {
  $('#memberStatus').children().each(function(index, element) {
    var card = $(element).find('.btn');
    var stateId = parseInt(memberSnap["status"]);
    if($(card).attr('data-id') == memberId) {
      //ステータスの更新
      var color = $(card).attr('data-color');
      $(card).attr({
        'data-id': memberId,
        'data-name': memberSnap["last_name"] + "　" + memberSnap["first_name"],
        'data-statusText': statusSnap[stateId]["name"],
        'data-color': statusSnap[stateId]["color"]
      });
      $(element).removeClass('table-' + color);
      $(element).addClass('table-' + statusSnap[stateId]["color"]);
      $(element).find('.name').text(memberSnap["last_name"] + "　" + memberSnap["first_name"]);
      $(element).find('.status').text(statusSnap[stateId]["name"])
      return false;
    }
  })
}

/**
 * カード押下時にステータス詳細モーダルを表示します
 * @param {object} obj - クリックされたカード
 */
function showStatusDetail(obj) {
  console.log(obj);
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
  $('#statusDetailModal').modal('hide');
  android.updateState(parseInt(userId), parseInt(stateId));
}

/**
 * ステータス情報を適用させます
 * Jsonpのコールバック関数です
 * @param {JSON} json - サーバからのレスポンスデータ
 */
function updateLayout(json){
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

/**
 * Htmlにカードを追加します
 * @param {int} id - ユーザid
 * @param {string} name - ユーザ名
 * @param {string} statusText - ステータス状態を表す文字列
 * @param {string} color - ステータス状態に対応するBootStrapカラー
 */
function addMemberRow(id, name, statusText, color){
  $('#memberStatus').append(
    $('<tr></tr>').addClass('table-' + color)
    .append($('<th></th>')
      .append($('<a href="#" class="btn btn-fix">詳細</a>')
        .attr({
          'onClick': 'showStatusDetail(this)',
          'data-id': id,
          'data-name': name,
          'data-statusText': statusText,
          'data-color': color
        })
      )
    )
    .append($('<td class="name"></td>').text(name))
    .append($('<td class="status"></td>').text(statusText))
  );
}

/**
 * ステータス更新用のボタンを作成します
 * @param {JSON} status - サーバからのレスポンスの内、ステータス情報の部分を抜き出したJSON
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
