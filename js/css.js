function setCss(pNum){
	var cssName;
	var cssList = new Array();
	//=========================================================================
	// 初期設定
	//=========================================================================
	//-- どれにも該当しなかった際に使用されるcss
	defaultCss = 'f_winie.css';
	//------------------------------------------------
	// ブラウザ情報のセット
	//------------------------------------------------
	// ■書式        OS         ブラウザ      省略可   省略可
	// cssList['(Mac/Win/Unix)(IE/NN/OP/SF/FF)(バージョン)(+/-)'] = 'ファイル名';
	// IE=InternetExproller NN=Netscape OP=Opera SF=Safari FF=FireFox
	//
	// ※バージョン番号を省略すると、該当したOS/ブラウザ全て
	// ※バージョン番号に+/-を付けると、指定バージョン以上/以下
	//------------------------------------------------
	cssList['WinIE']			= 'f_winie.css';		//-- Win IE
	cssList['WinFF']			= 'f_winff.css';		//-- Win FireFox
	cssList['WinOP9.5+']	= 'f_winop.css';		//-- Win Opera 9.5以上
	cssList['WinOP']			= 'f_winop2.css';		//-- Win Opera
	cssList['MacSF']			= 'f_macsf.css';		//-- Mac Safari
	cssList['MacFF3+']		= 'f_macff.css';		//-- Mac FireFox 3.0以上
	cssList['MacFF']			= 'f_macff2.css';		//-- Mac FireFox
	cssList['MacOP9.5+']	= 'f_macop.css';		//-- Mac Opera 9.5以上
	cssList['MacOP']			= 'f_macop2.css';		//-- Mac Opera
	//=========================================================================

	os = getOSType();
	browser = getBrowserName();
	version = getBrowserVersion();
	for (key in cssList){
		if (key == os || key == os+browser || key == os+browser+version){
			cssName = cssList[key];
			break;
		}else if (key.indexOf(os+browser) == 0){
			v = key.substring((os+browser).length,key.length);
			if (v.indexOf('+') > 0){
				vNo = v.substring(0, v.indexOf('+'));
				if (version >= vNo){
					cssName = cssList[key];
					break;
				}
			}else if (v.indexOf('-') > 0){
				vNo = v.substring(0, v.indexOf('-'));
				if (version <= vNo){
					cssName = cssList[key];
					break;
				}
			}
		}
	}
	if (!cssName){
		cssName = defaultCss;
	}
	var path = '';
	for(i=0;i<pNum;i++){
		path += '../';
	}
	document.write('<link rel="stylesheet" href="'+path+'css/'+cssName+'" type="text/css">');
}

//-- OSを取得
function getOSType()
{
	var uAgent  = navigator.userAgent.toUpperCase();
	if (uAgent.indexOf("MAC") >= 0){
		return "Mac";
	}
	if (uAgent.indexOf("WIN") >= 0){
		return "Win";
	}
	if (uAgent.indexOf("X11") >= 0){
		return "UNIX";
	}
	return "";
}

//-- ブラウザ名を取得
function getBrowserName()
{
	var aName  = navigator.appName.toUpperCase();
	var uName = navigator.userAgent.toUpperCase();
	if (uName.indexOf("SAFARI") >= 0){
		return "SF";
	}
	if (uName.indexOf("OPERA") >= 0){
		return "OP";
	}
	if (uName.indexOf("FIREFOX") >= 0){
		return "FF";
	}
	if (aName.indexOf("NETSCAPE") >= 0){
		return "NN";
	}
	if (aName.indexOf("MICROSOFT") >= 0){
		return "IE";
	}
	return "";
}

//-- ブラウザのバージョンを取得
function getBrowserVersion()
{
	var browser = getBrowserName();
	var v = 0;
	var s = 0;
	var e = 0;
	var appVer  = navigator.appVersion;
	var uName  = navigator.userAgent.toUpperCase();
	if (browser == "SF"){
		v = eval(appVer.substring(0,3)) - 4;
	}
	if (browser == "OP"){
		s = uName.indexOf("OPERA ",0) + 7;
		e = uName.indexOf(" ",s);
		v = eval(uName.substring(s,e));
	}
	if (browser == 'FF'){
		s = uName.indexOf('FIREFOX/',0);
		v = parseFloat(uName.substring(s+8,s+8+3));
	}
	if (browser == "NN"){
		s = appVer.indexOf(" ",0);
		v = eval(appVer.substring(0,s));
		if (v >= 5) v++;
	}
	if (browser == "IE"){
		appVer  = navigator.userAgent;
		s = appVer.indexOf("MSIE ",0) + 5;
		e = appVer.indexOf(";",s);
		v = eval(appVer.substring(s,e));
	}
	return v;
}