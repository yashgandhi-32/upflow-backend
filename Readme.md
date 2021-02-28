
# upflow-coding-challenge

  

### Problem Statement

Construct a micro-service that when given an link to a pdf document:

(1) stores the document in local storage and

(2) generates a thumbnail for the document.

  

### Technologies used :

- Typescript (or Javascript)

- Node

## Setup
```shell

# clone the repo
    
git clone https://github.com/yashgandhi-32/upflow-backend

   
# Change directory

cd  <project_name>


# Install dependencies

npm install


# Run the project

npm run start [URL](localhost:9100/)


# Build the project

npm run build

```

```
To genrate thumbnail of pdf (dependencies required)

This module works with gm, so you have to install imagemagick and ghostscript on your pc.

On Mac:
$ brew install imagemagick
$ brew install ghostscript

On Linux:
$ sudo apt-get install imagemagick
$ sudo apt-get install ghostscript
```
  ### Endpoints
  
  `POST /v1/file/upload-file`

This API will download file and save it in public directory.

### Parameters:

| paramter                | description                                                                                                           | isrequired |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------- |
| `fileUrl`               | share pdf file url                                                                        | true             

**Example:-**

```javascript
{
"fileUrl":"http://www.africau.edu/images/default/sample.pdf"
}
```


  `GET /v1/file/get-files`

Return the list of pdf files and  corresponding thumbnail

