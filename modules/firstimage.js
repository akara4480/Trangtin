function firstImage(noiDung) {
	var regExp = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
	var results = regExp.exec(noiDung);
	var image = 'https://trangtin-yiy1.onrender.com/images/noimage.png';
	if(results) image = results[1];
	return image;
}

module.exports = firstImage;