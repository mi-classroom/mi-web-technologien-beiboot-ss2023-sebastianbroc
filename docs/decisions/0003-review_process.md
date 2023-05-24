# Wie wird der Review-Buddy eingebunden?

* Status: open
* Workload: 0.5h
* Decider: [Sebastian Brock](https://github.com/sebastianbroc)
* Issue: [2](https://github.com/mi-classroom/mi-master-wt-beiboot-2023/issues/2)
* Date: 2023-05-23

## Kontext und Problem

Um den Review-Buddy des Projekts [Finn Gedrath](https://github.com/finnge) in neue Entwicklungen einzubinden und Feedback zu Änderungen dabei sinnvoll und auch zukünftig nachvollziehbar zu dokumentieren, muss ein Prozess entwickelt werden, welcher dies idealerweise direkt im GitHub-Repository ermöglicht.

## Entscheidung

* Änderungen werden zukünftig nicht mehr direkt in den Main-Branch gepusht, sondern in eigene Branches
* Für die neuen Branches werden bei Abschluss eines neuen Feature-Paketes Pull-Requests auf den main-Branch erstellt
* Die größe von Feature-Paketen sollte sinnvoll gewählt sein, damit diese nicht zu groß- oder kleinschrittig sind. Die [Anatomie eines perfekten Pull-Requests](https://hugooodias.medium.com/the-anatomy-of-a-perfect-pull-request-567382bb6067) kann hierfür als Orientierung dienen
* Die Pull-Requests müssen vom Review-Buddy angenommen werden, damit diese gemerged werden können.
* Kritik an Änderungen eines Pull-Request wird direkt innerhalb des Pull-Request vermerkt, damit alle Entscheidungen stets nachvollziehbar dokumentiert sind.
* Bei Nicht-Annahme eines PR muss der PR entsprechend der Kritik angepasst werden, und ein neues Review angefordert werden