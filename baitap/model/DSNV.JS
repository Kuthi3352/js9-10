function DSNV() {
    this.arrNV = [];
    this.themNV = function (nhanVien) {
        this.arrNV.push(nhanVien);
    }

    this.capNhatNV = function (nhanVien) {
        var index = this.timNV(nhanVien.maNV)
        if (index !== -1) {
            this.arrNV[index] = nhanVien
        }
    }


    this.xoaNV = function (maNhanVien) {
        // var index = -1
        // // B1: tìm index của phần tử cần xóa dựa vào thuộc tính mã sinh viên
        // for (var i = 0; i < this.arrSV.length; i++) {
        //     var maSV = this.arrSV[i].maSV
        //     if (maSV === maSinhVien) {
        //         index = i
        //     }
        // }

        var index = this.timNV(maNhanVien)
        console.log('index: ', index)
        //B2: xóa phần tử có index tìm đc
        if (index !== -1) {
            this.arrNV.splice(index, 1)
        }
        // return -1
    }

};