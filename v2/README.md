# Zendesk-Coding-Challenge - Version 2: Scala Version

A Java Swing/AWS based GUI application that is written in Scala using SBT. The app makes HTTP requests to the Zendesk API to retrieve account tickets displayed in either a summary table or full details format.

## Prerequisite Installations

- Scala v2.12.0
- OpenJDK Version 8
- SBT v1.3.0 or greater
#### Optional
- [jEnv](https://www.jenv.be/) v0.5.2 or greater

Please Install SBT, Scala and Java via MacOS Brew.

Scala Installation
```
brew install scala
```

SBT Installation
```
brew install sbt
```

Java Installation
```
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
```

Java Version 8 is required to run this application or else it will not compile. It is preferable for you to install and use [jEnv](https://www.jenv.be/) to automatically set your java environment versions.
## How to run (MacOS)