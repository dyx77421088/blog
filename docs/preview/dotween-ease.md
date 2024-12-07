---
title: Dotween的曲线
createTime: 2024/12/07 16:15:14
permalink: /article/dbuei2ub/
---

**代码演示：**

::: normal-demo Demo 演示

```html

<html lang="zh-cn" dir="ltr" class="js-focus-visible" data-js-focus-visible=""><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"><meta http-equiv="x-ua-compatible" content="ie=edge"><title>缓动函数速查表</title><meta content="使用正确的缓动函数，让动画效果更加真实。" name="description"><meta name="theme-color" content="#1473e6"><link rel="manifest" href="manifest.zh-cn.json"><link rel="icon" type="image/png" href="96.8aa68ac4.png"><link rel="mask-icon" href="mask.f6b15f2c.svg" color="#1473e6" sizes="any"><meta property="og:url" content="http://easings.net/"><meta property="og:image" content="https://easings.net/192.c6b79276.png"><meta property="og:description" content="缓动函数可以自定义动画在执行中的速度 使得物体的移动更加自然。现实生活中， 物体当然不是匀速移动，同样也不会立刻启动或结束。 这个页面将帮助你选择正确的缓动函数。"><style>:root{--main-background:#f8f8f8;--main-text-color:#222;--second-background:#fff;--second-background-transparent:hsla(0,0%,100%,0);--brand-color:#1473e6;--brand-color-text:#fff;--brand-darken-color:#095aba;--brand-darken-color-text:#fff;--brand-lighten-color:#2680eb;--second-color:#247b5e;--gray-color:#6e6e6e;--gray-lighten-color:#cacaca;--button-background-color:var(--brand-color);--footer-link-color:var(--brand-darken-color);--function-shadow:rgba(0,0,0,0.05);--function-shadow-active:rgba(0,0,0,0.2);--card-overlay:rgba(0,0,0,0.7);--card-overlay-text:#fff;--transparent-color:transparent;--transparent-color-5:rgba(0,0,0,0.05);--transparent-color-20:rgba(0,0,0,0.2);--transparent-invert-color:hsla(0,0%,100%,0);--transition-time:0.2s;--transition-small-time:0.1s;--transition-card-time:1s;--transition-show-time:1.5s;--line-height:1.4;--line-height-code:1.5;--general-line-height:22px;--code-fonts:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}:root.is-dark{--main-background:#222;--main-text-color:#fff;--second-background:#111;--second-background-transparent:rgba(17,17,17,0);--brand-color:#227dec;--second-color:#298e6d;--button-background-color:#136edd;--footer-link-color:#4993ee;--function-shadow:hsla(0,0%,100%,0.05);--function-shadow-active:hsla(0,0%,100%,0.2);--transparent-color:hsla(0,0%,100%,0);--transparent-color-5:hsla(0,0%,100%,0.05);--transparent-color-20:hsla(0,0%,100%,0.2);--transparent-invert-color:transparent}html{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:system-ui,-apple-system,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;font-size:100%;color:var(--main-text-color)}body,html{line-height:var(--line-height)}body{position:relative;box-sizing:border-box;background:var(--main-background);margin:0}a{color:var(--brand-color);text-decoration:none;transition:var(--transition-time);outline:none;border-bottom:1px solid}a:focus,a:hover{color:var(--brand-darken-color)}a:active{color:var(--brand-color);transition:none}a.j{box-shadow:0 0 1px 4px var(--brand-color)}pre{font-family:var(--code-fonts);margin:0;-moz-tab-size:25px;-o-tab-size:25px;tab-size:25px}.k{color:var(--brand-color)}.l{color:var(--second-color)}.m{overflow:hidden;padding:env(safe-area-inset-top,0) env(safe-area-inset-right,0) env(safe-area-inset-bottom,0) env(safe-area-inset-left,0)}.n,.o{position:absolute;clip:rect(0 0 0 0);width:1px;height:1px;margin:-.0625rem}.p{box-sizing:border-box;width:100%;margin:0 auto;max-width:1050px;padding:0 .9375rem}.q,.p{position:relative}.r{font-family:inherit;font-size:100%;margin:0;border:none;overflow:visible;text-transform:none;outline:none;height:auto;box-sizing:border-box;position:relative;background:var(--button-background-color);color:var(--brand-color-text);font-stretch:100%;font-weight:500;text-align:center;text-decoration:none;line-height:var(--line-height);padding:1em 1.25em;display:inline-block;border-radius:0;cursor:pointer;box-shadow:0 2px 8px var(--transparent-color-5)}.r,.r:after{transition:var(--transition-time)}.r:after{content:"";position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;pointer-events:none;box-shadow:0 0 1px 4px var(--brand-color);opacity:0}.r:focus,.r:hover{background:var(--brand-darken-color);color:var(--brand-darken-color-text)}.r:active{background:var(--brand-color);transition:none}.r.j{box-shadow:none}.r.j:after{opacity:1}.s{font-size:.875rem;padding:.75em 1em}.t{height:1em;vertical-align:middle;transform:translateY(-10%);display:inline-flex;align-items:center}.u{flex:0 0 auto;width:24px;height:24px;display:block;fill:currentColor}.v{width:16px;height:16px}.w{padding:calc(var(--general-line-height)/2) 0;display:flex;align-items:flex-start}.x{width:100%;max-width:900px;padding:0 calc(2*var(--general-line-height)) 0 0}[dir=rtl] .x{padding:0 0 0 calc(2*var(--general-line-height))}.x p{margin:0;padding:0 0 calc(var(--general-line-height)/2)}.y{flex:0 0 auto}.z{margin:0 0 calc(var(--general-line-height)/2);position:relative;text-align:center;border:none;text-decoration:none}._{background:var(--second-background);padding:.625rem .9375rem}.aa{width:1px;min-width:100%;box-sizing:border-box;padding:.3125rem 0 0}.ab{box-sizing:border-box;width:100%;margin:0 auto;max-width:1050px;padding:1.25rem .9375rem .9375rem}.ac{display:flex;flex-wrap:wrap;flex-direction:row-reverse;justify-content:space-between;align-items:baseline}.ac:before{content:"";order:1;flex:3 1 auto}.ae{order:2;margin:0 auto .3125rem;text-align:center}.af{order:-1}.ag{margin:0 0 .3125rem 1.25rem}[dir=rtl] .ag{margin:0 1.25rem .3125rem 0}.ag select{font-size:.85rem}.ah{color:var(--footer-link-color)}.ai{box-sizing:border-box;padding:.25rem 0 0;transition:var(--transition-time)}.aj{position:absolute;left:0;right:0;opacity:0;visibility:hidden}.ak{align-items:flex-start;margin:0 -.9375rem}.al,.ak{display:flex;flex-wrap:wrap;justify-content:center}.al{align-items:stretch;width:calc(50% - var(--general-line-height));box-sizing:border-box;margin:0 calc(var(--general-line-height)/2) var(--general-line-height)}.am{opacity:0;visibility:hidden;transition:var(--transition-time);display:none;position:relative;z-index:2;margin:0 0 var(--general-line-height)}.an{opacity:1;visibility:visible}.ao{margin:0 0 var(--general-line-height)}[dir=rtl] .ap{transform:scaleX(-1)}.aq{display:flex;align-items:flex-start}.ar{box-sizing:border-box;padding:0 0 0 1.25rem;width:100%;flex:0 1 370px}[dir=rtl] .ar{padding:0 1.25rem 0 0}.as{flex:1 1 auto;width:1px;min-width:60%;max-width:800px;box-sizing:border-box;margin-top:-1rem}.at{font-size:2.625rem;font-weight:500;line-height:calc(2*var(--general-line-height));margin:0;padding:0 0 .25em}.au{position:relative;width:100%;padding:var(--general-line-height) 0 var(--general-line-height) .0625rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.av{padding-top:calc(2*var(--general-line-height))}.aw{position:relative;color:var(--gray-lighten-color);max-width:150px}.aw:after{content:"";position:absolute;top:0;right:0;bottom:-1px;left:-1px;border-left:1px solid;border-bottom:1px solid}.ax{fill:none;stroke:var(--brand-color);stroke-width:1px;stroke-linecap:round;overflow:visible;display:block}.ay{font-size:.875rem;position:absolute;top:1px;left:5px}.az{top:auto;left:auto;right:8px;bottom:4px}.a0{display:block;border:none;background:none;outline:none;width:100%;padding:0;position:absolute;top:0;right:0;bottom:0;left:0;z-index:1}.a1{position:absolute;top:100%;right:-17px;opacity:0;will-change:top;transition:top 0s,opacity 0s;transition-delay:0s,0s;transform:translateY(-5px)}.a2{opacity:1;top:1%;transition:top var(--transition-card-time),opacity var(--transition-time);transition-delay:var(--transition-time),0s}.a1:after{content:"";display:block;width:10px;height:10px;border-radius:0 50% 50% 50%;background:var(--brand-color);transform:rotate(-45deg)}.a3{width:calc(33.33333% - 10px);max-width:160px;box-sizing:border-box;padding:.9375rem .9375rem .5rem;margin:0 .3125rem .625rem;position:relative;outline:none;display:flex;flex-direction:column;background:var(--second-background);box-shadow:0 2px 8px var(--function-shadow)}.a3,.a3:after{transition:var(--transition-time)}.a3:after{content:"";position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;pointer-events:none;box-shadow:0 0 1px 4px var(--brand-color);opacity:0}.a3:active{box-shadow:0 2px 8px var(--function-shadow);transition:none}.a4:after,.a3.j:after{opacity:1}.a5{z-index:1;box-shadow:0 2px 8px var(--function-shadow-active)}.a6{margin:0 auto;outline:none;position:relative;width:100%;transition:none;border:none}.a6:after{display:none}.a6:active{transform:none;transition:none}.a7{padding:.75em 0 0;font-size:1rem;text-align:center;transition:var(--transition-time);margin:auto 0 0;position:relative;z-index:1}.a8{padding-left:25px;-moz-tab-size:25px;-o-tab-size:25px;tab-size:25px;display:inline-block}.a9{display:flex;max-width:107px;text-decoration:none;height:100%;min-height:70px}.a9:focus{box-shadow:none}.a-{position:relative}.a_{height:55px;margin-top:auto}.ba{height:55px}.bb{width:100%;min-width:50px;height:100%;overflow:visible;display:block;margin:0 auto}.bc{opacity:0;transition:var(--transition-time)}.be .bc{opacity:1}.bf{fill:none;stroke-width:1px;stroke:var(--gray-lighten-color)}.bg{fill:var(--gray-lighten-color);font-size:.625rem}.bh{fill:none;stroke-width:3px;stroke-linecap:round;transition:var(--transition-time);transform:translate(1px,-1px)}.ba .bh,.a_ .bh{stroke-width:4px}.bi{position:absolute;top:100%;right:-17px;opacity:0;will-change:top;transition:top 0s,color 0s,opacity 0s;transition-delay:0s,0s,0s;transform:translateY(-7px);color:var(--brand-color)}.bj{color:var(--main-text-color)}.bk,.bl{color:var(--brand-color)}.bi:after{content:"";display:block;width:10px;height:10px;border-radius:0 50% 50% 50%;background:currentColor;transform:rotate(-45deg)}.be .bi{opacity:1;top:1%;transition:top var(--transition-show-time),color var(--transition-show-time),opacity var(--transition-time);transition-delay:var(--transition-time),var(--transition-time),0s}.be .bj,.be .bk{color:var(--second-color)}.be .bl{color:var(--main-text-color)}.bm{font-size:1rem}.bm+.bm{padding:var(--general-line-height) 0 0}.bn{font-size:1.625rem;font-weight:500;line-height:calc(2*var(--general-line-height));margin:0;padding:0}.bo{padding:calc(var(--general-line-height)/2) 0;margin:-.125rem 0;overflow-x:auto;-webkit-overflow-scrolling:touch;direction:ltr;word-wrap:break-word;font-family:var(--code-fonts);font-size:.8125rem;line-height:var(--line-height-code)}.bp{max-width:100%;width:300px;height:200px;display:none;margin:0 0 calc(var(--general-line-height)/2) 0}.bq{position:relative}.br{position:absolute;top:10px;right:10px;z-index:2;opacity:0;visibility:hidden;transition:var(--transition-time)}.bq:hover .br{opacity:1;visibility:visible}.bs{display:block;width:15px;height:15px;fill:currentColor;transition:opacity var(--transition-small-time)}.bt{position:absolute;width:16px;height:16px;top:calc(50% - 8px);left:calc(50% - 8px)}.bu{opacity:0}.bv{display:block}.bw{font-size:1.375rem;line-height:calc(var(--line-height) - .2);margin:0;padding:0}.bx{display:flex;flex-wrap:wrap;align-items:flex-start;margin:0 calc(-0.25*var(--general-line-height));transition:.5s}.by{margin:calc(var(--general-line-height)/2) calc(var(--general-line-height)/4) 0}.bz{display:flex;flex-wrap:wrap;margin:0 calc(-0.5*var(--general-line-height))}.b0{padding:calc(1.5*var(--general-line-height)) calc(var(--general-line-height)/2) 0;min-width:200px;box-sizing:border-box;flex:1 1 auto}.b1{padding:0 0 calc(var(--general-line-height)/2)}.b2{position:relative;overflow:hidden}.b3{width:100%;display:block}.b4{position:absolute;z-index:1;top:0;right:0;bottom:0;left:0;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;background:var(--card-overlay);color:var(--card-overlay-text);box-sizing:border-box;padding:.625rem .9375rem;transition:var(--transition-card-time) linear}.b5{transition:none}.b6{opacity:0}.b7{transform:scale(0)}.b8{transform:translateX(-100%)}.b9{margin:calc(var(--general-line-height)/2) 0 0}.b-{outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;position:relative}.b-:after{content:"";position:absolute;top:-4px;right:-4px;bottom:-4px;left:-4px;pointer-events:none;box-shadow:0 0 1px 4px var(--brand-color);transition:var(--transition-time);opacity:0}.b-.j:after{opacity:1}.b_{margin:calc(var(--general-line-height)/2) 0 var(--general-line-height)}.ca{outline:none;width:100%;max-height:250px;display:block;box-sizing:border-box;padding:0 var(--general-line-height);transition:var(--transition-time);direction:ltr;white-space:pre;word-wrap:break-word;font-family:var(--code-fonts);font-size:.8125rem;line-height:var(--line-height-code);-moz-tab-size:25px;-o-tab-size:25px;tab-size:25px;overflow:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--gray-color);position:relative;z-index:1;background-color:var(--second-background);background-repeat:no-repeat;background-image:radial-gradient(farthest-side at 50% 0,var(--transparent-color-20),var(--transparent-color)),radial-gradient(farthest-side at 50% 100%,var(--transparent-color-20),var(--transparent-color));background-position:0 0,0 100%;background-size:100% 10px}.ca:after,.ca:before{content:"";position:relative;z-index:-1;display:block;margin:0 0 -.9375rem;height:30px;background:linear-gradient(180deg,var(--second-background),var(--second-background) 30%,var(--second-background-transparent))}.ca:after{margin:-.9375rem 0 0;background:linear-gradient(180deg,var(--second-background-transparent),var(--second-background) 70%,var(--second-background))}.cb{position:absolute;z-index:1;background:var(--second-background);will-change:width,height,top,left;transform:translateZ(0);box-shadow:0 2px 8px var(--transparent-color-5)}@media (prefers-color-scheme:dark){:root:not(.is-light){--main-background:#222;--main-text-color:#fff;--second-background:#111;--second-background-transparent:rgba(17,17,17,0);--brand-color:#227dec;--second-color:#298e6d;--button-background-color:#136edd;--footer-link-color:#4993ee;--function-shadow:hsla(0,0%,100%,0.05);--function-shadow-active:hsla(0,0%,100%,0.2);--transparent-color:hsla(0,0%,100%,0);--transparent-color-5:hsla(0,0%,100%,0.05);--transparent-color-20:hsla(0,0%,100%,0.2);--transparent-invert-color:transparent}}@media (max-width:56.25rem){.x.x{padding:0}.y{display:none}.al{width:100%;text-align:center}}@media (max-width:34.375rem){.ak{margin:0 -.3125rem}.al{margin:0 0 1.875rem}.at{font-size:1.875rem}.a9{width:100px}.bn{font-weight:400;font-size:1.375rem}}@media (max-width:50rem){.aq{margin:0;display:block}.ar{padding:0;width:100%}.as{padding:0 0 calc(2*var(--general-line-height));width:100%}}@media (max-width:65.625rem){.a3{min-width:140px}.a7{font-size:.875rem}}@media (max-width:28.125rem){.a3{width:auto}}</style></head><body><div class="m"><svg class="n" xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs><linearGradient id="in" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="var(--main-text-color)"></stop><stop offset="50%" stop-color="var(--main-text-color)"></stop><stop offset="70%" stop-color="var(--second-color)"></stop><stop offset="100%" stop-color="var(--second-color)"></stop></linearGradient><linearGradient id="out" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="var(--brand-color)"></stop><stop offset="30%" stop-color="var(--brand-color)"></stop><stop offset="50%" stop-color="var(--main-text-color)"></stop><stop offset="100%" stop-color="var(--main-text-color)"></stop></linearGradient><linearGradient id="inOut" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="var(--brand-color)"></stop><stop offset="20%" stop-color="var(--brand-color)"></stop><stop offset="80%" stop-color="var(--second-color)"></stop><stop offset="100%" stop-color="var(--second-color)"></stop></linearGradient><symbol id="copy" viewBox="0 0 561 561"><path d="M395 0H89C61 0 38 23 38 51v357h51V51h306V0zm77 102H191c-28 0-51 23-51 51v357c0 28 23 51 51 51h281c28 0 51-23 51-51V153c0-28-23-51-51-51zm0 408H191V153h281v357z"></path></symbol><symbol id="done" viewBox="0 0 512 512"><path d="M437 75a254 254 0 00-362 0 254 254 0 000 362 254 254 0 00362 0 254 254 0 000-362zM256 482a226 226 0 111-453 226 226 0 01-1 453zm122-308c-6-6-15-6-21 0L225 306l-70-69a15 15 0 00-21 21l80 80a15 15 0 0021 0l143-143c6-6 6-15 0-21z"></path></symbol></defs></svg><h1 class="o">缓动函数速查表</h1><div class="p"><div class="w"><div class="x"><p><strong>缓动函数</strong> 自定义参数随时间变化的速率。 现实生活中，物体并不是突然启动或者停止， 当然也不可能一直保持匀速移动。就像我们 打开抽屉的过程那样，刚开始拉的那一下动作很快， 但是当抽屉被拉出来之后我们会不自觉的放慢动作。 或是掉落在地板上的物体，一开始下降的速度很快， 接着就会在地板上来回反弹直到停止。 这个页面将帮助你选择正确的缓动函数。</p></div><div class="y z _"><a class="r" href="https://github.com/ai/easings.net" rel="noopener noreferrer" target="_blank"><span class="t"><svg class="u" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2A10.1 10.1 0 002 12.3 10.2 10.2 0 008.8 22c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4A2.8 2.8 0 005 16.9c-1-.7 0-.6 0-.6a2.1 2.1 0 011.6 1 2.1 2.1 0 003 .9 2.3 2.3 0 01.6-1.4c-2.2-.3-4.6-1.2-4.6-5a4 4 0 011-2.8 3.8 3.8 0 01.2-2.7s.8-.3 2.7 1a9.4 9.4 0 015 0c2-1.3 2.8-1 2.8-1a3.8 3.8 0 010 2.7 4 4 0 011 2.8c0 3.9-2.3 4.7-4.5 5a2.5 2.5 0 01.7 2v2.7c0 .3.1.6.7.5a10.2 10.2 0 006.8-9.8A10.1 10.1 0 0012 2z"></path></svg></span> 开源</a><div class="aa">帮助我们将此页面翻译成你的语言</div></div></div><div class="q"><div class="ai aj" style="display: none;"><div class="ak"><div class="al"><div class="a3" id="func-easeInSine" data-name="easeInSine" data-func="cubic-bezier(0.12, 0, 0.39, 0)" data-maths="  return 1 - Math.cos((x * Math.PI) / 2);"><a class="a6 a9" href="#easeInSine"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84c14 1 47.75 1 123-83" fill="none" stroke="url(#in)"></path></svg><div class="bi bj" style="transition-timing-function:cubic-bezier(.12,0,.39,0)"></div></div></a><div class="a7">easeInSine</div></div><div class="a3" id="func-easeOutSine" data-name="easeOutSine" data-func="cubic-bezier(0.61, 1, 0.88, 1)" data-maths="  return Math.sin((x * Math.PI) / 2);"><a class="a6 a9" href="#easeOutSine"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C76.25 0 110 0 124 1" fill="none" stroke="url(#out)"></path></svg><div class="bi bl" style="transition-timing-function:cubic-bezier(.61,1,.88,1)"></div></div></a><div class="a7">easeOutSine</div></div><div class="a3" id="func-easeInOutSine" data-name="easeInOutSine" data-func="cubic-bezier(0.37, 0, 0.63, 1)" data-maths="return -(Math.cos(Math.PI * x) - 1) / 2;"><a class="a6 a9" href="#easeInOutSine"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C46.25 85 78.75 0 124 1" fill="none" stroke="url(#inOut)"></path></svg><div class="bi bk" style="transition-timing-function:cubic-bezier(.37,0,.63,1)"></div></div></a><div class="a7">easeInOutSine</div></div></div><div class="al"><div class="a3" id="func-easeInQuad" data-name="easeInQuad" data-func="cubic-bezier(0.11, 0, 0.5, 0)" data-maths="return x * x;"><a class="a6 a9" href="#easeInQuad"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84c12.75 1 61.5 1 123-83" fill="none" stroke="url(#in)"></path></svg><div class="bi bj" style="transition-timing-function:cubic-bezier(.11,0,.5,0)"></div></div></a><div class="a7">easeInQuad</div></div><div class="a3" id="func-easeOutQuad" data-name="easeOutQuad" data-func="cubic-bezier(0.5, 1, 0.89, 1)" data-maths="return 1 - (1 - x) * (1 - x);"><a class="a6 a9" href="#easeOutQuad"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C62.5 0 111.25 0 124 1" fill="none" stroke="url(#out)"></path></svg><div class="bi bl" style="transition-timing-function:cubic-bezier(.5,1,.89,1)"></div></div></a><div class="a7">easeOutQuad</div></div><div class="a3" id="func-easeInOutQuad" data-name="easeInOutQuad" data-func="cubic-bezier(0.45, 0, 0.55, 1)" data-maths="return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;"><a class="a6 a9" href="#easeInOutQuad"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C56.25 85 68.75 0 124 1" fill="none" stroke="url(#inOut)"></path></svg><div class="bi bk" style="transition-timing-function:cubic-bezier(.45,0,.55,1)"></div></div></a><div class="a7">easeInOutQuad</div></div></div><div class="al"><div class="a3" id="func-easeInCubic" data-name="easeInCubic" data-func="cubic-bezier(0.32, 0, 0.67, 0)" data-maths="return x * x * x;"><a class="a6 a9" href="#easeInCubic"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84c39 1 82.75 1 123-83" fill="none" stroke="url(#in)"></path></svg><div class="bi bj" style="transition-timing-function:cubic-bezier(.32,0,.67,0)"></div></div></a><div class="a7">easeInCubic</div></div><div class="a3" id="func-easeOutCubic" data-name="easeOutCubic" data-func="cubic-bezier(0.33, 1, 0.68, 1)" data-maths="return 1 - Math.pow(1 - x, 3);"><a class="a6 a9" href="#easeOutCubic"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C41.25 0 85 0 124 1" fill="none" stroke="url(#out)"></path></svg><div class="bi bl" style="transition-timing-function:cubic-bezier(.33,1,.68,1)"></div></div></a><div class="a7">easeOutCubic</div></div><div class="a3" id="func-easeInOutCubic" data-name="easeInOutCubic" data-func="cubic-bezier(0.65, 0, 0.35, 1)" data-maths="return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;"><a class="a6 a9" href="#easeInOutCubic"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C81.25 85 43.75 0 124 1" fill="none" stroke="url(#inOut)"></path></svg><div class="bi bk" style="transition-timing-function:cubic-bezier(.65,0,.35,1)"></div></div></a><div class="a7">easeInOutCubic</div></div></div><div class="al"><div class="a3" id="func-easeInQuart" data-name="easeInQuart" data-func="cubic-bezier(0.5, 0, 0.75, 0)" data-maths="return x * x * x * x;"><a class="a6 a9" href="#easeInQuart"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84c61.5 1 92.75 1 123-83" fill="none" stroke="url(#in)"></path></svg><div class="bi bj" style="transition-timing-function:cubic-bezier(.5,0,.75,0)"></div></div></a><div class="a7">easeInQuart</div></div><div class="a3" id="func-easeOutQuart" data-name="easeOutQuart" data-func="cubic-bezier(0.25, 1, 0.5, 1)" data-maths="return 1 - Math.pow(1 - x, 4);"><a class="a6 a9" href="#easeOutQuart"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C31.25 0 62.5 0 124 1" fill="none" stroke="url(#out)"></path></svg><div class="bi bl" style="transition-timing-function:cubic-bezier(.25,1,.5,1)"></div></div></a><div class="a7">easeOutQuart</div></div><div class="a3" id="func-easeInOutQuart" data-name="easeInOutQuart" data-func="cubic-bezier(0.76, 0, 0.24, 1)" data-maths="return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;"><a class="a6 a9" href="#easeInOutQuart"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C95 85 30 0 124 1" fill="none" stroke="url(#inOut)"></path></svg><div class="bi bk" style="transition-timing-function:cubic-bezier(.76,0,.24,1)"></div></div></a><div class="a7">easeInOutQuart</div></div></div><div class="al"><div class="a3" id="func-easeInQuint" data-name="easeInQuint" data-func="cubic-bezier(0.64, 0, 0.78, 0)" data-maths="return x * x * x * x * x;"><a class="a6 a9" href="#easeInQuint"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84c79 1 96.5 1 123-83" fill="none" stroke="url(#in)"></path></svg><div class="bi bj" style="transition-timing-function:cubic-bezier(.64,0,.78,0)"></div></div></a><div class="a7">easeInQuint</div></div><div class="a3" id="func-easeOutQuint" data-name="easeOutQuint" data-func="cubic-bezier(0.22, 1, 0.36, 1)" data-maths="return 1 - Math.pow(1 - x, 5);"><a class="a6 a9" href="#easeOutQuint"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C27.5 0 45 0 124 1" fill="none" stroke="url(#out)"></path></svg><div class="bi bl" style="transition-timing-function:cubic-bezier(.22,1,.36,1)"></div></div></a><div class="a7">easeOutQuint</div></div><div class="a3" id="func-easeInOutQuint" data-name="easeInOutQuint" data-func="cubic-bezier(0.83, 0, 0.17, 1)" data-maths="return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;"><a class="a6 a9" href="#easeInOutQuint"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C103.75 85 21.25 0 124 1" fill="none" stroke="url(#inOut)"></path></svg><div class="bi bk" style="transition-timing-function:cubic-bezier(.83,0,.17,1)"></div></div></a><div class="a7">easeInOutQuint</div></div></div><div class="al"><div class="a3" id="func-easeInExpo" data-name="easeInExpo" data-func="cubic-bezier(0.7, 0, 0.84, 0)" data-maths="return x === 0 ? 0 : Math.pow(2, 10 * x - 10);"><a class="a6 a9" href="#easeInExpo"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84c86.5 1 104 1 123-83" fill="none" stroke="url(#in)"></path></svg><div class="bi bj" style="transition-timing-function:cubic-bezier(.7,0,.84,0)"></div></div></a><div class="a7">easeInExpo</div></div><div class="a3" id="func-easeOutExpo" data-name="easeOutExpo" data-func="cubic-bezier(0.16, 1, 0.3, 1)" data-maths="return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);"><a class="a6 a9" href="#easeOutExpo"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C20 0 37.5 0 124 1" fill="none" stroke="url(#out)"></path></svg><div class="bi bl" style="transition-timing-function:cubic-bezier(.16,1,.3,1)"></div></div></a><div class="a7">easeOutExpo</div></div><div class="a3" id="func-easeInOutExpo" data-name="easeInOutExpo" data-func="cubic-bezier(0.87, 0, 0.13, 1)" data-maths="return x === 0
  ? 0
  : x === 1
  ? 1
  : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
  : (2 - Math.pow(2, -20 * x + 10)) / 2;"><a class="a6 a9" href="#easeInOutExpo"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C108.75 85 16.25 0 124 1" fill="none" stroke="url(#inOut)"></path></svg><div class="bi bk" style="transition-timing-function:cubic-bezier(.87,0,.13,1)"></div></div></a><div class="a7">easeInOutExpo</div></div></div><div class="al"><div class="a3" id="func-easeInCirc" data-name="easeInCirc" data-func="cubic-bezier(0.55, 0, 1, 0.45)" data-maths="return 1 - Math.sqrt(1 - Math.pow(x, 2));"><a class="a6 a9" href="#easeInCirc"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84c67.75 1 124-37.25 123-83" fill="none" stroke="url(#in)"></path></svg><div class="bi bj" style="transition-timing-function:cubic-bezier(.55,0,1,.45)"></div></div></a><div class="a7">easeInCirc</div></div><div class="a3" id="func-easeOutCirc" data-name="easeOutCirc" data-func="cubic-bezier(0, 0.55, 0.45, 1)" data-maths="return Math.sqrt(1 - Math.pow(x - 1, 2));"><a class="a6 a9" href="#easeOutCirc"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C0 38.25 56.25 0 124 1" fill="none" stroke="url(#out)"></path></svg><div class="bi bl" style="transition-timing-function:cubic-bezier(0,.55,.45,1)"></div></div></a><div class="a7">easeOutCirc</div></div><div class="a3" id="func-easeInOutCirc" data-name="easeInOutCirc" data-func="cubic-bezier(0.85, 0, 0.15, 1)" data-maths="return x < 0.5
  ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
  : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;"><a class="a6 a9" href="#easeInOutCirc"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C106.25 85 18.75 0 124 1" fill="none" stroke="url(#inOut)"></path></svg><div class="bi bk" style="transition-timing-function:cubic-bezier(.85,0,.15,1)"></div></div></a><div class="a7">easeInOutCirc</div></div></div><div class="al"><div class="a3" id="func-easeInBack" data-name="easeInBack" data-func="cubic-bezier(0.36, 0, 0.66, -0.56)" data-maths="const c1 = 1.70158;
const c3 = c1 + 1;

return c3 * x * x * x - c1 * x * x;"><a class="a6 a9" href="#easeInBack"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84c44 1 81.5 48.6 123-83" fill="none" stroke="url(#in)"></path></svg><div class="bi bj" style="transition-timing-function:cubic-bezier(.36,0,.66,-.56)"></div></div></a><div class="a7">easeInBack</div></div><div class="a3" id="func-easeOutBack" data-name="easeOutBack" data-func="cubic-bezier(0.34, 1.56, 0.64, 1)" data-maths="const c1 = 1.70158;
const c3 = c1 + 1;

return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);"><a class="a6 a9" href="#easeOutBack"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C42.5-47.6 80 0 124 1" fill="none" stroke="url(#out)"></path></svg><div class="bi bl" style="transition-timing-function:cubic-bezier(.34,1.56,.64,1)"></div></div></a><div class="a7">easeOutBack</div></div><div class="a3" id="func-easeInOutBack" data-name="easeInOutBack" data-func="cubic-bezier(0.68, -0.6, 0.32, 1.6)" data-maths="const c1 = 1.70158;
const c2 = c1 * 1.525;

return x < 0.5
  ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
  : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;"><a class="a6 a9" href="#easeInOutBack"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" d="M1 84C85 136 40-51 124 1" fill="none" stroke="url(#inOut)"></path></svg><div class="bi bk" style="transition-timing-function:cubic-bezier(.68,-.6,.32,1.6)"></div></div></a><div class="a7">easeInOutBack</div></div></div><div class="al"><div class="a3" id="func-easeInElastic" data-name="easeInElastic" data-func="no" data-maths="const c4 = (2 * Math.PI) / 3;

return x === 0
  ? 0
  : x === 1
  ? 1
  : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);" data-offset="bottom"><a class="a6 a9" href="#easeInElastic"><div class="a- ba"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" fill="none" stroke="url(#in)" d="M1 84l.24.03 1.24-.02 1.24-.02 1.24-.02 1.24-.03 1.24-.02 1.24-.03 1.24-.02 1.24-.02 1.24-.01 1.24-.01h1.24l1.24.01 1.24.02 1.24.02 1.24.04 1.24.05 1.24.06 1.24.06 1.24.07 1.24.08 1.24.06 1.24.07 1.24.05 1.24.04 1.24.03h1.24l1.24-.03 1.24-.05 1.24-.08 1.24-.11 1.24-.14 1.24-.16 1.24-.19 1.24-.19 1.24-.21 1.24-.19 1.24-.18 1.24-.16 1.24-.11 1.24-.07h1.24l1.24.07 1.24.15 1.24.23 1.24.32 1.24.39 1.24.46 1.24.52 1.24.55 1.24.57 1.24.56 1.24.51 1.24.44 1.24.32 1.24.18 1.24.01 1.24-.2 1.24-.42 1.24-.66 1.24-.88 1.24-1.11 1.24-1.31 1.24-1.46 1.24-1.57 1.24-1.61 1.24-1.58 1.24-1.45 1.24-1.23 1.24-.92 1.24-.51 1.24-.01 1.24.56 1.24 1.19L93 76.58l1.24 2.5 1.24 3.14 1.24 3.69 1.24 4.14 1.24 4.45 1.24 4.56 1.24 4.46 1.24 4.1 1.24 3.48 1.24 2.6 1.24 1.43 1.24.04 1.24-1.59 1.24-3.36 1.24-5.22 1.24-7.09 1.24-8.87 1.24-10.44 1.24-11.73 1.24-12.57 1.24-12.9 1.24-12.6 1.24-11.6 1.24-9.86"></path></svg><div class="bi bj" style=""></div></div></a><div class="a7">easeInElastic</div></div><div class="a3" id="func-easeOutElastic" data-name="easeOutElastic" data-func="no" data-maths="const c4 = (2 * Math.PI) / 3;

return x === 0
  ? 0
  : x === 1
  ? 1
  : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;" data-offset="top"><a class="a6 a9" href="#easeOutElastic"><div class="a- a_"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" fill="none" stroke="url(#out)" d="M1 84l.24-7.34 1.24-9.86 1.24-11.6 1.24-12.6L6.2 29.7l1.24-12.57L8.68 5.4 9.92-5.04l1.24-8.87L12.4-21l1.24-5.22 1.24-3.36 1.24-1.59 1.24.04 1.24 1.43 1.24 2.6 1.24 3.48 1.24 4.1 1.24 4.46 1.24 4.56 1.24 4.45 1.24 4.14 1.24 3.69 1.24 3.14L31 7.42l1.24 1.85 1.24 1.19 1.24.56 1.24-.01 1.24-.51 1.24-.92 1.24-1.23 1.24-1.45 1.24-1.58 1.24-1.61 1.24-1.57L45.88.68l1.24-1.31 1.24-1.11 1.24-.89 1.24-.65 1.24-.42 1.24-.2 1.24.01 1.24.18 1.24.32 1.24.44 1.24.51 1.24.56 1.24.57 1.24.55 1.24.52 1.24.46 1.24.39 1.24.32 1.24.23 1.24.15 1.24.07h1.24l1.24-.07 1.24-.11 1.24-.16 1.24-.18 1.24-.19L80.6.46l1.24-.19 1.24-.19 1.24-.16 1.24-.14 1.24-.11 1.24-.08 1.24-.05 1.24-.03h1.24L93-.46l1.24.04 1.24.05 1.24.07 1.24.06 1.24.08 1.24.07 1.24.06 1.24.06 1.24.05 1.24.04 1.24.02 1.24.02 1.24.01h1.24l1.24-.01 1.24-.01 1.24-.02 1.24-.02 1.24-.03 1.24-.02 1.24-.03 1.24-.02 1.24-.02 1.24-.02"></path></svg><div class="bi bl" style=""></div></div></a><div class="a7">easeOutElastic</div></div><div class="a3" id="func-easeInOutElastic" data-name="easeInOutElastic" data-func="no" data-maths="const c5 = (2 * Math.PI) / 4.5;

return x === 0
  ? 0
  : x === 1
  ? 1
  : x < 0.5
  ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
  : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;"><a class="a6 a9" href="#easeInOutElastic"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" fill="none" stroke="url(#inOut)" d="M1 84l.24-.02 1.24-.02 1.24-.01 1.24-.02 1.24-.01 1.24-.01h1.24l1.24.01 1.24.02 1.24.03 1.24.05 1.24.06 1.24.07 1.24.08 1.24.08 1.24.07 1.24.04 1.24.02 1.24-.03 1.24-.08 1.24-.15 1.24-.21 1.24-.28 1.24-.33 1.24-.37 1.24-.37 1.24-.33 1.24-.26 1.24-.12 1.24.08 1.24.32 1.24.62 1.24.93 1.24 1.25 1.24 1.52 1.24 1.71 1.24 1.78 1.24 1.66 1.24 1.34 1.24.75 1.24-.11 1.24-1.23 1.24-2.57 1.24-4.05 1.24-5.56 1.24-6.92 1.24-7.97 1.24-8.45 1.24-8.16L62 42l1.24-6.85 1.24-8.16 1.24-8.45 1.24-7.97 1.24-6.92 1.24-5.56 1.24-4.05 1.24-2.57 1.24-1.23 1.24-.11 1.24.75 1.24 1.34 1.24 1.66 1.24 1.78 1.24 1.72 1.24 1.51L83.08.14l1.24.93 1.24.62 1.24.32 1.24.08 1.24-.12 1.24-.26 1.24-.33L93 1.01l1.24-.37 1.24-.33 1.24-.28 1.24-.21 1.24-.15 1.24-.08 1.24-.03 1.24.02 1.24.04 1.24.07 1.24.08 1.24.08 1.24.07 1.24.06 1.24.05 1.24.03 1.24.02 1.24.01h1.24l1.24-.01 1.24-.01 1.24-.02 1.24-.01 1.24-.02"></path></svg><div class="bi bk" style=""></div></div></a><div class="a7">easeInOutElastic</div></div></div><div class="al"><div class="a3" id="func-easeInBounce" data-name="easeInBounce" data-func="no" data-maths="return 1 - easeOutBounce(1 - x);"><a class="a6 a9" href="#easeInBounce"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" fill="none" stroke="url(#in)" d="M1 84l.24-.51 1.24-.39 1.24-.26 1.24-.13 1.24-.01 1.24.12 1.24.25 1.24.38 1.24.5L12.4 83l1.24-.97 1.24-.85 1.24-.72 1.24-.6 1.24-.47 1.24-.34 1.24-.21 1.24-.09 1.24.04 1.24.17 1.24.29 1.24.43 1.24.54 1.24.68 1.24.8 1.24.93 1.24 1.06 1.24-1.34 1.24-2.15 1.24-2.03 1.24-1.9 1.24-1.77 1.24-1.65 1.24-1.52 1.24-1.39 1.24-1.26 1.24-1.14 1.24-1.01 1.24-.88 1.24-.76 1.24-.63 1.24-.5 1.24-.38 1.24-.25 1.24-.12 1.24.01 1.24.13 1.24.26 1.24.39 1.24.51 1.24.64 1.24.77 1.24.9 1.24 1.02 1.24 1.15 1.24 1.27 1.24 1.41L71.92 73l1.24 1.66 1.24 1.78 1.24 1.91 1.24 2.04 1.24 2.17 1.24-.23 1.24-4.51 1.24-4.39 1.24-4.25 1.24-4.13 1.24-4 1.24-3.88 1.24-3.75 1.24-3.62 1.24-3.49 1.24-3.37L93 39.7l1.24-3.11 1.24-2.99 1.24-2.85 1.24-2.74 1.24-2.6 1.24-2.48 1.24-2.35 1.24-2.22 1.24-2.1 1.24-1.97 1.24-1.84 1.24-1.71 1.24-1.59 1.24-1.46 1.24-1.34 1.24-1.2 1.24-1.08 1.24-.96 1.24-.82 1.24-.7 1.24-.57 1.24-.45 1.24-.32 1.24-.19"></path></svg><div class="bi bj" style=""></div></div></a><div class="a7">easeInBounce</div></div><div class="a3" id="func-easeOutBounce" data-name="easeOutBounce" data-func="no" data-maths="const n1 = 7.5625;
const d1 = 2.75;

if (x < 1 / d1) {
    return n1 * x * x;
} else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
} else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
} else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
}"><a class="a6 a9" href="#easeOutBounce"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" fill="none" stroke="url(#out)" d="M1 84l.24-.06 1.24-.19 1.24-.32 1.24-.45 1.24-.57 1.24-.7 1.24-.82 1.24-.96 1.24-1.08 1.24-1.2 1.24-1.34 1.24-1.46 1.24-1.59 1.24-1.71 1.24-1.84 1.24-1.97 1.24-2.1 1.24-2.22 1.24-2.35 1.24-2.48 1.24-2.6 1.24-2.74 1.24-2.85 1.24-2.99L31 44.3l1.24-3.24 1.24-3.37 1.24-3.49 1.24-3.62 1.24-3.75 1.24-3.88 1.24-4 1.24-4.13 1.24-4.25 1.24-4.39 1.24-4.51 1.24-.23 1.24 2.17 1.24 2.04 1.24 1.91 1.24 1.78L52.08 11l1.24 1.53 1.24 1.41 1.24 1.27 1.24 1.15 1.24 1.02 1.24.9 1.24.77 1.24.64 1.24.51 1.24.39 1.24.26 1.24.13 1.24.01 1.24-.12 1.24-.25 1.24-.38 1.24-.5 1.24-.63 1.24-.76 1.24-.88 1.24-1.01 1.24-1.14 1.24-1.26 1.24-1.39 1.24-1.52 1.24-1.65 1.24-1.77 1.24-1.9 1.24-2.03 1.24-2.15L90.52.31l1.24 1.06L93 2.3l1.24.8 1.24.68 1.24.54 1.24.43 1.24.29 1.24.17 1.24.04 1.24-.09 1.24-.21 1.24-.34 1.24-.47 1.24-.6 1.24-.72 1.24-.85L111.6 1l1.24-.95 1.24.5 1.24.38 1.24.25 1.24.12 1.24-.01 1.24-.13 1.24-.26 1.24-.39"></path></svg><div class="bi bl" style=""></div></div></a><div class="a7">easeOutBounce</div></div><div class="a3" id="func-easeInOutBounce" data-name="easeInOutBounce" data-func="no" data-maths="return x < 0.5
  ? (1 - easeOutBounce(1 - 2 * x)) / 2
  : (1 + easeOutBounce(2 * x - 1)) / 2;"><a class="a6 a9" href="#easeInOutBounce"><div class="a-"><svg class="bb" viewBox="0 0 125 85" xmlns="http://www.w3.org/2000/svg"><g class="bc"><path class="bf" d="M1 0v84h124" fill="none"></path><text class="bg" x="4" y="8">x</text><text class="bg" x="122" y="80" text-anchor="end">t</text></g><path class="bh" fill="none" stroke="url(#inOut)" d="M1 84l.24-.45 1.24-.2 1.24.06 1.24.31 1.24-.22 1.24-.91 1.24-.66 1.24-.4 1.24-.15 1.24.1 1.24.36 1.24.61 1.24.87 1.24-.14 1.24-2.09 1.24-1.84 1.24-1.58 1.24-1.33 1.24-1.07 1.24-.83 1.24-.56 1.24-.31 1.24-.06 1.24.2 1.24.45 1.24.7 1.24.96 1.24 1.21 1.24 1.47 1.24 1.72 1.24 1.98 1.24.96 1.24-4.44 1.24-4.2 1.24-3.93 1.24-3.69 1.24-3.43 1.24-3.17 1.24-2.93 1.24-2.67 1.24-2.41 1.24-2.16 1.24-1.9 1.24-1.66 1.24-1.39 1.24-1.15 1.24-.89 1.24-.63 1.24-.38L62 42l1.24-.13 1.24-.38 1.24-.63 1.24-.89 1.24-1.15 1.24-1.39 1.24-1.66 1.24-1.9 1.24-2.16 1.24-2.42 1.24-2.66 1.24-2.93 1.24-3.17 1.24-3.43 1.24-3.69 1.24-3.93 1.24-4.2L84.32.84l1.24.96 1.24 1.98 1.24 1.72 1.24 1.47 1.24 1.21 1.24.96 1.24.7 1.24.45 1.24.2 1.24-.06 1.24-.31 1.24-.57 1.24-.82 1.24-1.07 1.24-1.33 1.24-1.58 1.24-1.84 1.24-2.09 1.24-.14 1.24.87 1.24.61 1.24.36 1.24.1 1.24-.15 1.24-.4 1.24-.66L117.8.5l1.24-.22 1.24.31 1.24.06 1.24-.2"></path></svg><div class="bi bk" style=""></div></div></a><div class="a7">easeInOutBounce</div></div></div></div></div><section class="am an" style="transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1); display: block;"><div class="ao"><a class="r s" href="#"><span class="t"><svg class="u v ap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 24"><path d="M14 3.8L12.2 2 2 12l10.2 10 1.8-1.8L5.6 12 14 3.8z"></path></svg></span> 所有缓动函数</a></div><div class="aq"><div class="as"><h2 class="at a">easeInOutSine</h2><div class="au"><div class="aw"><svg class="ax" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 85"><path d="M1 84C46.25 85 78.75 0 124 1"></path></svg><div class="ay">x</div><div class="ay az">t</div><button class="a0" aria-hidden="true"></button><div class="a1" style="transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);"></div></div></div><div class="bm"><div class="bn">CSS</div><div class="c"><div>在 CSS 中，transition 和 animation 属性允许你自定义缓动函数。</div><div class="bo"><div class="bq"><button class="br r s"><svg class="bs h" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#copy"></use></svg><svg class="bs bt bu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#done"></use></svg></button><div class="bv"><pre><span class="l">.block</span> {
	<span class="l">transition</span>: transform 0.6s <span class="k b">cubic-bezier(0.37, 0, 0.63, 1)</span>;
}</pre></div></div></div><div>在 <a href="http://cubic-bezier.com/#0.37,0,0.63,1" rel="noopener noreferrer" target="_blank" class="g">cubic-bezier.com</a> 上编辑。</div></div><div class="e" hidden=""><div>在 CSS 中，使用 <code>@keyframes</code> 来实现这个函数:</div><details class="b9"><summary class="b-">大小</summary><div class="b_"><div class="bq"><button class="br r s"><svg class="bs h" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#copy"></use></svg><svg class="bs bt bu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#done"></use></svg></button><div class="bv"><div class="ca" data-type="scale">加载中...</div></div></div></div></details><details class="b9"><summary class="b-">位置</summary><div class="b_"><div class="bq"><button class="br r s"><svg class="bs h" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#copy"></use></svg><svg class="bs bt bu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#done"></use></svg></button><div class="bv"><div class="ca" data-type="translate">加载中...</div></div></div></div></details><details class="b9"><summary class="b-">不透明度</summary><div class="b_"><div class="bq"><button class="br r s"><svg class="bs h" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#copy"></use></svg><svg class="bs bt bu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#done"></use></svg></button><div class="bv"><div class="ca" data-type="opacity">加载中...</div></div></div></div></details></div></div><div class="bm"><div class="bn">PostCSS</div><div class="c"><div>在 PostCSS 中，使用缓动函数就变得方便多了。 可以使用这个插件 <a href="https://github.com/postcss/postcss-easings" rel="noopener noreferrer" target="_blank">postcss-easings</a> 来定义 transition 的属性值。</div><div class="bo"><div class="bq"><button class="br r s"><svg class="bs h" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#copy"></use></svg><svg class="bs bt bu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#done"></use></svg></button><div class="bv"><pre><span class="l">.block</span> {
	<span class="l">transition</span>: transform 0.6s <span class="k a">easeInOutSine</span>;
}</pre></div></div></div><div>这种形式和上面的贝塞尔曲线函数一致。</div></div><div class="e" hidden=""><div>可惜的是，这个缓动函数不能使用 PostCSS plugin 插件。 但可以用 <code>@keyframes</code> 实现，查阅上方。</div></div></div><div class="bm c"><div class="bn">渐变</div><div>可以使用工具 <a href="https://github.com/larsenwork/postcss-easing-gradients" rel="noopener noreferrer" target="_blank">postcss-easing-gradients</a> 来实现渐变。</div><div class="bo"><div class="bq"><button class="br r s"><svg class="bs h" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#copy"></use></svg><svg class="bs bt bu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#done"></use></svg></button><div class="bv"><pre><span class="l">.block</span> {
	<span class="l">background</span>: linear-gradient(
		to bottom,
		#1473e6,
		<span class="k b">cubic-bezier(0.37, 0, 0.63, 1)</span>,
		#247b5e
	);
}</pre></div></div></div><div class="bp" style="display: block; background-image: linear-gradient(rgb(20, 115, 230) 0%, rgb(20, 115, 229) 4%, rgb(20, 115, 228) 8%, rgb(21, 115, 225) 12%, rgb(21, 115, 222) 16%, rgb(22, 116, 217) 20%, rgb(22, 116, 212) 24%, rgb(23, 116, 205) 28%, rgb(24, 117, 198) 32%, rgb(25, 117, 191) 36%, rgb(26, 118, 183) 40%, rgb(27, 118, 175) 44%, rgb(27, 119, 166) 48%, rgb(29, 119, 158) 52%, rgb(29, 120, 149) 56%, rgb(30, 120, 141) 60%, rgb(31, 121, 133) 64%, rgb(32, 121, 126) 68%, rgb(33, 122, 119) 72%, rgb(34, 122, 112) 76%, rgb(34, 122, 107) 80%, rgb(35, 123, 102) 84%, rgb(35, 123, 99) 88%, rgb(36, 123, 96) 92%, rgb(36, 123, 95) 96%, rgb(36, 123, 94) 100%);"></div></div><div class="bm"><div class="bn">函数</div><div class="c"><div>下面的代码由 TypeScript 实现。 变量 x 表示 0（动画开始）到 1（动画结束）范围内的值。</div><div class="bo"><div class="bq"><button class="br r s"><svg class="bs h" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#copy"></use></svg><svg class="bs bt bu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#done"></use></svg></button><div class="bv"><pre><span class="l">function <span class="k a">easeInOutSine</span></span>(x: number): number {
<div class="a8 f">return -(Math.cos(Math.PI * x) - 1) / 2;</div>
}</pre></div></div></div></div><div class="e" hidden=""><div>下面的代码由 TypeScript 实现。 变量 x 表示 0（动画开始）到 1（动画结束）范围内的值。</div><div class="bo"><div class="bq"><button class="br r s"><svg class="bs h" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#copy"></use></svg><svg class="bs bt bu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#done"></use></svg></button><div class="bv"><pre><span class="l">function <span class="k a">easeInOutSine</span></span>(x: number): number {
<div class="a8 f">return -(Math.cos(Math.PI * x) - 1) / 2;</div>
}</pre></div></div></div></div></div></div><div class="ar"><div class="bw">观看缓动变化:</div><div class="bx"><button class="r s by" data-type="scale">大小</button><button class="r s by" data-type="translate">位置</button><button class="r s by" data-type="opacity">不透明度</button></div><div class="bz"><div class="b0"><div class="b1">当前函数:</div><div class="b2"><img class="b3" src="card.7e7353a0.jpg" alt=""><div class="b4" data-target="true" style="transition-timing-function: cubic-bezier(0.37, 0, 0.63, 1);">当前函数</div></div></div><div class="b0"><div class="b1">线性函数:</div><div class="b2"><img class="b3" src="card.7e7353a0.jpg" alt=""><div class="b4" data-target="false">线性函数</div></div></div></div></div></div></section></div></div><div class="cb" style="transition-duration: 0ms; height: 1312.8px; width: 1050px; top: 164.6px; left: 79.8px;"></div><div class="ab"><div class="ac"><div class="ae"><a class="ah" href="https://sitnik.ru/" rel="noopener noreferrer" target="_blank">Andrey Sitnik</a> 和 <a class="ah" href="https://solovev.one/" rel="noopener noreferrer" target="_blank">Ivan Solovev</a></div><div class="ag"><select class="i" aria-label="Select theme"><option value="auto">默认主题</option><option value="light">亮色主题</option><option value="dark">深色主题</option></select></div><div class="af ag"><select aria-label="Select language"><option value="/am">አማርኛ</option><option value="/ar">العربية</option><option value="/de">Deutsch</option><option value="/el-GR">Greek</option><option value="/en">English</option><option value="/es-mx">Español</option><option value="/fa-ir">فارسی</option><option value="/fr">Français</option><option value="/he">עיברית</option><option value="/hi">हिन्दी</option><option value="/hu">Magyar</option><option value="/id">Bahasa Indonesia</option><option value="/it">Italiano</option><option value="/ja">日本語</option><option value="/ko">한국어</option><option value="/lb">Lëtzebuergesch</option><option value="/ml">Malayalam</option><option value="/nl">Nederlands</option><option value="/no-bok">Norsk bokmål</option><option value="/pl">Polish</option><option value="/pt-br">Português (Brasil)</option><option value="/ro">Română</option><option value="/ru">Русский</option><option value="/sq">Shqip</option><option value="/sv">Svenska</option><option value="/tr">Türkçe</option><option value="/uk">Українська</option><option value="/vi">Tiếng Việt</option><option value="/yue">粵語</option><option value="/zh-cn" selected="selected">简体中文</option><option value="/zh-tw">繁體中文</option></select></div></div></div></div><script src="src.7e7987fa.js" async=""></script><link href="keyframes.4d51c095.css" rel="stylesheet"><script>"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.zh-cn.js").then(()=>navigator.serviceWorker.ready).then(e=>e.sync.register("syncdata")).catch(e=>console.log(e));</script></body></html>

```

```js
function easeInElastic(x: number): number {
    const c4 = (2 * Math.PI) / 3;

    return x === 0
    ? 0
    : x === 1
    ? 1
    : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
}
```

```css
@media (max-width: 65.625rem) {
    .a3 {
        min-width: 140px;
    }
}
.a3, .a3:after {
    transition: var(--transition-time);
}
.a3 {
    width: calc(33.33333% - 10px);
    max-width: 160px;
    box-sizing: border-box;
    padding: .9375rem .9375rem .5rem;
    margin: 0 .3125rem .625rem;
    position: relative;
    outline: none;
    display: flex
;
    flex-direction: column;
    background: var(--second-background);
    box-shadow: 0 2px 8px var(--function-shadow);
}
div {
    display: block;
    unicode-bidi: isolate;
}

@media (max-width: 56.25rem) {
    .al {
        width: 100%;
        text-align: center;
    }
}
body, html {
    line-height: var(--line-height);
}

:root {
    --main-background: #f8f8f8;
    --main-text-color: #222;
    --second-background: #fff;
    --second-background-transparent: hsla(0, 0%, 100%, 0);
    --brand-color: #1473e6;
    --brand-color-text: #fff;
    --brand-darken-color: #095aba;
    --brand-darken-color-text: #fff;
    --brand-lighten-color: #2680eb;
    --second-color: #247b5e;
    --gray-color: #6e6e6e;
    --gray-lighten-color: #cacaca;
    --button-background-color: var(--brand-color);
    --footer-link-color: var(--brand-darken-color);
    --function-shadow: rgba(0, 0, 0, 0.05);
    --function-shadow-active: rgba(0, 0, 0, 0.2);
    --card-overlay: rgba(0, 0, 0, 0.7);
    --card-overlay-text: #fff;
    --transparent-color: transparent;
    --transparent-color-5: rgba(0, 0, 0, 0.05);
    --transparent-color-20: rgba(0, 0, 0, 0.2);
    --transparent-invert-color: hsla(0, 0%, 100%, 0);
    --transition-time: 0.2s;
    --transition-small-time: 0.1s;
    --transition-card-time: 1s;
    --transition-show-time: 1.5s;
    --line-height: 1.4;
    --line-height-code: 1.5;
    --general-line-height: 22px;
    --code-fonts: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

html {
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
    font-size: 100%;
    color: var(--main-text-color);
}

.a3:after {
    content: "";
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    pointer-events: none;
    box-shadow: 0 0 1px 4px var(--brand-color);
    opacity: 0;
}
.a3, .a3:after {
    transition: var(--transition-time);
}

.block {
	background: linear-gradient(
		to bottom,
		#1473e6,
		cubic-bezier(0.37, 0, 0.63, 1),
		#247b5e
	);
}
@keyframes scale-easeInElastic {
	0% {
		transform: scale(1);
	}

	4% {
		transform: scale(1);
	}

	8% {
		transform: scale(1);
	}

	14% {
		transform: scale(1);
	}

	18% {
		transform: scale(1);
	}

	26% {
		transform: scale(1.01);
	}

	28% {
		transform: scale(1.01);
	}

	40% {
		transform: scale(0.98);
	}

	42% {
		transform: scale(0.98);
	}

	56% {
		transform: scale(1.05);
	}

	58% {
		transform: scale(1.04);
	}

	72% {
		transform: scale(0.87);
	}

	86% {
		transform: scale(1.37);
	}

	100% {
		transform: scale(0);
	}

}

@keyframes undefined-easeInElastic {
	0% {
		transform: translateX(0%);
	}

	4% {
		transform: translateX(-0.04%);
	}

	8% {
		transform: translateX(-0.16%);
	}

	14% {
		transform: translateX(-0.17%);
	}

	18% {
		transform: translateX(0.04%);
	}

	26% {
		transform: translateX(0.58%);
	}

	28% {
		transform: translateX(0.55%);
	}

	40% {
		transform: translateX(-1.56%);
	}

	42% {
		transform: translateX(-1.64%);
	}

	56% {
		transform: translateX(4.63%);
	}

	58% {
		transform: translateX(4.4%);
	}

	72% {
		transform: translateX(-13.12%);
	}

	86% {
		transform: translateX(37.06%);
	}

	100% {
		transform: translateX(-100%);
	}

}
@keyframes opacity-easeInElastic {
	0% {
		opacity: 1;
	}

	4% {
		opacity: 1;
	}

	8% {
		opacity: 1;
	}

	14% {
		opacity: 1;
	}

	18% {
		opacity: 1;
	}

	26% {
		opacity: 1.01;
	}

	28% {
		opacity: 1.01;
	}

	40% {
		opacity: 0.98;
	}

	42% {
		opacity: 0.98;
	}

	56% {
		opacity: 1.05;
	}

	58% {
		opacity: 1.04;
	}

	72% {
		opacity: 0.87;
	}

	86% {
		opacity: 1.37;
	}

	100% {
		opacity: 0;
	}

}

.button {
	font-family: inherit;
	font-size: 100%;
	margin: 0;
	border: none;
	overflow: visible;
	text-transform: none;
	outline: none;
	height: auto;
	box-sizing: border-box;

	position: relative;
	background: var(--button-background-color);
	color: var(--brand-color-text);
	font-stretch: 100%;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	line-height: var(--line-height);
	padding: 1em 1.25em;
	display: inline-block;
	border-radius: 0;
	cursor: pointer;
	transition: var(--transition-time);
	box-shadow: 0 2px 8px var(--transparent-color-5);
}

	.button::after {
		content: "";
		position: absolute;
		top: -4px;
		right: -4px;
		bottom: -4px;
		left: -4px;
		pointer-events: none;
		box-shadow: 0 0 1px 4px var(--brand-color);
		transition: var(--transition-time);
		opacity: 0;
	}

	.button:hover {
		background: var(--brand-darken-color);
		color: var(--brand-darken-color-text);
	}

	.button:focus {
		background: var(--brand-darken-color);
		color: var(--brand-darken-color-text);
	}

	.button:active {
		background: var(--brand-color);
		transition: none;
	}

	.button.focus-visible {
		box-shadow: none;
	}

	.button.focus-visible::after {
		opacity: 1;
	}


.button--small {
	font-size: 14px;
	padding: 0.75em 1em;
}

```

:::