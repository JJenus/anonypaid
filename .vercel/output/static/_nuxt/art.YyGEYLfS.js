import{a as b,q as a,A as e,x as d,y as n,u as o,H as C,I as u,J as p,U as k,l as t,C as w,V as h,W as A,X as E,Y as N}from"./swiper-vue.5_csNmSw.js";import{_ as I}from"./Token.vue.1_4z_JjI.js";import{u as F}from"./entry.GFMhS71B.js";import{u as T}from"./index.R6-aFLCX.js";import{u as B}from"./collections.sY5LnFFH.js";import"./vue.f36acd1f.qs0pgTND.js";import"./authStates.QCPyDKGd.js";import"./cookie.T-c3k4Q1.js";const x={class:"px-5 mx-4"},O={class:"d-lg-none mx-in3"},P={class:"card"},V={class:"card-body p-0"},$=["src"],q={href:"/asset/aaa",class:"d-none d-lg-block"},D={class:"card"},G={class:"card-body p-0"},H=["src"],J={class:""},L={class:"fs-1 mb-2 mt-7"},M={class:"container-fluid my-4"},R={class:"row row-cols-1 row-cols-md-3 row-cols-lg-4 g-7"},ee={__name:"art",setup(U){const v=F().public,f=b("Art"),y=f.value+" NFT";T({title:`${v.APP} - ${y}`});const c=B().art,S=c.value.reduce((s,_)=>(_.nfts.forEach(l=>s.push(l)),s),[]);return(s,_)=>{const l=N,m=k,g=I;return t(),a("div",null,[e("div",x,[e("div",O,[d(m,{modules:["SwiperAutoplay"in s?s.SwiperAutoplay:o(h),"SwiperEffectCoverflow"in s?s.SwiperEffectCoverflow:o(A),"SwiperEffectCards"in s?s.SwiperEffectCards:o(E)],effect:"cards","cards-effect":{},"centered-slides":!0,"grab-cursor":!0,"slides-per-view":"auto",loop:!0,autoplay:{delay:4e3,disableOnInteraction:!0}},{default:n(()=>[(t(!0),a(u,null,p(o(c),(r,i)=>(t(),w(l,{key:i},{default:n(()=>[e("div",P,[e("div",V,[e("img",{src:r.bannerImg,alt:"",class:"w-100 h-350px h-lg-350px rounded"},null,8,$)])])]),_:2},1024))),128))]),_:1},8,["modules"])]),e("a",q,[d(m,{modules:["SwiperAutoplay"in s?s.SwiperAutoplay:o(h)],"space-between":10,"slides-per-view":"auto",loop:!0,autoplay:{delay:5e3,disableOnInteraction:!0}},{default:n(()=>[(t(!0),a(u,null,p(o(c),(r,i)=>(t(),w(l,{key:i},{default:n(()=>[e("div",D,[e("div",G,[e("img",{src:r.bannerImg,alt:"",class:"w-100 h-350px h-lg-500px rounded"},null,8,H)])])]),_:2},1024))),128))]),_:1},8,["modules"])])]),e("div",J,[e("h1",L,C(o(f))+" NFTs",1),e("div",M,[e("div",R,[(t(!0),a(u,null,p(o(S),r=>(t(),a("div",{key:r.id,class:"col"},[d(g,{token:r},null,8,["token"])]))),128))])])])])}}};export{ee as default};