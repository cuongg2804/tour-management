
// Xóa Tour
const listBtnDel = document.querySelectorAll("[button-delete]");
if(listBtnDel) {
    listBtnDel.forEach((button) => {
        button.addEventListener("click", (event) => {
            const idTour = button.getAttribute("data-id");
            const title = button.getAttribute("title");
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa " + title);
            if(isConfirm) {
                fetch(`/admin/tours/delete/${idTour}`,{
                    method :"POST"
                })
                .then((res) => res.json())
                .then((data) => {
                    if(data.code == 200) {
                        location.reload();
                    }
                    else{
                        alert("Xóa thất bại, vui lòng thử lại!");
                    }
                })
            }
        })
    })
}

//Xóa tour

//Form-Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = event.target.elements.keyword.value.trim(' ');
    if(keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

//Form-Search

//Pagination
const btnPaginantion = document.querySelectorAll("[button-pagination]");
if(btnPaginantion){
    btnPaginantion.forEach((button) => {
        button.addEventListener("click", (event) => {
            const page = button.getAttribute("button-pagination");
            const url = new URL(window.location.href);
            url.searchParams.set("page",page);
            window.location.href = url;
        })
    })
}
//Pagination


// Xóa Category
const listBtnDelCate = document.querySelectorAll("[button-delete-category]");
if(listBtnDelCate) {
    listBtnDelCate.forEach((button) => {
        button.addEventListener("click", (event) => {
            const idCategory = button.getAttribute("data-id");
            const title = button.getAttribute("title");
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa " + title);
            if(isConfirm) {
                fetch(`/admin/categories/delete/${idCategory}`,{
                    medthod:"POST"
                })
                .then((res) => res.json())
                .then((data) => {
                    if(data.code == 200) {
                        location.reload();
                    }
                    else{
                        alert("Xóa thất bại, vui lòng thử lại!");
                    }
                })
            }
        })
    })
}