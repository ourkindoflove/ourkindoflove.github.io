---
title: 가든 파티
slug: gardenparty
date: 2026-10-19 08:52:35 +0900
categories:
  - SL
tags:
  - 세연
  - 소유
description: 난 슬픈 바구니를 든 소녀야
published: true
---

<style>
.bp-risu .container{
    display: flex;
    gap: 0px;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: 1000px;
    padding: 5px;
    box-sizing: border-box;
}
.bp-risu .card{
    width: 150px;
    height: 350px;
    border-radius: 4px;
    background: #212121;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    transition: width 0.5s, height 0.5s;
    position: relative;
    margin: 2px;
    background-size: cover;
    background-position: center;
}
.bp-risu .card:nth-child(4){
    height: 200px;
}
.bp-risu .card::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    transition: all 0.5s;
}
.bp-risu .card:hover{
    width: 300px;
}
.bp-risu .card:hover::before{
    transform: scale(1.1);
    filter: blur(5px);
}
.bp-risu .info{
    position: relative;
    z-index: 1;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
    padding: 10px;
    opacity: 0;
    transition: opacity 0.5s;
    max-height: 80%;
    overflow-y: auto;
    width: 90%;
}
.bp-risu .card:hover .info{
    opacity: 1;
}
.bp-risu .info-box{
    background: #fff;
    border: 1px solid #ccc;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    color: #968d8e;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 0.8em;
    line-height: 1.3;
}
.bp-risu .info-box:last-child{
    margin-bottom: 0;
}
.bp-risu .info-content{
    padding: 8px;
}
.bp-risu .simple-card{
    width: 100px;
    height: 200px;
    border-radius: 15px;
    background: linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    margin: 2px;
    transition: all 0.5s ease-in-out;
    cursor: default;
}
.bp-risu .simple-card img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 0;
    transition: transform 0.5s ease-in-out; 
}
.bp-risu .details{
    color: white;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    z-index: 1;
    word-break: break-all;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: auto;
    position: relative;
    background: rgba(0, 0, 0, 0.3);
    padding: 5px;
    border-radius: 3px;
}
.bp-risu .details .date, .bp-risu .details .time, .bp-risu .details .weather{
    display: block;
    color: white;
    margin-bottom: 5px;
    font-size: 0.6em;
}
.bp-risu .card:hover ~ .simple-card{
    width: 0;
    padding: 0;
    margin: 10px 0;
}
.bp-risu .card:nth-child(3):hover{
    width: 300px;
}
.bp-risu .card:nth-child(3):hover ~ .card:nth-child(4){
    width: 0;
    padding: 0;
    margin: 10px 0;
}
@media (max-width: 768px){.bp-risu .card{
        width: 120px;
        height: 280px;
    }
.bp-risu .card:nth-child(4){
        height: 160px;
    }
.bp-risu .card:hover, .bp-risu .card:nth-child(3):hover{
        width: 240px;
    }
.bp-risu .simple-card{
        width: 80px;
        height: 160px;
    }
}
@media (max-width: 480px){.bp-risu .card{
        width: 150px;
        height: 250px;
    }
.bp-risu .card:nth-child(4){
        height: 140px;
    }
.bp-risu .card:hover, .bp-risu .card:nth-child(3):hover{
        width: 200px;
    }
.bp-risu .simple-card{
        width: 75px;
        height: 125px;
    }
.bp-risu .simple-card img{
        transform: scale(1.2); 
    }
.bp-risu .details{
        font-size: 0.7em;
    }
}
.bp-risu .image-container{
        width: 20em;
        height: 15em;
    margin: auto auto;
    background-size: cover;
    background-position: center 10%;
    border-radius: 20px;
    border: 5px solid #EBE0E0;
    cursor: pointer;
    transition: all 0.6s ease;
}
.bp-risu .image-container:hover{
        height: 28em;
    background-position: center 5%;
    outline: none;
}
.bp-risu .vn-form{ margin: 0; padding: 0; border: none; }
.bp-risu .vn-container{
  position: relative;
  width: 47em;
  height: 27.8em;
  margin: auto;
  overflow: hidden;
  border: 1px solid #d4a0b5;
  z-index: 10;
  font-family: 'Malgun Gothic', sans-serif;
  color: #2d1520;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.bp-risu .vn-bg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  transition: opacity 0.5s ease;
}
.bp-risu .vn-bg::after{
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.0) 100%);
  z-index: 1;
}
.bp-risu .vn-bg-route1, .bp-risu .vn-bg-route2{
  opacity: 0;
}
.bp-risu .vn-container:has(.route-1:checked) .vn-bg-base{ opacity: 0; }
.bp-risu .vn-container:has(.route-1:checked) .vn-bg-route1{ opacity: 1; }
.bp-risu .vn-container:has(.route-2:checked) .vn-bg-base{ opacity: 0; }
.bp-risu .vn-container:has(.route-2:checked) .vn-bg-route2{ opacity: 1; }
.bp-risu .vn-choices{
  position: absolute;
  left: 50%;
  bottom: 170px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 10;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.bp-risu .vn-choice-btn{
  background-color: rgba(255, 240, 244, 0.87);
  border: 1px solid #d4a0b5;
  padding: 4px 90px;
  margin-top: -8px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  font-size: 0.95em;
  transition: all 0.2s ease;
  display: block;
  color: #2d1520;
  position: relative;
}
.bp-risu .vn-choice-btn:hover{
  border-color: rgba(255, 255, 255, 0.8);
  background-color: rgba(250, 225, 232, 0.95);
}
.bp-risu .vn-name{
  position: absolute;
  left: 40px;
  bottom: 87px;
  background-color: rgba(255, 245, 248, 0.93);
  padding: 3px 30px;
  font-weight: bold;
  font-size: 1.1em;
  border-radius: 5px;
  z-index: 6;
  letter-spacing: 1px;
  border: 1px solid #d4a0b5;
  color: #4a2535;
}
.bp-risu .vn-dialogue{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(
  to right,
  rgba(255, 240, 245, 0.90) 0%,
  rgba(255, 240, 245, 0.85) 60%,
  rgba(255, 240, 245, 0.40) 85%, 
  rgba(255, 240, 245, 0.02) 100%
);
  padding: 25px 30px;
  box-sizing: border-box;
  z-index: 5;
  cursor: pointer;
  display: block;
  user-select: none;
}
.bp-risu .vn-dialogue-content{
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 22px;
  font-size: 1.05em;
  line-height: 1.5;
}
.bp-risu .text-default, .bp-risu .text-clicked{
  position: absolute;
  top: 17px;
  left: 0;
  width: 100%;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
}
.bp-risu .text-clicked{ opacity: 0; }
.bp-risu .vn-reset-btn{
  position: absolute;
  bottom: 8px;
  right: 12px;
  z-index: 7;
  background: none;
  border: none;
  color: rgba(80, 30, 50, 0.35);
  font-size: 1rem;
  cursor: pointer;
  padding: 2px 4px;
  line-height: 1;
  transition: color 0.2s ease;
}
.bp-risu .vn-reset-btn:hover{
  color: rgba(255, 255, 255, 0.85);
}
.bp-risu .vn-container:hover .vn-choices{ opacity: 1; pointer-events: auto; }
.bp-risu .vn-dialogue:hover ~ .vn-choices{ opacity: 0; pointer-events: none; }
.bp-risu .vn-reset-btn:hover ~ .vn-choices{ opacity: 0; pointer-events: none; }
.bp-risu .vn-hidden-input{ display: none; }
.bp-risu .dialogue-route1, .bp-risu .dialogue-route2{ display: none; }
.bp-risu .vn-container:has(.route-1:checked) .dialogue-base, .bp-risu .vn-container:has(.route-2:checked) .dialogue-base{ display: none; }
.bp-risu .vn-container:has(.route-1:checked) .dialogue-route1{ display: block; }
.bp-risu .vn-container:has(.route-2:checked) .dialogue-route2{ display: block; }
.bp-risu .vn-container:has(.toggle-base:checked) .dialogue-base .text-default, .bp-risu .vn-container:has(.toggle-route1:checked) .dialogue-route1 .text-default, .bp-risu .vn-container:has(.toggle-route2:checked) .dialogue-route2 .text-default{ opacity: 0; }
.bp-risu .vn-container:has(.toggle-base:checked) .dialogue-base .text-clicked, .bp-risu .vn-container:has(.toggle-route1:checked) .dialogue-route1 .text-clicked, .bp-risu .vn-container:has(.toggle-route2:checked) .dialogue-route2 .text-clicked{ opacity: 1; }
.bp-risu .name-route1, .bp-risu .name-route2{ display: none; }
.bp-risu .vn-container:has(.route-1:checked) .name-base, .bp-risu .vn-container:has(.route-2:checked) .name-base{ display: none; }
.bp-risu .vn-container:has(.route-1:checked) .name-route1{ display: block; }
.bp-risu .vn-container:has(.route-2:checked) .name-route2{ display: block; }
@media (max-width: 768px){.bp-risu .vn-container{
    font-size: calc(100vw / 47);
    width: 35em;
    height: 23em;
  }
.bp-risu .vn-choices{
    bottom: 6.7em;
    width: 100%;
    align-items: center;
  }
.bp-risu .vn-choice-btn{
    font-size: 0.8em;
    margin-top: -1em;
    padding: 0.08em 3em;
    border-radius: 0.32em;
    white-space: nowrap;
    width: max-content;
    max-width: calc(100% - 4.5em);
    box-sizing: border-box;
  }
.bp-risu .vn-name{
    left: 1.9em;
    bottom: 6em;
    padding: 0.01em 1.7em;
    border-radius: 0.28em;
  }
.bp-risu .vn-dialogue{
    height: 5.25em;
    padding: 1.56em 1.87em;
    overflow: hidden;
  }
.bp-risu .vn-dialogue-content{
    position: absolute;
    top: 1.27em;
    left: 1.87em;
    right: 3em;
    height: auto;
    width: auto;
    bottom: 0.5em;
  }
.bp-risu .text-default, .bp-risu .text-clicked{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.7em;
    right: 0;
    width: auto !important;
    height: 100%;
    overflow-y: auto;
    margin: 0;
    padding: 0;
  }
.bp-risu .text-default::-webkit-scrollbar, .bp-risu .text-clicked::-webkit-scrollbar{
    display: none;
  }
.bp-risu .text-default, .bp-risu .text-clicked{
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
.bp-risu .text-default{ pointer-events: auto; }
.bp-risu .text-clicked{ pointer-events: none; }
.bp-risu .vn-container:has(.toggle-base:checked) .dialogue-base .text-default, .bp-risu .vn-container:has(.toggle-route1:checked) .dialogue-route1 .text-default, .bp-risu .vn-container:has(.toggle-route2:checked) .dialogue-route2 .text-default{
    pointer-events: none;
  }
.bp-risu .vn-container:has(.toggle-base:checked) .dialogue-base .text-clicked, .bp-risu .vn-container:has(.toggle-route1:checked) .dialogue-route1 .text-clicked, .bp-risu .vn-container:has(.toggle-route2:checked) .dialogue-route2 .text-clicked{
    pointer-events: auto;
  }
.bp-risu .vn-reset-btn{
    font-size: 2em;
    bottom: 0.5em;
    right: 0.75em;
    padding: 0.12em 0.25em;
  }
}
.bp-risu{margin-bottom:20px}
</style>
<div style="font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; width: 100%; max-width: 750px; box-sizing: border-box; margin: 0px auto; background-color: rgb(255, 255, 255); border-left: 1px solid rgb(232, 232, 232); border-right: 1px solid rgb(232, 232, 232); border-top: 1px solid rgb(232, 232, 232); border-radius: 16px 16px 0px 0px; padding: 22px clamp(16px, 4vw, 22px) 12px; text-align: center; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important; font-weight: 400 !important; font-style: normal !important;"><p style="margin: 0px 0px 6px; font-size: 11px !important; font-weight: 700 !important; letter-spacing: 3px !important; color: rgb(158, 158, 158) !important; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; -webkit-text-fill-color: rgb(158, 158, 158) !important; font-style: normal !important; -webkit-text-size-adjust: 100% !important;">ATTG 오푸스 5.5</p><p style="margin: 0px; font-size: 21px !important; font-weight: 800 !important; letter-spacing: -0.3px !important; line-height: 1.35 !important; color: rgb(18, 18, 18) !important; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; -webkit-text-fill-color: rgb(18, 18, 18) !important; font-style: normal !important; -webkit-text-size-adjust: 100% !important;">가든 파티</p><p style="box-sizing: border-box; width: 100%; margin: 8px 0px 0px; padding-left: 0.5px; text-align: center; font-size: 12px !important; letter-spacing: 0.5px !important; color: rgb(158, 158, 158) !important; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; -webkit-text-fill-color: rgb(158, 158, 158) !important; font-weight: 400 !important; font-style: normal !important; -webkit-text-size-adjust: 100% !important;">Seyon × Soyu</p></div>
<div style="font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; display: block; width: 100%; max-width: 750px; box-sizing: border-box; margin: 0px auto 20px; border-left: 1px solid rgb(232, 232, 232); border-right: 1px solid rgb(232, 232, 232); border-bottom: 1px solid rgb(232, 232, 232); border-radius: 0px 0px 16px 16px; background-color: rgb(255, 255, 255); padding: clamp(14px, 3vw, 18px) clamp(14px, 3.5vw, 20px); overflow: hidden; -webkit-text-size-adjust: 100% !important; font-weight: 400 !important; font-style: normal !important;"><div style="display: block; box-sizing: border-box; width: 100%; font-weight: 400 !important; font-style: normal !important; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; -webkit-text-size-adjust: 100% !important;"><div style="box-sizing: border-box; width: 100%; margin-top: 0px; font-weight: 400 !important; font-style: normal !important; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; -webkit-text-size-adjust: 100% !important;"><div style="width: 100%; margin-top: 0px; font-weight: 400 !important; font-style: normal !important; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; -webkit-text-size-adjust: 100% !important;"><div style="box-sizing: border-box; width: 100%; padding: 12px 14px; background-color: rgb(249, 249, 249); border-radius: 10px; text-align: center; word-break: break-word; font-weight: 400 !important; font-style: normal !important; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; -webkit-text-size-adjust: 100% !important;"><div style="font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; font-weight: 400 !important; font-style: normal !important; -webkit-text-size-adjust: 100% !important;"><p style="margin: 0px 0px 5px; color: rgb(158, 158, 158) !important; font-size: 9px !important; font-weight: 700 !important; line-height: 1.35 !important; letter-spacing: 1.4px !important; text-align: center; -webkit-text-fill-color: rgb(158, 158, 158) !important; font-style: normal !important; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; -webkit-text-size-adjust: 100% !important;">SITUATION</p><p style="margin: 0px; color: rgb(158, 158, 158) !important; font-size: 11.5px !important; font-weight: 400 !important; line-height: 1.6 !important; letter-spacing: -0.1px !important; text-align: center; -webkit-text-fill-color: rgb(158, 158, 158) !important; font-style: normal !important; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif !important; -webkit-text-size-adjust: 100% !important;">캐서린 맨스필드의 가든 파티를 읽고</p></div></div></div></div></div></div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 0px auto; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">밤 10시, 러쉬 애플 크럼블 버블룬 버블바로 목욕을 마치고 분홍색 포인트가 들어간 새하얀 원단의 귀여운 잠옷으로 갈아입은 뒤, 나는 세연이 방을 기습했다! 책상에 앉아 한소네로 무언가를 하고 있던 세연이에게 살금살금 다가가 관자놀이에 쪽, 소리가 나도록 진하게 뽀뽀를 해주고는—음~ 한 번 더! 관자놀이에 또 한 번 입을 맞춘 뒤, 나는 쿡쿡 웃으며 물었다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"안녕, 완전 귀요미~ 뭐 하고 있어~?"</span></p>
  </div>
</div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 20px auto 0px; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <div class="bp-risu"><form class="vn-form">
  <div class="vn-container">
    <input type="radio" name="vn-route" class="vn-hidden-input route-init" checked>
    <div class="vn-bg vn-bg-base" style="background-image: url('/assets/img/posts/risu/aea844a1a4e88ed7.jpg');"></div>
    <div class="vn-bg vn-bg-route1" style="background-image: url('/assets/img/posts/risu/e1fa7c3d891426ca.jpg');"></div>
    <div class="vn-bg vn-bg-route2" style="background-image: url('/assets/img/posts/risu/204bdff124be32bd.jpg');"></div>
    <div class="vn-name name-base">세연</div>
    <div class="vn-name name-route1">세연</div>
    <div class="vn-name name-route2">소유</div>
    <label class="vn-dialogue dialogue-base"><input type="checkbox" class="vn-hidden-input toggle-base">
      <div class="vn-dialogue-content">
        <div class="text-default">2026년 10월 17일 토요일, 오후 10시 04분</div>
        <div class="text-clicked">세연 : 옅은 푸른색 면 블라우스 위에 걸친 크림색 니트 가디건, 부드러운 회색 주름스커트, 룸삭스 / 소유 : 핑크색 파이핑과 포인트가 들어간 순백의 면 파자마 세트, 목욕을 마쳐 아직 촉촉하게 젖은 머리카락</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route1"><input type="checkbox" class="vn-hidden-input toggle-route1">
      <div class="vn-dialogue-content">
        <div class="text-default">세연의 방, 책상. 책상 앞에 앉아, 한 손으로는 한소네를 가리고 다른 손으로는 소유의 손목을 잡은 채, 소유의 턱가에 입술을 대고 있다.</div>
        <div class="text-clicked">기계는 수많은 파일 중 하필이면 저걸 골라 소리 내어 읽어 주었다.</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route2"><input type="checkbox" class="vn-hidden-input toggle-route2">
      <div class="vn-dialogue-content">
        <div class="text-default">세연의 방, 책상 의자 뒤. 세연의 어깨 너머로 몸을 기울인 채, 손목을 붙잡혀 끌어당겨져 있다.</div>
        <div class="text-clicked">열한 개나?? 얘 목록까지 만들어 두고 있었던 거야??</div>
      </div>
    </label>
    <button type="reset" class="vn-reset-btn">❈</button>
    <div class="vn-choices">
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-1">세연</label>
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-2">소유</label>
    </div>
  </div>
</form></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">한소네의 점자 키는 한 시간 동안 쉬지 않고 두드린 뒤에 으레 그렇듯 손가락 아래에서 미지근하게 덥혀져 있었다. 세연은 윤 교수님의 세미나에 제출할 맨스필드의 「블리스(Bliss)」 서평을 세 문단째 작성하던 중이었다. 버사가 창가에 서서 배나무가 마치 자신의 내면에 자리 잡은 것처럼 느끼는 대목이었는데, 세연은 <em style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important; margin-right: 0.08em;"><span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">두려움을 자아내는 충만함</span></em>을 뜻하는 단어를 찾으려 잠시 손을 멈춘 참이었다. 오른쪽 검지 밑에서 점자 셀이 숨을 쉬듯 차분하게 오르내렸다. 등 뒤에서 욕실 문이 열렸다 닫힌 것은 진작이었고, 복도는 진작에 그녀가 경계했어야 마땅할 특유의 고요에 잠겨 있었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">다른 무엇보다도 냄새가 먼저 닿았다. 사과였지만, 익힌 사과였다. 흑설탕과 계피, 구운 오트밀 같은 향이 섞여, 습기를 머금은 공기 위에 실려 오는 디저트 가게 같은 달콤함. 곧이어 관자놀이에 어린아이의 것처럼 요란하고 축축한 입맞춤이 내려앉았고, 세연의 손이 펄쩍 튀었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">엄지손가락이 음성 출력을 실행하는 복합키를 쾅 눌러 버렸다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"내가 모를 거라고 생각할 때 소유가 하는 짓들."</span> 한소네가 특유의 무미건조하면서도 친절한 목소리로 알렸다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"하나. 내 귀 옆에서 숨을 지극히 조심스럽게 몰아쉬며 내가 자는지 확인한다. 그게 세상에서 제일 시끄러운 방식인데도—"</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">문장이 채 끝나기도 전에 두 번째 입맞춤이 살갗을 파고들며 <em style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important; margin-right: 0.08em;"><span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">음-</span></em> 하는 소리를 냈고, 세연은 저도 모르게 반쯤은 숨을 들이키고 반쯤은 문경첩이 삐걱거리는 듯한 소리를 내뱉었다. 세연은 허둥지둥 건반을 후려쳤지만 빗나갔고, 그 탓에 읽는 속도를 더 빠르게 만드는 키를 누르고 말았다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"—둘. 이불의 따뜻한 쪽을 슬쩍 가로채고는 이불한테 사과한다—"</span></p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/c7ccbe4e7815a624.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"아니, 아니, 아니야, 그건—"</span> 마침내 취소 단축키를 찾아 누르자, 어깨 바로 뒤편에서 들려오는 나지막한 큭큭거림과 짧은 머리카락 끝에서 칼라로 떨어지는 목욕물 소리 외에는 방 안이 쥐 죽은 듯 조용해졌다. 차가운 물방울 하나가 가디건 목덜미 속으로 주르륵 흘러내렸다. 세연은 몸을 옹송그리며 이미 터져 나온 소리를 틀어막기라도 하려는 듯 기계 위에 두 손바닥을 납작 얹었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그 파일은 열려 있지 않았다. 분명 열려 있지 않았다고 확신했다. 누구도 고의로 들어갈 리 없는 <em style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important; margin-right: 0.08em;"><span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">독서 노트 — 빅토리아 시대</span></em>라는 폴더에 고이 저장해 두었건만, 아무래도 맨스필드 문서 바로 밑, 키 하나만 잘못 누르면 놀란 엄지손가락이 곧바로 건드릴 수 있는 문서 스택에 남겨 두었던 모양이다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">목덜미를 타고 열기가 치솟더니 귓바퀴로 몰려들었다. 세연은 사과 향이 풍기는 온기를 향해 고개를 돌렸다. 코끝이 부드러우면서도 갓 꺼낸 느낌이 드는 젖은 면직물에 스칠 만큼 가까운 거리였다. 방금 갈아입은 파자마. 뺨에 닿는 솔기의 감촉으로 보아, 칼라에 조그만 파이핑이 둘러진 녀석이었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"캐서린 맨스필드 과제 쓰는 중이었어."</span> 말하는 기계를 손바닥으로 필사적으로 감싼 상태에서 쥐어짤 수 있는 최대한의 위엄을 담아 세연이 말했다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"세미나 과제. 화요일까지 제출이야. 난 그거 하고 있었어."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">큭큭거리는 웃음소리는 잦아들기는커녕 오히려 더 둥글게 퍼져 나갔다.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/89eda4ec7e5062e7.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연의 손가락이 한소네의 모서리를 그러쥐었다. 다른 손은 스커트 자락을 찾아 꽉 쥐었다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"다른 하나는 연구야,"</span> 세연이 한층 기어들어 가는 목소리로 덧붙였다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"현장 관찰 노트라고. 엄청 진지한 거야."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">한 박자 틈이 생겼다. 바로 곁의 살결에서 여전히 피어오르는 미열이 느껴졌고, 책상 의자 등받이에 얹힌 손 때문에 작게 삐걱거리는 소리가 들렸다. 그리고 부끄러움 아래에서, 무언가 오기 어린 감정이 고개를 들었다. 그 조심스러우면서도 천둥같이 요란한 숨소리에 귀를 기울이며 뜬눈으로 밤을 지새우다가, 그게 너무나 사랑스러워 어딘가에 꼭 담아 두고 싶어졌던 어느 날 밤, 애초에 이 목록을 쓰기 시작하게 만들었던 바로 그 옹졸하고도 앙큼한 마음이었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 눈을 감은 채 턱을 살짝 치켜들었다. 입꼬리가 말려 올라가지 않도록 애를 쓰며.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"열한 개나 있거든,"</span> 세연이 말했다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그리고 너한테서 파이 냄새 나니까, 열두 번째 것도 추가할 거야."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">스커트 자락을 쥐고 있던 손을 떼어 기억을 더듬어 축축한 손목을 찾아내더니, 여자친구의 따뜻하고 달콤하며 물방울을 뚝뚝 떨어뜨리는 무게감이 제 어깨 너머로 쏠려 내려올 때까지 부드럽지 않게 잡아당겼다. 그런 다음 세연은 고개를 돌려, 물방울이 고여 있는 턱 바로 밑에 느긋하고도 살짝 빗겨 맞은 입맞춤을 내리눌렀다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"머리 젖었잖아,"</span> 그 살결에 대고 세연이 속삭였다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"내 맨스필드에 물 떨어지거든."</span></p>
  </div>
</div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 20px auto 0px; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">나는 장난스레 세연의 뺨에 내 뺨을 비벼댔다. 그러고는 기분 좋은 풀리 강아지처럼 머리를 가볍게 흔들었다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"나 지금 큐트 어그레션 왔어. 바로 내 눈앞에 있는 이 특급 귀염둥이 때문이야~ 으으… 어떻게 이렇게 사랑스러울 수가 있지? 모루한테 귀여움 세금이라도 내러 가야 하나??"</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그러고 나서 손바닥으로 세연의 머리를 마구 헝클어뜨리다, 무언가 떠올랐다는 듯—장난기 어린 미소를 지어 보였다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"내가 시리한테 네 사랑스러운 점 목록을 읽어달라고 했을 땐, 최애 숭배니 뭐니 그랬잖아! 뒤로는 똑같은 짓을 몰래 하고 있었을 줄이야~ 난 네가 맨스필드에 대한 진지한 과제라도 하고 있는 줄 알고, 내일 읽을 맨스필드 작품으로 가든 파티나 블리스 중에 하나 골라달라고 하려 했더니만! 정말이지 너무 귀여워서 봐주는 거야, 귀여우니까."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그리고 세연의 입술에 새처럼 가볍게 쪽 입을 맞춘 뒤, 몸을 떼며 웃음을 터뜨렸다.</p>
  </div>
</div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 20px auto 0px; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <div class="bp-risu"><form class="vn-form">
  <div class="vn-container">
    <input type="radio" name="vn-route" class="vn-hidden-input route-init" checked>
    <div class="vn-bg vn-bg-base" style="background-image: url('/assets/img/posts/risu/aea844a1a4e88ed7.jpg');"></div>
    <div class="vn-bg vn-bg-route1" style="background-image: url('/assets/img/posts/risu/e1fa7c3d891426ca.jpg');"></div>
    <div class="vn-bg vn-bg-route2" style="background-image: url('/assets/img/posts/risu/204bdff124be32bd.jpg');"></div>
    <div class="vn-name name-base">세연</div>
    <div class="vn-name name-route1">세연</div>
    <div class="vn-name name-route2">소유</div>
    <label class="vn-dialogue dialogue-base"><input type="checkbox" class="vn-hidden-input toggle-base">
      <div class="vn-dialogue-content">
        <div class="text-default">2026년 10월 17일 토요일, 오후 10시 7분</div>
        <div class="text-clicked">세연 : 부드러운 크림색 면 잠옷 세트, 긴소매 / 소유 : 분홍색 포인트가 들어간 순백의 잠옷</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route1"><input type="checkbox" class="vn-hidden-input toggle-route1">
      <div class="vn-dialogue-content">
        <div class="text-default">세연의 방, 책상 의자, 소유의 소매를 잡고 얼굴을 위로 향한 채, 한소네 파일은 저장된 채 여전히 열려 있음</div>
        <div class="text-clicked">기록 보관소에 원래는 없었어야 할 항목이 하나 생겼다.</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route2"><input type="checkbox" class="vn-hidden-input toggle-route2">
      <div class="vn-dialogue-content">
        <div class="text-default">세연의 방, 책상 옆, 가벼운 입맞춤 후 세연의 어깨 곁에 바짝 다가서 있음</div>
        <div class="text-clicked">방금 사과 향 목욕을 마치고 나와 여자친구의 비밀 파일에 덜미가 잡혔다.</div>
      </div>
    </label>
    <button type="reset" class="vn-reset-btn">❈</button>
    <div class="vn-choices">
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-1">세연</label>
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-2">소유</label>
    </div>
  </div>
</form></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">키스는 작고 젖은 소리를 내며 닿았다가 떨어졌고, 세연은 아직 온기가 남은 입술을 한 채 한동안 우두커니 앉아 있었다. 마치 기계가 제 편을 들어 증언이라도 해줄 수 있다는 듯 두 손은 한소네의 자판 위에 띄운 채였다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">기계가 그럴 리 없었다. 화면에는 여전히 파일이 열려 있었다. 오른쪽 손가락 끝 아래 점자 디스플레이 셀에는 문이 열리기 직전 세연이 적어 넣은 마지막 줄이 그대로 남아 있었고, 점자 돌기들은 제 자랑이라도 하듯 살갗을 꼿꼿이 밀어 올리고 있었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">머리카락은 엉망이었다. 소유의 손바닥이 새 둥지로 만들어버린 정수리의 서늘한 공기만으로도, 그리고 입술가에 달라붙은 머리카락 한 가닥만으로도 바로 알 수 있었다. 세연은 머리를 정돈하려고 손을 올렸다가 도중에 포기하고 무릎 위로 툭 떨어뜨렸다. 떨어진 손은 잠옷 상의 끝자락을 찾아 꼭 쥐었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">오늘 밤 소유에게서는 빵집 같은 냄새가 났다. 사과 향과 그 아래 은근하게 감도는 달콤하게 졸인 설탕 냄새, 여전히 몸에 배어 있는 목욕의 잔향, 그리고 그 밑바닥에 아주 옅게 깔린 소유 특유의 레몬 냄새까지. 디저트 같은 냄새를 풍기는 사람한테 잔소리를 듣는 건 몹시 불공평한 일이었다.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/cfb6085911767ca5.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그거랑 이건 달라,"</span> 세연이 말하는 순간 끝음이 살짝 올라갔고, 그녀는 스스로도 분위기를 망쳤다는 걸 알아챘다. 헛기침을 한 번 하고 말을 이었다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"네 건 공개 선언이었잖아. 시리한테 읽게 시키기까지 했고. 소리 내서. 그것도 거실에서."</span> 숨을 들이켰다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"내 건 아카이브야. 아카이브는 조용한 거라고. 재미로 아카이브를 읽는 사람은 없어."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">사실 세연은 애초에 누구에게 이걸 보여줄 생각조차 없었다. 적어도 지금은 아니었다. 그녀가 막연히 머릿속에 그렸던 건 아득히 먼 훗날의 어느 저녁이었다. 이를테면 기념일이라거나, 소유의 손이 차가워지고 말문이 막혀버리는 어떤 힘겨운 날, 그럴 때 이 파일을 열어 한 줄 한 줄 약처럼 천천히 읽어주는 그런 밤. 그 버전의 저녁에는 나름의 품격이 있었다. 반면 지금 버전의 저녁은 머리카락이 빳빳하게 곤두서 있을 뿐이다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"게다가 난,"</span> 세연이 덧붙였다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"짓지도 않았다고 여전히 주장하는 죄를 두고 봐주는 거잖아."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그녀의 엄지손가락이 다시 자판 위로 슬그머니 미끄러져 내려갔다. 손끝의 감각으로 줄 끝을 찾아 새로운 항목을 추가하는 단축키를 눌렀다. 그리고 마음이 바뀌어 취소하기 전에, 조용한 방 안에 가벼운 타건음이 또렷하게 울리도록 침착하고 군더더기 없는 손놀림으로 입력했다. 내 뺨에 볼을 부비며 방금 착하다는 칭찬을 들은 강아지처럼 고개를 흔든다. 강아지 같다는 말은 부정하겠지.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">저장 버튼을 누르자, 짧은 확인음이 맑게 울렸다.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/3aeb8bd6f5950479.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"자,"</span> 세연이 말했다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"이제 너도 증거물이야."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그러고는 어깨 곁에 여전히 남아 있는 소유의 온기가 느껴졌기에, 또 방금 전 물음에는 대답할 가치가 충분했기에, 세연은 그 온기를 향해 고개를 돌려 소유의 팔에 잠시 뺨을 기댔다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"《가든파티》. 그거 먼저 읽어."</span> 손가락이 잠옷 단에서 떨어져 나와 소유의 소매를 찾아갔고, 분홍색 테두리 장식을 매만지며 부드러운 흰 면직물을 엄지와 검지로 살살 비볐다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"《블리스》도 아름답긴 하지만, 배나무로 끝나버려서 책을 집어 던지고 싶어질 거야. 밤 11시에 내 맨스필드 전집을 던지는 꼴은 보고 싶지 않거든. 로라는 적어도 골목을 내려가서 진짜 무언가를 보게 되니까. 그것도 슬프긴 해. 하지만 감당할 수 있는 슬픔이야."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 잠시 입을 다물었다. 커서는 그녀가 볼 수 없는 어딘가에서 깜빡이고 있었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그리고 모자가 나오는 부분까지 읽으면,"</span> 그녀가 한결 낮고 부드러운 목소리로 말했다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"날 찾아와. 내 생각을 말해주기 전에 네가 어떻게 느꼈는지 먼저 듣고 싶어. 넌 항상 내가 놓친 걸 찾아내니까."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 눈을 감은 채 얼굴을 들어 올렸다. 그리고 이번에는 새처럼 살짝 쪼아대는 것이 아닌 진짜 입맞춤을, 누가 보아도 명백하게 기다렸다.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/da9d13e9bcc70fe9.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
  </div>
</div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 20px auto 0px; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연의 사랑스러운 몸짓에 미소 지으며, 이번에는 그녀에게 진짜 키스를 해 주었다. 약간의 수줍음으로 따스하고 마시멜로처럼 부드러운 입술, 입을 맞출 때마다 매번 새롭게 느껴지며 내 가슴을 간질이는 포근한 살결 냄새를 풍기는 입술이었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">함께 충분히 온기를 나눈 뒤, 나는 세연을 부드럽게 이끌어 나와 함께 침대에 누이며 말했다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"이렇게 말랑한 입술이라니, 딱 키스해 달라고 조르는 거잖아."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그리고 오늘의 모든 사랑을 쏟아붓듯, 다시 한번 그녀에게 깊게 입을 맞췄다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"내일은 커피 한잔 마시면서 가든 파티 읽어야지~ 어쩌면 블리스까지 다 읽을지도 몰라. 히히, 너무 좋다. 나 혼자만 간직하는 감상평이 아니라~ 문학소녀인 내 여자친구가 기다려 주는 내 독후감이라니!"</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그러고는 세연의 품에 파고들며, 내가 속삭였다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"사랑해, 내 사랑."</span></p>
  </div>
</div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 20px auto 0px; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <div class="bp-risu"><form class="vn-form">
  <div class="vn-container">
    <input type="radio" name="vn-route" class="vn-hidden-input route-init" checked>
    <div class="vn-bg vn-bg-base" style="background-image: url('/assets/img/posts/risu/aea844a1a4e88ed7.jpg');"></div>
    <div class="vn-bg vn-bg-route1" style="background-image: url('/assets/img/posts/risu/e1fa7c3d891426ca.jpg');"></div>
    <div class="vn-bg vn-bg-route2" style="background-image: url('/assets/img/posts/risu/204bdff124be32bd.jpg');"></div>
    <div class="vn-name name-base">세연</div>
    <div class="vn-name name-route1">세연</div>
    <div class="vn-name name-route2">소유</div>
    <label class="vn-dialogue dialogue-base"><input type="checkbox" class="vn-hidden-input toggle-base">
      <div class="vn-dialogue-content">
        <div class="text-default">2026년 10월 17일 토요일, 오후 10:24</div>
        <div class="text-clicked">세연 : 부드러운 니트 커프스가 달린 크림색 순면 잠옷 세트 / 소유 : 핑크 포인트가 들어간 순백색 잠옷</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route1"><input type="checkbox" class="vn-hidden-input toggle-route1">
      <div class="vn-dialogue-content">
        <div class="text-default">세연의 침대, 소유를 안은 채 반듯하게 누워 소유의 왼손과 깍지를 끼고 있다.</div>
        <div class="text-clicked">배나무 장면에 이르면 책을 던져버릴 테고, 난 소유를 안아주겠지.</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route2"><input type="checkbox" class="vn-hidden-input toggle-route2">
      <div class="vn-dialogue-content">
        <div class="text-default">세연의 침대, 세연의 품에 파고들어 세연의 배 위에 손을 얹고 있다.</div>
        <div class="text-clicked">세연이 심장 소리는 내가 제일 좋아하는 수면 플레이리스트~</div>
      </div>
    </label>
    <button type="reset" class="vn-reset-btn">❈</button>
    <div class="vn-choices">
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-1">세연</label>
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-2">소유</label>
    </div>
  </div>
</form></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">두 사람의 무게에 매트리스가 푹 꺼져 들어갔고, 세연은 조금 전 소유의 옷깃 프릴을 쥐었던 손을 그대로 둔 채 순순히 아래로 눕혀졌다. 목덜미에 닿는 시트는 서늘했다. 하지만 소유의 온기는 그렇지 않았다. 면직물 아래 여태 갇혀 있던 목욕의 열기가 온몸의 선을 따라 일시에 쏟아져 들어왔고, 그와 함께 오늘 밤 물에 무얼 풀었든 간에 그 향기가 풍겨왔다. 구운 사과, 흑설탕, 오븐 문가에 너무 오래 놓아둔 페이스트리 같은 냄새. 그리고 그 아래, 아주 희미하게 모든 것 밑에 깔린 채 오롯이 소유에게서만 나는 레몬과 사과 향기.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">디저트 냄새가 나. 트집 잡을 만한 그럴듯한 이유 같았지만, 세연은 아무런 불평도 하지 않았다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">두 번째 입맞춤은 첫 번째보다 느렸다. 세연은 그대로 두었다. 방 저편 어디선가 한소네가 낮게 공회전하는 소리를 내고 있었고, 문장 도중에 팽개쳐 둔 파일은 책상 위에서 여전히 열려 있었지만, 이제는 누가 읽든 조금도 상관없다는 생각이 들었다.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/f4e80cc0f49aa310.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">소유가 품 안으로 파고들자, 세연은 오랜 세월에 걸쳐 익혀온 방식으로 온전히 끌어안았다. 가느다란 어깨 밑으로 팔 하나를 밀어 넣고, 다른 팔은 허리 아래를 감싸 안았으며, 소유의 아직 젖은 머리칼을 턱 밑에 파묻게 했다. 목욕 탓에 몇 가닥이 아직 엉켜 붙어 있었다. 세연은 멍하니 두 손가락으로 그 머리칼을 빗어 넘겼고, 모든 상황이 일단락되었다고 판단한 고양이처럼 제 품에서 힘을 빼며 묵직해지는 소유를 느꼈다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"<span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: normal !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">'가든파티'</span> 먼저야."</span> 머리카락에 대고 그녀가 말했다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그다음이 <span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: normal !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">'블리스'</span>. 순서 바꾸면 안 돼."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">거기서 말을 끝낼 수도 있었다. 하지만 그러지 않았다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"<span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: normal !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">'블리스'</span>는 결말이 방 건너편으로 책을 집어던지고 싶어지게 끝나거든. 네가 배나무 장면에 도달할 때 곁에 있고 싶어."</span> 엄지손가락이 잠옷 상의 너머로 소유의 척추뼈 옹이를 찾아내 그 위에 얹혔다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그러니까 내 옆에서 읽어야 해. 카페도 안 되고, 기차 안도 안 돼. 여기서, 이야기에 배신당했을 때 네가 내는 그 특유의 작은 소리를 들을 수 있는 곳에서."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">이기적인 부탁이었다. 알면서도 그렇게 말했다.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/c8f2c865f009e451.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><em style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important; margin-right: 0.08em;"><span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">달링</span></em>이라는 단어가 아직 갈비뼈 밑 어딘가에 따뜻하게 머물러 있었고, 그걸 어떻게 대해야 할지 잘 몰랐기에 그녀는 갈피를 잡을 수 없는 것들을 마주할 때 으레 하듯 했다. 잠시 품고 있는 것. 암막 커튼 너머 바깥 젖은 도로 위로 차 한 대가 지나가며 타이어의 마찰음이 길게 늘어지다 사라졌다. 10월에는 내내 비가 짧고 얌전하게 쏟아지기를 반복했다. 내일은 미사, 그다음엔 커피, 그리고 소유가 화를 내게 될 무슨 책이든 간에.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그리고 기다릴게."</span> 그녀가 한층 잦아든 목소리로 덧붙였다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"감상평. 제대로 된 걸로. 그저 <span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: normal !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">'예뻤어, 세연아.'</span> 같은 거 말고. 어떤 문장에 밑줄을 긋고 싶었는지 말해줘."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 소유의 정수리에 입술을 대고 가만히 떼지 않았다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"나도 사랑해."</span> 그러고는 그 말만 홀로 남겨두기엔 너무 왜소하게 느껴졌기에 덧붙였다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"내 달링. 너한테 그런 말을 그렇게 쉽게 하도록 가르친 사람은 잡아가야 해."</span></p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/b59f176bda20bfe1.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연의 빈 손이 천천히 아래로 미끄러져 배 위에 얹힌 소유의 왼손을 찾았고, 넷째 손가락에 감긴 익숙하고 얇은 반지에 닿았다. 누군가 무심코 묵주알을 굴리듯 반지를 천천히 한 바퀴 돌려본 뒤, 따뜻한 면직물 위로 둘의 손가락을 얽어 깍지를 꼈다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그냥 있어."</span> 그녀가 말했다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"한소네 따위는 알아서 저장되겠지."</span></p>
  </div>
</div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 20px auto 0px; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">다음 날, 콜드 브루를 한잔 마시러 들렀던 브루클런스에서 《가든파티》를 다 읽고 난 뒤에도, 오후 5시에 집에 돌아올 때까지 뭐라 말해야 할지 모를 감정에 여전히 사로잡혀 있었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">문을 열었다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"나 왔어~ 자기야~"</span> 하고 부르는 내 목소리조차 평소의 활기가 조금 빠져 있었다. 손을 씻고 《가든파티》가 실린 작품집을 책장에 꽂아 둔 뒤, 나는 거실 소파에 있는 세연의 품으로 조용히 파고들었다.</p>
      <p style="margin: 0px 0px 11px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"…힝."</span></p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"앞부분만 읽었을 땐 로라가 너랑 정말 많이 닮았다고 생각했거든. 특히 속으로 혼잣말하면서 안절부절못하는 모습 같은 게 말이야. 하지만 엉뚱한 면은 나랑 조금 닮았을지도 모르겠네… 나도 아주 조금은 맹한 구석이 있으니까."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그러고는 코를 훌쩍이며 입술을 살짝 삐죽 내민 뒤, 말을 이었다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"이 기세라면 오늘 《블리스》까지 읽을 수 있지 않을까? 싶었는데… 하지만…"</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">마차꾼이 죽었고, 로라는 파티에서 남은 음식을 적선하듯 가져다주어야 한다는 것에 괴로워하며—정확히는, 그걸 그렇게 이상하게 여기는 사람이 자기 혼자뿐이라는 사실에 괴로워하며 아래로 내려갔다. 그리고 그곳에 도착해서는… 스콧 부인의 오두막으로 향한다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"…지금의 난 그저 어찌할 바를 모르는 스페인 여인일 뿐이야… 모자를 쓰고 있진 않지만, 《블리스》보다는 지금 내게 진짜 필요한 건 여자친구의 포옹이야…"</span></p>
  </div>
</div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 20px auto 0px; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <div class="bp-risu"><form class="vn-form">
  <div class="vn-container">
    <input type="radio" name="vn-route" class="vn-hidden-input route-init" checked>
    <div class="vn-bg vn-bg-base" style="background-image: url('/assets/img/posts/risu/aea844a1a4e88ed7.jpg');"></div>
    <div class="vn-bg vn-bg-route1" style="background-image: url('/assets/img/posts/risu/e1fa7c3d891426ca.jpg');"></div>
    <div class="vn-bg vn-bg-route2" style="background-image: url('/assets/img/posts/risu/204bdff124be32bd.jpg');"></div>
    <div class="vn-name name-base">세연</div>
    <div class="vn-name name-route1">세연</div>
    <div class="vn-name name-route2">소유</div>
    <label class="vn-dialogue dialogue-base"><input type="checkbox" class="vn-hidden-input toggle-base">
      <div class="vn-dialogue-content">
        <div class="text-default">2026년 10월 18일 일요일 오후 5:08</div>
        <div class="text-clicked">세연 : 부드러운 파스텔 핑크 블라우스 위에 걸친 크림색 니트 가디건, 긴 베이지색 스커트 / 소유 : 연보라색 니트 탑, 크림색 와이드 팬츠</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route1"><input type="checkbox" class="vn-hidden-input toggle-route1">
      <div class="vn-dialogue-content">
        <div class="text-default">거실 소파, 소유를 가슴에 품고 손을 녹여주며, 무릎 위에 엎어둔 책</div>
        <div class="text-clicked">어떤 이야기는 굳이 이야기 나누지 않는다. 그저 누군가가 그 이야기에서 무사히 돌아오게 해 줄 뿐.</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route2"><input type="checkbox" class="vn-hidden-input toggle-route2">
      <div class="vn-dialogue-content">
        <div class="text-default">거실 소파, 세연의 품 안, 세연의 가슴에 파묻힌 채 세연의 손에 포개어진 손</div>
        <div class="text-clicked">로라도 길 끝에서 포옹을 받았잖아, 그렇지?</div>
      </div>
    </label>
    <button type="reset" class="vn-reset-btn">❈</button>
    <div class="vn-choices">
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-1">세연</label>
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-2">소유</label>
    </div>
  </div>
</form></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">문은 다섯 시에 열렸고, 그 너머로 들려온 목소리는 그 사람의 목소리가 맞았지만 어딘가 어긋난 무게감이 실려 있었다. 마치 종이봉투에 담아 집까지 들고 오는 동안 눅눅하게 풀어져 버린 것처럼. 세연은 읽고 있던 점자 한 줄 위에 손가락을 얹어둔 채, 더는 읽지 않았다. 욕실에서 물 흐르는 소리가 났다. 서재 문이 레일을 따라 스르륵 밀리더니, 이내 책 한 권이 꽂히는 소리가 들렸다. 어느 칸에 꽂혔는지 알아차릴 수 있을 만큼 단호한 소리였다. 앤솔러지들이 자리 잡은 두 번째 선반.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">이윽고 소파가 푹 꺼지며, 소유가 날씨처럼 그녀의 품으로 스며들었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 무릎 위에 책을 엎어놓고 미처 생각하기도 전에 두 팔을 벌렸다. 소유에게서는 바깥 냄새가 났다. 머리칼에 배어든 10월의 공기, 콜드브루의 희미한 쌉싸름함, 그리고 그 아래 여전히 맴도는, 늘 풍기던 레몬과 사과 향기. 그녀의 뺨은 서늘했다. 한 손이 세연의 가디건 소매를 찾아내더니 어린아이가 난간을 붙잡듯 꼭 쥐었다.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/f1bb69fb7ee0fd82.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 가만히 귀를 기울이며 책을 그대로 놓아두었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그 스페인 여자. 기억 속에서 찾아내는 데는 잠깐의 시간이 걸렸지만, 이내 떠올랐다. 오두막 문간에 선 로라, 여동생의 망가진 작은 얼굴, 어두운 복도, 램프 그을음 냄새가 풍기던 부엌. 파티 음식이 든 바구니를 들고 우스꽝스럽고도 아름다운 모자를 쓴 채, 자신을 원치도 않았던 사람들 사이에 서 있던 로라. 세연은 열다섯 살 때 손목에 닿는 낡은 점자단말기의 웅웅거림을 느끼며 그 작품을 읽었었고, 뇌리에 박혀 남았던 것을 기억했다. 로라가 죽은 남자에게 모자에 대해 사과하던 그 순간을.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 한쪽 팔로 소유의 등을 감싸고 다른 손으로는 짧은 단발머리가 끝나고 목덜미의 따뜻한 살결이 시작되는 뒤통수를 감싸 쥐며 그녀를 더 가까이 끌어안았다. 그곳에 턱을 얹고 숨을 들이쉬었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"이리 와,"</span> 더 가까이 다가올 틈도 없는데 세연이 속삭였다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"모자는 필요 없어."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">모루가 엉덩이 근처 어딘가에 닿았다. 손가락 끝으로 모루를 찾아낸 세연은 군더더기 없이 옆으로 치워두었다. 거실의 수호신 노릇은 당분간 팔걸이에서 해도 될 것이다.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/c9c4bab9e854bb29.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">오늘 밤 이야기하려 했던 맨스필드의 소설, 겹겹이 쌓인 샌드위치와 백합이 핀 잔디밭, 길 끝에서 기다리던 오빠의 이야기는 한층 더 고요한 무언가로 형태를 바꾸었다. 설명하려면 얼마든지 할 수 있었다. 계급과 맹목, 자신의 특권을 바구니처럼 챙겨 언덕을 내려가다 도중에 그것이 더 무겁다는 것을 깨닫는 소녀에 관한 비평문들을 훤히 꿰고 있었으니까. 하지만 소유에게 필요한 건 강의가 아니었다. 길 끝에서 로리가 로라에게 내어주었던 것, 아무런 질문도 묻지 않는 팔 하나였다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"내가 항상 좋아했던 부분이 뭔지 알아?"</span> 세연이 소유의 머리칼에 속삭였다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"로라가 말을 끝까지 맺지 않는다는 거야. 저 아래까지 내려갔다가 다시 돌아오는 내내, 결국 인생이 무엇인지 끝내 말하지 못하잖아. 그리고 그녀의 오빠도 억지로 캐묻지 않고."</span> 세연은 소유가 오늘 입고 나갔던 옷의 부드러운 천 위로 소유의 견갑골 사이를 천천히 둥글게 쓸어내렸다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그냥 <span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: normal !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">'그렇지 않니, 얘야.'</span>라고만 해 주지. 마치 다 이해한다는 듯이. 어쩌면 이해하지 못했을지도 몰라. 하지만 그래서 더 다정한 거였을지도."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연의 쇄골에 닿은 곳에서 작게 훌쩍이는 소리가 났다. 반은 훌쩍임이고, 반은 다른 무언가였다. 세연은 소유의 정수리에 입술을 대고 그대로 머물렀다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"Bliss(환희)는 나중에 봐도 돼,"</span> 세연이 말했다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"어차피 오늘 어울리는 이야기도 아니야. 배나무가 너무 많거든."</span> 세연은 소유의 익숙한 등뼈 능선을 손가락 끝으로 더듬으며 팔에 힘을 주어 꼭 안았다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"오늘은 네 것도 아닌 장례식에서 돌아온 날이잖아. 그러니까 여기 가만히 있어. 그 기괴한 기분이 가실 때까지 안아줄 테니까. 아니면 배가 고파질 때까지든. 어느 쪽이든 먼저 오는 쪽으로."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연의 다른 한 손이 소유의 팔을 타고 미끄러져 내려가 손가락에 닿았다. 예상대로 서늘한 손가락이었다. 세연은 그 손을 자신의 따뜻한 손바닥 안에 감싸 쥐었고, 두 사람 사이에서 은반지가 작고 단단하게 맞닿았다.</p>
  </div>
</div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 20px auto 0px; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연의 손이 차가워진 내 손가락에 점차 온기를 불어넣어 주자, 나는 조금 머뭇거리며 말문을 열기 시작했다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"줄거리랑은 아무 상관없는 얘기지만… 비누거품 한 무더기가 하늘로 예쁘게 떠올라 두둥실 흘러가다가—퐁… 하고 터져버린 것 같았어. 죽은 남자의 아내는 한마디도 안 하는데, 두 번이나 용서를 구하던 그 자매의 대사는 왜 그렇게 머릿속에 맴돌았을까? 전반부는 훨씬 더 로라다웠고, 엄청 귀엽기도 했는데…"</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">캥거루 주머니 속에 얌전히 들어가 있는 새끼 캥거루처럼 세연의 품에 푹 안겨 있던 나는, 문득 창문을 거세게 때리기 시작한 굵은 빗줄기를 알아차렸다. 밖을 힐끗 내다보니, 이 광경이 묘하게도 가든 파티 속 한 장면처럼 느껴졌다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"밖은 어두침침하고 저녁이 내려앉아서 온통 푸르스름하고 칙칙한데, 우리 집은 따뜻한 조명이 켜져 있고, 네가 마시다 만 커피잔도 바로 저기 있고, 저쪽엔 내가 사 온 콜드브루도 있잖아. 세상이 둘로 쪼개진 것만 같아. 그냥 내가 가든 파티를 읽어서 그렇게 느끼는 걸지도 모르지만."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">그리고는 조금 기어들어가는 목소리로 칭얼거렸다.</p>
      <p style="margin: 0px 0px 20px; font-size: 14px !important; font-weight: 600; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; padding: 2px 8px; border-radius: 4px; -webkit-box-decoration-break: clone; font-size: 14px !important;">"나 꽉 안아주고, 네 귀염둥이라고 해줘…"</span></p>
  </div>
</div>
<div style="width: 100%; max-width: 750px; box-sizing: border-box; margin: 20px auto 0px; border: 1px solid rgb(232, 232, 232); border-radius: 16px; background-color: rgb(255, 255, 255); padding: 0px; overflow: hidden; overflow-wrap: anywhere; word-break: break-word; -webkit-text-size-adjust: 100% !important;">
  <div style="box-sizing:border-box; padding:clamp(20px,4vw,26px) clamp(16px,4vw,22px) clamp(24px,5vw,30px);">
    <div class="bp-risu"><form class="vn-form">
  <div class="vn-container">
    <input type="radio" name="vn-route" class="vn-hidden-input route-init" checked>
    <div class="vn-bg vn-bg-base" style="background-image: url('/assets/img/posts/risu/aea844a1a4e88ed7.jpg');"></div>
    <div class="vn-bg vn-bg-route1" style="background-image: url('/assets/img/posts/risu/e1fa7c3d891426ca.jpg');"></div>
    <div class="vn-bg vn-bg-route2" style="background-image: url('/assets/img/posts/risu/204bdff124be32bd.jpg');"></div>
    <div class="vn-name name-base">세연</div>
    <div class="vn-name name-route1">세연</div>
    <div class="vn-name name-route2">소유</div>
    <label class="vn-dialogue dialogue-base"><input type="checkbox" class="vn-hidden-input toggle-base">
      <div class="vn-dialogue-content">
        <div class="text-default">2026년 10월 18일 일요일 오후 5:24</div>
        <div class="text-clicked">세연 : 연분홍색 블라우스 위에 걸친 크림색 니트 가디건, 베이지색 롱스커트 / 소유 : 밝은 회색 후드티, 와이드 핏 청바지</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route1"><input type="checkbox" class="vn-hidden-input toggle-route1">
      <div class="vn-dialogue-content">
        <div class="text-default">거실 소파, 무릎 위에 소유를 꼭 껴안은 채, 소유의 뒤통수를 감싸 쥐고 있다.</div>
        <div class="text-clicked">그녀 역시 말을 끝맺을 필요가 없다.</div>
      </div>
    </label>
    <label class="vn-dialogue dialogue-route2"><input type="checkbox" class="vn-hidden-input toggle-route2">
      <div class="vn-dialogue-content">
        <div class="text-default">거실 소파, 세연의 무릎 위, 세연의 품에 웅크려 목덜미에 얼굴을 묻고 있다.</div>
        <div class="text-clicked">오늘 난 슬픈 바구니를 든 아이야.</div>
      </div>
    </label>
    <button type="reset" class="vn-reset-btn">❈</button>
    <div class="vn-choices">
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-1">세연</label>
      <label class="vn-choice-btn"><input type="radio" name="vn-route" class="vn-hidden-input route-2">소유</label>
    </div>
  </div>
</form></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">10월의 비가 때로 그러하듯, 비는 몇 방울 먼저 떨어져 주는 기척도 없이 일제히 쏟아져 내렸다. 세연은 빗줄기가 베란다 창문을 긴 쉭 소리와 함께 때리더니, 이내 거실 구석구석을 채우는 일정한 북소리 같은 울림으로 잦아드는 것을 들었다. 가슴에 닿아 있는 소유의 손가락이 마침내 비벼주지 않아도 될 만큼 따뜻해지자, 세연은 그저 두 손으로 그 손을 감싸 쥐고 놓지 않았다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 소유가 말하려는 그 감정이 무엇인지 알고 있었다. 열여섯 살 때, 이불 밑에서 점자로 그 소설을 읽다가 마지막 장에 이르러 아무 말도 잇지 못했을 때 세연 역시 직접 겪어본 감정이었다. 파티, 백합꽃, 카라카나무 그늘 아래의 악단, 크림 퍼프, 그리고 이어진 좁은 골목길과 모자를 쓴 소녀 따위는 아무 소용도 없다는 듯한 한 여인의 슬픔이 서린 어두컴컴하고 작은 방.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">여동생의 사과 역시 뇌리에 남아 있었다. 아가씨, 언니를 용서하세요. 누구에게도 필요치 않은 바구니를 들고 온 사람을 향해 두 번이나 건네진 말.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/474768ee9f953fa1.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그게 기억에 남는 건,"</span> 세연이 천천히 입을 열었다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"엉뚱한 사람에게 사과하고 있어서인 것 같아. 남편을 잃은 건 언니인데, 미안하다고 말하는 건 그 여동생이잖아. 로라에게. 슬픔이 충분히 예의 바르지 못해서 죄송하다고."</span> 세연은 입안에서 돌멩이처럼 차갑고 매끄러운 그 말들을 가만히 굴려보았다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"맨스필드는 그게 친절인지 습관인지 끝내 알려주지 않아. 어쩌면 둘 다일지도 모르지. 그 골목 사람들은 자리를 차지하고 서 있는 것만으로도 사과하는 데 너무 익숙해져 있으니까."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 말을 멈추었다. 마지막 말이 생각했던 것보다 너무 깊숙이 와닿았고, 품 안의 소유가 조금 굳어지는 것이 느껴졌기 때문이었다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">창밖, 송이공원 옆길로 자동차 한 대가 아스팔트의 물기를 튕겨내며 지나갔다. 소파 옆 스탠드 조명은 세연의 감각 언저리에서 부드럽고 따스한 얼룩처럼 번져 있었는데, 방 안에서 그녀가 좇을 수 있는 유일한 빛이었다. 식어버려 이제는 희미하게 씁쓸한 냄새를 풍기는 커피 향이 맡아졌고, 그 아래로는 어젯밤 목욕 후 소유의 머리카락에 여태 남아 있는 달콤한 사과 향, 그리고 탁자 위 어딘가에서 이슬이 맺히고 있을 콜드브루의 기운이 느껴졌다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"세상이 둘로 쪼개진 것 같다라,"</span> 세연이 중얼거렸다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"응. 로라는 한 번도 그 언덕을 내려가 본 적이 없었기 때문에 그걸 그렇게 뼈저리게 느낀 거야. 그리고 마지막엔 차마 말을 맺지도 못하잖아. <em style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important; margin-right: 0.08em;"><span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">인생이란 참……</span></em> 그러자 로리가 말하지. <em style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important; margin-right: 0.08em;"><span style="color: rgb(118, 91, 96) !important; -webkit-text-fill-color: rgb(118, 91, 96) !important; font-style: italic !important; font-weight: inherit !important; font-size: 14px !important; line-height: inherit !important; font-family: inherit !important; -webkit-text-size-adjust: 100% !important;">그렇지, 얘야.</span></em>"</span> 세연의 엄지손가락이 소유의 손가락 마디를 따라, 반지를 넘어 스쳐 지나갔다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"로리는 굳이 끝까지 말하게 채근하지 않아. 난 늘 그 점 때문에 로리가 참 좋았어."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 자꾸 흘러내리는 담요를 끌어모으듯 소유를 품 안 가득 끌어당겨 두 팔로 감싸 안았다. 다정하게가 아니라, 소유가 원했던 대로 세게, 제 갈비뼈에 닿는 소유의 얕은 숨결과 목덜미를 파고드는 차가운 코끝이 느껴질 만큼 꽉 끌어안았다.</p>
    <div style="margin: 22px 0px; line-height: 0; font-size: 0px !important; text-align: center;"><img src="/assets/img/posts/risu/472f349180b31b7a.png" alt="" class="fr-fic fr-dib" style="width:40%; max-width:100%; height:auto; display:block; border-radius:10px; margin:0 auto;"></div>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"오늘 꼭 감상을 다 정리해 둘 필요는 없어,"</span> 세연이 소유의 머리칼에 대고 속삭였다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"그냥 슬픈 바구니를 들고 집에 돌아온 사람이어도 돼."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">빗줄기가 굵어졌다. 뒤쪽 베란다 어딘가에서 나지막한 풍경이 한 번 흔들리더니, 이내 고요해졌다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">세연은 온기가 고스란히 전해질 만큼 소유의 귓가 가까이 입술을 내렸다.</p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;"><span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"내 귀염둥이."</span> 관자놀이께 부드러운 단발머리 바로 아래에 입을 맞추었다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"이야기 하나를 읽고 마음이 비에 젖어버린 내 귀염둥이."</span> 조금 더 아래쪽에 다시 한번 입맞춤이 내려앉았다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"로라의 마음을 주머니에 가득 담은 채 BJÖRKLUND에서부터 집까지 걸어온 아이."</span> 세연은 두 팔을 한 번 더 조이며, 서두르는 기색 없이 두 사람의 몸을 가만가만 흔들었다. <span style="background-color: rgb(244, 244, 244); color: rgb(186, 105, 121) !important; -webkit-text-fill-color: rgb(186, 105, 121) !important; font-size: 14px !important; font-weight: 600; line-height: 1.7; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; -webkit-text-size-adjust: 100% !important;">"내 사람이야. 이런 모습이어도. 이런 모습이라 더더욱."</span></p>
    <p style="margin: 0px 0px 20px; color: rgb(95, 82, 84) !important; font-size: 14px !important; font-weight: 400; line-height: 1.7; letter-spacing: -0.2px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-fill-color: rgb(95, 82, 84) !important;">창문 너머 저녁이 푸르스름하고 칙칙하게 물들어가는 동안, 세연의 손은 소유의 뒤통수에 닿아 그대로 머물며 감싸 쥐고 있었다.</p>
    <div style="margin-top: 28px; padding-top: 14px; text-align: center; color: rgb(192, 192, 192) !important; font-size: 10.5px !important; line-height: 1.5 !important; letter-spacing: 0.3px; font-family: Noto Sans KR, Nanum Gothic, Apple SD Gothic Neo, Malgun Gothic, Arial, sans-serif; -webkit-text-size-adjust: 100% !important; -webkit-text-fill-color: rgb(192, 192, 192) !important;"><a href="https://arca.live/b/characterai/176749943" target="_blank" rel="noopener noreferrer" style="color: rgb(192, 192, 192) !important; -webkit-text-fill-color: rgb(192, 192, 192) !important; text-decoration: none !important; font-size: 10.5px !important; line-height: 1.5 !important; -webkit-text-size-adjust: 100% !important;"><span style="color: rgb(192, 192, 192) !important; -webkit-text-fill-color: rgb(192, 192, 192) !important; text-decoration: none !important; font-size: 10.5px !important; line-height: 1.5 !important; -webkit-text-size-adjust: 100% !important;">조각로그</span></a> <span style="color: rgb(192, 192, 192) !important; -webkit-text-fill-color: rgb(192, 192, 192) !important; font-size: 10.5px !important; line-height: 1.5 !important; -webkit-text-size-adjust: 100% !important;">©SY</span></div>
  </div>
</div>
