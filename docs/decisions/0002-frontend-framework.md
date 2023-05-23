# Welches Frontend-Framework wird für "ARlebnispfade" genutzt?

* Status: accepted
* Workload: 0.5h
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Issue: [1](https://github.com/mi-classroom/mi-master-wt-beiboot-2023/issues/1)
* Date: 2023-05-23

## Kontext und Problem

Da vermutlich externe Pakete und Funktionalitäten in das Projekt eingebunden werden müssen, ist es sinnvoll, ein Frontend-Framework zu nutzen, um das Frontend umzusetzen. So können Pakete zum Beispiel via npm einfach eingebunden werden. Es muss entschieden werden, welches Framework dafür genutzt wird.

## Betrachtete Optionen

* Angular
* React
* Vue

## Entscheidung

Gewählte Option: Vue, da besonders viel Erfahrung im Vergleich zu den anderen Optionen besteht und für das Projekt ein besonders leichtgewichtiges, schnelles Framework wie Vue sinnvoll ist, da das Framework nicht in seiner ganzen Funktionalität genutzt werden sollte, sondern lediglich eine "Basis" zum Aufbauen der WebApp bieten soll.

## Vor- und Nachteile der Optionen

### Angular

* Gut, da Angular ein komplettes Gesamtpaket für die Erstellung von Web-Anwendungen bietet
* Schlecht, da bisher keine praktische Erfahrung
* Schlecht, da allgemein von einer steileren Lernkurve als bei anderen Frontend-Frameworks die Rede ist
* Schlecht, da es für ein frontend-technisch "simples" Projekt wie dieses "überdimensioniert" sein kann. Es bietet eine große Menge an Tools und Bibliotheken, aber diese sind unter Umständen nicht benötigt.

### React

* Gut, da es sehr beliebt und weit verbreitet ist
* Gut, da die Nutzung der Sprache JSX zur Definition von UI möglich ist, und die Arbeit mit Komponenten erleichtert wird
* Schlecht, da bisher keine praktische Erfahrung, daher Einarbeitungsphase nötig
* Schlecht, da nicht so leichtgewichtig und schnell wie Vue

### Vue

* Gut, da es sehr weit verbreitet ist, es gibt viele Ressourcen im Web
* Gut, da das meiste Vorwissen vorhanden ist.
* Gut, da die Template-basierte Syntax die Integration von HTML und CSS einfach macht und unnötigen Aufwand vermindert.
* Gut, da es kleiner und leichtgewichtiger als React und Angular ist, was zu schnelleren Ladezeiten führen kann.