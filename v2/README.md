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

1. Download the repository to your local machine with the following code.
```
git clone https://github.com/AroneSusau/Zendesk-Coding-Challenge
```
2. Navigate to the v2 repository directory in your MacOS Terminal or equivalent command line application.
3. Run the application with the following command.
```
sbt clean run
```
