// 给任意DOM元素添加拖曳功能
__tk__define(function (require, exports, module) {
	function Drag(dom, tag, icon) {
		var _this = this;

		this._obj = dom;
		this._tag = tag;
		this._mouseStart = {};
		this._divStart = {};
		this.clientWidth = document.body.clientWidth;
		this.flag = false;
		this.icon = icon;
		this._tag.onmousedown = function (ev) {
			_this._startDrag(ev);
		};
	}

	Drag.prototype._startDrag = function (ev) {
		var _this = this,
			oEvent = ev || event;

		this._mouseStart.x = oEvent.clientX;
		this._mouseStart.y = oEvent.clientY;
		this._divStart.x = this._obj.offsetLeft;
		this._divStart.y = this._obj.offsetTop;

		if (this._obj.setCapture) {
			this._tag.onmousemove = function (ev) {
				_this._doDrag(ev);
			}
			this._tag.onmouseup = function (ev) {
				_this._stopDrag(ev);
			}
			this._tag.ondblclick = function (ev) {
				_this._stopDrag(ev);
			}
			this._tag.setCapture();
		}
		else {
			this._doDrags = function (ev) {
				_this._doDrag(ev);
			}
			this._stopDrags = function (ev) {
				_this._stopDrag(ev);
			}
			this._stopDragsDbl = function (ev) {
				_this.flag = true;
				document.removeEventListener('mousemove', _this._doDrags, true);
				_this._stopDrag(ev);
			}
			document.addEventListener('mousemove', this._doDrags, true);
			document.addEventListener('mouseup', this._stopDrags, true);
			document.addEventListener('dblclick',this._stopDragsDbl, true);
		}
	}
	Drag.prototype._doDrag = function (ev) {
		var oEvent = ev || event,
			left = oEvent.clientX - this._mouseStart.x + this._divStart.x,
			top = oEvent.clientY - this._mouseStart.y + this._divStart.y;
		if (this.icon) {
			if (left <= (30 - 118)) {
				left = -118;
			}
			if (left > (this.clientWidth - this._obj.offsetWidth) - (30 + 118)) {
				left = (this.clientWidth - this._obj.offsetWidth) - 118;
			}
		} else {
			if (left <= 30) {
				left = 0;
			}
			if (left > (this.clientWidth - this._obj.offsetWidth) - 30) {
				left = this.clientWidth - this._obj.offsetWidth;
			}
		}

		if (top <= 0) {
			top = 0;
		}
		this._obj.style.left = left + 'px';
		this._obj.style.top = top + 'px';
	}
	Drag.prototype._stopDrag = function (ev) {
		if (this._tag.releaseCapture) {
			this._tag.onmousemove = null;
			this._tag.onmouseup = null;
			this._tag.releaseCapture();
		}
		else {
			document.removeEventListener('mousemove', this._doDrags, true);
			document.removeEventListener('mouseup', this._stopDrags, true);
			document.removeEventListener('dblclick', this._stopDrags, true);
			this._doDrags = this._stopDrags = null;
		}
	}

	module.exports = Drag;
});