$(function(){
	// Load Data
	$.get("https://api.myjson.com/bins/qzuzi", function(data, status){
		$.each(data, function (key, data) {
			curVal ='<article class="item" data.id="'+data.id+'">'+
					'<img src="'+data.img_url+'">'+
					'<span class="item-label">'+data.name+'</span>'+
					'<div>'+
					'<span class="selling-price">&#8377;'+data.price+'</span>'+
					'<span class="original-price">'+data.price+'</span>'+
					'<span class="offer-price">'+data.discount+'%</span>'+
					'</div><div class="button-wrapper">'+
					'<button class="btn-add-cart">Add to Cart</button>'+
					'</div></article>';

			$(".items").append(curVal);
		});
	});

	// Show/Hide Sort & Filter
	$(".btn-filter-apply, .btn-filter-cancel, .btn-filter").click(function(){
		$("body").toggleClass("show-filter");
	});
	$(".btn-sort-apply, .btn-sort-cancel, .btn-sort").click(function(){
		$("body").toggleClass("show-sort");
	});

	// Pull Cart Data from Storage
	var myCart = [],
		tempVal = localStorage.getItem("myCart");
	if(tempVal != null){
		myCart = tempVal.split(",");
	}
	$("#cartCount").text(myCart.length);

	// Add to Cart
	$(".items").on("click", ".btn-add-cart", function(){
		var curId = $(this).closest("article").attr("data.id");
		myCart.push(curId);
		localStorage.setItem("myCart", myCart);
		$("#cartCount").text(myCart.length);
	});

});