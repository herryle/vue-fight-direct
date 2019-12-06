$(function() {
  //获取本地存储数据，并且转换成对象
  var arr = []
  function getData() {
    if (localStorage.tableList == undefined) {
      arr = []
    } else {
      arr = JSON.parse(localStorage.tableList)
    }
    return arr
  }
  add()

  //把数据存到本地存储，并且转换成字符串格式的JSON
  function saveData(data) {
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].rode_name == '') {
    //     data = data.splice(i, 1)
    //   }
    // }
    localStorage.tableList = JSON.stringify(data)
  }

  //增加行方法
  function add() {
    $('tbody:not(tbody:last)').remove() //每次增加行前删除前面的行，否则会重复增加
    var data = getData()
    $.each(data, function(i, v) {
      $('<tbody>')
        .html(
          `<tr index=${i}>
          <td rowspan="5">${i + 1}</td>
          <td  data-role='rode_name' rowspan="5" contenteditable="true" >${
            v.rode_name
          }</td>
          <td>雨水管线</td>
          <td   data-role='ys_state' contenteditable="true">${v.ys_state}</td>
          <td contenteditable="true"  data-role='issus_list' rowspan="5" style='width: 200px;'><div style="height:100px; width:100%; overflow-x:hidden;text-overflow: ellipsis;">
          ${v.issus_list}
      </div></td>
          <td rowspan="5" data-role='correct_list_before' ><button>整改前下载报告</button></td>
          <td rowspan="5" data-role='correct_list_after'><button>整改后下载报告</button></td>
          <td contenteditable="true"  data-role='remark' rowspan="5">${
            v.remark
          }</td>
        </tr>
        <tr index=${i}>
          <td rowspan="5">污水管线</td>
          <td contenteditable="true" rowspan="5" data-role='ws_state' >${
            v.ws_state
          }</td>
        </tr>`
        )
        .insertBefore('tbody:last')
    })
    // saveData(data)
  }

  //点击增加按钮事件
  $('.add').click(function() {
    var data = getData()
    data.push({
      rode_name: '',
      ys_state: '',
      ws_state: '',
      issus_list: '',
      correct_list_before: '',
      correct_list_after: '',
      remark: '',
      save_date: ''
    })
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

$('.save').on('click', () => {
  console.log(data)
})
