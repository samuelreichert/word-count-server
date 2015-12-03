[![Build Status](https://travis-ci.org/samuelreichert/feevale-servidor-sistemas-distribuidos.svg)](https://travis-ci.org/samuelreichert/feevale-servidor-sistemas-distribuidos)

# Word counter server

Counts occurrence of words using distributed REST services.

Created for Feevale University Distributed Systems Course on year 2015.

* Course: _Programação de Sistemas Distribuídos_
* Semester: _6º Semestre_
* Program: _Sistemas para Internet_
* University: _Universidade Feevale_

## How to run

```console
node index.js -c \
  http://localhost:5050 \
  http://localhost:5051 \
  http://localhost:5052 \
  -s lorem \
  -f lorem-ipsum.txt
```

### Options

* `-c` or `--client` to set one or more clients
* `-s` or `--search` to set the word that will be searched
* `-f` or `--file` to set the file that will be used (path to file)


## Testing

```console
npm test
```
