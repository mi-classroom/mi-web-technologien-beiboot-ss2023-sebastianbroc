# Welches AR-Framework wird für "ARlebnispfade" genutzt?

* Status: accepted
* Workload: 1h
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Issue: [1](https://github.com/mi-classroom/mi-master-wt-beiboot-2023/issues/1)
* Date: 2023-04-19

## Kontext und Problem

Damit 3D-Objekte in einem Augmented-Reality Raum dargestellt werden können, braucht das Projekt ein grundlegendes Web-Framework, welches dies ermöglicht.

## Betrachtete Optionen

* [WebXR](https://immersiveweb.dev)
* [AR.js](https://ar-js-org.github.io/AR.js-Docs/)
* [8th Wall](https://www.8thwall.com)

## Entscheidung

Gewählte Option: "WebXR", da es gratis, weitläufig kompatibel und durch die W3C (neben anderen) standardisiert ist. "Big Players" wie Google, Meta oder Mozilla arbeiten an der Spezifikation, was eine solide Basis für Zukunftssicherheit bietet.

## Vor- und Nachteile der Optionen

### WebXR

* Gut, da die Nutzung gratis ist
* Gut, da viele Leute dieses Framework für ihre Projekte nutzen. Daraus folgt, dass es eine große Menge an Ressourcen zu WebXR im Web gibt.
* Gut - da es durch die W3C und einige der größten IT-Firmen als Standard entwickelt wird, ist die Zukunftssicherheit hiermit besser gegeben als bei den anderen Optionen.

### AR.js

* Gut, da die Nutzung gratis ist
* Schlecht, da es lediglich durch eine Handvoll von Entwicklern gepflegt wird und keine großen Firmen oder Organisationen hinter dem Projekt stehen. Dies ist schlecht für die Zukunftssicherheit.

### 8th Wall

* Schlecht, da mit der Nutzung eine Vielzahl von anfallenden Kosten einher gehen.
* Schlecht, da für die Entwicklung der 8th Wall-eigene WebEditor genutzt werden muss, und in einer neuen Entwicklungsumgebung "Fuß zu fassen" kann vermeidbaren Aufwand verursachen.
* Schlecht, da Projekte exklusiv auf der 8th Wall-eigenen Webseite veröffentlicht werden müssen (wenn man lediglich für die kleinste Preisstufe bezahlt).