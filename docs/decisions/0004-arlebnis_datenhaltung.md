# Wie werden die "ARlebnispfade" und ihre Geopunkte im App-Prototypen gespeichert?

* Status: accepted
* Workload: 0.5h
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Issue: [4](https://github.com/mi-classroom/mi-master-wt-beiboot-2023/issues/4)
* Date: 2023-09-17

## Kontext und Problem

Die einzelnen "ARlebnisse" der jeweiligen Pfade müssen für den WebApp-Prototypen konfiguriert und gespeichert werden können. Laut Issue ist dafür kein Backend nötig, doch die Konfiguration sollte möglichst simpel stattfinden können.

## Betrachtete Optionen

* Definition durch JSON-Datei
* Nutzer-Konfiguration direkt im Frontend

## Entscheidung

Gewählte Option: Definition durch eine JSON-Datei in der Codebase der Webapplikation. So ist die Konfiguration am simpelsten, mit sehr wenig Aufwand verbunden, und kann bei Bedarf bei einer realen Umsetzung des Systems einfach ausgetauscht werden.

## Vor- und Nachteile der Optionen

### Definition durch JSON-Datei in der Codebase

* Gut, da es so eine einzige Datei gibt, welche Zentral die ARlebnisse definiert. 
* Gut, da die Implementierung extrem simpel ist. Es gibt keine Notwendigkeit, Funktionen zum Hinzufügen, Bearbeiten oder Löschen zu Implementieren.
* Gut, da keine speziellen Strukturen im Dateisystem (z.B. für die Bilder) angelegt werden müssen, welche in der Zukunft vermutlich wieder entfernt werden müssten.
* Schlecht, da die entstehende JSON-Datei unter Umständen sehr groß werden kann (vor allem durch Base64 Bilder).
* Schlecht, da die definierten ARlebnisse unflexibel sind. Sie können nicht zur Laufzeit angepasst werden, dafür müsste die JSON-Datei bearbeitet, und die Anwendung anschließend neu kompiliert und deployed werden.

### Nutzer-Konfiguration direkt im Frontend

* Gut, da die Arlebnisse durch jeden Nutzer angepasst werden können und Punkte zum debuggen - zum Beispiel an den Geo-Koordinaten, an welchen sich der Nutzer gerade befindet - einfach hinzugefügt werden können.
* Gut, da so in der Ausgangssituation (Leere Liste an ARlebnissen) kein Datenverkehr für ARlebnisse beansprucht werden müsste, welche eventuell nicht gebraucht werden
* Schlecht, da ein erheblich höherer Entwicklungsaufwand nötig ist. (Funktionen zur Verwaltung, Wie werden die Punkte genau gespeichert?, Frontend-Formulare etc.)
* Schlecht, da ARlebnisse bei einer realen Umsetzung voraussichtlich strikt vorgegeben wären, und eine Bearbeitung durch die Nutzer via dem Frontend vermutlich garnicht gewünscht ist.
* Schlecht, da die Nutzer so in der Ausgangssituation keine fertigen Beispieldaten vorfinden
