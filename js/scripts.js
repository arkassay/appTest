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
	
	$( '.ui-btn-right' ).click( function( event ) {
		event.preventDefault();
		toggleProfile();
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
	
	$('.instructions1').click(function(){
		$(this).fadeOut('fast', function(){
			$('.instructions2').css('display','block').show('fast');
		})
	});
	$('.instructions2').click(function(){
		$(this).fadeOut('fast');
		openInfoOverlay();
	});
});



var profileOpen = false;

function toggleProfile(){
	if ( profileOpen ) {
		profileOpen = false;
		//$( "#profile_" ).css( 'display', 'block' );
		$( "#profile_" ).animate( { opacity: 0 }, 400, function() {
			$( "#profile_" ).css( 'display', 'none' );
			$( ".menuBottom" ).show();
			$( ".ui-btn-left" ).show();
		} );
	} else {
		profileOpen = true;
		$( "#profile_" ).css( 'display', 'block' );
		$( "#profile_" ).animate( { opacity: 1 }, 400 );
		$( ".menuBottom" ).hide( 300 );
		$( ".ui-btn-left" ).hide( 300 );
	}
}

function onLinkedInLoad() {
   	$(".LinkedInButton, .signUpLink").bind('click',function () {IN.User.authorize(); return false;});
	IN.Event.on(IN, "auth", onLinkedInAuth);
	
 }
 function onLinkedInAuth() {
	//$('.reqAuth').show();
	//$('.linkToProfile').trigger('click');
	console.log('hi');
	/*$('#home').hide('fast');
	$('#createProfile').show('fast');*/
	window.location.assign("profile.html")
	//IN.API.Profile("me").result(displayProfiles);
 }


function listArticles(articles){
	//console.log("inside list articles");
	var items = [];
	  $.each(articles, function(key, val) {
	    $.each(val, function(index, value) {
			//console.log(value.articleimage);
			var a = '<div id="article' + index + '_" class="swipe">';
			a+='<ul><li id="article'+index+'" class="article" style="display:block">'
			a+='<a href="articleSingle.html"><img src="img/'+value.articleimage+'">';
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
	$('.overlay.one').height($(window).height()+70);
	if($('.overlay.one').hasClass('open')){
		$('.overlay.one').fadeOut('slow').removeClass('open');
		$('.ui-btn-right, .footerMenu').fadeIn('fast');
		if(position < 62){
			$('.header-icon').removeClass('shadow');
		}
	}
	else{
		$('.overlay.one').fadeIn('slow').addClass('open');
		$('.ui-btn-right, .footerMenu').fadeOut('fast');
		$('.header-icon').addClass('shadow');
	}
}


function openInfoOverlay(){
	var position = $('body').scrollTop(0);
	$('.overlay.two').height($(window).height()+70);
	if($('.overlay.two').hasClass('open')){
		$('.overlay').fadeOut('slow').removeClass('open');
		$('.ui-btn-left, .ui-btn-right, .footerMenu').fadeIn('fast');
		if(position < 62){
			$('.header-icon').removeClass('shadow');
		}
	}
	else{
		$('.overlay.two').fadeIn('slow').addClass('open');
		$('.ui-btn-left, .ui-btn-right, .footerMenu').fadeOut('fast');
		$('.header-icon').addClass('shadow');
	}
}
/*
function displayProfiles(profiles) {
   var profilesDiv = document.getElementById("profiles");
	  var members = profiles.values;
	  
	  for (var member in members) {
		console.log(members[member]);
		profilesDiv.innerHTML += '<a href="http://"><div class="connectWith"><img src="'+members[member].pictureUrl+'"/>';
		profilesDiv.innerHTML += '<p>' + members[member].firstName + ' ' + members[member].lastName + '</p></div></a>';
	  }
 }*/