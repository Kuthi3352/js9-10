/**
 * @param value giá trị chuỗi cần kiểm tra
 * @param  minLength Chiều dài tối thiểu của chuỗi cần kiểm tra
 * @param  maxLength Chiều dài tối đa của chuỗi (nếu maxLength = undefined và minLength = 1 => kiểm tra rỗng)
 * @param selector selector của thẻ cần hiển thị looix
 * @param messErr Lỗi cần hiển thị lên UI nếu `value` không thỏa mãn điều kiện
 * 
 */
function kiemTraChuoi(value, minLength, maxLength, selector, messErr) {
    // Nếu như kiểm tra false
    if (value.trim().length < minLength || value.trim().length > Number(maxLength)) {
        getElement(selector).innerHTML = messErr
        getElement(selector).style.display = 'block';
        return false
    }

    if (selector === '#tbLuongCB') {
        if ((Number(value) < 1000000 || Number(value) > 20000000)) {
            getElement(selector).innerHTML = " Lương cơ bản 1 000 000 - 20 000 000"
            getElement(selector).style.display = 'block';
            return false
        }
    };
    // kt số giờ làm
    if (selector === '#tbGiolam') {
        if ((Number(value) < 80 || Number(value) > 200)) {
            getElement(selector).innerHTML = "Số giờ làm trong tháng 80 - 200 giờ"
            getElement(selector).style.display = 'block';
            return false
        }
    };
    // Nếu như kiểm tra true
    getElement(selector).innerHTML = ''
    return true
}


/**
 *
 * @param value chuỗi cần kiểm tra
 * @param selector Thẻ hiển thị lỗi
 * @param pattern chuỗi pattern để kiểm tra chuỗi
 * @param messErr Mess err cần hiển thị
 */

function kiemTraTen(value, selector, pattern, messErr) {

    // Nếu chuỗi ko thỏa mãn pattern
    if (!pattern.test(value)) {
        getElement(selector).innerHTML = messErr
        getElement(selector).style.display = 'block';
        return false
    }

    // Nếu chuỗi đúng
    getElement(selector).innerHTML = ''
    return true
}