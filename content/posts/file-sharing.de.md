---
title: "Dateien teilen"
description: "Dateien teilen"
keywords: file,sharing,dateien,teilen
date: 2021-02-19T17:57:26+01:00
---

Dateien zu einem Partner (Empfänger) zu transferieren ist im Grunde ziemlich einfach.

Meistens muss nur das bedenkt werden:

* **Welches Medium:** Über Software oder Hardware
* **Welches Datei Format:** In Archiv Packen, Splitten oder direkt versenden
* **Welche Sicherheitsanforderungen:** Passwort, Verschlüsselung

Für den Transfer über Hardware gibt es Externe Festplatte, USB-Stick oder Disk (CD, DVD, Bluray).
Für den Transfer über Software, wird meistens das Internet genutzt.

Mein **persönlicher Favorit** um Dateien zu versenden, ist übrigends das Programm **Croc**.
Leider existiert dafür noch keine grafische Oberflache. 

## Grundregeln

Hier einige Grundregeln für das Versenden von Dateien:

1. [Nicht per E-Mail!](#warum-nicht-per-e-mail) Man kann es nicht häufig genug sagen.
2. Bilder und Videos werden in [Instant Messenger, Chats](#warum-sollte-ich-messenger-vermeiden) und vielen Webseiten komprimiert! (Qualitätsverlust)
3. Mehrere Dateien werden in ein Archiv gepackt und nicht einzeln verschickt!
4. Soll es sicher sein, muss es verschlüsselt werden. (Passwort, Ende-zu-Ende Verschlüsselung)
5. Ist der Partner online (P2P) oder ist er offline (Cloud oder Alternativen).

## Dateiversand für Noobs

Dein Partner (Empfänger) ist ein unerfahrener Benutzer (Vollidiot) und hat keine Ahnung, was das Internet ist.
In diesem Fall, wirst du gezwungen sein ein Fernwartungstool zu verwenden.
Du kannst die Dateien entweder direkt über das Tool verschicken oder eine andere bessere Variante verwenden.

**Fernwartungstools:**

* [TeamViewer](https://www.teamviewer.com/)
* [AnyDesk](https://anydesk.com/)

Bist du selbst ein unerfahrener Benutzer, dann finde jemand der dir hilft und/oder dir erklärt, was zu tun ist.

## Dateiversand für Anfänger

Entweder du oder dein Partner ist ein Anfänger, dann wird folgendes nützlich sein:

**Über Messenger:**

* [Threema](https://web.threema.ch/) (Limit: 150 MB)
* [Signal](https://signal.org/) (Limit: 100 MB)
* [WhatsApp](https://web.whatsapp.com/) (Limit: 150 MB)
* [Telegram](https://web.telegram.org/) (Limit: 2 GB)
* [Hangout](https://hangouts.google.com/) (Limit: 200 MB)

**Über Cloud Transfer Dienste:**

Kurzzeitige Speicherung, mittels Teilen-Link oder E-Mail Adresse.

* [Dropbox Transfer](https://www.dropbox.com/transfer/) (Limit: 100 MB)
* [Wetransfer](https://wetransfer.com/) (Limit: 2 GB)
* [Send Anywhere](https://send-anywhere.com/)

**Über P2P:**

P2P (Peer to Peer, Endpunkt zu Endpunkt), beide müssen Online sein.

* [ShareDrop](https://www.sharedrop.io/)

## Dateiversand für Fortgeschritte

Ihr seit in der Lage mit dem Betriebssystem umzugehen und wisst was ein Archiv ist.

**Über Cloud Dienste:**

Dauerhafte Speicherung, mittels Freigabe über Teilen-Link oder E-Mail Adresse.

* [Dropbox](https://www.dropbox.com/)
* [Google Drive](https://drive.google.com/)
* [Nextcloud](https://nextcloud.com/) (Muss ein Experte bereitstellen)

**Archivierprogramme:**

* [7-Zip](https://www.7-zip.org/) (Passwort, Dateien spalten)
* [WinRar](https://www.winrar.de/)

## Dateiversand für Experten

Ihr wisst, dass das schwarze Fenster mit dem Namen "Terminal / Command" kein versehentlicher "Dark Mode" ist.

**Dateiversand per Terminal:**

* [Croc](https://github.com/schollz/croc)
* [Magic Wormhole](https://github.com/magic-wormhole/magic-wormhole)

**Sonstiges:**

* [Create archives and split files](https://github.com/Cyb10101/notes/blob/master/Software/Archives.md)

## Dateiversand für Außerirdische

Ihr seit IT und möchtet zu eurem Partner telefonieren.
Dies bedeutet soviel, dass ihr genau wisst, was das dort unten bedeutet und was ihr damit tut.

**Denn wenn ihr es nicht wisst und den falschen Knopf drückt, beschwört ihr das Tor zu Hölle!**

**Tor Netzwerk:**

* [OnionShare](https://onionshare.org/)
* [Tor Browser](https://www.torproject.org/)

**Torrent Netzwerk:**

* [IPFS - InterPlanetary File System](https://ipfs.io/)

**Sonstiges:**

* [PGP](https://github.com/Cyb10101/notes/blob/master/Software/GPG.md)

## Aber warum den nicht?

Weil es nicht verkehrt ist, manchmal etwas vernünftiges zu tun. Hier ein paar Anmerkungen...

### Warum nicht per E-Mail?

* Unsichere Übertragung, Nachricht sowie Daten können ausgelesen werden
* Nachrichten Größe ist begrenzt (Limit: 5 - 200 MB)
* Das Postfach vom Empänger kann schnell voll werden
* Ist das Postfach vom Empänger voll, wird die manchmal die komplette E-Mail zum Sender zurück gesendet

Grundlegend ist E-Mail ein veraltetes Format und nur dafür ausgelegt, um Nachrichten zu versenden.
Man kann zwar kleinere Dateien anhängen, aber für große Dateien ist das Format ungeeignet!

Wenn man eine 60 MB Datei versendet, kann es vorkommen, dass der Empänger-Dienst nur 5 MB akzeptiert.
Viele Leute versenden dann mehrere E-Mails, weil sie nicht wissen, wie man sonst die Dateien überträgt.

### Warum sollte ich Messenger vermeiden?

* Bilder und Videos werden komprimiert (Qualitätsverlust)
* Speicherplatz ist kann begrenzt sein (Smartphone)
* Sicherheitsbedenken je nach Platform (Verschlüsselung, Vertrauen in Anbieter)

Instant Messenger oder Chats sind die bessere alternative zu E-Mails.
Oft die bessere einfache Methode um Dateien zu versenden.
Da das Thema riesig ist, beschränke ich mich auf die negativen Dinge.

Das erste ist, dass ihr dem Anbieter vertrauen müsst. Vorallem, wenn keine Ende-zu-Ende Verschlüsselung verwendet wird.
Man kann sich natürlich damit behelfen, dass man eine eigene Verschlüsselung zum Beispiel ein Passwort im Archiv hat.

Bilder und Videos werden komprimiert und oft nicht verlustfrei. Wenn man das Original haben möchte, muss diese Datei in ein Archiv gepackt werden.

Große Dateien zu schicken, sollte man vermeiden, da diese im Messenger eigentlich ein Nachrichten Versand sind.
Zum Beispiel verbraucht man zu viel Speicherplatz auf dem Smartphone. Man kann aber auch die Dateien wieder löschen.
