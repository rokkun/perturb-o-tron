!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).bundle=e()}}(function(){return function s(r,u,c){function f(t,e){if(!u[t]){if(!r[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(a)return a(t,!0);var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}var o=u[t]={exports:{}};r[t][0].call(o.exports,function(e){return f(r[t][1][e]||e)},o,o.exports,s,r,u,c)}return u[t].exports}for(var a="function"==typeof require&&require,e=0;e<c.length;e++)f(c[e]);return f}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e){this.matePattern=/score mate ([^ ]*) .*/,this.centipawnPattern=/score cp ([^ ]*) .*/,this.completePattern=/bestmove.*/,this.event=e}return e.prototype.isComplete=function(){return!!this.completePattern.exec(this.event)},e.prototype.score=function(e){var t=this.matePattern.exec(this.event);return t?this.scoreMate(e,t[1]):(t=this.centipawnPattern.exec(this.event))?this.scoreCp(e,t[1]):0},e.prototype.scoreCp=function(e,t){return t<250&&-250<t?"drawn":e.includes("w")?0<t?"whiteWin":"blackWin":t<0?"whiteWin":"blackWin"},e.prototype.scoreMate=function(e,t){return e.includes("w")?t.includes("-")?"blackWin":"whiteWin":t.includes("-")?"whiteWin":"blackWin"},e}();n.Event=i},{}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("./stockfishqueue");n.StockfishQueue=i.StockfishQueue},{"./stockfishqueue":3}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("./event"),o=function(){function e(e,t){var n=this;this.stockfish=e,this.log=t,this.stockfish.postMessage("setoption name MultiPV value 1"),this.stockfish.addEventListener("message",function(e){n.sfEventHandler(e.data)})}return e.prototype.sfEventHandler=function(e){this.log(e.data);var t=new i.Event(e);t.isComplete();var n=t.score("fen");this.log(n)},e.prototype.solveFen=function(e){this.log("sending fen to stockfish for scoring : "+e),this.stockfish.postMessage("position fen "+e),this.stockfish.postMessage("go depth 8")},e}();n.StockfishQueue=o},{"./event":1}]},{},[2])(2)});