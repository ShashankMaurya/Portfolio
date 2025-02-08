function trigger(){
    var allAnimatedElements = document.querySelectorAll('.slide_anim');

    for(var i = 0 ; i < allAnimatedElements.length ; i++){
        var windowHt = window.innerHeight;
        var distFromTop = allAnimatedElements[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (distFromTop < windowHt - elementVisible){
            allAnimatedElements[i].classList.add('slide');
        }
        else{
            allAnimatedElements[i].classList.remove('slide');
        }
    }
}

function getAge(birthdate){
    var today = new Date();
    var birthDate = new Date(birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())){
        age--;
    }
    return age;
}


function animate(){
    setTimeout(trigger, 1200);
}

const birthDate = '2001-01-26'

document.querySelector('div#age div.value').textContent= getAge(birthDate);
window.addEventListener('scroll', animate);