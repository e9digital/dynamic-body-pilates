;jQuery(function($) {

  /*
   * external links
   */
  $('a[rel=external]').click(function() {
    window.open(this.href);
    return false;
  });

  /*
   * "current" page for menu
   */
  $('#top-nav ul')
    .find('a[href="'+ document.location.pathname +'"]')
    .closest('li')
    .addClass('current')
  ;

  /*
   * footer icon html
   */
  $('#footer-links li > a').prepend('<span class="icon-container"><span class="icon"/></span>');

  /*
   * super unnecessary email obfusc
   */
  var ed = "dynamicbodypilates.com", en = 'rebecca';

  $('a.contact')
    .attr('href', 'maUMMMo: '.replace(/UMMM/,'ilt') + en + '@' + ed)
    .attr('rel', 'nofollow')
  ;

  $('span.email-name').replaceWith(en);
  $('span.email-domain').replaceWith(ed);
});
