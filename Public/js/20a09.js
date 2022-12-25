function RemoveUser(_id) {
  $(`#${_id}`).remove();
  $.post(`/admin/client-management/delete/${_id}`);
}
function UpgradeUser(_id) {
  $(`#loaiuser${_id}`).text("Giáo Viên");
  $(`#btn-upgrade${_id}`).remove();
  $.post(`/admin/client-management/upgrade/${_id}`);
}
function RemoveProduct(_id) {
  $(`#${_id}`).remove();
  $.post(`/admin/product-management/delete/${_id}`);
}
function UpgradeProduct(_id) {
  $(`#btn-upgrade${_id}`).remove();
  $.post(`/admin/product-management/upgrade/${_id}`);
}
function RemoveBill(_id) {
  $(`#${_id}`).remove();
  $.post(`/admin/business-management/delete/${_id}`);
}
function AddToCart(_id) {
  $.ajax({
    type: "POST",
    url: `/cart/add/${_id}`,
    success: (response) => {
      if (response) {
        window.location.href = `/login/?retUrl=${window.location.href}`;
      }
    },
  });
    $('.toast').toast('show');
}

function AddToCartPlus(_id) {
  $.ajax({
    type: "POST",
    url: `/cart/addplus/${_id}`,
    success: (response) => {
      if (response) {
        window.location.href = window.location.href;
      }
    },
  });
    $('.toast').toast('show');
}
function MinusToCart(_id) {
  $.ajax({
    type: "POST",
    url: `/cart/minus/${_id}`,
    success: (response) => {
      if (response) {
        window.location.href = window.location.href;
      }
    },
  });
    $('.toast').toast('show');
}
function RemoveCart(_id, price, discount) {
  var total = parseFloat($(`#totalprice`).text());
  total = total - price * (1 - discount);
  $(`#totalprice`).text(total+"$");
  $(`#${_id}`).remove();
  $.post(`/cart/delete/${_id}`);
}
$("#gotopage").change(function () {
  $("#a").empty();
  $("#a").append(
    `  <a href="${$(
      this
    ).val()}" class="btn btn-danger btn-rounded btn-sm my-0" >Đi đến</a>`
  );
});
$("#gotopage").change(function () {
  $("#a").empty();
  $("#a").append(
    `  <a href="${$(
      this
    ).val()}" class="btn btn-danger btn-rounded btn-sm my-0" >Đi đến</a>`
  );
});


function postcomment(idpr) {
  var cmt = $("#commenttext").val();
  $("#commenttext").val("");
  var txt = "<li><b>Your comment</b></li>";
  var txt2 = `<p>${cmt}</p>`
  $('#listcomment').append(txt,txt2);
  $.post(`/mycourse/${idpr}`,
  {cmt: cmt}
  );
}
function searchByNameProduct(e) {
  //window.event.preventDefault();
  //console.log("aaaa");
  let stringQuery = document.getElementById("nameproduct").value;
  let selectQuery = document.getElementById("level").value;
  console.log("selectQuery=" + selectQuery);
  if (selectQuery == "1") {
    // window.location.replace(
    //   `/product/search?nameproduct=${stringQuery}&page=1`
    // );
    window.location.href=`/product/search?nameproduct=${stringQuery}&page=1`;
  }
  if (selectQuery == "2") {
    // window.location.replace(
    //   `/product/search?namecategory=${stringQuery}&page=1`
    // );
    window.location.href=`/product/search?namecategory=${stringQuery}&page=1`;
  }
  if (selectQuery == "3") {
    // window.location.replace(
    //   `/product/search?price=${stringQuery}&page=1`
    // );
    window.location.href=`/product/search?price=${stringQuery}&page=1`;
  }
  if (selectQuery == "4") {
    // window.location.replace(
    //   `/product/search?author=${stringQuery}&page=1`
    // );
    window.location.href=`/product/search?author=${stringQuery}&page=1`;
  }
  //console.log("this is tring query" +  $('#level').val(selectedIndex));
  //$('#level').val(selectedIndex);
  //window.location.replace(`/product/search/${stringQuery}/1`);
  return false;
}



//   window.event.preventDefault();
//   let stringQuery = document.getElementById("nameproduct").value;
//   let selectQuery = document.getElementById("level").value;
//   //console.log(selectQuery);
//   if (selectQuery == "1") {
//     window.location.replace(`/product/search/nameproduct=${stringQuery}/1`);
//   } else {
//     if (selectQuery == "2") {
//       window.location.replace(`/product/search/namecategory=${stringQuery}/1`);
//     }
//   }
//   return false;
// }

$("#sortby").change(function () {
  let choice = $(this).val();
  let k = window.location.href;
  //console.log("link: "+k);
  let indexsort = k.indexOf("sortby");
  //if(indexsort!=-1) {k= k.substr(0,indexsort+7)+choice; console.log("aaaaa: "+k);}
  let indexpage = k.indexOf("page"); //console.log("index: "+indexpage+"indexsort: " +indexsort);
  let isSearch = k.indexOf("Allproduct?");
  if (isSearch != -1) {
    k = k.substr(0, isSearch + 11) + "sortby=" + choice + "&page=1";
  } else {
    if (indexsort != -1) {
      k = k.substr(0, indexsort - 1);
    }
    if (indexpage != -1) {
      k = k.substr(0, indexpage - 1) + "&sortby=" + choice + "&page=1";
    } else {
      k = k + "&sortby=" + choice + "&page=1";
    }
  }

  //console.log("replace: "+k);
  //window.location.replace(k);
  window.location.href=k;
});


function myFunction() {
  var x = document.getElementById("category").value;
  document.getElementById("mycategory").innerHTML = x;
}