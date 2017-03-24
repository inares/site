---
layout: page
status: publish
published: true
title: Contact
author: INARES
wordpress_id: 27
permalink: /contact/
categories: []
tags: [contact, mail, message]
keywords: contact, mail, message
---

<!-- https://foundation.zurb.com/sites/docs/forms.html -->

Pour nous contacter, vous pouvez utiliser le formulaire ci-dessous.

&nbsp;

<form name="contact" action="merci" netlify netlify-honeypot="mypot">

  <div class="row">
    <div class="small-3 columns">
      <label for="cname" class="text-right middle">Nom :</label>
    </div>
    <div class="small-9 columns">
      <input type="text" id="cname" name="cname" placeholder="Indiquez votre nom complet" required pattern="[a-zA-Z\ ]+">
    </div>
  </div>
    
  <div class="row">
    <div class="small-3 columns">
      <label for="mail" class="text-right middle">Adresse mail :</label>
    </div>
    <div class="small-9 columns">
      <input type="email" id="mail" name="mail" placeholder="E-mail" required>
    </div>
  </div>
    
  <div class="row">
    <div class="small-3 columns">
      <label for="sujet" class="text-right middle">Sujet :</label>
    </div>
    <div class="small-9 columns">
      <input type="text" id="name" name="sujet" placeholder="Sujet du message" required>
    </div>
  </div>
    
  <div class="row">
    <div class="small-3 columns">
      <label for="message" class="text-right middle">Message :</label>
    </div>
    <div class="small-9 columns">
      <textarea id="message" name="message" placeholder="Entrez votre message ici" required></textarea>
    </div>
  </div>
    
  <div class="row">
    <div class="small-3 columns">
      <label for="file" class="text-right middle">Joindre un fichier :</label>
    </div>
    <div class="small-9 columns">
      <label for="file" class="button">Choisir un fichier</label>
      <input type="file" id="file" name="file" class="show-for-sr file-input">
    </div>
  </div>
    
  <div class="row">
    <div class="small-12 columns small-centered text-center">
      <input type="submit" class="nice blue radius button" value="Envoyer le message">
    </div>
  </div>
  
  <div class="hide"><label>Ne rien mettre dans ce champ : <input type="text" name="mypot"></label></div>
  
</form>
