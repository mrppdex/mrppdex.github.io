(this["webpackJsonprbc-tools"]=this["webpackJsonprbc-tools"]||[]).push([[0],{47:function(t,e,n){},50:function(t,e,n){"use strict";n.r(e);var a=n(2),c=n.n(a),r=n(18),i=n.n(r),s=(n(47),n(10)),l=n.n(s),o=n(21),u=n(19),j=n(4),d=n(1),b=n(0);function h(t){var e=t.data["Mail List"]&&t.data["Mail List"].split(",").map((function(e){if(e)return Object(b.jsx)("li",{className:"list-group-item",children:Object(b.jsxs)("div",{className:"d-flex justify-content-end",children:[e,Object(b.jsx)("button",{type:"button",className:"btn btn-sm btn-outline-danger mx-2",title:"Remove Here",onClick:function(){return function(e){var n=t.allData.map((function(n){if(n.key===t.data.key){var a=n["Mail List"].split(",").filter((function(t){return t!==e}));return Object(d.a)(Object(d.a)({},n),{},{"Mail List":a.join(",")})}return n}));t.updateData(n)}(e)},children:Object(b.jsx)("i",{className:"bi-check"})}),Object(b.jsx)("button",{type:"button",className:"btn btn-sm btn-danger",title:"Remove in selected",onClick:function(){return function(e){var n=0,a=t.allData.map((function(t){if(!0===t.isChecked){var a=t["Mail List"].split(",").filter((function(t){var a=t.toUpperCase()!==e.toUpperCase();return n=a?n:n+1,a}));return Object(d.a)(Object(d.a)({},t),{},{"Mail List":a.join(",")})}return t}));t.updateData(a),alert("Removed ".concat(n," email address").concat(1!==n?"es":""))}(e)},children:Object(b.jsx)("i",{className:"bi-check-all"})})]})})})),n=t.data["Fax List"]&&t.data["Fax List"].split(",").map((function(e){if(e)return Object(b.jsx)("li",{className:"list-group-item",children:Object(b.jsxs)("div",{className:"d-flex justify-content-end",children:[e,Object(b.jsx)("button",{type:"button",className:"btn btn-sm btn-outline-danger mx-2",title:"Remove Here",onClick:function(){return function(e){var n=t.allData.map((function(n){if(n.key===t.data.key){var a=n["Fax List"].split(",").filter((function(t){return t!==e}));return Object(d.a)(Object(d.a)({},n),{},{"Fax List":a.join(",")})}return n}));t.updateData(n)}(e)},children:Object(b.jsx)("i",{className:"bi-check"})}),Object(b.jsx)("button",{type:"button",className:"btn btn-sm btn-danger",tiitle:"Remove in selected",onClick:function(){return function(e){var n=0,a=t.allData.map((function(t){if(!0===t.isChecked){var a=t["Fax List"].split(",").filter((function(t){var a=t!==e;return n=a?n:n+1,a}));return Object(d.a)(Object(d.a)({},t),{},{"Fax List":a.join(",")})}return t}));t.updateData(a),alert("Removed ".concat(n," fax number").concat(1!==n?"s":""))}(e)},children:Object(b.jsx)("i",{className:"bi-check-all"})})]})})}));return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:Object(b.jsx)("input",{className:"form-check form-check-input",type:"checkbox",checked:t.data.isChecked,onChange:function(){var e=t.allData.map((function(e){return e.key===t.data.key?Object(d.a)(Object(d.a)({},e),{},{isChecked:!e.isChecked}):e}));t.updateData(e),t.data.isChecked=!t.data.isChecked}})}),Object(b.jsx)("td",{children:t.data.Regn}),Object(b.jsx)("td",{children:t.data.Level}),Object(b.jsx)("td",{children:t.data.ID}),Object(b.jsx)("td",{children:t.data["Linked report"]}),Object(b.jsx)("td",{children:Object(b.jsxs)("ul",{className:"list-group",children:[" ",e," "]})}),Object(b.jsx)("td",{children:Object(b.jsxs)("ul",{className:"list-group",children:[" ",n," "]})})]},t.data.key)}var p={Regn:"",Level:"CLI",ID:"","Linked report":"","Mail List":"","Fax List":""},f={DBOF:["","PERIOSTD-DBOF"],DBAO:["","DBAO-Contract-Note","DBAO-Contract-Note-Transfer"],DBAR:["","DBAR-Contract-Note","DBAR-Contract-Note-Transfer"],DBJH:["","dbjh-confirm-1","dbjh-confirm-2","dbjh-confirm-AD","dbjh-confirm-t","DBJH-contract-note","DBJH-Contract-Note-Transfer","djallcch","doallcch","ICTA-MRG-LU238","ICTA-MRG-LU348","ICTA-MRG-LU349","PERIOSTD-DBJH"],DBMM:["","DBMM-Contract-Note","DBMM-Contract-Note-Transfer"]},O=Object.keys(f),m=!0;function x(t){var e=Object(a.useState)(""),n=Object(j.a)(e,2),c=n[0],r=n[1],i=Object(a.useState)(""),s=Object(j.a)(i,2),l=s[0],o=s[1],u=Object(a.useState)(""),h=Object(j.a)(u,2),x=h[0],v=h[1],g=Object(a.useState)("alert-danger"),C=Object(j.a)(g,2),D=C[0],L=C[1];if(m){m=!1;var N=O[0],y=f[N].map((function(t){return Object(d.a)(Object(d.a)({},p),{},{Regn:N,"Linked report":t})}));t.updateData(k(y))}function M(e){var n=e.target.value,a=f[n].map((function(t){return Object(d.a)(Object(d.a)({},p),{},{Regn:n,"Linked report":t})}));t.updateData(k(a))}function F(t){var e=/[a-z0-9]{3}\d{7}/gim.exec(t);return t&&10==t.length&&e&&e.length>0?(L("alert-success"),!0):(L("alert-danger"),!1)}var R=function(){var t=O.map((function(t){return Object(b.jsx)("option",{value:t,children:t})}));return Object(b.jsx)("select",{className:"form-select form-select-sm",onChange:M,children:t})}(),A=Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"col",children:Object(b.jsx)("input",{className:"form-check form-check-input",type:"checkbox",checked:!t.globalCheck,onClick:t.toggleSelected})}),Object(b.jsx)("th",{scope:"col",children:R}),Object(b.jsx)("th",{scope:"col",children:"Level"}),Object(b.jsx)("th",{scope:"col",children:Object(b.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),F(c)&&t.allData){var n=t.allData.map((function(t){return t.isChecked?Object(d.a)(Object(d.a)({},t),{},{ID:c.toUpperCase()}):t}));t.updateData(n)}else alert("Invalid account number")},children:[Object(b.jsx)("input",{type:"search",onChange:function(t){r(t.target.value),F(t.target.value)}}),Object(b.jsx)("button",{type:"submit",className:D,children:"change"})]})}),Object(b.jsx)("th",{scope:"col",children:"Linked report"}),Object(b.jsx)("th",{scope:"col",children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=t.allData.map((function(t){if(t.isChecked&&function(t){var e=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm.exec(t);return!!(e&&e.length>0)}(l)&&!t["Mail List"].split(",").find((function(t){return t.toUpperCase()===l.toUpperCase()}))){var e=[t["Mail List"].split(","),l].join(",");return Object(d.a)(Object(d.a)({},t),{},{"Mail List":e})}return t}));t.updateData(n)},children:[Object(b.jsx)("input",{type:"search",onChange:function(t){o(t.target.value.trim())}}),Object(b.jsx)("button",{type:"submit",children:"add"})]})}),Object(b.jsx)("th",{scope:"col",children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=t.allData.map((function(t){if(t.isChecked&&!t["Fax List"].split(",").find((function(t){return t===x}))){var e=[t["Fax List"].split(","),x].join(",");return Object(d.a)(Object(d.a)({},t),{},{"Fax List":e})}return t}));t.updateData(n)},children:[Object(b.jsx)("input",{type:"search",onChange:function(t){v(t.target.value.trim())}}),Object(b.jsx)("button",{type:"submit",children:"add"})]})})]});return Object(b.jsx)("thead",{children:A})}var v=n(22);function g(t){var e=Object(a.useState)(!1),n=Object(j.a)(e,2),c=n[0],r=n[1],i=t.data;function s(e){t.updateData(e)}var l=i&&i.map((function(t){return Object(b.jsx)(h,{data:t,allData:i,updateData:s})}));return Object(b.jsxs)("table",{className:"table table-sm table-success table-hover table-striped",children:[Object(b.jsx)(x,{globalCheck:c,toggleSelected:function(){r(!c),s(i.map((function(t){return Object.assign(t,{isChecked:c})})))},allData:i,updateData:s}),Object(b.jsx)("tbody",{children:l})]})}function k(t){return t.map((function(t){return Object.assign({key:Object(v.a)(),isChecked:!0},t)}))}var C=n(20),D={All:function(){return!0},Active:function(t){return!t.completed},Completed:function(t){return t.completed}},L=[],N=[];var y=function(t){var e=Object(a.useState)(t.data?k(t.data):null),n=Object(j.a)(e,2),c=n[0],r=n[1],i=Object(a.useState)(""),s=Object(j.a)(i,2),d=s[0],h=s[1],p=Object(a.useState)("All"),f=Object(j.a)(p,2),O=f[0];function m(t){var e=Object(C.a)(";");return t=t.endsWith("\n")?t.slice(0,t.length-1):t,e.parse(t)}function x(){return(x=Object(u.a)(l.a.mark((function t(e){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(n=new FileReader).onload=function(t){r(k(m(t.target.result)))},n.readAsText(e);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return f[1],Object(b.jsxs)("div",{className:"tab-content",children:[Object(b.jsxs)("div",{className:"tab-pane fade show active",id:"main",role:"tabpanel",children:[Object(b.jsxs)("div",{className:"table-responsive",children:[Object(b.jsx)("input",{type:"file",onChange:function(t){(function(t){return x.apply(this,arguments)})(t.target.files[0]).then((function(t){return console.log(t)}))}}),Object(b.jsx)(g,{data:c,updateData:r,filterFun:D[O]})]}),Object(b.jsx)("hr",{}),Object(b.jsx)("b",{children:"Pawel Piela"})," pawel.piela@rbc.com"]}),Object(b.jsxs)("div",{className:"tab-pane fade show",id:"csv",role:"tabpanel",children:[Object(b.jsx)("div",{className:"container",children:Object(b.jsxs)("div",{className:"row mt-3",children:[Object(b.jsxs)("div",{className:"col-auto me-auto",children:[Object(b.jsx)("button",{className:"btn btn-sm btn-primary",onClick:function(){var t=c.filter((function(t){return t.isChecked})).filter((function(t){return t["Mail List"].length>0||t["Fax List"].length>0})).map((function(t){var e=t["Mail List"].split(",").filter((function(t){return t&&t.length>0})).join(","),n=t["Fax List"].split(",").filter((function(t){return t&&t.length>0})).join("#");return[t.Regn,t.Level,t.ID,t["Linked report"],"".concat(e),"".concat(n)].join(";")}));L.push(t.join("\r\n")),h(L.join("\r\n")+"\r\n")},children:"Generate content of the load file"}),Object(b.jsx)("button",{className:"btn btn-sm btn-secondary mx-2",onClick:function(){document.getElementById("csvTextArea").select(),document.execCommand("copy"),alert("Text copied to the clipboard: ".concat(d.length," characters."))},children:"Copy to clipboard"})]}),Object(b.jsxs)("div",{className:"col-auto",children:[Object(b.jsx)("button",{className:"btn btn-sm btn-danger mx-2",onClick:function(){L.length>0&&N.push(Object(o.a)(L)),L=[],h("")},children:"Clear"}),Object(b.jsx)("button",{className:"btn btn-sm btn-outline-danger",onClick:function(){L.length>0?L.pop():L=N.length>0?N.pop():[],h(L.length>0?L.join("\r\n")+"\r\n":"")},children:"Undo"})]})]})}),Object(b.jsx)("div",{className:"container",children:Object(b.jsx)("div",{id:"csvText",children:Object(b.jsx)("textarea",{id:"csvTextArea",value:d})})})]})]})},M=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,51)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,r=e.getLCP,i=e.getTTFB;n(t),a(t),c(t),r(t),i(t)}))};i.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(y,{data:null})}),document.getElementById("root")),M()}},[[50,1,2]]]);
//# sourceMappingURL=main.70e74921.chunk.js.map