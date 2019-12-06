$(function() {
  //获取本地存储数据，并且转换成对象
  var arr = []
  function getData() {
    if (sessionStorage.tableList == undefined) {
      arr = []
    } else {
      arr = JSON.parse(sessionStorage.tableList)
    }
    return arr
  }
  add()

  //把数据存到本地存储，并且转换成字符串格式的JSON
  function saveData(data) {
    //  var data = getData();
    //  JSON.stringify(sessionStorage.tableList);
    sessionStorage.tableList = JSON.stringify(data)
  }

  //增加行方法
  function add() {
    $('tr:not(tr:first,tr:last)').remove() //每次增加行前删除前面的行，否则会重复增加
    var data = getData()
    $.each(data, function(i, v) {
      $('<tr>')
        .attr('index', i)
        .html(
          "<td contenteditable='true' data-role='name' rowspan='6'>" +
            v.name +
            '</td>' +
            "<td contenteditable='true' data-role='sex' >" +
            v.sex +
            '</td>' +
            "<td contenteditable='true' data-role='age' >" +
            v.age +
            '</td>' +
            "<td contenteditable='true' data-role='tel'>" +
            v.tel +
            '</td>' +
            "<td ><button class='btn btn-danger btn-sm'>删除</button></td>"
        )
        .insertBefore('tr:last')
    })
    saveData(data)
  }

  //点击增加按钮事件
  $('.btn-sm').click(function() {
    var data = getData()
    data.push({ name: '', sex: '', age: '', tel: '' })
    saveData(data)
    add()
  })

  //删除行方法，事件委派，根据当前点击的按钮的行的索引值
  $('table').on('click', '.btn-danger', function() {
    var data = getData()
    var index = $(this)
      .parent()
      .parent()
      .attr('index')
    data.splice(index, 1)
    saveData(data)
    add()
  })

  //可编辑效果 contenteditable='true'
  $('table').on('blur', '[contenteditable="true"]', function() {
    var data = getData()
    var index = $(this)
      .parent()
      .attr('index')
    var val = $(this).html()
    var attr = $(this).attr('data-role')
    data[index][attr] = val
    saveData(data)
  })
})
