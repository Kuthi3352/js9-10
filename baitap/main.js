///---------------4-------------------------
function getElement(selector) {
    return document.querySelector(selector)
}
var dsnv = new DSNV()
function getThongTinNV() {
    //Lấy thông tin từ người dùng USER
    var taiKhoan = getElement('#tknv').value
    var name = getElement('#name').value
    var email = getElement('#email').value
    var matKhau = getElement('#password').value
    var ngayLam = getElement('#datepicker').value
    var luongCoBan = getElement('#luongCB').value
    var chucVu = getElement('#chucvu').value
    var gioLam = getElement('#gioLam').value

    // Tạo đối tượng NV lấy từ user
    var nhanVien = new NhanVien(
        taiKhoan,
        name,
        email,
        matKhau,
        ngayLam,
        luongCoBan,
        chucVu,
        gioLam
    )
    console.log(nhanVien.luongCB)
    console.log(nhanVien.taiKhoan)
    ///----------validation-----------
    // KIỂM TRA TK
    var isValid = true
    isValid &=
        kiemTraChuoi(nhanVien.taiKhoan, 1, undefined, '#tbTKNV', 'Mã nhân viên không được bỏ trống')
        &&
        kiemTraChuoi(nhanVien.taiKhoan, 6, 10, '#tbTKNV', 'Mã nhân viên từ 6 đến 10 ký tự')



    // kt tên
    isValid &= kiemTraChuoi(nhanVien.name,
        1,
        undefined,
        '#tbTen',
        'Tên sinh viên không được bỏ trống')
        &&

        kiemTraTen(nhanVien.name,
            '#tbTen',
            /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
            'Tên nhân viên phải là chữ'
        )
    //kt email
    isValid &= kiemTraChuoi(nhanVien.email,
        1,
        undefined,
        '#tbEmail',
        'Email không được bỏ trống')
        &&
        kiemTraTen(nhanVien.email,
            '#tbEmail',
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Email không đúng định dạng'
        )
    //kt mật khẩu
    isValid &= kiemTraChuoi(nhanVien.matKhau, 1, undefined, '#tbMatKhau', 'Mật khẩu không để trống')
        &&
        kiemTraTen(nhanVien.matKhau,
            '#tbMatKhau',
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
            'Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)'
        )
    //kt lương cơ bản
    isValid &= kiemTraChuoi(nhanVien.luongCB, 1, undefined, '#tbLuongCB', 'Lương không để trống');







    // kt số giờ làm
    isValid &= kiemTraChuoi(nhanVien.gioLam, 1, undefined, '#tbGiolam', 'Số giờ làm không để trống');




    return isValid ? nhanVien : undefined;


}

getElement('#btnThemNV').onclick = function () {
    var nhanVien = getThongTinNV(false)
    console.log(nhanVien)
    dsnv.themNV(nhanVien)
    renderdsnv()
    setLocalStorage()

    //reset form
    getElement('#formQLNV').reset()

    //     // var nhanSu = new tienLuong(chucVu, luongCoBan);
    //     // var tongLuong = nhanSu.tinhTongLuong();
    //     // getElement('#tableDanhSach').innerHTML = tongLuong 
    // }

    // var tkForm = document.getElementById("tkForm");
    // tkForm.addEventListener("submit", (e) => {
    //     e.preventDefault();

    // handle submit
    // var nhanVien = getThongTinNV()
    // console.log(nhanVien)
    // dsnv.themNV(nhanVien)
    // renderdsnv()
    // var nhanSu = new tienLuong(chucVu, luongCoBan);
    // var tongLuong = nhanSu.tinhTongLuong();
    // getElement('#tableDanhSach').innerHTML = tongLuong

}

//render dsnv ra Ui
function renderdsnv(arrNV = dsnv.arrNV) {
    var content = '';
    // console.log(arrNV)

    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i]
        // console.log(nv);
        content += `
            <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.name}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td></td>
            <td></td>
            <td>
            <button class='btn btn-success mr-3' onclick="updateSV('${nv.taiKhoan}')"> Edit</button>
            <button class='btn btn-danger'onclick = "deleteSV('${nv.taiKhoan}')"> Delete</button>
             </td>
            </tr>
            `
    }
    // <td>${nv.matKhau}</td>
    console.log("content", content);
    getElement('#tableDanhSach').innerHTML = content;


}

// function tienLuong(chucVu, luongCoBan){
//     this.chucVu = chucVu ;
//     this.luongCoBan = luongCoBan ;
// }
// tienLuong.prototype.tinhTongLuong = function(){
// if(this.chucVu === "Sếp"){
//     return this.luongCoBan * 3 ;
// }else if(this.chucVu === "Trưởng phòng"){
//     return this.luongCoBan * 2 ;
// }else if(this.chucVu === "Nhân viên"){
//     return this.luongCoBan ;
// }else{
//     return 0 ;
// }
// };

// Lưu danh sách nhan viên vào localStorage
function setLocalStorage() {
    // B1: chuyển data về dạng string
    var data = JSON.stringify(dsnv.arrNV)
    //B2: Lưu vào local
    localStorage.setItem('DSNV', data)

}

// get danh sách nhan viên từ localStorage (lấy từ local ra)
function getLocalStorage() {
    //B1: lấy data từ local
    var data = localStorage.getItem('DSNV')
    //B2: parse data về kiểu dữ liệu ban đầu
    if (data) {
        var parseData = JSON.parse(data)
        // console.log('parseData: ', parseData);

        // Tạo lại đối tượng nhanVien từ lớp đối nhanVien để lấy lại phương thức tinhDTB
        //B1: tạo mảng rổng để lưu dssv 
        var arr = []
        // B2: duyệt mảng đc lấy từ local
        for (var i = 0; i < parseData.length; i++) {
            var nv = parseData[i]
            console.log('nv: ', nv)
            // tạo lại đối tượng sv từ lớp đối tượng SV
            var nhanVien = new NhanVien(
                nv.taiKhoan,
                nv.name,
                nv.email,
                nv.matKhau,
                nv.ngayLam,
                nv.luongCoBan,
                nv.chucVu,
                nv.gioLam
            )
            // thêm sinhVien vào mảng arr
            arr.push(nhanVien)
        }

        // gán giá trị cho mảng arrSV từ data lấy từ localStorage
        dsnv.arrNV = arr
        renderdsnv()

    }
}
getLocalStorage()


// Xóa sinh viên
function deleteSV(maNV) {
    console.log('maSV: ', maNV);
    dssv.xoaSV(maNV)
    console.log('dsnv', dsnv.arrNV);
    // Gọi lại hàm render để cập nhật lại UI sau khi xóa thành công
    renderdsnv()

    // cập nhật lại data lưu dưới local storage
    setLocalStorage()
}

// cập nhật sinh viên
function updateSV(maNV) {
    console.log('maSV: ', maNV)
    var index = dsnv.timSV(maNV)
    // console.log('index: ', index)
    var sv = dsnv.arrNV[index]
    console.log('nv: ', nv);

    // đẩy data lên input



    getElement('#tknv').value = nv.taiKhoan
    getElement('#name').value = nv.name
    getElement('#email').value = nv.email
    getElement('#password').value = nv.matKhau
    getElement('#datepicker').value = nv.ngayLam
    getElement('#luongCB').value = nv.luongCoBan
    getElement('#chucvu').value = nv.chucVu
    getElement('#gioLam').value = nv.gioLam
}

getElement('#btnCapNhat').onclick = function () {
    // Lấy lại thông tin sinh viên sau khi chỉnh sửa xong
    var nhanVien = getThongTinNV()

    // cập nhật sinh viên
    dsnv.capNhatNV(nhanVien)

    //  render lại UI 
    renderdsnv()

    // cập nhật data local
    setLocalStorage()

    //reset form
    getElement('#formQLNV').reset()

}