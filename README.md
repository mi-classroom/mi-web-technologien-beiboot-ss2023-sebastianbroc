Der erste Prototyp ist [hier](https://mi-classroom.github.io/mi-web-technologien-beiboot-ss2023-sebastianbroc/) deployed!
(Die App "XRViewer" ist benötigt, um die AR-Funktionalität zu testen)

-----


# Web Technologien // begleitendes Projekt Sommersemester 2023
Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Erprobung von Augmented Reality im Browser. Das wird toll!


## Aufsetzen des Projekts

### Für die Entwicklung

In Ordner "arlebnispfade" wechseln, anschließend `npm i` und `npm run serve` ausführen.

Falls erweiterte Debugging-Möglichkeiten nötig sind, zusätzlich in separatem Terminal in Ordner "debug_server" wechseln und dort `node index.js` ausführen, um Log-Nachrichten des Frontends auf der Konsole ausgeben zu lassen.


### Für die Produktionsumgebung
| Befehl | Beschreibung                                 |
| --- |----------------------------------------------|
| `make up` | Startet einen Docker Container auf Port 8888 |
| `make down` | Stoppt den Docker Container                  |
| `make restart` | Started den Docker Container neu              |
| `make logs` | Zeigt die Logs der Docker Container an       |
