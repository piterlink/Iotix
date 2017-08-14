var resolutionSet = 770;
var menuFechado = false;
$(document).ready(function () {
    initTemplate()
});
$(window).resize(function () {
    if ($(window).width() < resolutionSet) {
        //alert($(window).width())
        fecharMenu();
        $('.fecharMenuContent').click(function () {
            fecharMenu();
        });
        $('.sidebar li a').attr('onclick', 'fecharMenu()');
        $('.content').attr('onclick', 'fecharMenu()');
        $().css('width', '12px');
        $().css('heigth', '12px');

    } else {
        abrirMenu();
        $('.content').removeAttr('onclick', 'fecharMenu()');
        $('.sidebar li a').removeAttr('onclick', 'fecharMenu()');
    }
    if ($('.painel_sensor_ambiente').width() < 500) {
        //alert($('.painel_sensor_ambiente').width());        
        $('.painel_sensor_ambiente .painel-img').hide();
        $('.painel_sensor_ambiente  .painel-txt').css('width', '100%');
        $('.font-temperatura').css('font-size', '2.8em');
    } else {
        $('.painel_sensor_ambiente .painel-img').fadeIn();
        $('.painel_sensor_ambiente  .painel-txt').css('width', 'calc(100% - 124px)');
        $('.font-temperatura').css('font-size', '3.5em');
    }
});

function fecharMenu() {
    //    $('.sidebar').css('width', '0%');
    $('.content').css('width', '100%');
    $('.content').css('left', '0');
    $('#buttonFecharMenu').hide();
    $('#buttonFecharMenuNav').hide();
    // $('#buttonAbrirMenu').fadeIn(400);
    $('#buttonAbrirMenu').show();
}
function abrirMenu() {
    //    $('.sidebar').css('width', '20%');
    if ($(window).width() > resolutionSet) {
        $('.content').css('width', 'calc(100% - 300px)');
    }
    $('.content').css('left', '300px');
    $('#buttonFecharMenu').show();
    $('#buttonFecharMenuNav').show();
    // $('#buttonAbrirMenu').fadeOut(200);
    $('#buttonAbrirMenu').hide();
}

function initTemplate() {
    if ($(window).width() < resolutionSet) {
        // alert($(window).width())
        fecharMenu();
        $('.fecharMenuContent').click(function () {
            fecharMenu();
        });
        $('.content').attr('onclick', 'fecharMenu()');
        $('.sidebar li a').attr('onclick', 'fecharMenu()');
    } else {
        abrirMenu();
        $('.content').removeAttr('onclick', 'fecharMenu()');
        $('.sidebar li a').removeAttr('onclick', 'fecharMenu()');
    }
    setTimeout(function() {
        if ($('.painel_sensor_ambiente').width() < 500) {       
        $('.painel_sensor_ambiente .painel-img').hide();
        $('.painel_sensor_ambiente  .painel-txt').css('width', '100%');
        $('.font-temperatura').css('font-size', '2.8em');
    } else {
        $('.painel_sensor_ambiente .painel-img').fadeIn();
        $('.painel_sensor_ambiente  .painel-txt').css('width', 'calc(100% - 124px)');
        $('.font-temperatura').css('font-size', '3.5em');
    }
    }, 500);
     

}