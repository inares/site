---
layout: page
status: publish
published: true
title: Contact
author: INARES
permalink: /contact/
categories: []
tags: [contact, mail, message]
keywords: contact, mail, message
---


<form class="form-style" action="" method="post" name="contact" id="contact">
  <span>Pour nous contacter, vous pouvez utiliser le formulaire ci-dessous.</span>

  <label for="name">
    <span>Nom complet :</span><input type="text" name="name" id="name" required="true" />
  </label>

  <label for="mail">
    <span>Adresse mail :</span><input type="email" name="mail" id="mail" required="true" />
  </label>

  <label for="subject">
    <span>Objet du message :</span><input type="text" name="subject" id="subject" required="true" />
  </label>

  <label>
    <span>Joindre un fichier</span>
    <input type="file" name="piece_jointe" id="piece_jointe" />
    <label class="form-file" for="piece_jointe">Choisir un fichier</label>
  </label>

  <label for="message">
    <span>Message :</span><textarea name="message" id="message" onkeyup="adjust_textarea(this)" required="true"></textarea>
  </label>

  <input type="submit" value="Envoyer" />
</form>


<script type="text/javascript">
  'use strict';

  function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
  }

  ;( function ( document, window, index ) {
  	var inputs = document.querySelectorAll( '#piece_jointe' );
  	Array.prototype.forEach.call( inputs, function( input ) {
  		var label    = input.nextElementSibling,
  			  labelVal = label.innerHTML;

  		input.addEventListener( 'change', function( e ) {
  			var fileName = '';
  			if( this.files && this.files.length > 1 )
  				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
  			else
  				fileName = e.target.value.split( '\\' ).pop();

  			if( fileName )
  				label.innerHTML = fileName;
  			else
  				label.innerHTML = labelVal;
  		});

  		/* Firefox bug fix */
  		input.addEventListener( 'focus', function(){ input.classList.add   ( 'has-focus' ); });
  		input.addEventListener( 'blur' , function(){ input.classList.remove( 'has-focus' ); });
  	});
  }( document, window, 0 ));
</script>
