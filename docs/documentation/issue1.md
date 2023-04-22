# Dokumentation der Arbeitsphase zu Issue 1

* Investierte Arbeitsstunden: ca. 11
* Status: Teilweise Abgeschlossen

## Umgesetzte Funktionen:
- Objekte (3D-Pin) können im Raum an beliebigen Orten platziert werden und bleiben dort während einer Session bestehen
- WebXR-Geospatial library wurde eingebunden, um zukünftig Bindung von Objekten an GPS-Koordinaten zu ermöglichen

## Tests:
- Die Visualisierung wurde grundsätzlich bei Sichtkontakt mit dem Standort des gesetzten Markers aktiviert (in meinen Tests max. 6-7 Meter)
- So lange es der selbe Raum ist, wurde der Marker immer angezeigt, auch nach einem Raum/Etagenwechsel und anschließender Rückkehr.
- Der Winkel macht keine Probleme und wurde in der Regel korrekt berechnet. Doch manchmal (je nach Licht) wurden Oberflächen nicht korrekt dreidimensional gemappt. (zB war für die App eine Tischoberfläche auf der gleichen Höhe wie der Boden)
- Das GPS wird theoretisch über die [Web Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) eingebunden, doch diese Funktionalität konnte noch nicht umgesetzt werden

---

Die Entwicklungsphase des ersten Issues war von mehr Problemen geplagt, als ursprünglich angenommen. Diese Probleme umfingen u.A. die falsche Berechnung des Viewports für den Three.js Renderer, welcher die 3D-Objekte darstellt, die komplizierte Einbindung von Erweiterungen, da [webxr-geospatial](https://github.com/MozillaReality/webxr-geospatial) als .js-Datei besteht, [cesium.js](https://www.npmjs.com/package/cesium) aber als NPM-Package vorhanden ist. Die WebXR-Geospatial Erweiterung ist desweiteren nicht besonders detailliert dokumentiert, und vor allem simple Beispiele fehlen.

Für das Testen der App ist auf dem iPhone die XRViewer-App von Mozilla benötigt, und während dies zu Beginn problemlos funktionierte, ergaben sich bei der Einbindung des Standorts Probleme. Die Web Geolocation API erlaubt den Zugriff auf den Standort des Clients nur, wenn via https auf die App zugegriffen wird, und die XRViewer-App erlaubt wiederum keinen Zugriff auf Webseiten mit unsicherem Zertifikat (wie es der Fall ist, wenn die App via Vue im lokalen Netzwerk mit SSL gehostet wird) und kann die App dann nicht aufrufen.

Debugging im generellen ist die größte Komplikation und mit Zeitaufwand verbunden, welcher mit einer "normalen" WebApp so nicht vorhanden wäre. Die App kann zwar grundsätzlich im Browser am Laptop aufgerufen werden, wo eine Entwicklerkonsole vorhanden ist, doch die XR-Funktionalitäten (spezifisch "hit-test") können am Laptop nicht umgesetzt werden. Die XRViewer-App am iPhone verfügt wiederum über keine Entwicklerkonsole, sodass die Ausgabe von Variablen und Objekten zum debuggen nicht möglich ist. Als workaround wurde aus diesem Grund ein kleiner REST-Service mit node.js und express erstellt (im Ordner "debug_server"). Anstatt console.log aufzurufen, wird die auszugebende Nachricht an diese Schnittstelle im lokalen Netzwerk gesendet und am Laptop auf der Konsole ausgegeben. Diese Lösung ist nicht ideal und hat für weiteren Zeitaufwand gesorgt.