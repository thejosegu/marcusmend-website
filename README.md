# Marcus'Mend — Marketing-Website

Statischer Onepager (HTML/CSS, kein Build nötig) für Marcus'Mend, einen DBT-Skills-Übungsraum.

Lokal öffnen: `index.html` direkt im Browser starten, oder von diesem Verzeichnis aus:

```
python -m http.server 5190 --bind 127.0.0.1
```

Dann `http://127.0.0.1:5190/` aufrufen.

## Footer und Kontaktformular

Kontakt, Impressum und Datenschutz sind Reiter mit direkten Hash-Zielen. Inhalte wurden am 2026-09-12 aus `F:\MarcusMood\MarcusSite Coding` übernommen und auf MarcusMend angepasst. Alte TMG-/OS-Verweise und MarcusMood-spezifische App-Funktionen wurden nicht übernommen.

`contact.js` sendet erst nach Absenden an Web3Forms, mit dem bestehenden öffentlichen Formularschlüssel der MarcusMood-Website. Absenderbezeichnung und Betreff nennen MarcusMend. Ob für den Schlüssel Domainbeschränkungen oder zusätzliche Integrationen eingerichtet sind, muss im bestehenden Web3Forms-Konto geprüft werden. Es wurde keine echte Testnachricht verschickt; Validierung, Doppelklickschutz, Erfolgs-/Fehlerbehandlung und JavaScript-Syntax wurden lokal mit simuliertem Versand geprüft (`node --test ../tests/website-contact.test.mjs`).

Der Nutzer bestätigt am 2026-09-12, dass das Kontaktformular praktisch funktioniert. Ein weiterer Versandtest ist nicht erforderlich. Vercel wird laut Nutzer im kostenlosen Tarif ohne Analytics verwendet. Die frühere Beschreibung oben betrifft ausschließlich die automatisierte Prüfung.

Die Website-Texte beschreiben jetzt die JSON-Gesamtsicherung. Vorschau-Bezeichnung und Indexierungssperre sind lokal entfernt; Canonical verweist auf die öffentliche Infoseite. Noch nicht veröffentlicht.

Datenschutzgrundlagen: [Web3Forms](https://web3forms.com/privacy) und [DPA](https://web3forms.com/dpa) (physische Speicherung mit dreijähriger TTL; Dashboard-Sichtbarkeit tarifabhängig; ältere FAQ-Aussage „keine Speicherung“ ist widersprüchlich), [Vercel](https://vercel.com/legal/privacy-notice), [EU-Hinweis zur Schließung der OS-Plattform](https://consumer-redress.ec.europa.eu/site-relocation_en). Projektbezogene Hosting-Protokollfristen sowie Vertrags-/Transfergrundlagen bleiben im jeweiligen Konto zu verifizieren. Die Texte sind keine Bestätigung einer abgeschlossenen rechtlichen Gesamtprüfung.
