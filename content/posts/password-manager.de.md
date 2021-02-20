---
title: "Passwort Manager"
description: "Passwort Manager"
keywords: passwort,manager,bitwarden,lastpass,keepass
date: 2021-02-18T17:57:26+01:00
---

## Passwort Manager

Ich würde Bitwarden empfehlen und am besten zusätzlich mit einem Authentifikator.

* [Bitwarden](https://bitwarden.com/) (Kostenlos/Premium)
* [LastPass](https://lastpass.com/) (Kostenlos/Premium)
* [KeePass](https://keepass.info/) (Kostenlos)

### Authentifikator

Authy oder Google meistens passend für den ersten Zugriff.

Bitwarden Authenticator (TOTP) ist nur für Premium erhältlich.

* [Authy](https://authy.com/) (Kostenlos)
* [Google Authentificator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) (Kostenlos)
* [LastPass Authentificator](https://lastpass.com/auth/) (Kostenlos)
* [Bitwarden Authenticator (TOTP)](https://bitwarden.com/help/article/authenticator-keys/) (Premium)

### Abschalten des Passwort Manager in Firefox

Firefox > Einstellungen > Datenschutz & Sicherheit > Zugangsdaten und Passwörter
* Fragen, ob Zugangsdaten und Passwörter für Websites gespeichert werden sollen = nein

## Ich will mehr wissen

Warum ein Passwort Manager?

Die einen merken sich die Passwörter mit einem einfachen **Code Schlüssel**, was sehr unsinnig ist, weil die meisten das sowieso vergessen.
Vorallem kann man solche Passwörter in Sekunden knacken.

Die nächsten schreiben die Passwörter wenigstens auf **Papier** auf.
Oder auf dem nächsten Papier, hier ein Strich, dort geändert, was für eine unleserliche Schrift.
Mist das Papier liegt Zuhause...

Da man nun genug analoge Frustration erlebt hat, nimmt man ein **Office Paket**.
Also ein **Schreibprogramm wie Word** oder **Wordpad** oder für die Cleveren eine **Tabellenkalkulation wie Excel**.
Jetzt ist zwar alles sauber abgetippt, aber entweder durcheinander, kein Platz, Drucker spuckt das nicht sauber aus, usw.

Das eigentliche Problem mit den Office Programmen ist die **Rechtschreibkorrektur** und **automatische Eingabe von Inhalten**.
Dies macht nämlich eure Passwörter kaputt, wenn ihr nicht aufpasst.

Das einzige was da funktioniert wäre ein reiner "**Text Editor**".
Solch einer, welcher keinen Text in Fett Schrift anzeigen kann.

Allerdings ist bis dahin alles in Klartext lesbar.
Wo die meisten zu einem **USB-Stick/Festplatte** greifen, damit es nicht direkt auf dem PC liegt.
Einmal den USB-Stick nicht korrekt ausgeworfen und zu früh raus gezogen, schon ist der USB-Stick kaputt und die Passwortliste weg.
**Spätestens jetzt ist die digitale Frustration da.**

Die **Browser** selbst habe einen integrierten Passwort Manager und wird von den meisten bereits verwendet.
Dieser ist aber oft etwas rudimentär und hat so seine Problemchen.

### Warum nicht einfach ein Passwort Manager?

Das einzige was ihr wirklich praktisch machen könnt, ist ein Passwort Manager zu nutzen, welcher alle Daten im Container verschlüsselt.
**Zum Beispiel Bitwarden, LastPass oder KeePass.**

Im Prinzip habt ihr ein **Master-Passwort**, welches ihr euch merken müsst, damit ihr euren Tresor öffnen könnt.
Habt ihr das Master-Passwort vergessen, seit ihr Wortwörtlich gefickt, da alle Passwörter nicht entschlüsselbar sind, also pfutsch sind.
Deswegen schreibt man sich dieses eine Passwort auf und vergisst es nie!

**KeePass 1+2** ist die lokale Variante, da muss man drauf achten, dass man die Datei gut aufbewahrt.
Es ist aber auch nervig, weil es nicht gerade benutzerfreundlich ist und mit syncronisation seine Problemchen hat.

**Bitwarden** und **LastPass**, ist die online Variante. Womit man Passwörter fast immer mit einem Addon geschickt ausfüllen lassen kann.
Zudem gibt es auf dem Smartphone Apps, womit man sie auch immer dabei hat.
Mit einem Authentifikator könnt ihr Zugriffe zusätzlich schützen, was ich auch empfehlen würde.
Das ist doch mal komfortabel!

Letztlich habe ich mich persönlich zu Bitwarden entschieden, weil ich das viel angenehmer finde.
Ich benutze Passwort Manager seit über 20 Jahren und habe nie ein Passwort ausdrucken müssen.
Falls das jemand machen will, habe ich für Bitwarden ein Script gemacht, damit das hübsch aussieht.
Lastpass kann es auch, sieht halt scheiße aus.

{{< markdown/button url="posts/bitwarden-to-pdf" class="btn-primary mb-2">}}
<i class="fas fa-arrow-right"></i> Konvertiere Bitwarten JSON zu PDF
{{< /markdown/button >}}

Für was ihr euch am Ende entscheidet ist eure Wahl. Schließlich müsst ihr damit umgehen.
