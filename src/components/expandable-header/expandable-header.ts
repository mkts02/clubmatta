import { Component, Input, ElementRef, Renderer } from '@angular/core';

@Component({
 selector: 'expandable-header',
 templateUrl: 'expandable-header.html'
})
export class ExpandableHeader {

 @Input('scrollArea') scrollArea: any;
 @Input('image') image: any;
 @Input('maxHeaderHeight') maxHeaderHeight: number;
 @Input('minHeaderHeight') minHeaderHeight: number;

 newHeaderHeight: any;

 constructor(public element: ElementRef, public renderer: Renderer) {

 }

 ngOnInit(){
   
   this.renderer.setElementStyle(this.element.nativeElement, 'height', this.maxHeaderHeight + 'px');

   this.scrollArea.ionScroll.subscribe((ev) => {
     this.resizeHeader(ev);
   });

 }

 resizeHeader(ev){

   ev.domWrite(() => {
    


     this.newHeaderHeight = this.maxHeaderHeight - ev.scrollTop;
     if(this.newHeaderHeight < 0){
       this.newHeaderHeight = 0;
     }  

     this.renderer.setElementStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');

     if(this.newHeaderHeight<=60){
      this.renderer.setElementStyle(this.element.nativeElement, 'height', this.minHeaderHeight + 'px');
    }

     for(let headerElement of this.element.nativeElement.children){
       let totalHeight = headerElement.offsetTop + headerElement.clientHeight;

       let imageCover = document.getElementById("imageCover");
       let imageHeader = document.getElementById("imageHeader");

       if(imageCover){

        if(headerElement.clientHeight<=80){
          imageHeader.setAttribute("style", "background:#662674;");
          this.renderer.setElementClass(headerElement, "animacion", true);
        }else if (totalHeight <= this.newHeaderHeight) {
          this.renderer.setElementClass(headerElement, "animacion", false);
          imageCover.setAttribute("style", "background:none");
          imageHeader.setAttribute("style", "background-image:url('"+this.image+"')");

        }
      }
     }

   });

 }

}