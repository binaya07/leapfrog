var carouselContainer;
var carouselContainerStyle;
var carouselContainerWidth;
var carouselContainerHeight;
var carouselImageWrapper;
var carouselImageWrapperStyle;
var carouselImagesList;
var totalSliderWidth;
var wrapperLeft;
var leftButton;
var rightButton;
var MAX_LEFT;
var activeIndicator;
var imageWidth;


init();


// function getCurrentSlideNo(wrapperLeftPos){

    
// }


// ADD EVENT HANDLER TO LEFT AND RIGHT BUTTONS
leftButton.onclick = function(e) {

    if (wrapperLeft <= MAX_LEFT){
        wrapperLeft = 0;
    }
    else{

        wrapperLeft = wrapperLeft - imageWidth;
    }
    

    var id = setInterval(frame, 1);
    
    function frame(){
    
        if(parseInt(carouselImageWrapperStyle.left) <= wrapperLeft){
            carouselImageWrapper.style.left = wrapperLeft + 'px';
            clearInterval(id);
        }
        else{
               
            carouselImageWrapper.style.left = parseInt(carouselImageWrapperStyle.left) - 10 + 'px';
            
        }
    }

}

rightButton.onclick = function(e) {

    if (wrapperLeft >= 0)
    {
        wrapperLeft = MAX_LEFT;

    }
    else{
        wrapperLeft = wrapperLeft + imageWidth;
    }

    var id = setInterval(frame, 1);
    
    function frame(){
    
        if(parseInt(carouselImageWrapperStyle.left) >= wrapperLeft){
            carouselImageWrapper.style.left = wrapperLeft + 'px';
            clearInterval(id);
        }
        else{
               
            carouselImageWrapper.style.left = parseInt(carouselImageWrapperStyle.left) + 10 + 'px';
            
        }
    }
}



function init(){
    // GET CONTAINER WIDTH AND HEIGHT
    carouselContainer = document.getElementsByClassName('carousel-container')[0];
    carouselContainerStyle = getComputedStyle(carouselContainer);

    carouselContainerWidth = carouselContainerStyle.width;
    carouselContainerHeight = carouselContainerStyle.height;

    imageWidth = parseInt(carouselContainerWidth);


    // SET SLIDER WIDTH, HEIGHT AND Z-INDEX
    carouselImageWrapper = document.getElementsByClassName('carousel-image-wrapper')[0];
    carouselImageWrapperStyle= getComputedStyle(carouselImageWrapper);

    carouselImagesList = document.querySelectorAll('.carousel-image-wrapper img');

    totalSliderWidth = parseInt(carouselContainerWidth) * carouselImagesList.length;

    carouselImageWrapper.style.height = carouselContainerHeight;
    carouselImageWrapper.style.width = totalSliderWidth + 'px';
    carouselImageWrapper.style.zIndex = '10';


    // GET SLIDER LEFT POSITION
    wrapperLeft = parseInt(carouselImageWrapperStyle.left);

    // ADD BOTTOM INDICATORS
    addIndicator(carouselImagesList.length);


    // ADD LEFT AND RIGHT SLIDER BUTTONS
    leftButton = document.createElement('button');
    leftButton.style.width = '40px';
    leftButton.style.height = '40px';
    leftButton.style.borderRadius = '50%';
    leftButton.style.backgroundColor = 'lightgray';
    leftButton.style.zIndex = '20';
    leftButton.style.position = 'absolute';
    leftButton.style.left = '2px';
    leftButton.style.border = 'none';
    leftButton.style.top = (parseInt(carouselContainerHeight) / 2 -
                            parseInt(leftButton.style.height)) + 'px';

    var leftButtonPara = document.createElement('para');
    leftButtonPara.innerHTML = '&#8249;';
    leftButton.appendChild(leftButtonPara);
    carouselContainer.appendChild(leftButton);


    rightButton = document.createElement('button');
    rightButton.style.width = '40px';
    rightButton.style.height = '40px';
    rightButton.style.borderRadius = '50%';
    rightButton.style.backgroundColor = 'lightgray';
    rightButton.style.zIndex = '20';
    rightButton.style.position = 'absolute'
    rightButton.style.right = '2px'
    rightButton.style.border = 'none';
    rightButton.style.top = (parseInt(carouselContainerHeight) / 2 -
                            parseInt(leftButton.style.height)) + 'px';

    var rightButtonPara = document.createElement('para');
    rightButtonPara.innerHTML = '&#8250;';
    rightButton.appendChild(rightButtonPara);
    carouselContainer.appendChild(rightButton);

    // CALCULTE MAXIMUM LEFT SLIDER POSITION
    MAX_LEFT = - (parseInt(carouselImagesList.length) - 1) * parseInt(carouselContainerWidth);
}

function addIndicator(imageLength){

    var indicatorDiv = document.createElement('div');

    indicatorDiv.style.position = 'absolute';
    indicatorDiv.style.bottom = '5px';
    indicatorDiv.style.zIndex = '20';
    indicatorDiv.style.width = '100%';
    indicatorDiv.style.textAlign = 'center';

    activeIndicator = getIndividualIndicator();
    activeIndicator.style.backgroundColor = 'rgba(255,255,255,1)';
    activeIndicator.style.width = '18px';
    activeIndicator.style.height = '18px';
    
    indicatorDiv.appendChild(activeIndicator);

    for(var i = 1; i<imageLength; i++){
        indicatorDiv.appendChild(getIndividualIndicator());
    }
    carouselContainer.appendChild(indicatorDiv);



}

function getIndividualIndicator(){

    var indicator = document.createElement('button');
    indicator.style.width = '15px';
    indicator.style.height = '15px';
    indicator.style.borderRadius = '50%';
    indicator.style.backgroundColor = 'rgba(255,255,255,0.5)';
    indicator.style.border = 'none';
    indicator.style.marginRight= '10px';
    return indicator;
}