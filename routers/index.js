var express = require('express');
var router = express.Router();
var firstImage = require('../modules/firstimage');
var ChuDe = require('../models/chude');
var BaiViet = require('../models/baiviet');

// GET: Trang chủ
router.get('/', async (req, res) => {
	//Lay chuyen muc chu de
	var cm = await ChuDe.find();
	
	//Lay 12 bai viet moi nhat
	var bv = await BaiViet.find({ KiemDuyet: 1 })
		.sort({ NgayDang: -1})
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(12).exec();
		
	//Lay 3 bai viet xem nhieu nhat hien thi vao cot phai
	var xnn = await BaiViet.find({ KiemDuyet: 1 })
		.sort({ LuotXem: -1 })
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(3).exec();
			
	res.render('index',{
		title: 'Trang chu',
		chuyenmuc: cm,
		baiviet: bv,
		xemnhieunhat: xnn,
		firstImage: firstImage
	});
});

// GET: Lấy các bài viết cùng mã chủ đề
router.get('/baiviet/chude/:id', async (req, res) => {
	var id = req.params.id;
	
	//Lay chuyen muc hien thu vao menu
	var cm = await ChuDe.find();
	
	//Lay thong tin chu de de hien thi
	var cd = await ChuDe.findById(id);
	
	// Lay 8 bai viet moi nhat cung chuyen muc
	var bv = await BaiViet.find({ KiemDuyet: 1, ChuDe: id})
		.sort({NgayDang: -1})
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(8).exec();
		
	// Lay 3 bai viet xem nhieu nhat hien thi vao cot phai
	var xnn = await BaiViet.find({ KiemDuyet: 1, ChuDe: id})
		.sort({LuotXem: -1})
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(3).exec();
		
	res.render('baiviet_chude',{
		title: 'Bai viet cung chuyen muc',
		chuyenmuc: cm,
		chude: cd,
		baiviet: bv,
		xemnhieunhat: xnn,
		firstImage: firstImage
	});	
});

// GET: Xem bài viết
router.get('/baiviet/chitiet/:id', async (req, res) => {
	var id = req.params.id;
	
	//Lay chuyen muc hien thi vao menu
	var cm = await ChuDe.find();
	
	//Lay thong tin bai viet hien tai
	var bv = await BaiViet.findById(id)
		.populate('ChuDe')
		.populate('TaiKhoan')

	//Xu ly tang luot xem bai viet
	await BaiViet.findByIdAndUpdate(id, {
		LuotXem: bv.LuotXem + 1
	});
	
	// Lay 3 bai viet xem nhieu nhat hien thi vao cot phai
	var xnn = await BaiViet.find({ KiemDuyet: 1, ChuDe: id})
		.sort({LuotXem: -1})
		.populate('ChuDe')
		.populate('TaiKhoan')
		.limit(3).exec();
		
	res.render('baiviet_chitiet',{
		chuyenmuc: cm,
		baiviet: bv,
		xemnhieunhat: xnn,
		firstImage: firstImage
	});		
});

// GET: Tin mới nhất
router.get('/tinmoi', async (req, res) => {
	res.render('tinmoinhat', {
		title: 'Tin mới nhất'
	});
});

// POST: Kết quả tìm kiếm
router.post('/timkiem', async (req, res) => {
	var tukhoa = req.body.tukhoa;
	
	// Xử lý tìm kiếm bài viết
	var bv = [];
	
	res.render('timkiem', {
		title: 'Kết quả tìm kiếm',
		baiviet: bv,
		tukhoa: tukhoa
	});
});

// GET: Lỗi
router.get('/error', async (req, res) => {
	res.render('error', {
		title: 'Lỗi'
	});
});

// GET: Thành công
router.get('/success', async (req, res) => {
	res.render('success', {
		title: 'Hoàn thành'
	});
});

module.exports = router;