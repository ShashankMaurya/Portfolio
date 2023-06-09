var img_links = [];
var slideIndex = 0;
var darkBoxVisiblity = false;

$.getJSON('https://script.google.com/macros/s/AKfycbwbe8X7rSHrhMdTEz3Gj0QeB4DmkJV9rOeA_V6J-0fWM4fo-nMVaqJ_hQRioQh18PXwtg/exec', getImages);



function getImages(img_json) {
    console.log(img_json);
    let obj = JSON.parse(JSON.stringify(img_json));

    let baseURL = "https://drive.google.com/uc?export=view&id=";

    for (let i = 0; i < obj.data.length; i++) {
        img_links.push(baseURL + obj.data[i].img_id);
    }

    carouselBuilder();
    showSlidesAuto();

    $('.gallery img , .mySlides img').click(function (event) {
        darkBoxBuilder(event.currentTarget.src);
    });

    $('body').keydown(function (event) {
        if(event.key=='Escape'){
            removeDarkBox();
        }
    });

    $('body').keydown(function (event) {
        if(event.key=='ArrowLeft'){
            plusSlides(-1);
        }
    });

    $('body').keydown(function (event) {
        if(event.key=='ArrowRight'){
            plusSlides(1);
        }
    });
}

// Carousel Controller

function carouselBuilder() {

    console.log(img_links.length);

    for (let i = 0; i < img_links.length; i++) {
        let newDiv = document.createElement('div');

        let newImg = document.createElement('img');
        newImg.className = 'cover_image';
        newImg.width = "800";
        newImg.height = "500";
        newImg.src = compressImg(img_links[i], `${newImg.width}x${newImg.height}`, 'low');
        newImg.referrerPolicy = 'no-referrer';

        let childDiv = document.createElement('div')
        childDiv.className = "mySlides fade";
        childDiv.id = 'slide_' + (i + 1);
        childDiv.innerHTML = `<div class="numbertext"> ${i + 1} / ${img_links.length} </div>
                                <div class = "bg-img"></div>`;
        childDiv.appendChild(newImg);

        newDiv.appendChild(childDiv);
        newDiv.classList.add('parentSlide')

        $('div.slideshow').append(newDiv);

        $(`.mySlides#${childDiv.id} .bg-img`).css('background-image', `url(${newImg.src})`);

        galleryBuilder(newImg.src);

    }

}

function compressImg(imageURL, dimentions, quality) {
    let API_URL = `https://img.gs/lkkrljgcxx/${dimentions},quality=${quality}/${imageURL}`;

    console.log(API_URL);

    return API_URL;

}

function showSlidesAuto() {
    let i;
    let slides = document.querySelectorAll(".mySlides");
    $('.mySlides').css('display', 'none');

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlidesAuto, 6000);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".mySlides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    $('.mySlides').css('display', 'none');
    slides[slideIndex - 1].style.display = "block";
}


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function galleryBuilder(link) {
    let newImg = document.createElement('img');
    newImg.src = link;

    $('.gallery').append(newImg);
}

function darkBoxBuilder(url) {
    let img_id = url.substring(url.lastIndexOf('id=')+3);
    let openURL = `https://drive.google.com/file/d/${img_id}/view?usp=drive_link`;
    if (!darkBoxVisiblity) {
        let x = (window.innerWidth - 1000) / 2;
        let y = window.scrollY + 50;

        let newDiv = document.createElement('div');
        newDiv.className = 'darkBox';
        newDiv.innerHTML = `<h5 class = "cross"  onclick="removeDarkBox()">X</h5>
                            <img class = 'darkBox_img' src = '${url}'/>
                            <a class="img_gDrive" href="${openURL}" , target="_blank">
                                <div class="btn_container">
                                    <object data="../images/social/gdrive.png" width="30" height="30"> </object> &nbsp; Open in GDrive
                                </div>
                            </a>`;
        newDiv.style.left = x.toString() + 'px';
        newDiv.style.top = y.toString() + 'px';
        newDiv.height = 'auto';

        $('body').append(newDiv);
        darkBoxVisiblity = true;

        $('.darkBox').click(function () {
            removeDarkBox();
        });
    }
    else {
        removeDarkBox();
    }
}

function removeDarkBox() {
    $('.darkBox').remove();
    darkBoxVisiblity = false;
}