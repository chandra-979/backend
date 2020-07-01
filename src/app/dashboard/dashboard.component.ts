import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { UserData } from './../UserData';
import { Component, ElementRef, ViewChild } from '@angular/core'
import { AuthenticationService, UserDetails } from '../service.service'
import { Router } from '@angular/router'
import { HttpEventType } from '@angular/common/http'
import { map } from 'rxjs/internal/operators/map'
import { catchError } from 'rxjs/internal/operators/catchError'
import { of } from 'rxjs/internal/observable/of'
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  templateUrl: './dashboard.component.html'
})

export class ProfileComponent {
  details: UserDetails;
  viewer = 'google';
  selectedType = '*';
  recentImages=[]
  service: string;  
  docPath: string;
  reFlag=false;


  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild('myImage') image: ElementRef;
  files  = []; 
  getFiles=true; 
  imglen: any=0;
  images: any=[];
  imageFlag: boolean=false;
  audioFlag: boolean=false;
  videoFlag: boolean=false;
  docFlag: boolean=false;
  allFlag: boolean=true;
  videolen: any=0;
  videoes: any=[];
  audiolen: any=0;
  audioes: any=[];
  doclen: any=0;
  docs: any=[];
  remains:any=[];
  remainLen=0
  
  constructor(private auth: AuthenticationService,private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {

    const timer = JSON.parse(localStorage.getItem('timer'));
    if (timer && (Date.now() > timer)) {
      this.logout();
      
    }
  
    this.auth.profile().subscribe(
      user => {
        this.details = user
        var obj=JSON.stringify(user)
        var obj1=JSON.parse(obj)

        window.document.getElementById('mainbar').hidden=true;
        console.log(obj1)
        
        if(obj1.data.length!==0){
        for(let i=0;i<obj1.data.length;i++){ 
          
          let filename=obj1.data[i].filename
          this.auth.getImage(filename)
          .subscribe((baseFile : any) => { 
          if(this.allFlag){
          if(new RegExp('.mp4$').test(obj1.data[i].filename))
          {
            console.log(3)
            this.videolen++;
            let obj=
            {
              'filename':obj1.data[i].filename,
              'filedata':this.sanitizer.bypassSecurityTrustUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'id':obj1.data[i]._id
            }
           this.videoes.push(obj)
          }
          
          if(new RegExp('.jpg$|.JPG$|.PNG$|.png$|.jpeg$|.JPEG$').test(obj1.data[i].filename))
          {
          console.log(1)

            this.imglen++;
            
            let obj=
            {
              'filename':obj1.data[i].filename,
              'filedata':this.sanitizer.bypassSecurityTrustUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'id':obj1.data[i]._id
            }
            this.images.push(obj);
          }
          else if(new RegExp('.txt$|.doc$|.pdf$|.docx$').test(obj1.data[i].filename))
          {
            this.doclen++;
            let obj=
            {
              'filedata':this.sanitizer.bypassSecurityTrustResourceUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'filename':obj1.data[i].filename,
              'id':obj1.data[i]._id
            }
            this.docs.push(obj)
                        
          }
      
          else if(new RegExp('.mp3$').test(obj1.data[i].filename))
          {
            console.log(4)
            this.audiolen++;
            let obj=
            {
              'filename':obj1.data[i].filename,
              'filedata':this.sanitizer.bypassSecurityTrustUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'id':obj1.data[i]._id
            }
            this.audioes.push(obj)
          } 
          else
          {
            this.remainLen++;
            let obj=
            {
              'filename':obj1.data[i].filename,
              'filedata':this.sanitizer.bypassSecurityTrustUrl(baseFile),
              'OriginalName':obj1.data[i].metadata.OriginalName,
              'id':obj1.data[i]._id
            }
            this.remains.push(obj)

          }
        }
      
    })
  }
    }     
      },
      err => {
        console.error(err)
      }
    )
    
  }
  imagesDisplay()
  {
    
    this.imglen=this.images.length;
    this.imageFlag=true
    this.audioFlag=false
    this.videoFlag=false
    this.docFlag=false
    this.allFlag=false
    
  }
  videosDisplay()
  {
    this.videolen=this.videoes.length
    this.imageFlag=false
    this.audioFlag=false
    this.videoFlag=true
    this.docFlag=false
    this.allFlag=false
    
  }
  audioDisplay()
  {
    this.audiolen=this.audioes.length
    this.imageFlag=false
    this.audioFlag=true
    this.videoFlag=false
    this.docFlag=false
    this.allFlag=false
    
  }
  docsDisplay()
  {
    this.doclen=this.docs.length
    this.imageFlag=false
    this.audioFlag=false
    this.videoFlag=false
    this.docFlag=true
    this.allFlag=false
  
  }
  allDisplay()
  {
    
    this.imageFlag=false
    this.audioFlag=false
    this.videoFlag=false
    this.docFlag=false
    this.allFlag=true
  }
  
  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    
    this.auth.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            console.log(file.progress)
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError(() => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
         
        }  
      });  
  }
  private uploadFiles() {  
    
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);
       
    });  
    
}
onClick() {  
  const fileUpload = this.fileUpload.nativeElement;
  fileUpload.onchange = () => {  
  for (let index = 0; index < fileUpload.files.length; index++)  
  {  
   const file = fileUpload.files[index];  
   this.files.push({ data: file, inProgress: false, progress: 0});  
  }  
    this.uploadFiles();  
  };  
  fileUpload.click();  
  this.reFlag=true;
  
  
}


deleteFile(id,name)
{
  console.log(id,name)
  this.auth.deleteFile(id,name).subscribe(result=>{
    window.location.reload()
    this.router.navigateByUrl("/reload");
    console.log(result)
  })
}

downloadPDF(name,contentType)
{
  this.auth.downloadPDF(name).subscribe(result=>{
      saveAs(result,'/'+name)
  })
}
reload()
{
  this.reFlag=false;
  window.location.reload();
}

logout() {
    this.auth.logout();
    window.document.getElementById('mainbar').hidden=false
    this.router.navigateByUrl('/login')
  }
}
