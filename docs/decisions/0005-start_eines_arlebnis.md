# Wie wird ein ARlebnis in der Anwendung gestartet?

* Status: accepted
* Workload: 0.5h
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Issue: [4](https://github.com/mi-classroom/mi-master-wt-beiboot-2023/issues/4)
* Date: 2023-09-19

## Kontext und Problem

In der Applikation muss Logik vorhanden sein, welche bestimmt, wann ein AR-Objekt, welches an einen realen Standort / ein reales Objekt geknüpft ist, dem Nutzer angezeigt wird.

## Betrachtete Optionen

* Start durch Scan von QR-Code
* Start durch GPS-Position des Endgeräts

## Entscheidung

Gewählte Option: Start durch GPS-Position des Endgeräts, es besteht erhöhte Manipulationssicherheit und ist mit weniger Entwicklungsaufwand verbunden.

## Vor- und Nachteile der Optionen

### Start durch Scan von QR-Code

* Gut, da so eine zusätzliche Interaktion mit der realen Welt stattfindet, was die Immersion erhöhen kann
* Schlecht, da das Hinzufügen eines neuen ARlebnis-Ortes so mit mehr Aufwand verbunden ist (Ein QR-Code müsste zuerst gedruckt/hergestellt werden und in der realen Welt angebracht werden)
* Schlecht, da ein QR-Code an einem realen Ort u.U. manipuliert oder entwendet werden kann, oder durch natürliche Umstände verschmutzt werden könnte. 
* Schlecht, da ein QR-Code leicht kopiert und selbst ausgedruckt werden könnte, ab diesem Zeitpunkt besteht keine Notwendigkeit mehr, den realen Ort zu besuchen 
* Schlecht, da mit höherem Entwicklungsaufwand verbunden


### Start durch GPS-Position des Endgeräts
* Gut, da das Konfigurieren von Punkten mit minimalen Aufwand verknüpft ist. Das Eintragen in der Datenhaltung mit Name und GPS-Koordinaten reicht dafür.
* Gut, da bei erhöhtem Nutzerandrang an einem realen Ort keine "Warteschlange" für z.B. das Einscannen eines Codes entstehen kann.
* Schlecht, da ein erhöhter Stromverbrauch des Endgeräts durch kontinuierliche GPS-Abfragen entstehen kann
* Schlecht, da ein GPS-Standort theoretisch gefaked werden könnte
