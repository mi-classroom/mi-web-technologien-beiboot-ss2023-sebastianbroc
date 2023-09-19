# Dokumentation der Arbeitsphase zu Issue 4

* Investierte Arbeitsstunden: ca. 20-25
* Status: Abgeschlossen

## Testprozess der fertigen Web-Applikation

### Grundsätzliche Menüführung
Der grundsätzliche Aufbau der Web-Applikation wurde während der Entwicklung kontinuierlich auf dem Entwicklungs-Computer im Browser getestet. Dabei ist anzumerken, dass alle CSS-Styles zum aktuellen Zeitpunkt rein für die mobile Nutzung entwickelt wurden, und daher der Viewport stets auf die Auflösung eines Smartphones eingestellt war. Zum Abschluss von neuen Vue-Views wurden diese allerdings auch stets auf einem realen iPhone getestet, um zu verifizieren, dass alle Funktionen tatsächlich funktionieren wie gedacht. Um Geofunktionalitäten testen zu können wurde dabei das Tool [ngrok](https://ngrok.com/) genutzt, damit die Applikation vom Entwicklungsrechner aus via HTTPS geserved werden konnte. Diese Tests konnten vollständig als erfolgreich gewertet werden, alle entwickelten Features funktionieren ordnungsgemäß auf einem realen Smartphone, auch Funktionen welche Geokoordinaten einbinden sind problemlos und in vollem Umfang nutzbar. 

### AR
<img width="200" align="right" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/f8db1f7a-6c59-4fb7-bdcb-aa73f8382e8c">
Da (wie in ADR 0005 dokumentiert) die Entscheidung fiel, dass ARlebnisse lediglich über die Geokoordinaten des Endgeräts gestartet werden können, musste dies durch einen realen Spaziergang zu ARlebnis-Punkten getestet werden. Dafür wurden mit ständig geöffneter Web-Applikation mehrere der ARlebnisse in Wiehl besucht und getestet, ob korrekt erkannt wird, dass sich das Endgerät im Umkreis eines ARlebnisses befindet. Dies hat grundsätzlich sehr gut funktioniert, und entsprechende Infos sowie das 3D-Objekt der Sonnenblume wurden korrekt angezeigt und bei zu hoher Distanz zu einem Punkt wieder entfernt.
<br clear="right"/>
<img width="200" align="right" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/f1a74ea6-b520-46d2-84b8-a63c361fb0d5">
Doch die konfigurierten 5 Meter Radius eines Objekts, in welchem es als aktiv gilt, gestalteten sich in realen Tests als geschätzt rund 10 Meter. Dies führte in der Regel zu keinen Problemen, und Orte wie die Kneipe "Sümpfchen" oder der Wiehler Rathausplatz wurden korrekt angezeigt, doch die Punkte des Skateparks "Wheelpark" und des Seecafés im Wiehlpark lagen nah genug aneinander, dass es zu einem Fehlerfall kommen konnte. So befand sich das Endgerät genau an dem Skatepark, doch es wurde trotzdem noch das Seecafé als aktuelles ARlebnis angezeigt, obwohl dieses deutlich über 10 Meter vom Skatepark entfernt ist. Hier sollte eine Reduzierung des Radius in der entsprechenden Funktion das Problem jedoch beheben können.
<br clear="right"/>
<img width="200" align="right" src="https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2023-sebastianbroc/assets/63352229/e6311def-3d30-4718-8c22-8fb99357a476">
<br clear="right"/>

### Fazit
Die Prototypische Anwendung kann als Erfolg gewertet werden, trotz Problemen mit der Berechnung des Umkreises eines ARlebnisses haben alle Funktionen ihren Zweck erfolgreich erfüllt, und die Anwendung der Applikation in einer realen Situation an echten Orten im Oberbergischen hat grundsätzlich sehr gut funktioniert.
Ein Abstrich der Applikation besteht dennoch im Stromverbrauch, die Web-App hat in diesem Testfall in ca. 10 Minuten 5% Akkuladung des Test-iPhones verbraucht, und dabei befand sich das Gerät rund die Hälfte der Zeit im Standby. Dies entsteht vermutlich durch das Rendering der 3D-Umgebung sowie den kontinuierlich stattfindenden GPS-Abfragen. Hier besteht Potenzial, die Logik durch seltenere GPS-Abfragen energieeffizienter zu gestalten.
