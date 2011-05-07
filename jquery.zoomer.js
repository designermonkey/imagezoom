
	(function($){
		$.fn.zoomer = function()
		{
			return this.each(function(){
				
				var $ele = $(this);
				
				var o = {
					"sw": $ele.parent().width(),
					"sh": $ele.parent().height(),
					"zw": $ele.width(),
					"zh": $ele.height(),
					"cw": ($ele.width() / $ele.parent().width()).toFixed(2),
					"ch": ($ele.height() / $ele.parent().height()).toFixed(2)
				}

				$ele.width(o.sw).height(o.sh);

				var point = function(el, ev)
				{
					var ofs = el.offset();
					return {
						"x": (ev.pageX - ofs.left),
						"y": (ev.pageY - ofs.top)
					}
				}
				
				$ele.mousemove(function(ev){
					var mousepos = point($ele, ev);
					$('#livex').text(mousepos.x);
					$('#livey').text(mousepos.y);
				})
				
				$ele.click(function(ev){
					
					var nx, ny, nl, nt, cp;

					ev.stopPropagation();
					
					if($ele.hasClass("zoomed"))
					{
						cp = point($ele, ev);
						nx = cp.x.toFixed(0);
						ny = cp.y.toFixed(0);
						nl = (o.sw / 2) - nx;
						nt = (o.sh / 2) - ny;
						$ele.animate({
							"left": nl,
							"top": nt
						});
					}
					else
					{
						cp = point($ele, ev);
						nx = (cp.x * (o.zw / o.sw)).toFixed(0);
						ny = (cp.y * (o.zh / o.sw)).toFixed(0);
						nl = (o.sw / 2) - nx;
						nt = (o.sh / 2) - ny;
						$ele.animate({
							"left": nl,
							"top": nt,
							"width": o.zw,
							"height": o.zh
						});
						$ele.addClass("zoomed");
					}
					
					$(document).one("click", function(evt){
						$ele.animate({
							"left": 0,
							"top": 0,
							"width": o.sw,
							"height": o.sh
						}).removeClass("zoomed");
					});
					
				});
			});
		}
		
	})(jQuery);


