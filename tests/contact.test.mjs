import { readFileSync } from 'node:fs';
import { Script, runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../contact.js', import.meta.url), 'utf8');
test('website inline scripts parse', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Script(match[1]);
});

for (const success of [true, false]) {
  test(`contact submission ${success ? 'success resets form' : 'failure preserves entries'}`, async () => {
    let submit;
    let resets = 0;
    let requests = 0;
    let valid = false;
    const form = {
      action: 'https://api.web3forms.com/submit',
      addEventListener: (_, handler) => { submit = handler; },
      reportValidity: () => valid,
      setAttribute() {}, removeAttribute() {}, reset() { resets++; },
    };
    const status = { dataset: {}, removeAttribute() {} };
    const button = { disabled: false };
    const elements = { 'contact-form': form, 'contact-status': status, 'contact-submit': button };
    runInNewContext(source, {
      document: { getElementById: id => elements[id] },
      FormData: class { get() { return null; } },
      AbortController, setTimeout, clearTimeout,
      fetch: async (url, options) => {
        requests++;
        assert.equal(url, form.action);
        assert.equal(options.method, 'POST');
        return { ok: success, json: async () => ({ success }) };
      },
    });
    await submit({ preventDefault() {} });
    assert.equal(requests, 0, 'invalid inputs are not sent');
    valid = true;
    const pending = submit({ preventDefault() {} });
    await submit({ preventDefault() {} });
    await pending;
    assert.equal(requests, 1, 'double submission blocked');
    assert.equal(resets, success ? 1 : 0);
    assert.equal(status.dataset.state, success ? 'success' : 'error');
    assert.equal(button.disabled, false);
  });
}
