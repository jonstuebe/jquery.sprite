$(function() {

	$.fn.sprite = function(options) {

		if (!this.length) { return this; }

		var opts = $.extend(true, {}, $.fn.sprite.defaults, options);

		this.each(function() {
			var $this = $(this),
			curFrame = 0,
			loopNum = 0;
			frameSpeed = ( ( opts.frames / opts.fps ) * 1000 ) / opts.frames;

			var anim;

			var run = function(){
				curFrame++;
				$this.data('animating',true);
				var bp = parseInt($this.css('background-position').split(' ')[0].replace('px',''));
				bp = (bp < 0) ? (bp * -1) : bp;

				var newPos = (-1 * (bp + $this.width()));

				if(opts.loop == true && curFrame == opts.frames)
				{
					newPos = 0;
					curFrame = 0;
					loopNum++;
				}

				$this.css({ 'background-position': newPos + 'px' + ' 0' });

				if(curFrame == opts.frames && opts.loop != true)
				{
					$this.trigger('stop');
				}

				$this.trigger({
					type: 'progress',
					frameNum: curFrame,
					loopNum: loopNum
				});
			};

			anim = setInterval(run, frameSpeed);

			$this.on('pause', function(){
				clearInterval(anim);
				$this.data('animating',false);
			});

			$this.on('stop', function(){
				clearInterval(anim);
				$this.css('background-position','');
				$this.data('animating',false);
			});

			$this.on('resume', function(e){

				anim = setInterval(run, frameSpeed);

			});

		});

return this;

};

	// default options
	$.fn.sprite.defaults = {
		fps: 24,
		loop: false
	};

});