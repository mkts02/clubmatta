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

    let pix = (this.newHeaderHeight + 65)/10;
    
     for(let headerElement of this.element.nativeElement.children){
       let totalHeight = headerElement.offsetTop + headerElement.clientHeight;

       if(headerElement.tagName == "ION-ITEM"){

        for (let title of headerElement.children)
        {
          while(pix>14){
            title.setAttribute("style", "font-size:"+ pix +"px");
            break;
          } 
        }

        if(headerElement.clientHeight<=80){
          this.renderer.setElementStyle(headerElement, 'background', '#3B0332');
        } 
        else if (totalHeight <= this.newHeaderHeight) {
          //headerElement.isHidden = false;
          headerElement.setAttribute("style", "background:url('"+this.image+"');background-size: 100%; no-repeat");
        }
      }
     }

   });

 }

}