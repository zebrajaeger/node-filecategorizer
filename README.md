# File Categorizer

- Exif and Mime works on Linux only!
- Requires [exiftool](https://wiki.ubuntuusers.de/ExifTool/) in path

## Get all available Fileinfos

```javascript
const {Category} = require("@zebrajaeger/filecategorizer");

const category = new Category();
category.categorizeFile('myFile.txt').then(data => console.log(data));
```

Returns i.E.

```json
{
  "mime": {
    "full": "text/plain; charset=us-ascii",
    "mime": "text/plain",
    "major": "text",
    "minor": "plain",
    "encoding": "us-ascii"
  },
  "hash": "3931cdd9a4af75d90794fcb3acca4849e6d88b13a7e369f774197d47d2323566",
  "stats": {
    "size": 152,
    "atime": { "ms": 1598685947366.8125, "formatted": "2020-08-29T07:25:47.367Z" },
    "mtime": { "ms": 1598685946646.8086, "formatted": "2020-08-29T07:25:46.647Z" },
    "ctime": { "ms": 1598685946646.8086, "formatted": "2020-08-29T07:25:46.647Z" },
    "btime": { "ms": 1598684034030.2656, "formatted": "2020-08-29T06:53:54.030Z" }
  },
  "exif": {
    "SourceFile": "myFile.txt",
    "ExifToolVersion": 11.88,
    "FileName": "myFile.txt",
    "Directory": ".",
    "FileSize": "152 bytes",
    "FileModifyDate": "2020:08:29 09:25:46+02:00",
    "FileAccessDate": "2020:08:29 09:25:47+02:00",
    "FileInodeChangeDate": "2020:08:29 09:25:46+02:00",
    "FilePermissions": "rw-rw-r--",
    "FileType": "TXT",
    "FileTypeExtension": "txt",
    "MIMEType": "text/plain",
    "MIMEEncoding": "us-ascii",
    "Newlines": "Unix LF",
    "LineCount": 4,
    "WordCount": 12
  }
}

```

## Hash file

```javascript
const {FileHash} = require("@zebrajaeger/filecategorizer");

const fileHash = new FileHash();
console.log(fileHash.hashFile('myFile.txt'));
```

Returns i.E.

```bash
f20127b81a2adc05f358990f5dff6e5323294f92432bbb2f36fc1f17b835a404
```


## Get File mime-Type

```javascript
const {Mime} = require("@zebrajaeger/filecategorizer");

const mime = new Mime();
mime.getMimeType('myFile.txt').then(mime=>console.log(mime))
```

Returns i.E.

```json
{
  "full": "text/plain; charset=us-ascii",
  "mime": "text/plain",
  "major": "text",
  "minor": "plain",
  "encoding": "us-ascii"
}
```

## Get File stats

```javascript
const {Stats} = require("@zebrajaeger/filecategorizer");

const stats = new Stats();
console.log(stats.fileStats('myFile.txt'))
```

Returns i.E.

```json
{
  "size": 186,
  "atime": { "ms": 1598684817320.1528, "formatted": "2020-08-29T07:06:57.320Z" },
  "mtime": { "ms": 1598684814724.1357, "formatted": "2020-08-29T07:06:54.724Z" },
  "ctime": { "ms": 1598684814724.1357, "formatted": "2020-08-29T07:06:54.724Z" },
  "btime": { "ms": 1598684034030.2656, "formatted": "2020-08-29T06:53:54.030Z" }
}
```

## Get Exif data

```javascript
const {Exif} = require("@zebrajaeger/filecategorizer");

const exif = new Exif();
exif.readExifData('myFile.txt').then(exif => console.log(exif));
```

Returns i.E.

```json
{
  "SourceFile": "myFile.txt",
  "ExifToolVersion": 11.88,
  "FileName": "myFile.txt",
  "Directory": ".",
  "FileSize": "203 bytes",
  "FileModifyDate": "2020:08:29 09:11:18+02:00",
  "FileAccessDate": "2020:08:29 09:11:21+02:00",
  "FileInodeChangeDate": "2020:08:29 09:11:18+02:00",
  "FilePermissions": "rw-rw-r--",
  "FileType": "TXT",
  "FileTypeExtension": "txt",
  "MIMEType": "text/plain",
  "MIMEEncoding": "us-ascii",
  "Newlines": "Unix LF",
  "LineCount": 6,
  "WordCount": 12
}
```
