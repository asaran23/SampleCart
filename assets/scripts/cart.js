$(function(){
	// Load Data
	var myCart = [],
		tempVal = localStorage.getItem("myCart");
	if(tempVal != null){
		myCart = tempVal.split(",");
	}
	
	// Update Total
	$("#totalItems").text(myCart.length);

	// Populate Cart
	$.get("https://api.myjson.com/bins/qzuzi", function(data, status){
		$.each(data, function (key, data) {
			var curId = data.id.toString();
			if(myCart.includes(curId)){

				// Count Items
				var curCount = 0;
				$.each(myCart, function(key, val){
					//console.log(val);
					if(val == data.id){
						curCount++
					}
				});

				var curVal ='<article class="item">'+
						'<img src="http://lorempixel.com/500/600/technics/">'+
						'<div class="item-data">'+
						'<span class="item-label">'+data.name+'</span>'+
						'<div>'+
						'<span class="selling-price">&#8377;'+data.price+'</span>'+
						'<span class="original-price">600</span>'+
						'<span class="offer-price">'+data.discount+'%</span>'+
						'</div>'+
						'<div class="counter">'+
						'<a href="#" class="btn-minus">-</a>'+
						'<input type="text" value="'+curCount+'">'+
						'<a href="#" class="btn-plus">+</a>'+
						'</div>'+
						'<a href="#" class="btn-remove">remove</a>'+
						'</div>'+
						'</article>';
				$(".cart-list").append(curVal);
			}
		});
		//console.log(data);
	});

	$(".cart-list").on("click", ".btn-remove", function(){
		$(this).closest("article").remove();
	});
	$(".cart-list").on("click", ".btn-minus", function(){
		var itemCount = $(this).next().val();
		if(itemCount > 1){
			$(this).next().val(itemCount-1);
		}
	});
	$(".cart-list").on("click", ".btn-plus", function(){
		var itemCount = $(this).prev().val();
		console.log(itemCount);
		$(this).prev().val(parseInt(itemCount) + 1);
	});

});