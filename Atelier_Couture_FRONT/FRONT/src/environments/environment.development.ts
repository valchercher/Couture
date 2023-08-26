import {  HttpHeaders } from "@angular/common/http";

export  const environement= {
    production:false,
    urlart:`http://127.0.0.1:8000/api/`,
   heard: {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
};
