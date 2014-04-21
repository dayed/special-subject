/**
 * requires CX base.js
 * @author auscar( huihua.lin@opi-corp.com )
 * @date 2009-07-27
 * @version beta
 * 
 * chang log:
 * (1) 2009-7-31 - 修正了一个上线之后的bug:学校选项列表在上线测试时生成错误的<ul>项目, 而在离线状态下正常.
 * (2) 2009-8-4 - 修正后台返回onclick='SchoolComponent.tihuan(.....)'带来的错误.在全局环境下添加了SchoolComponet对象,并将相应方法置空
 */
/**
 * 无侵入式学校选择组件.
 * 使用方法:
 * 页面上有一个:
 * <input type="text" id='yourID' class="s-select s-univ" />
 * <input type="hidden" id='yourID_id' />
 * <select id="yourID_dept"></select>
 * 然后引入CX.ui.schoolSelector.js便可.其中第二个input可以不要, 如果要的话请注意它的id的写法.
 * 与第二个input相同, 第三个select控件并不是必须的(它是院系选择框), 如果要的话, 同样要注意它的id的写法, 注意id后缀'_id'. 
 * 
 * 另外, 类名中的"s-select"为必须, 而"s-univ"还有其他的可选值(高中:s-hight/初中:s-junior/中专:s-tech)
 * 
 * 其实不一定非得要input, 任何一个可以click的元素都可以使用本组件. 只需要按照要求定义类名便可.
 */
/**
 * 编程接口:
 * 本组件仅向外提供一个接口:
 * CX.ui.schoolSelector.pageConf(fn).
 * 
 * 当你选择完一个学校, 学校选择面板关闭之前, 你可能想做一些事情.
 * 将你想要做的事情编写成一个函数, 然后将这个函数传给pageConf方法即可。你的函数将会被传入两个参数:
 * 一个是目标元素, 即用户点击后弹出面板的那个元素(它必定有类似's-univ''s-high'的类名); 另外一个参数就是学校
 * 选择面板中的某一选择结果, 它是一个<a>链接的引用. 注意, 在你的函数内的this关键是一个CX.ui.schoolSelector
 * 的引用.
 * 
 * 可多次调用pageConf函数, 各次调用之间并不影响. 不用担心前面一次调用的函数会被后面一次调用传入的函数所覆盖.
 */


//modify by 李双宝 at 2010.4.29 优化
//modify by 李双宝 at 2010.5.10	CX.ui.schoolSelector.showpan 方法接受第二个参数表示默认选中的国家 第三个参数表示默认选中的省份
 
CX.namespace('ui.schoolSelector');


//------- 成员变量 ---------------------------------------------------------
/**
 * 获取链接中的学校ID的正则表达式.类似"http://www.renren/xxx/xxx/10020"的链接就是本表达式的目标
 */
CX.ui.schoolSelector.idReg =  /(\d*)$/;// 我不懂正则表达式,随便写一个...够用了
CX.ui.schoolSelector.quRegx = /(city_qu_\d+)/;
CX.ui.schoolSelector.hidePanCallback;
//------------------------------------------------------------------------

var unescapeHTML = function(html) {
    var n = document.createElement("div");
    n.innerHTML = html;
    if(CX.browser.IE){
        return n.innerText;         
    }else{
        return n.textContent; 
    }
};


/**
 * 整个组件的初始化方法.它将搜索页面上拥有特定类名的元素, 并根据类名将元素转换成一个学校的选择框.
 * @param {Function} _callback - 这个callback传或者不传入都没有所谓传入了仅仅是把它加入到callbacks集合里面而已.
 */
CX.ui.schoolSelector.init = function(){
	//缺省配置
	this.options = {callback:new Function(), context:document};
	//兼容旧版
	if(arguments[0] && arguments[0].constructor == Function)
		this.options.callback = arguments[0];
	//新版对象参数
	else if(arguments[0] && arguments[0].constructor == Object)
		extendObject(this.options, arguments[0]);
	
	this.pageConf(this.options.callback);
	//初始化大学选项面板
    this.univ.init();
    
	//初始化中学选项面板
    this.sch.init();
	
    var that = this;
    //通过类名来获取HTML控件对象的引用 
    var inputArray = Sizzle('.s-select', this.options.context);
	
	for(var i = 0; i < inputArray.length; i++){
		//判断元素是否初始化
		if(inputArray[i].inited)
			continue;
		(function(index){
			var element = inputArray[index];
			element.inited = true;
			
			//如果有学校ID 而且存在此学校的院系 自动填充 并根据院系的title设置默认值
			var dept = Sizzle('#' + element.id + '_dept', that.options.context)[0];
			var schoolId = Sizzle('#' + element.id + '_id', that.options.context)[0] && Sizzle('#' + element.id + '_id', that.options.context)[0].value;
			if(dept && schoolId && Number(schoolId) != 0){
				that.univ.fillUniversityDept(schoolId, dept, function(){
					CX.ui.schoolSelector.selectByValue(dept, dept.getAttribute('title'));
				});
			}
			
			//可能换成addEvent
			var eventType = (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') ? 'onfocus' : 'onclick';
			element[eventType] =  function(){
	         	this.blur();
	            that.curCom = this;	//注意, "curCom" is short for "current component"
	            var result = /(s-univ|s-tech|s-junior|s-high)/.exec(this.className);
				result[1] ? that.showpan(result[1]) : that.showpan();
	            return false;
	        };			
		})(i);
    }
	this.initialized = true;//最后做一个标志, 表示已经初始化过了
}

/**
 * schoolSelector的页面配置函数. 当你选择完一个学校, 学校选择面板关闭之前, 你希望做的事情。
 * 将你想要做的事情编写成一个函数, 然后将这个函数传给pageConf方法即可。你的函数将会被传入两个参数:
 * 一个是目标元素, 即页面上有类似"s-univ", "s-high" 类名的那些元素; 另外一个参数就是学校选择面板
 * 中的某一选择结果, 它是一个<a>链接的引用. 注意, 在你的函数内的this关键是一个CX.ui.schoolSelector
 * 的引用.
 * 
 * 可多次调用pageConf函数, 各次调用之间并不影响. 不用担心前面一次调用的函数会被后面一次调用传入的函数所覆盖.
 * @param {Function} fn - 将你想要做的事情编写成这个函数
 */
CX.ui.schoolSelector.pageConf = function( fn ){
	if( typeof fn == 'function' ){
		if(!this.callbacks){
			this.callbacks = [];	
		}
		this.callbacks.push( fn );
		return;
	}
	//如果不是函数, 那么就是一个对象
	for( param in fn ){
		this[ param ] = fn[ param ];
	}
}


CX.event.enableCustomEvent(CX.ui.schoolSelector);

/**
 * 显示学校选择面板. 
 * 
 * 它是一个proxy方法, 会根据指定的类型(s-univ/s-high/s-mid/s-tech), 调用以前的学校选择面板组件.
 * @param {string} type - 学校选项框的类型:s-univ/s-high/s-mid/s-tech
 */
CX.ui.schoolSelector.showpan = function(type, cid, pid){
	
	//这个变量是用来指示不显示面板，如果你想不显示面板，在下面的beforeShowPan事件里将notShowPan改为true
	//bo.hu@opi-corp.com 2009.12.02
	this.notShowPan = false; 
	
	this.fireEvent('beforeShowPan');
	
	if(this.notShow) return false;
	
    type = type || 's-univ';//默认是大学的选择框
	
    this.type = type; // 注意, 这个type不同于CX.ui.schoolSelector.sch.type
	
	CX.debug.log( 'click...' );
	
	this.curCom = this.curCom || {};//TODO: 要检查是否会影响到原来的代码
	
    var that = this;
    switch (type) {
		//大学
        case 's-univ':{
			CX.debug.log( 'showing s-univ panel...' );
            CX.ui.schoolSelector.univ.showpan(cid, pid);
            break;
        }
		// 高中
        case 's-high':{
			CX.debug.log( 'showing s-high panel...' );
			// 需要选择学校的时候才读入省份的城市列表, 这个列表是一个js文件, 里面有很多数组. 虽然整体的http请求没有减少, 但是
			// 起到了延迟加载的目的. 这么做的一个更加重要目的是想减少schoolSelectors.js的使用者所需要引入的js文件数, 免得他/她忘记了.
			CX.loadFile('http://s.xnimg.cn/js/cityArray.js', function(){
				that.sch.show(that.sch.HIGH_SCHOOL, that.curCom.id, 'code', pid);
			});
           
            break;
        }
		// 技校
        case 's-tech':{
			CX.debug.log( 'showing s-tech panel...' );
			CX.loadFile('http://s.xnimg.cn/js/cityArray.js' , function(){
				that.sch.show(that.sch.COLLEGE_SCHOOL, that.curCom.id, 'code', pid);
			});
            break;
        }
		// 初中
        case 's-junior':{
			CX.debug.log( 'showing s-junior panel...' );
			CX.loadFile('http://s.xnimg.cn/js/cityArray.js' , function(){
				that.sch.show(that.sch.JUNIOR_SCHOOL, that.curCom.id, 'code', pid);
			});
            break;
        }
    }
}
/**
 * 隐藏学校选择面板
 */
CX.ui.schoolSelector.hidepan = function(){
	if( this.hidePanCallback && this.hidePanCallback.length ){
		var i = 0;
		for( ; i < this.hidePanCallback.length; i++ ){
			if ( this.hidePanCallback[i].call(this) === false) {//让callback的执行环境为schoolSelector对象
				return;//如果callback返回false, 就不关闭panel了
			}
		}
	}
	switch (this.type) {
		//大学
        case 's-univ':{
			try{
				 //$("univlist").style.display = "none";
				 CX.ui.schoolSelector._popUpLayer.hide();
			}catch( e ){}
            break;
        }
		
        case 's-high':// 高中
        case 's-tech':// 技校		
        case 's-junior':{// 初中
			CX.ui.schoolSelector.sch.hide();
            break;
        }
    }
	
	
}
CX.ui.schoolSelector.closeConf = function( fn ){
	if( !this.hidePanCallback ){
		this.hidePanCallback = []
	}
	
	if( typeof fn == 'function' ){
		this.hidePanCallback.push( fn );
	}
}


/**
 * 当我们选中一个学校的时候(这个学校是一个a链接), 我们用这个方法来将选择结果置入目标元素的value当中( 如果有的话 ).
 * 
 * 这个方法除了将选择结果置入目标元素之外, 还运行在pageConf时所传入的callback.
 * @param {HTMLElement} ele - 学校面板中的那个a链接 
 */

CX.ui.schoolSelector.getResult = function( ele ){
	
	if (CX.ui.schoolSelector.curCom) {
		//目标控件可能没有value属性
		try {
			CX.ui.schoolSelector.curCom.value = unescapeHTML(ele.innerHTML);
		} 
		catch (e) {
		}
	}
	
	// 如果用户有传入callback, 那么在面板关闭之前调用这些callback.
	// callback的调用环境是在CX.ui.schoolSelector下
	if (CX.ui.schoolSelector.callbacks.length) {
		var j = 0;
		var cb = this.callbacks;
		for( ; j < this.callbacks.length ; j++ ){
			// 只要有一个callback返回false, 那就返回, 不关闭选择面板了. 普通情况下用户不会给callback一个返回值, 因此在一般情况下选择面板会被关闭
			if (cb[j].call(CX.ui.schoolSelector , CX.ui.schoolSelector.curCom, ele) === false) 
				return false;
		}
	}
	
        
	CX.ui.schoolSelector.hidepan();
	return false;
}
/**
 * 逐个检查select的value, 如果某个item的value值与传入的相同, 则设置该item为selected
 * @param {HTMLSelectElement} select 目标select控件
 * @param {string} value 如果某一个item的value跟这个值相同, 则那个item的就会被selected.如果用户传入的不是数字形式
 * 						 的字符串(如不是"60016001"而是"济南市"), 则函数将用item的text与value参数进行匹配. 
 * @private
 */
CX.ui.schoolSelector.selectByValue = function( select, value ){	
	//采用计时器是因为IE下使用appendChild构建options会有延迟 
	//导致给options设置selected不生效
	setTimeout(function(){
		var options = select.options;
		for(var i=0; i < options.length ;i++ ){
			if( options[i].value == value || CX.String.trim(options[i].innerHTML) == CX.String.trim(value)){
				select.selectedIndex = i;
				break;
			}
		}
	}, 0);	
}


/**
 * 选择大学的面板对象. 它是一个单例.
 */
CX.ui.schoolSelector.univ = {
	/**
	 * 初始化方法. 
	 * 使用硬编码的方式生成一个大学学校选择面板
	 */
    init: function(){
		if( CX.ui.schoolSelector.initialized )return;
    	// -------------- 由于新版的schoolSelector(就是你现在看到这个schoolSelector就是新版)使用了旧版的数据, 会出现一些问题, 在此patch
		window.SchoolComponent = {};
		window.SchoolComponent.tihuan = function(){}
		
        // -----------start 为了避免将选项面板的内容写入页面当中,我们在这个初始化函数中自己弄硬编码一个面板内容：
        var pop_list = document.createElement('div');
        pop_list.id = 'univlist';
        pop_list.style.position = 'static';
		
		
        var pop_content = document.createElement('div');
        
        //添加搜索功能 lu.hua@opi-corp.com 2010.2.25
        var search_content = document.createElement('p');
		search_content.id = 'filter_univ';
        search_content.innerHTML = ['<label for="school_search_input">',
                                    '搜索 : ',
                                    '</label>',
                                    '<input class="input-text" id="school_search_input" type="text" />'].join('');
		//search_content.style.display = 'none'; //由于搜索乱码，暂时隐藏
        var search_input = search_content.getElementsByTagName('input')[0];
        var ds = new CX.util.DS_JSON({
            rootKey : 'candidate',
            queryParam : 'p',
            method : 'post',
            url : 'http://friend.' + CX.env.domain + '/newselector'
        });

        var at = new CX.ui.autoCompleteMenu({
            DS:ds,
            input : search_input 
        });

        at.buildMenu = function(r){
            return '<p>' + r.name + '</p>';
        };
        at.addEvent('select',function(r){
            var el = document.createElement('a');
            el.href = r.id;
            el.innerHTML = r.name;
            CX.ui.schoolSelector.getResult(el);
            this.input.value = '';
        });
        CX.event.addEvent(search_input, 'focus', function(){
           CX.event.delEvent(search_input, 'focus', arguments.callee); 
           at.setMenuWidth(search_input.offsetWidth);
        });
        pop_content.appendChild(search_content);
        //搜索功能

        var pop_country = document.createElement('ul');
        pop_country.id = 'popup-country';
        
        //生成国家列表(硬编码)
        var cntrys = [{
            code: '0',
            name: '中国'
        }, {
            code: '7',
            name: '美国'
        }, {
            code: '6',
            name: '加拿大'
        }, {
            code: '5',
            name: '英国'
        }, {
            code: '1',
            name: '澳大利亚'
        }, {
            code: '2',
            name: '法国'
        }, {
            code: '8',
            name: '德国'
        }, {
            code: '4',
            name: '新西兰'
        }, {
            code: '3',
            name: '新加坡'
        }, {
            code: '9',
            name: '韩国'
        }, {
            code: '10',
            name: '俄罗斯'
        }, {
            code: '11',
            name: '日本'
        }, {
            code: '12',
            name: '意大利'
        }, {
            code: '13',
            name: '爱尔兰'
        }, {
            code: '14',
            name: '荷兰'
        }, {
            code: '15',
            name: '马来西亚'
        }, {
            code: '16',
            name: '瑞士'
        }, {
            code: '17',
            name: '泰国'
        }, {
            code: '18',
            name: '乌克兰'
        }, {
            code: '19',
            name: '南非'
        }, {
            code: '20',
            name: '芬兰'
        }, {
            code: '21',
            name: '瑞典'
        }, {
            code: '22',
            name: '西班牙'
        }, {
            code: '23',
            name: '比利时'
        }, {
            code: '24',
            name: '挪威'
        }, {
            code: '25',
            name: '丹麦'
        }, {
            code: '26',
            name: '菲律宾'
        }, {
            code: '27',
            name: '波兰'
        }, {
            code: '28',
            name: '印度'
        }, {
            code: '29',
            name: '奥地利'
        }];
        
        //用国家列表生成可点击的链接
        var i = 0
        var tmp;
        var tmp2;
        var that = this;
        for (; i < cntrys.length; i++) {
            tmp = document.createElement('a');
            tmp.href = 'javascript:void(0);';
            tmp.innerHTML = cntrys[i].name;
            
            (function(index){
                tmp.onclick = function(){
                    that.univtabs.changeCountry(cntrys[index].code);
                }
            })(i);
            
            
            tmp2 = document.createElement('li');
            tmp2.id = 'c_' + cntrys[i].code;
            tmp2.appendChild(tmp);
            tmp.onfocus = function(){
                this.blur();
            }
            
            //把新生成的链接添加到国家选择面板(#popup-country)中
            pop_country.appendChild(tmp2);
        }
        
        var pop_province = document.createElement('ul');
        pop_province.id = 'popup-province';
        
        var pop_unis = document.createElement('ul');
        pop_unis.id = 'popup-unis';
        
        //组装上面创建出来的div
        pop_content.appendChild(pop_country);
        pop_content.appendChild(pop_province);
        pop_content.appendChild(pop_unis);
        pop_list.appendChild(pop_content);
        
        var params = {
            type : 'normal',
            title:'选择学校',
            width : CX.ui.schoolSelector.panelWidth || 646,//如果没有配置学校选择器的宽度, 默认使用646
            button : '关闭',
            callBack : CX.func.empty,
            autoHide : 0,
            msg : $(pop_list),
            params : {
                addIframe : true
            }
        };
		
		if ( CX.ui.schoolSelector.offsetY ) {
			params.Y =  CX.ui.schoolSelector.offsetY;
		}
		if ( CX.ui.schoolSelector.offsetX ) {
			params.X =  CX.ui.schoolSelector.offsetX;
		}
        
        CX.ui.schoolSelector._popUpLayer = new CX.ui.dialog( params.params )
			.setType( params.type )
			.setTitle( params.title || ( params.type == 'error' ? '错误提示' : '提示' ) )
			.setBody( params.msg || params.message || '' )
			.setWidth( params.width )
			.setHeight( params.height )
			.setX( params.X )
			.setY( params.Y || 100 )// 100是为了让用户能够在一屏内看到关闭按钮
			.addButton({
				text : ( params.yes || params.button ),
				onclick : function(){
					return CX.ui.schoolSelector.hidepan();//params.callBack.call( CX.ui.schoolSelector._popUpLayer );
				}
			} ).show();
		
        CX.ui.schoolSelector._popUpLayer.hide();
        this.univtabs.init();
    },
	
	/**
	 * 旧大学选择面板控件的显示方法. schoolSelector的showpan方法是调用这个方法来完成大学选择面板的显示的.
	 */
    showpan: function(cid, pid){
        var that = this;
        CX.loadFile('http://s.xnimg.cn/allunivlist.js', function(){
            that.univtabs.changeCountry(cid || 0, pid);
            that.showpan_sub();
        });
    },
	
	/**
	 * 加载univList.js(大学学校名单)成功之后调用的方法. 它做真正的显示工作
	 */
    showpan_sub: function(){
        CX.ui.schoolSelector._popUpLayer.setY(100 + CX.event.scrollTop()).show();
        this.bodyclick = false;//TODO:修改了原来的bodyclick 为false;
    },
	
	/**
	 * 在水平方向上为大学选择面板找到合适的位置
	 * @param {Object} obj
	 */
    findPosX: function(obj){
        var pW = CX.Event.winWidth();
        var oW = parseInt(obj.getStyle('width'));
        return CX.EVENT.scrollLeft() + (pW - oW) / 2;
    },
	
	/**
	 * 在y方向上为大学选择面板找到合适的位置
	 * @param {Object} obj
	 */
    findPosY: function(obj){
        var pH = CX.Event.winHeight();
        var oH = obj.offsetHeight;
        return CX.EVENT.scrollTop() + (pH - oH) / 3;
    },
	
	/**
	 * 旧版的大学面板隐藏函数, 已经废弃
	 */
    hidepan: function(){},
	
	/**
	 * 已经废弃
	 */
    getResult: function( ele ){},
	
	/*
	* 缓存院系
	*/
	collegeDeptCache:{},
	
	/**
	 * 
	 * @param {string} universityCode - 大学的编号
	 * @param {Object} cantianer - 页面上的院系节点或其ID
	 */
	fillUniversityDept : function(universityCode, cantainer, fn){
		if(typeof(universityCode)== 'undefined'|| universityCode=="")
			return ;
			
		var that = this;
		
		//得到大学院系列表
		function getUniversityDeptList( universityCode){
			
			var url = 'http://www.' + CX.env.domain + '/GetDep.do';
			if( CX.DEBUG_MODE )
				url = 'http://test.renren.com/jspro/GetDep.html';
			
			var pars = 'id='+ universityCode;
			CX.debug.log('Getting school list from url ' + url + '(' + pars + ')');
			
			if(that.collegeDeptCache[universityCode])
				showResponse(that.collegeDeptCache[universityCode]);
			else
				new CX.net.xmlhttp({
					url: url,
					method: 'get', 
					data: pars,
					onSuccess: function(response){
						that.collegeDeptCache[universityCode] = response;
						showResponse(response);
					}
				});
		}
		
		function showResponse(response){
			// 由于服务器端返回的数据是HTML片断(一个select控件的代码), 为了简化页面代码, 再对返回的数据进行处理, 以获得返回的select控件的引用.
			var temp = document.createElement('div');
			temp.innerHTML = response.responseText;
			
			var deptTemp = Sizzle('select', temp)[0];
			if(deptTemp){
				var deptSelect = $(cantainer);
				//清空历史
				deptSelect.length = 0;
				while(deptTemp.firstChild){
					deptSelect.appendChild(deptTemp.firstChild);
				}
				//默认选中第一个
				setTimeout(function(){deptSelect.selectedIndex = 0;}, 0);				
			}
			
			//如果有callback需要在加载完毕后运行, 那就运行咯
			if(fn && fn.constructor == Function)
				fn.call(that);
		}
		
		getUniversityDeptList(universityCode);
	}
}

//单实例对象, 大学的选择面板
CX.ui.schoolSelector.univ.univtabs = {

    init: function(){
        this.tabCount = 0;
        this.activeCountryTab = null;
        this.activeProvTab = null;
    },
    mouseIn: function(){},
    mouseOut: function(){},
    
    changeCountry: function(cid, pid){
    
        var country = null;
        var prov = null;
        var provs_inner = "";
        var countryId = parseInt(cid);
        
        //这个allUnivList是一个从服务器端读取回来的数组, 使用了jsonp(非标准)协议
        for (var i = 0; i < allUnivList.length; i++) {
            country = allUnivList[i];
            if (i == countryId) {
                break;
            }
        }
        
        if (country != null) {
            prov = country.provs;
            if (prov != null && prov != "") {
                // 以下这个for循环遍历所有的省份然后构造合适的链接。注意这个for循环在构建链接的时候onclick事件的事件处理器采用了内联的方式。
                // 在目前人人网的应用中没有什么问题。如果日后的需求变更需要修改, 可以考虑将以下的这些字符串拼接修改为dom拼装的方式。还要注意,
                // 这些字符串拼装的代码不是auscar写的.
                for (var j = 0; j < prov.length; j++) {
                    if (j == 0) {
                        provs_inner += '<li id="p_' + parseInt(country.id) + '_' + parseInt(prov[j].id) + '" class="active"><a href="#nogo" onclick="javascript:CX.ui.schoolSelector.univ.univtabs.changeUnivs(' +
                        cid +
                        ',' +
                        prov[j].id +
                        ')">' +
                        prov[j].name +
                        '</a></li>';
                        this.activeProvTab = "p_" + parseInt(country.id) + "_" + parseInt(prov[j].id);
                    }
                    else 
                        provs_inner += '<li id="p_' + parseInt(country.id) + '_' + parseInt(prov[j].id) + '" ><a href="#nogo" onclick="javascript:CX.ui.schoolSelector.univ.univtabs.changeUnivs(' +
                        cid +
                        ',' +
                        prov[j].id +
                        ')">' +
                        prov[j].name +
                        '</a></li>';
                }
            }
            else {
                this.changeUnivs(cid, -1);
            }
        }
        else
            alert("此地区不存在");
				
		//注入所获得的省份
		$("popup-province").innerHTML = provs_inner;
		this.changeUnivs(cid, pid || -2);
    },
    /**
     * 这个函数使用了大量的字符串拼接, 有点不太优雅. 虽然如此, 这些代码还是在xiaonei稳定存在了相当长的一段时间, 因此auscar决定沿用这些代码,
     * 并且采取字符串拼接的方式对其进行修改。
     * @param {Object} uid
     * @param {Object} uname
     */
    makeUnivHref: function(uid, uname){
        var myUrl = document.URL;
        var hasLink = true;
        if (myUrl.indexOf("reg." + CX.env.domain + "") >= 0 ||
        myUrl.indexOf("guide." + CX.env.domain + "") >= 0 ||
        (myUrl.indexOf("abc." + CX.env.domain + "") >= 0 &&
        myUrl.indexOf("KnowEmailVoteReg.action") >= 0)) 
            hasLink = false;
        var univHref = "";
        if (hasLink) 
            univHref = '<a id="sch_' + uid + '" href="' + uid + '" onclick="return CX.ui.schoolSelector.getResult(this);" >' + uname + '</a>';
        else 
            univHref = '<a id="sch_' + uid + '" href="' + uid + '" onclick="return CX.ui.schoolSelector.getResult(this);" >' + uname + '</a>';
        return univHref;
    },
    changeUnivs: function(cid, pid){
		if(!window.allUnivList){
			var that = this;
			CX.loadFile('http://s.xnimg.cn/allunivlist.js', function(){
				that.changeUnivs(cid, pid);
			});
			return false;
		}
		
		var activeCTab = $("c_" + parseInt(cid));
		if (activeCTab && activeCTab != this.activeCountryTab){
			activeCTab.addClass('active');
			if (this.activeCountryTab) 
				$(this.activeCountryTab).delClass('active');
			this.activeCountryTab = activeCTab;
		}
		
        var activePTab = $("p_" + parseInt(cid) + "_" + parseInt(pid));
		if(activePTab){
			activePTab.addClass('active');
			if(this.activeProvTab)
				$(this.activeProvTab).delClass('active');
			this.activeProvTab = activePTab;
		}
        
        var country = null;
        var univs_inner = "";
        for (var i = 0; i < allUnivList.length; i++) {
            country = allUnivList[i];
            if (parseInt(cid) == i) 
                break;
        }
        if (parseInt(pid) == -2) {
            pid = '1';
        }
        
        if (country.provs != null && country.provs != "") {
            var prov = null;
            for (var j = 0; j < country.provs.length + 1; j++) {
                prov = country.provs[j - 1];
                if (parseInt(pid) == j) {
                    break;
                }
            }
            for (var k = 0; k < prov.univs.length; k++) {
                univs_inner += '<li id="u_' + parseInt(prov.univs[k].id) + '">' + this.makeUnivHref(prov.univs[k].id, prov.univs[k].name) + '</li>';
            }
        }
        else {
            var univs = country.univs;
            if (univs != null) {
                for (var l = 0; l < univs.length; l++) {
                    univs_inner += '<li id="' + univs[l].id + '">' + this.makeUnivHref(univs[l].id, univs[l].name) + '</li>';
                }
            }
        }
        
        $("popup-unis").innerHTML = univs_inner;
    },
	hidepan : function(){}
}

/**
 * 中学选择面板控件. 它是单实例对象.
 */
CX.ui.schoolSelector.sch = {
    //HIGH_SCHOOL: "HIGHSCHOOL",
    //OPEN_HIGH_SCHOOL: "OPENHIGHSCHOOL",
    //COLLEGE_SCHOOL: "COLLEGESCHOOL",
    //JUNIOR_SCHOOL: "JUNIORSCHOOL",
    HIGH_SCHOOL: "highschool",
    OPEN_HIGH_SCHOOL: "openhighschool",
    COLLEGE_SCHOOL: "collegeschool",
    JUNIOR_SCHOOL: "juniorschool",

    provId: 1,
    type: "",
    schoolNameElementId: "",
    schoolCodeElementId: "",
    
	/**
     * 初始化方法, 主要是硬编码生成一个中学的选择面板骨架
     */
    init: function(){
		if( CX.ui.schoolSelector.initialized )return;
		//将省市列表硬编码进控件
		
    	var provs = [
			{ code:1 , name : '北京' },
			{ code:2 , name : '上海' },
			{ code:3 , name : '天津' },
			{ code:4 , name : '重庆' },
			{ code:5 , name : '黑龙江' },
			{ code:6 , name : '吉林' },
			{ code:7 , name : '辽宁' },
			{ code:8 , name : '山东' },
			{ code:9 , name : '山西' },
			{ code:10 , name : '陕西' },
			{ code:11 , name : '河北' },
			{ code:12 , name : '河南' },
			{ code:13 , name : '湖北' },
			{ code:14 , name : '湖南' },
			{ code:15 , name : '海南' },
			{ code:16 , name : '江苏' },
			{ code:17 , name : '江西' },
			{ code:18 , name : '广东' },
			{ code:19 , name : '广西' },
			{ code:20 , name : '云南' },
			{ code:21 , name : '贵州' },
			{ code:22 , name : '四川' },
			{ code:23 , name : '内蒙古' },
			{ code:24 , name : '宁夏' },
			{ code:25 , name : '甘肃' },
			{ code:26 , name : '青海' },
			{ code:27 , name : '西藏' },
			{ code:28 , name : '新疆' },
			{ code:29 , name : '安徽' },
			{ code:30 , name : '浙江' },
			{ code:31 , name : '福建' },
			{ code:33 , name : '香港' }
		];
		
		
		//生成省份面板所需要的各个部分
		var pop_schoolList = document.createElement('div');
		pop_schoolList.id = 'schoolList';
		//pop_schoolList.className = 'popup-wrapper';
		//pop_schoolList.style.display = 'none';
		pop_schoolList.style.width = '600px';
		
		
		
		var pop_content = document.createElement('div');
		//pop_content.className = 'popup-content';
		
		var pop_province = document.createElement('ul');
		pop_province.id = 'popup-province';
		pop_province.style.marginBottom = '5px';
		
		var provs_lis = document.createDocumentFragment();
		var temp_li;
		var temp_a;
		var that = this;
		
		for( var i = 0 ; i < provs.length ; i++ ){
			temp_li = document.createElement('li');
			if(provs[i].code == 5 || provs[i].code == 23){
				temp_li.style.width = '40px';	
			}
			
			temp_a = document.createElement('a');
			temp_a.innerHTML = provs[i].name;
			temp_a.href = 'javascript:void(0);';
			
			(function(index){
				temp_li.id = 'p_' + provs[index].code;
				temp_a.onclick = function( e ){
					that.changeProv( provs[index].code + '' );
					return false;	
				}
			})(i);
			
			temp_a.onfocus = function(){
				this.blur();
			};
			temp_li.appendChild(temp_a);
			provs_lis.appendChild(temp_li);
		}
		
		pop_province.appendChild(provs_lis);
		
		var pop_city = document.createElement('ul');
		pop_city.id = 'popup-city';
		pop_city.className = 'module-popupcity';
		
		var pop_tabPan = document.createElement('div');
		pop_tabPan.id = 'schoolTabPan';
		pop_tabPan.className = 'clear';
		
		var filterHighSchool = document.createElement('div');
		filterHighSchool.id = 'filterHighSchool';
		filterHighSchool.style.padding = '5px';
		filterHighSchool.style.border = '1px solid #C3C3C3';
		filterHighSchool.style.borderBottom = 'none';
		filterHighSchool.innerHTML = '在<strong id="highschoolArea">***</strong>的学校中搜索：<input type="text" class="input-text" />';
		
		var pop_contentUl = document.createElement('ul');
		pop_contentUl.id = 'schoolListContentUl';
		pop_contentUl.className = 'module-schoollist';		
		
		//把上面生成的各个部分拼装起来
		pop_content.appendChild(pop_province);
		pop_content.appendChild(pop_city);
		pop_content.appendChild(pop_tabPan);
		pop_content.appendChild(filterHighSchool);
		pop_content.appendChild(pop_contentUl);
		
		pop_schoolList.appendChild(pop_content);
        
        this.fix = new CX.ui.dialog()
				.setTitle('选择学校')
				.setBody($(pop_schoolList))
				.setWidth(CX.ui.schoolSelector.panelWidth_high ||CX.ui.schoolSelector.panelWidth || 646)
				.addButton({
				    text : '关闭',
				    onclick :function(){
						CX.ui.schoolSelector.hidepan();
					}
			 	});
		this.fix.setY( 100 );
		
		//静止事件冒泡, 当学校选择面板被点击的时候, document的click就不要被触发了
		this.fix.container.onclick = function(e){
			try{
				e = e || window.event;
				CX.event.stop(e);
			}catch(ex){}
		}
		
        this.fix.hide();
    },
    /**
     * 中学选择面板的显示方法. 这个方法是从旧版copy并修改而来.
     * @param {string} type - s-univ|s-high|s-junior|s-tech
     * @param {string} name - 目标元素的ID. 也就是拥有's-univ|s-high|s-junior|s-tech'类名的那个元素的ID.
     * @param {Object} code - 页面上会有一个隐藏域input(type=hidden), 将选择结果中的a元素上蕴含的id信息置入到以code为id的那个元素的value上.
     * 						  毕竟后台只是需要学校的id就够了.
	 * @param {Number} pid  - 省份ID
     */
    show: function( type, name, code, pid){
        this.type = type;
        this.schoolNameElementId = name;
        this.schoolCodeElementId = code;
        
        try {
            if (typeof(selectElList) != 'undefined') {
                for (var i = 0; i < selectElList.length; i++) 
                    selectElList[i].style.display = "none";
            }
        } 
        catch (e) {
        }
        
        
        $ = ge;
        
        if (!this.fix){
			this.fix = new CX.UI.fixPositionElement({
				id: 'schoolList'
			});
		}
		
        var el = this.fix;
		el.setY(100 + CX.event.scrollTop());
        el.show();
        this.changeProv(pid || this.provId);
        return false;
    },
	/**
	 * 改变省份时, 改变面板的显示结果.
	 * @param {Object} provId
	 */
    changeProv: function(provId){
        var popupCity = $("popup-city");
		
        var map = {'1':'1101', '2':'3101', '3':'1201', '4':'5001', '33':'8101'};
		
		if( map[provId] ){
			this.changeCity(map[provId]);
            popupCity.innerHTML = "";
            popupCity.style.display = "none";
		}
		else {
			var html_inner = "";
			var citysArr = window["_city_" + provId];
			for (var i = 0; i < citysArr.length; i++) {
				var subArr = citysArr[i].split(":");
				var code = subArr[0];
				var name = subArr[1];
				if (i == 0) {
					html_inner += '<li id="city_' + code + '" class="active"><a href="#nogo" onclick="javascript:CX.ui.schoolSelector.sch.changeCity(\'' + code + '\')">' + name + '</a></li>';
					this.changeCity(code);
				}
				else
					html_inner += '<li id="city_' + code + '"><a href="#nogo" onclick="javascript:CX.ui.schoolSelector.sch.changeCity(\'' + code + '\')">' + name + '</a></li>';
			}
			popupCity.innerHTML = html_inner;
			popupCity.style.display = "";
		}
        $("p_" + this.provId).className = "";
        $("p_" + provId).className = "active";
        this.provId = provId;
		CX.ui.schoolSelector.sch.updateFilter();
    },
	
	/**
	 * 隐藏面板
	 */
    hide: function(){
        try {
            if (typeof(selectElList) != "undefined") {
                var i = 0;
                for (i = 0; i < selectElList.length; i++) {
                    selectElList[i].style.display = "";
                }
            }
        } 
        catch (e) {}
        this.fix.hide();
        return false;
    },
	
	/**
	 * 改变城市的时候, 加载相应城市的学校信息.
	 * @param {Object} _e - 城市id
	 */
    changeCity: function(_e){
        $("schoolTabPan").innerHTML = "";
        $("schoolListContentUl").innerHTML = "<center style=\"padding-top:94px;\">\u6b63\u5728\u8bfb\u53d6\u6570\u636e...</center>";
        
		var _f = _e;
        if (_f && _f.length > 0) {
			var city = $('city_' + _e);
			if(city){
				var citys = Sizzle('li', city.parentNode);
				for(var i=0; i<citys.length; i++){
					$(citys[i]).delClass('active');
				}
				city.addClass('active');
			}				
            getSchoolList(_f);
            return false;
        }
		
		/**
		 * 用ajax的方法获取学校列表
		 * @param {Object} _10
		 */
        function getSchoolList(_10){
            //var url = "http://www." + CX.env.domain + "/showCitySchool.do";
            var url = "http://support." + CX.env.domain +'/'+CX.ui.schoolSelector.sch.type+"/"+_10+".html";
            //var params = "type=" + CX.ui.schoolSelector.sch.type + "&city=" + _10;
		    var params = '';	
			new CX.net.xmlhttp({
				url: url,
				method: 'get',
				data: params,
				onSuccess:function(response){
					try {
                        var _15 = response.responseText;
                        var stp = $("schoolTabPan");
						stp.innerHTML = _15;
						stp = stp.getElementsByTagName( 'ul' )[ 0 ];
						
						var town = Sizzle('li:first', stp)[0];
						if(town)
							$(town).addClass('active');
						
						CX.event.addEvent( stp, 'click', function( e ){
							e = e || window.event;
							var obj = e.srcElement || e.target;
							var qu = CX.ui.schoolSelector.quRegx.exec(obj.onclick + '');
							if(qu)
								CX.ui.schoolSelector.sch.tihuan(qu[1]);
							CX.event.stop( e );
						});
						
                        $("schoolTabPan").style.display = "";
                        if (_10.length == 4) {
                            var uls = $("schoolTabPan").getElementsByTagName("ul");
                            $("schoolListContentUl").innerHTML = uls[1].innerHTML;
                        }
                        if (_10.length == 6) {
                            $("schoolListContentUl").innerHTML = $("city_qu_" + _10).innerHTML;
                        }
						
						//patch 打个补丁, 服务器返回的数据是写死的, 它将学校连接的click响应事件都帮你写好了... 因此为了改变onclick的内容,在此patch
						$('schoolListContentUl').onclick = function( e ){
						
							e = e || window.event;
							var obj = e.target || e.srcElement;
							if( obj.tagName.toLowerCase() == 'a' ) CX.ui.schoolSelector.getResult( obj );
							return false;
						}
						
						CX.ui.schoolSelector.sch.updateFilter();
                    } catch (e) {}	
				},
				onError: function(){
					var t = $("schoolListContentUl").innerHTML = "\u8bfb\u53d6\u6570\u636e\u8d85\u65f6,\u8bf7\u91cd\u8bd5";
					// 读取学校数据失败, 很可能是由于JavaScript跨域安全机制导致. 但是我们还是要开发啊, 所以我们在这里判断是否是出于debug模式, 如果是,那我们
					// 就自己模拟一个学校, 以便开发。注意,CX.DEBUG_MODE只有在ff下才能用
					if( CX.DEBUG_MODE ){						
						$('schoolListContentUl').onclick = function( e ){
							e = e || window.event;
							var obj = e.target || e.srcElement;
							if( obj.tagName.toLowerCase() == 'a' ) CX.ui.schoolSelector.getResult( obj );
							return false;
						}
						
						var debugBtn = document.createElement('a');
						debugBtn.innerHTML = '' + CX.env.siteName + '技术学院';
						debugBtn.href = '00001';
						
						var debugBtn2 = document.createElement('a');
						debugBtn2.innerHTML = 'JavaScript技术学院';
						debugBtn2.href = '00002';
						
						try{
							var _t = $("schoolListContentUl");
							_t.innerHTML += '<p>' + CX.ui.schoolSelector.sch.type + '</p>';
							_t.appendChild( debugBtn );
							_t.appendChild( debugBtn2 );
						}catch(e){}
					}
				}
			});
        }
    },
	
	updateFilter: function(){
		//更新过滤文案
		var city = Sizzle('#popup-city li.active a')[0];
		city = city ? city.innerHTML : '';
		
		var area = Sizzle('#schoolCityQuList li.active a')[0];
		area = area ? area.innerHTML : '';
		
		$('highschoolArea').innerHTML = city + area;
		
		var input = Sizzle('#filterHighSchool input')[0];
		input.value = '';
		var timer = null;
		var lastVal = null;
		var list = Sizzle('#schoolListContentUl li');
		input.onfocus = function(){
			timer = setInterval(function(){
				if(input.value != lastVal){
					lastVal = input.value;
					for(var i=0; i<list.length; i++){
						if(Sizzle('a', list[i])[0].innerHTML.indexOf(lastVal) < 0){
							list[i].style.display = 'none';
						}
						else
							list[i].style.display = '';
					}
				}
			}, 500);
		};
		input.onblur = function(){
			clearInterval(timer);
		};
	},
	
	tihuan : function(hiddenUl){
		var e = arguments.callee.caller.arguments[0];
		if(e && (e.target || e.srcElement)){
			var town = (e.target || e.srcElement).parentNode;
			var towns = Sizzle('li', town.parentNode);
			for(var i=0; i<towns.length; i++){
				$(towns[i]).delClass('active');
				$(town).addClass('active');
			}
		}
		$('schoolListContentUl').innerHTML = $(hiddenUl).innerHTML;
		CX.ui.schoolSelector.sch.updateFilter();
	}	
}



//做一些配置, 以适合人人网使用
CX.ui.schoolSelector.pageConf(function(target, link){
	
	//在非正常情况之下, target可能为undefined
	if( !target )return;
	
	// 默认情况下, 查找id中有 '_id' 后缀的元素, 并将学校id置入该组件. 在新的页面中以下代码能够起作用, 但是在旧的页面中却不行.
	// 因此需要为旧的页面重新配置。
	var t = $(target.id + '_id');
	var id = this.idReg.exec( link.href )[1]
	if(t){
		t.value =  id;//获取值
	}
	
	//如果是大学,选择对应院系
	if(this.type == 's-univ'){		
		var dept = $( target.id + '_dept' );
		if(dept){
			this.univ.fillUniversityDept( id , target.id + '_dept' );
		}
	}
});

//配置完毕, 进行初始化
CX.dom.ready(function(){
	CX.ui.schoolSelector.init();
});
