## Download File with Angular 9 HttpClient

A file is best represented as a  [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)  in the browser:

> The Blob object represents a blob, which is a file-like object of immutable, raw data  
> -- MDN web docs

By specifying the  `responseType`  option we can perform a GET request returning a blob representing the downloaded file. Let's assume we've got a designated  `DownloadService`  doing just that:  

```
@Injectable({providedIn: 'root'})
export class DownloadService {

  constructor(private http: HttpClient) {}

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
}

```

A component would then be able to call this service, subscribe to the corresponding observable and eventually save the file like this:  

```
@Component({...})
export class MyComponent  {

  constructor(private downloads: DownloadService) {}

  download(): void {
    this.downloads
      .download('/downloads/archive.zip')
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'archive.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }
}

```

Here, we're creating an anchor tag programmatically when the blob arrives. With  [URL.createObjectURL](https://developer.mozilla.org/de/docs/Web/API/URL/createObjectURL)  we can generate a download link to the blob. Finally, we  `click()`  the link like the user would've done with a regular browser download link. After the file is downloaded, we'll discard the blob by revoking the object URL we created.

This approach is pretty verbose though and might not work smoothly for every browser. Therefore I'd advise you to use the popular library  [FileSaver.js](https://github.com/eligrey/FileSaver.js/)  when saving blobs. The saving then becomes a one-liner:  

```
import { saveAs } from 'file-saver';

download() {
    this.downloads
      .download('/downloads/archive.zip')
      .subscribe(blob => saveAs(blob, 'archive.zip'))
}

```

_If you don't like adding a dependency for this and would prefer to use the manual approach shown before, you might as well refactor the code for saving the blob into a separate service. There you probably want to inject  `document`  with Angular's built-in injection token  [DOCUMENT](https://angular.io/api/common/DOCUMENT). You can also  [create a custom injection token](https://angular.io/guide/dependency-injection-in-action#supply-a-custom-provider-with-inject)  for  `URL`  - also see below how we'll do this for FileSaver.js._