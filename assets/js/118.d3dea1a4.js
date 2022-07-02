(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{512:function(t,s,a){"use strict";a.r(s);var n=a(28),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"基本类型和引用类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本类型和引用类型"}},[t._v("#")]),t._v(" 基本类型和引用类型")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("JS 基本类型 ———— "),a("strong",[t._v("Number,String,Boolean,null,undefined,Symbol")]),t._v(",以及下个版本的 "),a("strong",[t._v("BigInt")]),a("br"),t._v("\nJS 引用类型 ———— "),a("strong",[t._v("Object,Array,Function")])])]),t._v(" "),a("blockquote",[a("p",[t._v("JavaScript 作为一个弱类型语言，但也有自己的基本类型，所谓的弱类型，是指程序动态转化变量类型，如 1 和“1”进行==比对时，程序会将 1 由 Number 通过 toString()的方式转化 String，然后和“1”进行对比")])]),t._v(" "),a("h2",{attrs:{id:"存储"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#存储"}},[t._v("#")]),t._v(" 存储")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("基本类型：保存在栈内存中，因为这些类型在内存中分别占有固定大小的空间，通过按值来访问")])]),t._v(" "),a("li",[a("p",[t._v("引用类型：保存在堆内存中，因为这些值的大小是不固定的，但是内存地址值的大小是固定的，所以在栈保存内存地址，所以通过先访问栈中的内存地址，再通过地址找到堆中的值")])])]),t._v(" "),a("h2",{attrs:{id:"判断类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#判断类型"}},[t._v("#")]),t._v(" 判断类型")]),t._v(" "),a("h3",{attrs:{id:"typeof"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#typeof"}},[t._v("#")]),t._v(" typeof")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("基本类型")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("typeof 变量")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th"),t._v(" "),a("th",[t._v("typeof 变量")]),t._v(" "),a("th",[t._v("类型")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("typeof ''")]),t._v(" "),a("td",[t._v('"string"')]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("typeof null")]),t._v(" "),a("td",[t._v('"object"')])]),t._v(" "),a("tr",[a("td",[t._v("typeof 1")]),t._v(" "),a("td",[t._v('"number"')]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("typeof undefined")]),t._v(" "),a("td",[t._v('"undefined"')])]),t._v(" "),a("tr",[a("td",[t._v("typeof true")]),t._v(" "),a("td",[t._v('"boolean"')]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("typeof Symbol()")]),t._v(" "),a("td",[t._v('"symbol"')])]),t._v(" "),a("tr",[a("td",[t._v("typeof BigInt(1)")]),t._v(" "),a("td",[t._v('"bigint"')]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td")])])])]),t._v(" "),a("li",[a("p",[t._v("引用类型")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("typeof 变量")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th"),t._v(" "),a("th",[t._v("typeof 变量")]),t._v(" "),a("th",[t._v("类型")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("typeof {}")]),t._v(" "),a("td",[t._v('"object"')]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("typeof []")]),t._v(" "),a("td",[t._v('"object"')])]),t._v(" "),a("tr",[a("td",[t._v("typeof function() {}")]),t._v(" "),a("td",[t._v('"function"')]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("typeof new String('a')")]),t._v(" "),a("td",[t._v('"object"')])])])])])]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("特别注意：")]),t._v(" "),a("ul",[a("li",[t._v("typeof 变量出的结果都是"),a("strong",[t._v("String 类型")])]),t._v(" "),a("li",[t._v('null 的 typeof 结果是"object",undefined 的结果是"undefined"， 引用类型的 typeof 结果除了 function 别的都是"object"')])])]),t._v(" "),a("h3",{attrs:{id:"instanceof"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#instanceof"}},[t._v("#")]),t._v(" instanceof")]),t._v(" "),a("blockquote",[a("p",[t._v("instanceof 运算符用于"),a("strong",[t._v("检测构造函数的 prototype 属性")]),t._v("是否出现在某个实例对象的原型链上 —— MDN")])]),t._v(" "),a("blockquote",[a("p",[t._v("就是判断一个实例对象的原型链上是否有 instanceof 右边指定的类")])]),t._v(" "),a("blockquote",[a("p",[t._v("首先在 JavaScript 中，一切皆对象，所有的变量都是继承 Object 的，而这个继承即使通过原型链实现的，所以我们可以通过查看变量的继承来判断类型")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("变量")]),t._v(" "),a("th",[t._v("类型")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("({}) instanceof Object")]),t._v(" "),a("td",[t._v("true")])]),t._v(" "),a("tr",[a("td",[t._v("[] instanceof Array")]),t._v(" "),a("td",[t._v("true")])]),t._v(" "),a("tr",[a("td",[t._v("var a = new String('a'); a instanceof String")]),t._v(" "),a("td",[t._v("true")])]),t._v(" "),a("tr",[a("td",[t._v("var a = new Date(); a instanceof Date")]),t._v(" "),a("td",[t._v("true")])])])]),t._v(" "),a("h3",{attrs:{id:"object-prototype-tostring-call"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#object-prototype-tostring-call"}},[t._v("#")]),t._v(" Object.prototype.toString.call()")]),t._v(" "),a("blockquote",[a("p",[t._v("Object.prototype.toString 可以检测对象类型")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),a("p",[t._v("为什么要用 Object.prototype.toString.call 而不是直接使用 toString()？"),a("br"),t._v("\n因为不同的对象下的 toString 会被重写，只有他们的祖先类 Object 下原型的 toString 才能够正确的执行我们想要的结果")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("变量")]),t._v(" "),a("th",[t._v("类型")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("Object.prototype.toString.call(1)")]),t._v(" "),a("td",[t._v('"[object Number]"')])]),t._v(" "),a("tr",[a("td",[t._v('Object.prototype.toString.call("a")')]),t._v(" "),a("td",[t._v('"[object String]"')])]),t._v(" "),a("tr",[a("td",[t._v("Object.prototype.toString.call([])")]),t._v(" "),a("td",[t._v('"[object Array]"')])]),t._v(" "),a("tr",[a("td",[t._v("Object.prototype.toString.call({})")]),t._v(" "),a("td",[t._v('"[object Object]"')])]),t._v(" "),a("tr",[a("td",[t._v("Object.prototype.toString.call(function() {})")]),t._v(" "),a("td",[t._v('"[object Function]"')])]),t._v(" "),a("tr",[a("td",[t._v("Object.prototype.toString.call(undefined)")]),t._v(" "),a("td",[t._v('"[object Undefined]"')])]),t._v(" "),a("tr",[a("td",[t._v("Object.prototype.toString.call(null)")]),t._v(" "),a("td",[t._v('"[object Null]"')])])])]),t._v(" "),a("h2",{attrs:{id:"undefined-和-null-的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#undefined-和-null-的区别"}},[t._v("#")]),t._v(" undefined 和 null 的区别")]),t._v(" "),a("p",[t._v("undefined 是指一个变量被声明了，但是未被初始化， 如： var a"),a("br"),t._v("\nnull 是指空对象指针")]),t._v(" "),a("h2",{attrs:{id:"显式和隐式转换"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#显式和隐式转换"}},[t._v("#")]),t._v(" 显式和隐式转换")]),t._v(" "),a("blockquote",[a("p",[t._v("在 JavaScript 中，声明的"),a("strong",[t._v("变量是没有类型的，只有值才有类型")]),t._v("，也就是其作为动态语言，到执行时才知道类型")])]),t._v(" "),a("h4",{attrs:{id:"显示转换"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#显示转换"}},[t._v("#")]),t._v(" 显示转换")]),t._v(" "),a("p",[t._v('显示转化就是我们通过方法强行转换，如果高精度转成低精度的，会有损失精度,强制类型转换主要有：Boolean、Number、String、parseInt、parseFloat\n例如： Number("1") 就是显式的将 String 转化为 Number 类型')]),t._v(" "),a("h4",{attrs:{id:"隐式转换"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#隐式转换"}},[t._v("#")]),t._v(" 隐式转换")]),t._v(" "),a("p",[t._v("隐式转换，就是 JS 作为一门动态语言，自动处理的转换(有时候会造成 BUG，这也是 JS 比较坑的地方)"),a("br"),t._v('\n如==进行比较的时候，如果两者类型不同，JS 就会进行隐式转换，又或是"1" * 2 这些运算时，都是隐式转换')]),t._v(" "),a("h4",{attrs:{id:"隐式转换过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#隐式转换过程"}},[t._v("#")]),t._v(" 隐式转换过程")]),t._v(" "),a("ul",[a("li",[a("p",[a("strong",[t._v("关系运算符会把类型转化为 Number 进行比较")]),t._v("\n当一边有数字时，会把另一边的类型通过 Number()的方式转化为数字后进行比较")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("字符串和字符串的比较,根据编码进行比较（同样符合上一条）")])]),t._v(" "),a("ul",[a("li",[t._v('如果两边都是字符，"a" > "b"，那么两者会调用 charCodeAt 的方法查看字符的 unicode 编码，根据编码比较大小'),a("br"),t._v('\n如"a"的编码是 97，"b"的编码是 98，所以返回的是 false，')]),t._v(" "),a("li",[t._v("如果是字符串，就会按顺序比对每一个字符的编码，一旦比出大小就返回结果"),a("br"),t._v('\n如："2" > "10"，"2"的编码大于"1"，所以成立')])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("运算符")])]),t._v(" "),a("ul",[a("li",[t._v('x+"" ——> String(x)')]),t._v(" "),a("li",[t._v("+x ——> Number(x)")]),t._v(" "),a("li",[t._v("!!x ——> Boolean(x)")])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("复杂类型会先转成 String，然后转成 Number 进行运算")])]),t._v(" "),a("ul",[a("li",[t._v("首先会调用 valueOf 将变量转化原始值(基本类型的值)进行判断，如果没法得到简单的基本类型的值，那么它会使用 toString 的方法，转化成字符串后，再通过上面的条例 1 或者条例 2 进行判断")])])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v('提问：那为什么"1" + 1 = 11,不是应该通过 valueof 将"1"转化为 1 吗')]),t._v(" "),a("p",[t._v("当进行 + 操作时，如果一个操作数是字符串，那么当前运算就会是"),a("strong",[t._v("字符串拼接操作")])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("提问：[] ? true : false , [] == false, [] == ![], ({}) == false")]),t._v(" "),a("ul",[a("li",[t._v("第一个[]会被隐式转换 Boolean([])，变成 true，所以返回是 true")]),t._v(" "),a("li",[t._v('第二个是[]会先通过 valueOf 方法，发现取不到基本类型的值，就使用 toString 方法，变成""，所以""==false 成立')]),t._v(" "),a("li",[t._v("第三个![]会被转化为 false，由第二个可知，所以也成立")]),t._v(" "),a("li",[t._v('第四个{}也会先通过 valueOf 方法，发现取不到，使用 toString()，变成"[object Object]"，所以({})==false 返回的是 false')])])]),t._v(" "),a("h2",{attrs:{id:"包装类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#包装类"}},[t._v("#")]),t._v(" 包装类")]),t._v(" "),a("blockquote",[a("p",[t._v("首先创建基本类型的变量，可以通过字面量的方式，也可以通过构造函数生成对象的方式\n后者就是所谓的包装类，将原先的变量从基本类型转变成了引用类型，它将会继承 Object 的方法")])]),t._v(" "),a("h4",{attrs:{id:"但是为什么我字面量创建的变量-也可以使用-object-的方法-根本没必要使用包装类啊"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#但是为什么我字面量创建的变量-也可以使用-object-的方法-根本没必要使用包装类啊"}},[t._v("#")]),t._v(" 但是为什么我字面量创建的变量，也可以使用 Object 的方法，根本没必要使用包装类啊？？？")]),t._v(" "),a("p",[t._v("这就要怪 js 是一门动态语言，当我们为字面量创建的变量添加方法时，js 会自动为基本类型进行"),a("strong",[t._v("包装")]),t._v("，会做如下处理：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("substring")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ---------js处理--------")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建String类型的一个实例;")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" _str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n在实例上调用指定的方法"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" str1 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" _str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("substring")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n销毁这个实例"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n_str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ---------js处理--------")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br")])]),a("h2",{attrs:{id:"关于-number-有话说"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于-number-有话说"}},[t._v("#")]),t._v(" 关于 Number 有话说")]),t._v(" "),a("p",[t._v("Number 有两个特殊值，一个是 NaN，一个是 Infinity")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("NaN")]),t._v(" "),a("ul",[a("li",[t._v("指变量不是一个数字")]),t._v(" "),a("li",[t._v('typeof NaN 还是"number"')]),t._v(" "),a("li",[t._v("NaN==NaN --\x3e false, NaN 不等于任何变量")]),t._v(" "),a("li",[t._v("NaN + 1 --\x3e NaN, NaN 和任何变量的运算都是 NaN")]),t._v(" "),a("li",[t._v("可以使用 isNaN 来判断变量不是数字")])])]),t._v(" "),a("li",[a("p",[t._v("Infinity")]),t._v(" "),a("ul",[a("li",[t._v("是指无穷，即变量的大小已经超过了所能展示的数值大小")])])]),t._v(" "),a("li",[a("p",[a("code",[t._v("0.1 + 0.2 === 0.3 // false")])]),t._v(" "),a("ul",[a("li",[t._v("这是二进制浮点数精度不够导致的问题，所有遵循 IEEE 754 规范的语言都是这样，0.1 + 0.2 的结果是 0.30000000000000004")])])])]),t._v(" "),a("h2",{attrs:{id:"函数-特殊的对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数-特殊的对象"}},[t._v("#")]),t._v(" 函数 —— 特殊的对象")]),t._v(" "),a("ul",[a("li",[t._v("函数作为 JS 的第一公民，可以作为参数，可以被调用，可以被赋值等等操作")]),t._v(" "),a("li",[t._v("函数不仅是对象，还可以拥有属性")]),t._v(" "),a("li",[t._v("函数的 length 是其声明的参数个数")])]),t._v(" "),a("h2",{attrs:{id:"bigint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bigint"}},[t._v("#")]),t._v(" BigInt")]),t._v(" "),a("p",[t._v("由于 JS 中的 Number 类型只能表示-9007199254740991 ("),a("em",[t._v("-(2^53-1)")]),t._v(") 和 9007199254740991("),a("em",[t._v("2^53-1")]),t._v(")之间的整数，如果超出这个范围，那么就会失去精度(主要表现为用科学记数法)。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("999999999999999999999")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1e+21")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9007199254740992")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9007199254740993")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("BigInt 就是利用了字符串来表示大整数，就不会在使用超出安全范围的整数出现精度的问题\n用法：只需要在大整数后面加个 n 或者使用 BigInt 构造函数包裹 BigInt()，内容可以用不同的进制表示")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("999999999999999999999")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1e+21")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("999999999999999999999n")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 999999999999999999999n")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("BigInt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("999999999999999999999")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 999999999999999999999n")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("999999999999999999999n")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "bigint"')]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("由于类型的不同，所以和 Number 的数字在===的情况下不等于，但是在==的情况下可以进行隐式转换。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10n")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10n")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("隐式类型转换")]),t._v(" "),a("p",[t._v("不支持 BigInt 和 Number 混合操作，即不会进行隐式类型转换，报 TypeError 错误\n一些 JS 函数，如 Math 类下的方法也是不支持对 BigInt 进行隐式转换，即参数不能传 BigInt 类型，报 TypeError 错误")]),t._v(" "),a("p",[t._v("如必须要进行以上的操作，可以使用强制转换类型，需要注意的是 BigInt()只能强制转换那些可以被转换为整数的类型")])])])}),[],!1,null,null,null);s.default=e.exports}}]);