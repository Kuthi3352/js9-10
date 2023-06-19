///---------------4-------------------------
function getElement(selector) {
    return document.querySelector(selector)
}
var dsnv = new DSNV()
function getThongTinNV(){
//Lấy thông tin từ người dùng USER
var taiKhoan = getElement('#tknv').value 
var name = getElement('#name').value
var email = getElement('#email').value
var matKhau = getElement('#password').value
var ngayLam = getElement('#datepicker').value
var luongCoBan = +getElement('#luongCB').value
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
///----------validation-----------
// KIỂM TRA TK
var isValid = true
isValid &=
        kiemTraChuoi(nhanVien.taiKhoan, 1, undefined, '#tbTKNV', 'Mã nhân viên không được bỏ trống') &&
        kiemTraChuoi(nhanVien.taiKhoan, 6, 10, '#tbTKNV', 'Mã nhân viên từ 6 đến 10 ký tự')


 isValid &= kiemTraChuoi(nhanVien.name,
        1,
        undefined,
        '#tbTen',
        'Tên sinh viên không được bỏ trống')
isValid &= kiemTraTen(nhanVien.name,
    '#tbTen',
  
	
	"^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
    'Tên nhân viên phải là chữ'
    
    
    )
       
return isValid ? nhanVien : undefined;

}

getElement('#btnThemNV').onclick = function(){
var nhanVien = getThongTinNV(false)
dsnv.themNV(nhanVien)
renderdsnv()
// var nhanSu = new tienLuong(chucVu, luongCoBan);
// var tongLuong = nhanSu.tinhTongLuong();
// getElement('#tableDanhSach').innerHTML = tongLuong 




}
//render dsnv ra Ui
function renderdsnv(arrNV = dsnv.arrNV){
var content = '';
for(var i=0; i < arrNV.length; i++) {
var nv = arrNV[i]
content += `
<tr>
<td>${nv.taiKhoan}</td>
<td>${nv.name}</td>
<td>${nv.email}</td>
<td>${nv.matKhau}</td>
<td>${nv.ngayLam}</td>
<td>${nv.luongCb}</td>
<td>${nv.chucVu}</td>
<td>${nv.gioLam}</td>
</tr>

`   
}
console.log("content", content);
getElement('#tableDanhSach').innerHTML = content ;
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
