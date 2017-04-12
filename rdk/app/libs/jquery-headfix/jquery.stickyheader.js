(function($, undefined) {
	
   $.fn.fixHeader = function(){
   		if($(this).find('thead').length > 0 && $(this).find('th').length > 0) {
			// Clone <thead>
			var $w	   = $(window),
				$t	   = $(this),
				$thead = $t.find('thead').clone(),
				$col   = $t.find('thead, tbody').clone();

			// Add class, remove margins, reset width and wrap table
			$t
			.addClass('sticky-enabled')
			.css({
				margin: 0,
				width: '100%'
			}).wrap('<div class="sticky-wrap"/>');

			if($t.hasClass('overflow-y')) $t.removeClass('overflow-y').parent().addClass('overflow-y');

			// Create new sticky table head (basic)
			$t.after('<table class="rdk-table sticky-thead" />');

			// If <tbody> contains <th>, then we create sticky column and intersect (advanced)
			if($t.find('tbody th').length > 0) {
				$t.after('<table class="sticky-col" /><table class="sticky-intersect" />');
			}

			// Create shorthand for things
			var $stickyHead  = $(this).siblings('.sticky-thead'),
				$stickyCol   = $(this).siblings('.sticky-col'),
				$stickyInsct = $(this).siblings('.sticky-intersect'),
				$stickyWrap  = $(this).parent('.sticky-wrap');

			$stickyHead.append($thead);

			$stickyCol
			.append($col)
				.find('thead th:gt(0)').remove()
				.end()
				.find('tbody td').remove();

			$stickyInsct.html('<thead><tr><th>'+$t.find('thead th:first-child').html()+'</th></tr></thead>');
			
			// Set widths
			var setWidths = function () {
					$t
					.find('thead th').each(function (i) {
						$stickyHead.find('th').eq(i).width($(this).width());
					})
					.end()
					.find('tr').each(function (i) {
						$stickyCol.find('tr').eq(i).height($(this).height());
					});

					// Set width of sticky table head
					$stickyHead.width($t.width());

					// Set width of sticky table col
					$stickyCol.find('th').add($stickyInsct.find('th')).width($t.find('thead th').width())
				},
				repositionStickyHead = function (event) {
					var element = event.currentTarget;

					if(element == $t.get(0).offsetParent || ( element && element != window && element.Infinity!="Infinity" && $(element).css("overflow")=="hidden")){
						return;
					}
                 
					var offsetTop;
					if(element.location != self.location){//是否顶级窗口
						offsetTop = getAbsPoint($t.get(0)) - getAbsPoint(element);//t相对于element的top
					}
					else{
						offsetTop = $t.offset().top;
					}

					if($(element).scrollTop() == 0){//排序时，需要把排序列置上层
						$(".sticky-thead").css("visibility", "hidden");
					}
					else{
						$(".sticky-thead").css("visibility", "visible");
					}

					// Return value of calculated allowance
					var allowance = calcAllowance(element);
				
					// Check if wrapper parent is overflowing along the y-axis
					if($t.height() > $stickyWrap.height()) {
						// If it is overflowing (advanced layout)
						// Position sticky header based on wrapper scrollTop()
						if($stickyWrap.scrollTop() > 0) {
							// When top of wrapping parent is out of view
							$stickyHead.add($stickyInsct).css({
								opacity: 1,
								top: $stickyWrap.scrollTop()
							});
						} else {
							// When top of wrapping parent is in view
							$stickyHead.add($stickyInsct).css({
								opacity: 0,
								top: 0
							});
						}
					} else {
						// If it is not overflowing (basic layout)
						// Position sticky header based on viewport scrollTop
						if($(element).scrollTop() > offsetTop && $(element).scrollTop() < offsetTop + $t.outerHeight() - allowance) {
							// When top of viewport is in the table itself
							$stickyHead.add($stickyInsct).css({
								opacity: 1,
								top: $(element).scrollTop() - offsetTop
							});

						} else {
							// When top of viewport is above or below table
							$stickyHead.add($stickyInsct).css({
								opacity: 0,
								top: 0
							});
						}
					}
				},
				repositionStickyCol = function () {
					if($stickyWrap.scrollLeft() > 0) {
						// When left of wrapping parent is out of view
						$stickyCol.add($stickyInsct).css({
							opacity: 1,
							left: $stickyWrap.scrollLeft()
						});
					} else {
						// When left of wrapping parent is in view
						$stickyCol
						.css({ opacity: 0 })
						.add($stickyInsct).css({ left: 0 });
					}
				},
				calcAllowance = function (element){
					var a = 0;
					// Calculate allowance
					$t.find('tbody tr:lt(1)').each(function () {
						a += $(this).height();
					});
					
					// Set fail safe limit (last three row might be too tall)
					// Set arbitrary limit at 0.25 of viewport height, or you can use an arbitrary pixel value
					if(a > $(element).height()*0.25) {
						a = $(element).height()*0.25;
					}
					
					// Add the height of sticky header
					a += $stickyHead.height();
					return a;
				};

				getAbsPoint = function(e){
					var x = e.offsetLeft, y = e.offsetTop;      
					while(e = e.offsetParent){    
						x += e.offsetLeft;      
						y += e.offsetTop;   
					} 
					return y; 
				}

				handlePosition = function(e){
					setWidths();
					repositionStickyHead(e);
					repositionStickyCol();
				}

			setWidths();
			if($w.scrollTop() == 0){
				$(".sticky-thead").css("visibility", "hidden");
			}

			$w.load(setWidths).resize($.debounce(250, function ($event) {
				handlePosition($event);
			})).scroll($.throttle(250, function($event){
				handlePosition($event);
			}));

			$.each($t.parents(), function(i, element){
				if(element.location != self.location){
					$(element).scroll($.throttle(250, function($event) {
						handlePosition($event);
					}));
				}
				if(i == $t.parents().length-1){
					handlePosition({currentTarget:window});
				}
			});
		}
   }
})(jQuery);