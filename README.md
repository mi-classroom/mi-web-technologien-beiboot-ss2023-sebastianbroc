[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Z0RQPfMP)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10744885&assignment_repo_type=AssignmentRepo)
## Nutzen der Anwendung
Die Anwendung ist via GitHub Pages [Hier](https://mi-classroom.github.io/mi-web-technologien-beiboot-ss2023-sebastianbroc/) erreichbar.
Die App "XRViewer" ist benötigt, um die AR-Funktionalität zu testen.

### Start

<img width="180" alt="1" align="right" style="padding-bottom: 100;" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/00eca2eb-727b-48d1-9004-b6e3dfb61f62">
Auf dem Startbildschirm wird zunächst ein kleines Willkommensvideo abgespielt. 
Um die Anwendung zu starten und in das Menü zu kommen, kann entweder hochgewischt/heruntergescrollt werden, oder der Pfeil am unteren Bildschirmrand angetippt werden.
<br clear="right"/>

### Stöbern

<img width="180" alt="4" align="right" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/be7d76f4-ba93-4335-88f8-cb1d755e6f51">
<img width="180" alt="3" align="right" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/910caa74-cdb2-49e5-b5aa-bc0b31174413">
Sollte man sich dazu entschieden haben, lediglich zu stöbern, werden in einer Übersicht alle existierenden ARlebnis-Pfade aufgelistet. Bei näherem Interesse über die jeweiligen ARlebnisse eines Pfades können diese durch ein Tippen auf den Pfad eingeblendet werden. Dabei wird die Distanz des Endgeräts zu den Punkten berechnet und in Kilometern angegeben.
<br clear="right"/>

### Nutzen
<img width="180" alt="6" align="right" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/77338625-5d50-4280-814e-6fcaec5b5815">
<img width="180" alt="5" align="right" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/8f0e30f2-1a19-4bd4-ae87-dca1af723065">
Hier kann die AR-Anwendung gestartet, oder ARlebnisse in der Umgebung angezeigt werden. Dabei werden die ARlebnisse aller bestehenden Pfade nach ihrer Distanz zum Endgerät in Kilometern sortiert, und zusammen mit dem zugehörigen Pfad aufgelistet.
<br clear="right"/>

### Die AR-Anwendung
<img width="180" align="right" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/946316a5-aba1-4a53-988b-028b8c72d9ee">

1. **_Geomarker_**, welcher nur angezeigt wird, wenn sich das Endgerät Max. 5 Meter Entfernung zu einem ARlebnis befindet
2. **_Zielpunkt_**, an welchem bei Tippen ein virtueller 3D-Pin im Raum platziert wird
3. **_Infotext_** über das aktuell in der Nähe befindliche ARlebnis, falls vorhanden
4. **_Web-Konsole_**, implementiert durch Eruda.JS, zum debuggen im Fehlerfall
5. **_Debug-Infos_** können über einen Tipp auf die "AR" Überschrift angezeigt und wieder ausgeblendet werden
<br clear="right">

### 3D-Objekte
<img height="200" align="right" alt="flower" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/b73d699c-7440-4c60-9481-ab2bbec1e625">
<img height="200" align="right" alt="pin" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/2c561101-46bd-4229-97dc-b9f7cc3cb81e">
<img width="200" align="right" alt="reticle" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/1c9f3d59-cd8f-4a2e-8fd1-f0ec57864892">

1. **_Zielpunkt_** zeigt an, an welcher Stelle ein Pin beim Tippen platziert werden würde
2. **_Pin_** wird im Raum an der Stelle des Zielpunktes platziert, sobald der Nutzer an irgendeiner Stelle tippt. Zwischen den beiden zuletzt gesetzten Pins wird dabei eine dünne, blaue Linie angezeigt
3. **_Blume_** repräsentiert den Geopunkt eines ARlebnisses und wird gemeinsam mit den Namen und Infotext eines ARlebnisses angezeigt
<br clear="right"/>
<br clear="right"/>


## Aufsetzen des Projekts

### Für die lokale Entwicklung

In Ordner "arlebnispfade" wechseln, anschließend `npm i` und `npm run serve` ausführen.

Falls erweiterte Debugging-Möglichkeiten nötig sind, zusätzlich in separatem Terminal in Ordner "debug_server" wechseln und dort `node index.js` ausführen, um Log-Nachrichten des Frontends auf der Konsole des Entwicklungs-Rechners ausgeben zu lassen.


### Für die Produktionsumgebung mit Docker-Container
| Befehl | Beschreibung                                 |
| --- |----------------------------------------------|
| `make up` | Startet einen Docker Container auf Port 8888 |
| `make down` | Stoppt den Docker Container                  |
| `make restart` | Started den Docker Container neu              |
| `make logs` | Zeigt die Logs der Docker Container an       |
