(function () {
  'use strict';
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');
  var button = document.getElementById('contact-submit');
  if (!form || !status || !button) return;
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (button.disabled || !form.reportValidity()) return;
    var data = new FormData(form);
    if (data.get('botcheck')) return;
    button.disabled = true;
    button.textContent = 'Wird gesendet …';
    form.setAttribute('aria-busy', 'true');
    status.hidden = false;
    status.textContent = 'Deine Nachricht wird gesendet …';
    status.removeAttribute('data-state');
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 20000);
    try {
      var response = await fetch(form.action, {
        method: 'POST', body: data, signal: controller.signal,
        headers: { Accept: 'application/json' }, credentials: 'omit',
      });
      var result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission failed');
      status.textContent = 'Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.';
      status.dataset.state = 'success';
      form.reset();
    } catch (error) {
      status.textContent = 'Der Versand konnte nicht bestätigt werden. Deine Eingaben bleiben erhalten. Bitte versuche es später erneut oder schreibe an j.sebastian.guenther@gmail.com.';
      status.dataset.state = 'error';
    } finally {
      clearTimeout(timeout);
      form.removeAttribute('aria-busy');
      button.disabled = false;
      button.textContent = 'Nachricht senden';
    }
  });
})();
