//pc GNB


// 아코디언
$(document).on('click', '#clarins-wrap [data-toggle="clarins-collapse"]', function(){
    $(this).parents('.clarins-accordion').toggleClass('on');
    // 타입 지정한 적 없을 때 빈 값 부여
    var clarinsCollapseType = $(this).data('type');
    if(clarinsCollapseType == 'undefined' || clarinsCollapseType == null){
        clarinsCollapseType = '';
    }
    // 다중으로 열리는 타입이 아닐 때 하나 열리면 하나 닫히게 (gnb)
    if(clarinsCollapseType.indexOf('mutiple') < 0){
        $(this).parents('.clarins-accordion').siblings().removeClass('on');
    }
});

// Selectbox
var clarinsSel = '#clarins-wrap [data-toggle="clarins-select"]';
$(document).on('click', function(e){
    // 외부 요소 클릭하면 소팅박스 닫히게
    if($(clarinsSel+'.on').length > 0){
        if(
            !$(e.target).parents().is(clarinsSel+'.on') &&
            !$(e.target).is(clarinsSel+'.on')
        ){
            $(clarinsSel).removeClass('on')
        }
    }
    // 셀렉트 박스 동작
    if($(e.target).parents().is(clarinsSel)){
        // 목록 선택했을 경우
        var selLi = $(e.target).parent('li');
        if($(e.target).parents().is('li')){
            // 선택한 아이템에 활성 클래스 추가
            selLi.siblings().removeClass('on').end().addClass('on');
            // 버튼 텍스트 선택한 걸로
            $(e.target).parents(clarinsSel).find('button').html($(e.target).html());
        }
        // 셀릭트 박스 열고 닫기
        $(e.target).parents(clarinsSel).siblings().removeClass('on').end().toggleClass('on');
    }
});

// 수량 선택
var clarinsCount = '#clarins-wrap [data-toggle="clarins-count"]';
$(document).on('click', clarinsCount+' button', function(e){
    var clarinsCountInput = $(e.target).parent().find('input');
    var n = 0;
    if($(e.target).is('.clarins-dwn') && clarinsCountInput.val() > 1){
        n = -1;
    }else if($(e.target).is('.clarins-up')){
        n = 1;
    }
    clarinsCountInput.val(Number(clarinsCountInput.val()) + n);
});

// tab
var clarinsTab = '#clarins-wrap [data-toggle="clarins-tab"]'
$(document).on('click', clarinsTab+' .clarins-tab-head button', function(e){
    $(e.target).siblings().removeClass('on').end().addClass('on');
    $(e.target).parents(clarinsTab).find('.clarins-tab-body').removeClass('on').eq($(e.target).index()).addClass('on');
});

// slider
$(function(){
    // 기본 슬라이더
    var clarinsSlider1 = new Swiper('#clarins-wrap .clarins-slider-1 .swiper-container',{
        spaceBetween: 0,
        speed: 1000,
        loop: true,
        pagination: {
            el: '#clarins-wrap .clarins-slider-1 .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#clarins-wrap .clarins-slider-1 .swiper-button-next',
            prevEl: '#clarins-wrap .clarins-slider-1 .swiper-button-prev',
        },
    });
    var clarinsSlider2 = new Swiper('#clarins-wrap .clarins-slider-2 .swiper-container',{
        spaceBetween: 0,
        speed: 1000,
        loop: true,
        pagination: {
            el: '#clarins-wrap .clarins-slider-2 .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#clarins-wrap .clarins-slider-2 .swiper-button-next',
            prevEl: '#clarins-wrap .clarins-slider-2 .swiper-button-prev',
        },
    });

    // 상품이미지 썸네일 슬라이드
    var pdtThumbSlide = new Swiper('#clarins-wrap .clarins-pdtImg-thumb .swiper-container', {
        spaceBetween: 24,
        slidesPerView: 4,
        slidesPerGroup: 4,
        slideToClickedSlide: false,
        loop: false,
        navigation: {
            nextEl: '#clarins-wrap .clarins-pdtImg-thumb .swiper-button-next',
            prevEl: '#clarins-wrap .clarins-pdtImg-thumb .swiper-button-prev',
        },
        breakpoints:{
            767 : {
                pagination: {
                    el: '#clarins-wrap .clarins-pdtImg-thumb .swiper-pagination',
                },
            }
        }
    });
    // 상품이미지 슬라이드
    var pdtImgSlide = new Swiper('#clarins-wrap .clarins-pdtImg-view', {
        spaceBetween: 10,
        loop: false,
        pagination: {
            el: '#clarins-wrap .clarins-pdtImg-view .swiper-pagination',
        },
        on:{
            init:function(){
                var idx = this.activeIndex;
                $('#clarins-wrap .clarins-pdtImg-thumb .swiper-slide').siblings().removeClass('current').eq(idx).addClass('current');
            },
            slideChange:function(){
                //활성화된 슬라이드.. 썸네일 슬라이드에 반영.
                var idx = this.activeIndex;
                pdtThumbSlide.slideTo(idx);
                $('#clarins-wrap .clarins-pdtImg-thumb .swiper-slide').siblings().removeClass('current').eq(idx).addClass('current');

            },
        }
    });
    $('#clarins-wrap .clarins-pdtImg-thumb .swiper-slide').click(function(e){
        e.preventDefault();
        e.stopPropagation();

        var idx = $(this).index();
        pdtImgSlide.slideTo(idx)
        $(this).siblings().removeClass('current').end().addClass('current');
    }).on('dragstart', function(){ return false; });
});
