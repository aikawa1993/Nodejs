$(document).ready(function () {
    $.ajax({
            type: "GET",
            url: "/listAdminJson",
            dataType: "json",
            contentType: "application/json",
            success : function (result){
                // Sau khi gửi và kết quả trả về thành công thì gán nội dung trả về
                // đó vào thẻ div có id = result
                alert(result);
            }
        });
});