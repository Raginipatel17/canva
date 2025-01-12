const text=document.querySelector('#addtext');
const card=document.querySelector('.swiper-slide');
const swip=document.querySelector('.swiper');
const nextbutton=document.querySelector(".swiper-button-next");
const prevbutton=document.querySelector(".swiper-button-prev");
text.addEventListener('click', () => {
  // Get the active slide
  const activeSlide = document.querySelector('.swiper-slide-active');
  if (activeSlide) {
    addTextToSlide(activeSlide);
  }
});
function addTextToSlide(div){
    const textfield=document.createElement('div');
    textfield.className="text";
    textfield.contentEditable=true;
    textfield.innerText="add text";
    div.appendChild(textfield);
    const resizediv=document.createElement('div');
    resizediv.id="resize";
    textfield.appendChild(resizediv);
    const del=document.createElement('div');
    del.innerText='x';
    del.id='delete';
    textfield.appendChild(del);
   
    let ismoving = false;
    let offsetX, offsetY;
    textfield.addEventListener('mousedown', (event) => {
      if(event.target.id==='resize' || event.target.className==='delete') return;
      ismoving = true;

      offsetX = event.clientX - textfield.offsetLeft;
      offsetY = event.clientY - textfield.offsetTop;

      textfield.style.cursor = 'grabbing';
    });
    const parent = textfield.parentElement;
    document.addEventListener('mousemove', (event) => {
      if (ismoving) {
        
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        x = Math.max(0, Math.min(x, parent.offsetWidth - textfield.offsetWidth));
        y = Math.max(0, Math.min(y, parent.offsetHeight - textfield.offsetHeight));
        textfield.style.left = `${x}px`;
        textfield.style.top = `${y}px`;
        
      }
      document.addEventListener('mouseup', () => {
          ismoving = false;
          textfield.style.cursor = 'grab';
      });
      textfield.addEventListener('click', () => {
        selectedInput = textfield; 
      });
    });
    // if(!ismoving){
    //     swiper.allowSlideNext = true;
    //   swiper.allowSlidePrev = true;

    // }
    
    const fontselector=document.querySelector('#fonts');
    fontselector.addEventListener('change', () => {
      if (selectedInput) {
        selectedInput.style.fontFamily=fontselector.value; 
      }
    });
    const sizeselector=document.querySelector('#fontsize');
    sizeselector.addEventListener('change', () => {
      if (selectedInput) {
        selectedInput.style.fontSize=sizeselector.value;
      }
    });
    const colorselector=document.querySelector('#colorpicker');
    colorselector.addEventListener('input',() => {
      if(selectedInput){
        selectedInput.style.color=colorselector.value;
      }
    })
    textfield.addEventListener('click', (e) => {
      e.stopPropagation();
      del.style.display='block';
      resizediv.style.display='block';
    });
    window.addEventListener('click', () => {
      del.style.display='none';
      resizediv.style.display='none';
      textfield.style.border='none';
    });
    deletetext(textfield,del)
    function deletetext(element,handle){

      handle.style.cursor='pointer';
  
      handle.addEventListener('click',()=>{
        element.remove();
        
      })
    }
    
    div.addEventListener('click',()=>{
      console.log("hi");
      div.style.position=fixed;
    })
    resizetext(textfield, resizediv);
    function resizetext(element,handle){
      let resizing=false;
      handle.addEventListener('mousedown',(e)=>{
        let initialWidth = element.offsetWidth;
        let initialHeight = element.offsetHeight;
        let initialX = e.clientX;
        let initialY = e.clientY;

    const resize = (e) => {
      resizing=true;
      const newWidth = initialWidth + (e.clientX - initialX);
      const newHeight = initialHeight + (e.clientY - initialY);
      
      element.style.width = `${newWidth}px`;
      element.style.fontSize=`${newWidth/100}vw`;
      element.style.height = `${newHeight}px`;
      element.style.fontSize=`${newHeight/10}vh`;
    };
    
    const stopResize = () => {
      
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
      window.removeEventListener('click', stopResize);
      
    };
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);

     })
     
    }
    
    // card.addEventListener('click',()=>{
     
    // })
  }
  // nextbutton.addEventListener('click',()=>{
  //   div.allowSlideNext=true;
  //   div.allowSlidePrev=true;
  // })



