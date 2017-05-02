/**
 * 深拷贝实现的继承:实现真正意义上的数组和对象的拷贝
 * @param p 要继承的类
 * @returns {___anonymous398_399}
 */
export function deepCopy(p) {
	var F = (p.constructor === Array) ? [] : {};

	for(var i in p) {
		if((typeof p[i]).toString.toLowerCase === "object") {
			F[i] = deepCopy(p[i]);
		} else {
			F[i] = p[i];
		}
	}
	F.uber = p;
	return F;
};
