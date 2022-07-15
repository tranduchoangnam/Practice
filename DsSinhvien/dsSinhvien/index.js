const fs=require('fs');

fs.readFile('data.json',(err,data)=>{
    if(err)throw(err);
    const list=JSON.parse(data);
    let sv=[];
    console.log("Danh sach Sinh Vien: ");
    for(let i in list){
        sv[i]=new SinhVien(
            list[i].maSV,
            list[i].tenSV,
            list[i].tuoi,
            list[i].gioiTinh,
            list[i].ngaySinh,
            list[i].diemToan,
            list[i].diemLy,
            list[i].diemHoa,
            list[i].diemAnh,
            list[i].lop
        );
        console.log(sv[i]);
        console.log(sv[i].print());
    }
    let ok=[],array=[],ulop=[];
    for(let i in sv){
        let temp=sv[i].lop;
        if(ok[temp]!=1){
            array.push(temp);
            ok[temp]=1;
        }
    }
    for (let i in array){
        ulop[i]=sv.filter((value)=>{
            return value.lop==array[i];
        })
    }
    for (let i in ulop){
        let min=10,max=0;
        for(let k in ulop[i]){
            min=min>ulop[i][k].average()?ulop[i][k].average():min;
            max=max<ulop[i][k].average()?ulop[i][k].average():max;
        }
        console.log("Lop "+array[i]+" diem cao nhat la",max," thap nhat la",min);
    }
    
});


class SinhVien{
    constructor(maSv,tenSv,tuoi,gioiTinh,ngaySinh,diemToan,diemLy,diemHoa,diemAnh,lop){
        this.maSv=maSv;
        this.tenSv=tenSv;
        this.tuoi=tuoi;
        this.gioiTinh=gioiTinh;
        this.ngaySinh=ngaySinh;
        this.diemToan=diemToan;
        this.diemLy=diemLy;
        this.diemHoa=diemHoa;
        this.diemAnh=diemAnh;
        this.lop=lop;
    }
    average(){
        return (this.diemToan+this.diemAnh+this.diemHoa+this.diemLy)/4;
    }
    check(){
        if(this.diemToan<4||this.diemAnh<4||this.diemHoa<4||this.diemLy<4)return "NO";
        return "YES";
    }
    print(){
        console.log("Diem trung binh: ",this.average() );
        console.log("Diem toan: ",init(this.diemToan));
        console.log("Diem ly: ",init(this.diemLy));
        console.log("Diem hoa: ",init(this.diemHoa));
        console.log("Diem anh: ",init(this.diemAnh));
        console.log("Tinh trang qua mon: ",this.check());
        return "...\n\n"
    }
    
}
function init(x){
    let ok;
    if(x>=8.5)ok=1;
    if(x>=7.0&&x<8.5)ok=2;
    if(x>=5.5&&x<7)ok=3;
    if(x>=5&&x<5.5)ok=4;
    if(x>=4&&x<5)ok=5;
    if(x<4)ok=0;
    switch(ok){
        case 0:return 'F';
        case 1:return 'A';
        case 2:return 'B';
        case 3:return 'C';
        case 4:return 'D';
        case 5:return 'D+';
    }
}
