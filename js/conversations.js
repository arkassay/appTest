$(function(){
	$('.fixedMenus').height($(window).height());
	
	$(window).resize(function(){
		$('.fixedMenus').height($(window).height());
	})
	
	$(window).scroll(function(){
		checkButtons();
	});
	
	$('.ui-btn-left').click(function(event){
		event.preventDefault();
		openMenuOverlay();
	});
	
	$('.staricon').click(function(event){
		event.preventDefault();
		if(!$(this).hasClass('extended')){
			$('.footerMenu a').removeClass('extended');
			$(this).addClass('extended');
			$('.articlesList.two').fadeIn('slow');
			$('.articlesList.one, .articlesList.three').fadeOut('slow');
		}
	});
	$('.categoryicon').click(function(event){
		event.preventDefault();
		if(!$(this).hasClass('extended')){
			$('.footerMenu a').removeClass('extended');
			$(this).addClass('extended');
			$('.articlesList.one').fadeIn('slow');
			$('.articlesList.two, .articlesList.three').fadeOut('slow');
		}
	});
	$('.archiveicon').click(function(event){
		event.preventDefault();
		if(!$(this).hasClass('extended')){
			$('.footerMenu a').removeClass('extended');
			$(this).addClass('extended');
			$('.articlesList.three').fadeIn('slow');
			$('.articlesList.two, .articlesList.one').fadeOut('slow');
		}
	});
});



function onLinkedInLoad() {
   	$(".LinkedInButton, .signUpLink").bind('click',function () {IN.User.authorize(); return false;});
	console.log("load");
	IN.Event.on(IN, "auth", onLinkedInAuth);
	/*
	if(IN.User.isAuthorized()){
		//alert("logged in on articles page");
		//$('.homeLink').trigger('click');
	}
	*/
 }
 function onLinkedInAuth() {
 	console.log("auth");
 	var connectId = "4409416";
	 	
	IN.API.Raw("/groups/"+connectId+":(id,name,short-description,description,posts:(title,summary,creator,site-group-post-url),site-group-url)").result(function(result){
				//groupsDiv.innerHTML += "<p>You belong to group: <a href='"+result.siteGroupUrl+"'>" + value.group.name + "</a></p>";
				console.log("parsing");

				var items = [];
				var index = 0;

				if(result.posts != null){
					console.log("result");
					$.each(result.posts.values, function(ind, post){
						//IN.API.Raw("/groups/12345/posts:(title,summary,creator)?order=recency")
						//groupsDiv.innerHTML += "<li><a href='"+post.siteGroupPostUrl+"'>"+post.title+"</a></li>"
						
						//console.log(value.articleimage);
						var a = '<div id="article' + index + '_" class="swipe">';
						a+='<ul><li id="article'+index+'" class="article" style="display:block">';
						//a+='<a href="'+value.articleimage+'"><img src="img/'+value.articleimage+'">';
						a+='<div class="articleInfo"><p class="articleTitle">' + post.title + '</p>';
						a+='<p class="articleDesc">' + post.summary + '</p>';
						a+='<div class="readMore"><a href="'+post.siteGroupPostUrl+'">Read More</a></div>';
						a+='</div></a></li></ul><div class="icon-star">';
						a+='</div><div class="icon-archive"></div></div>';
						
						++index;
						
						items.push(a);
					});
					
					$('<div/>', {
	    				'class': 'articlesList one',
	    				html: items.join('')
	  				}).appendTo('.articlesContent');
					
					$('<div/>', {
	    				'class': 'articlesList two',
	    				html: items.join('')
	  				}).appendTo('.articlesContent');
					
					$('<div/>', {
	    				'class': 'articlesList three',
	    				html: items.join('')
	  				}).appendTo('.articlesContent');
				
					/*
					new Swipe( '#article0_', '#article0' );
			  		new Swipe( '#article1_', '#article1' );
			  		new Swipe( '#article2_', '#article2' );
			  		new Swipe( '#article3_', '#article3' );
			  		new Swipe( '#article4_', '#article4' );
			  		new Swipe( '#article5_', '#article5' );
			  		new Swipe( '#article6_', '#article6' );
			  		new Swipe( '#article7_', '#article7' );
			  		*/
				}
			});
	
	//$('.reqAuth').show();
	//$('.linkToProfile').trigger('click');
 }

function listArticles(articles){
	//console.log("inside list articles");
	var items = [];
	  $.each(articles, function(key, val) {
	    $.each(val, function(index, value) {
			//console.log(value.articleimage);
			var a = '<div id="article' + index + '_" class="swipe">';
			a+='<ul><li id="article'+index+'" class="article" style="display:block">';
			a+='<a href="'+value.articleimage+'"><img src="img/'+value.articleimage+'">';
			a+='<div class="articleInfo"><p class="articleTitle">' + value.articlename + '</p>';
			a+='<p class="articleDesc">'+value.articlecontent+'</p></div></a></li></ul><div class="icon-star">';
			a+='</div><div class="icon-archive"></div></div>';
			items.push(a);
		});
	  });

	  $('<div/>', {
	    'class': 'articlesList one',
	    html: items.join('')
	  }).appendTo('.articlesContent');
	$('<div/>', {
	    'class': 'articlesList two',
	    html: items.join('')
	  }).appendTo('.articlesContent');
	$('<div/>', {
	    'class': 'articlesList three',
	    html: items.join('')
	  }).appendTo('.articlesContent');
}


function checkButtons(){
	var position = $(window).scrollTop();
	if(position > 62){
		$('.header-icon').addClass('shadow');
	}
	else if(position < 62 && $('.overlay').hasClass('open')){
		$('.header-icon').addClass('shadow');
	}
	else{
		$('.header-icon').removeClass('shadow');
	}
}

function openMenuOverlay(){
	var position = $(window).scrollTop();
	$('.overlay').height($(window).height()+70);
	if($('.overlay').hasClass('open')){
		$('.overlay').fadeOut('slow').removeClass('open');
		$('.ui-btn-right, .footerMenu').fadeIn('fast');
		if(position < 62){
			$('.header-icon').removeClass('shadow');
		}
	}
	else{
		$('.overlay').fadeIn('slow').addClass('open');
		$('.ui-btn-right, .footerMenu').fadeOut('fast');
		$('.header-icon').addClass('shadow');
	}
}

function displayProfiles(profiles) {
   var profilesDiv = document.getElementById("profiles");
	  var members = profiles.values;
	  for (var member in members) {
	    profilesDiv.innerHTML += "<p>Welcome " + members[member].firstName + " " + members[member].lastName + "</p>";
		profilesDiv.innerHTML += "<p> " + members[member].headline + "</p>";
	  }
 }