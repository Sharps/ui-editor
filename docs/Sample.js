window.sampleComponents =[
  {
    "name": "Canvas",
    "markup": "<div className=\"canvasComponent\" style={state.style} id=\"canvas\" dangerouslySetInnerHTML={{ __html: `${state.innerHTML}` }}>\n</div>",
    "events": [
      {
        "name": "onMouseOver",
        "reducer": "if(state.mode===\"Draw\"){\n\tstate.style.cursor = \"crosshair\";\n}\nif(state.mode===\"Text\"){\n\tstate.style.cursor = \"text\";\n}\nif(state.mode===\"Select\"){\n\tstate.style.cursor = \"default\";\n}\n",
        "index": 0,
        "publishable": "",
        "publishName": "",
        "id": "canvas"
      },
      {
        "name": "onMouseDown",
        "reducer": "function create(type, x, y){\n\t  var item = document.createElement(type);\n      item.style.position = \"fixed\";\n      item.style.left = x+ \"px\";\n      item.style.top = y + \"px\";\n      item.style.border = \"1px solid green\";\n      item.id = Math.random();\n      return item;\n}\n\nif(e.button===0 && e.target.type!==\"text\"){\n  if(state.mode===\"Draw\"){\n\t\n      var div = create(\"div\", e.clientX, e.clientY);\n      var parent = e.target;\n      parent.appendChild(div);\n\n      state.divId = div.id;\n      state.origin = true;\n  }\n  if(state.mode===\"Text\"){\n  \t\n      var x = e.clientX, y = e.clientY;\n      var input = create(\"input\", e.clientX, e.clientY);\n      input.type=\"text\";\n\t  var parent = e.target;\n      parent.appendChild(input);\n      input.addEventListener(\"mouseout\", function(e){\n\t\t   input.remove();\n           var span = create(\"span\", x, y);\n           span.innerText = input.value;\n           parent.appendChild(span)\n\t  });\n  }\n}",
        "index": 1,
        "publishable": "",
        "publishName": "",
        "id": "canvas"
      },
      {
        "name": "onMouseMove",
        "reducer": "if(state.mode===\"Draw\"){\n  if(state.origin){\n      var div= document.getElementById(state.divId);\n      var rect = div.getBoundingClientRect();\n      div.style.width = e.clientX - rect.left;\n      div.style.height = e.clientY - rect.top;\n  }\n}",
        "index": 2,
        "publishable": "",
        "publishName": "",
        "id": "canvas"
      },
      {
        "name": "onMouseUp",
        "reducer": "if(state.mode===\"Draw\"){\n\tif(e.button===0){\n\t\tstate.origin = false;\n\t}\n\n}",
        "index": 3,
        "publishable": true,
        "publishName": "onEditFinish",
        "id": "canvas"
      },
      {
        "name": "onContextMenu",
        "reducer": "e.stopPropagation();\ne.preventDefault();\n",
        "index": 4,
        "publishable": true,
        "publishName": "onShowContextMenu",
        "id": "canvas"
      }
    ],
    "state": "{\n\t\"style\":{\n    \t\"cursor\" : \"pointer\"\n     },\n     \"divs\" : [],\n     \"mode\" : \"Draw\"\n}",
    "style": ".canvasComponent{\n\theight:100vh;\n    width:100vw;\n    position: fixed;\n    background-color: black;\n\ttop: 0px;\n    left: 0px;\n}\n",
    "children": [],
    "id": 198,
    "config": "{}",
    "trueName": "Canvas"
  },
  {
    "name": "Resizable",
    "markup": "<div id=\"resizable\" style={state.style}>\n    <div class='resizer' id=\"topLeft\"></div>\n    <div class='resizer' id=\"topRight\"></div>\n    <div class='resizer' id=\"bottomLeft\"></div>\n    <div class='resizer' id=\"bottomRight\"></div>\n</div>",
    "events": [
      {
        "name": "onMouseDown",
        "reducer": "state.resizeTopLeft=true;\ne.stopPropagation();",
        "index": 0,
        "publishable": "",
        "publishName": "",
        "id": "topLeft"
      },
      {
        "name": "onMouseMove",
        "reducer": "if(state.resizeTopLeft){\n\tlet width = Number(state.style.width.split(\"px\")[0]);\n    let left = Number(state.style.left.split(\"px\")[0]);\n\tstate.style.width = (width + left - e.clientX) + \"px\";\n    state.style.left = e.clientX + \"px\";\n    \n    let height = Number(state.style.height.split(\"px\")[0]);\n    let top = Number(state.style.top.split(\"px\")[0]);\n\tstate.style.height = (height + top - e.clientY) + \"px\";\n    state.style.top = e.clientY + \"px\";\n}\ne.stopPropagation();",
        "index": 1,
        "publishable": "",
        "publishName": "",
        "id": "topLeft"
      },
      {
        "name": "onMouseUp",
        "reducer": "state.resizeTopLeft=false;\ne.stopPropagation();",
        "index": 2,
        "publishable": "",
        "publishName": "",
        "id": "topLeft"
      },
      {
        "name": "onMouseDown",
        "reducer": "state.resizeBottomLeft=true;\ne.stopPropagation();",
        "index": 3,
        "publishable": "",
        "publishName": "",
        "id": "bottomLeft"
      },
      {
        "name": "onMouseMove",
        "reducer": "if(state.resizeBottomLeft){\n\n\tlet width = Number(state.style.width.split(\"px\")[0]);\n    let left = Number(state.style.left.split(\"px\")[0]);\n\tstate.style.width = (width + left - e.clientX) + \"px\";\n    state.style.left = e.clientX + \"px\";\n\n    let height = Number(state.style.height.split(\"px\")[0]);\n    let top = Number(state.style.top.split(\"px\")[0]);\n\tstate.style.height = e.clientY -top+10  + \"px\";\n}\ne.stopPropagation();",
        "index": 4,
        "publishable": "",
        "publishName": "",
        "id": "bottomLeft"
      },
      {
        "name": "onMouseUp",
        "reducer": "state.resizeBottomLeft=false;\ne.stopPropagation();",
        "index": 5,
        "publishable": "",
        "publishName": "",
        "id": "bottomLeft"
      },
      {
        "name": "onMouseDown",
        "reducer": "state.resizeBottomRight=true;\ne.stopPropagation();",
        "index": 6,
        "publishable": "",
        "publishName": "",
        "id": "bottomRight"
      },
      {
        "name": "onMouseUp",
        "reducer": "state.resizeBottomRight=false;\ne.stopPropagation();",
        "index": 7,
        "publishable": "",
        "publishName": "",
        "id": "bottomRight"
      },
      {
        "name": "onMouseMove",
        "reducer": "if(state.resizeBottomRight){\n\n    let height = Number(state.style.height.split(\"px\")[0]);\n    let top = Number(state.style.top.split(\"px\")[0]);\n\tstate.style.height = (e.clientY - top +15 ) + \"px\";\n    \n   \tlet width = Number(state.style.width.split(\"px\")[0]);\n    let left = Number(state.style.left.split(\"px\")[0]);\n\tstate.style.width =  e.clientX - left + 10 + \"px\";\n\n    \n}\ne.stopPropagation();",
        "index": 8,
        "publishable": "",
        "publishName": "",
        "id": "bottomRight"
      },
      {
        "name": "onMouseOut",
        "reducer": "state.resizeTopLeft=false;\ne.stopPropagation();",
        "publishable": "",
        "publishName": "",
        "id": "topLeft"
      },
      {
        "name": "onMouseOut",
        "reducer": "state.resizeBottomLeft=false;\ne.stopPropagation();",
        "publishable": "",
        "publishName": "",
        "id": "bottomLeft"
      },
      {
        "name": "onMouseOut",
        "reducer": "state.resizeBottomRight=false;\ne.stopPropagation();",
        "publishable": "",
        "publishName": "",
        "id": "bottomRight"
      },
      {
        "name": "onMouseDown",
        "reducer": "state.resizeTopRight=true;\ne.stopPropagation();",
        "index": 12,
        "publishable": "",
        "publishName": "",
        "id": "topRight"
      },
      {
        "name": "onMouseUp",
        "reducer": "state.resizeTopRight=false;\ne.stopPropagation();",
        "index": 13,
        "publishable": "",
        "publishName": "",
        "id": "topRight"
      },
      {
        "name": "onMouseOut",
        "reducer": "state.resizeTopRight=false;\ne.stopPropagation();",
        "index": 14,
        "publishable": "",
        "publishName": "",
        "id": "topRight"
      },
      {
        "name": "onMouseMove",
        "reducer": "if(state.resizeTopRight){\n\tlet width = Number(state.style.width.split(\"px\")[0]);\n    let left = Number(state.style.left.split(\"px\")[0]);\n\tstate.style.width = (e.clientX - left + 5) + \"px\";\n    \n    let height = Number(state.style.height.split(\"px\")[0]);\n    let top = Number(state.style.top.split(\"px\")[0]);\n\tstate.style.height = -e.clientY + height + top + \"px\";\n    state.style.top = e.clientY + \"px\";\n}\ne.stopPropagation();",
        "index": 15,
        "publishable": "",
        "publishName": "",
        "id": "topRight"
      }
    ],
    "state": "{\n\t\"style\":{\n        \"top\": \"200px\",\n        \"left\": \"200px\",\n        \"height\": \"100px\",\n        \"width\": \"100px\"\n\t}\n}",
    "style": "#resizable {\n\tposition: fixed;\n    border: 1px solid green;\n    cursor: grab;\n}\n\nbody,\nhtml {\n  background: black;\n}\n#resizable {\n  position: absolute;\n  background: black;\n  border: 3px solid #4286f4;\n  box-sizing: border-box;\n}\n\n\n#resizable .resizer{\n  width: 10px;\n  height: 10px;\n  border-radius: 50%; \n  background: white;\n  border: 3px solid #4286f4;\n  position: absolute;\n}\n\n#resizable .resizer#topLeft {\n  left: -5px;\n  top: -5px;\n  cursor: nwse-resize;\n}\n#resizable .resizer#topRight {\n  right: -5px;\n  top: -5px;\n  cursor: nesw-resize;\n}\n#resizable .resizer#bottomLeft {\n  left: -5px;\n  bottom: -5px;\n  cursor: nesw-resize;\n}\n#resizable .resizer#bottomRight {\n  right: -5px;\n  bottom: -5px;\n  cursor: nwse-resize;\n}",
    "children": [],
    "id": 557,
    "config": "{}",
    "trueName": "Resizable"
  },
  {
    "name": "Movable",
    "markup": "<div id=\"movable\" style={state.style}></div>",
    "events": [
      {
        "name": "onMouseDown",
        "reducer": "e.target.style.cursor = \"grabbing\";\nstate.grabbing = true;\nconsole.log(\"Mousedown\")",
        "index": 0,
        "publishable": "",
        "publishName": "",
        "id": "resizable"
      },
      {
        "name": "onMouseUp",
        "reducer": "e.target.style.cursor = \"grab\";\nstate.grabbing = false;\nconsole.log(\"mouseup\")",
        "index": 1,
        "publishable": "",
        "publishName": "",
        "id": "resizable"
      },
      {
        "name": "onMouseMove",
        "reducer": "if(state.grabbing) {\n\tvar rect = e.target.getBoundingClientRect();\n\n    e.target.style.top = e.clientY - rect.height/2  + \"px\";\n    e.target.style.left = e.clientX - rect.width/2 + \"px\";\n}\nconsole.log(\"mousemove\")",
        "index": 2,
        "publishable": "",
        "publishName": "",
        "id": "resizable"
      },
      {
        "name": "onMouseDown",
        "reducer": "e.target.style.cursor = \"grabbing\";\nstate.grabbing = true;\n",
        "publishable": "",
        "publishName": "",
        "id": "movable"
      },
      {
        "name": "onMouseUp",
        "reducer": "e.target.style.cursor = \"grab\";\nstate.grabbing = false;\n",
        "publishable": "",
        "publishName": "",
        "id": "movable"
      },
      {
        "name": "onMouseMove",
        "reducer": "if(state.grabbing) {\n\tvar rect = e.target.getBoundingClientRect();\n\n    e.target.style.top = e.clientY - rect.height/2  + \"px\";\n    e.target.style.left = e.clientX - rect.width/2 + \"px\";\n}",
        "publishable": "",
        "publishName": "",
        "id": "movable"
      }
    ],
    "state": "{\n\t\"style\":{\n        \"top\": \"200px\",\n        \"left\": \"200px\"\n\t}\n}",
    "style": "#movable {\n\tposition: fixed;\n    border: 1px solid green;\n    height: 100px;\n    width: 100px;\n    cursor: grab;\n}",
    "children": [],
    "id": 557,
    "config": "{}",
    "trueName": "Movable"
  },
  {
    "name": "Editor",
    "markup": "<div id=\"editor\">\n\t<Canvas></Canvas>\n    <CanvasControls></CanvasControls>\n</div>",
    "events": [
      {
        "name": "onShowContextMenu",
        "reducer": "if (state.CanvasControlsVariant === \"New\") {\n    state.CanvasControls.push({\n        \"undo\": \"undo disabled\",\n        \"redo\": \"redo disabled\",\n        \"draw\": \"draw enabled\",\n        \"text\": \"text disabled\",\n        \"image\": \"image disabled\",\n        \"group\": \"group disabled\",\n        \"ungroup\": \"ungroup disabled\",\n        \"duplicate\": \"duplicate disabled\",\n        \"delete\": \"delete disabled\",\n        \"select\": \"select disabled\",\n        \"deselect\": \"deselect disabled\",\n        \"style\": {\n            \"top\": e.clientY + \"px\",\n            \"left\": e.clientX + \"px\"\n        }\n    })\n}\nif (state.CanvasControlsVariant === \"Created\") {\n    state.CanvasControls.push({\n        \"undo\": \"undo enabled\",\n        \"redo\": \"redo disabled\",\n        \"draw\": \"draw enabled\",\n        \"text\": \"text enabled\",\n        \"image\": \"image enabled\",\n        \"group\": \"group disabled\",\n        \"ungroup\": \"ungroup disabled\",\n        \"duplicate\": \"duplicate disabled\",\n        \"delete\": \"delete disabled\",\n        \"select\": \"select enabled\",\n        \"deselect\": \"deselect disabled\",\n        \"style\": {\n            \"top\": e.clientY + \"px\",\n            \"left\": e.clientX + \"px\"\n        }\n    })\n}\nif (state.CanvasControlsVariant === \"SingleSelection\") {\n    state.CanvasControls.push({\n        \"undo\": \"undo enabled\",\n        \"redo\": \"redo enabled\",\n        \"draw\": \"draw enabled\",\n        \"text\": \"text disabled\",\n        \"image\": \"image disabled\",\n        \"group\": \"group disabled\",\n        \"ungroup\": \"ungroup disabled\",\n        \"duplicate\": \"duplicate enabled\",\n        \"delete\": \"delete enabled\",\n        \"select\": \"select disabled\",\n        \"deselect\": \"deselect enabled\",\n        \"style\": {\n            \"top\": e.clientY + \"px\",\n            \"left\": e.clientX + \"px\"\n        }\n    })\n}\n\nif (state.CanvasControlsVariant === \"MultiGroup\") {\n    state.CanvasControls.push({\n        \"undo\": \"undo enabled\",\n        \"redo\": \"redo enabled\",\n        \"draw\": \"draw enabled\",\n        \"text\": \"text disabled\",\n        \"image\": \"image disabled\",\n        \"group\": \"group enabled\",\n        \"ungroup\": \"ungroup disabled\",\n        \"duplicate\": \"duplicate enabled\",\n        \"delete\": \"delete enabled\",\n        \"select\": \"select disabled\",\n        \"deselect\": \"deselect enabled\",\n        \"style\": {\n            \"top\": e.clientY + \"px\",\n            \"left\": e.clientX + \"px\"\n        }\n    })\n}\n\nif (state.CanvasControlsVariant === \"MultiUngroup\") {\n    state.CanvasControls.push({\n        \"undo\": \"undo enabled\",\n        \"redo\": \"redo enabled\",\n        \"draw\": \"draw enabled\",\n        \"text\": \"text disabled\",\n        \"image\": \"image disabled\",\n        \"group\": \"group disabled\",\n        \"ungroup\": \"ungroup enabled\",\n        \"duplicate\": \"duplicate enabled\",\n        \"delete\": \"delete enabled\",\n        \"select\": \"select disabled\",\n        \"deselect\": \"deselect enabled\",\n        \"style\": {\n            \"top\": e.clientY + \"px\",\n            \"left\": e.clientX + \"px\"\n        }\n    })\n}\n\nstate.Canvas[0].innerHTML = e.currentTarget.innerHTML;\n\n",
        "index": 0,
        "publishable": "",
        "publishName": "",
        "id": "Canvas"
      },
      {
        "name": "onItemSelected",
        "reducer": "if(\"Draw\" === e.state.item){\n\tstate.CanvasControlsVariant = \"Created\";\n    state.Canvas[0].mode = \"Draw\";\n}\nif(\"Text\" === e.state.item){\n\tstate.CanvasControlsVariant = \"Created\";\n    state.Canvas[0].mode = \"Text\";\n}\n\nif(\"Select\" === e.state.item){\n\tstate.CanvasControlsVariant = \"MultiGroup\";\n    state.Canvas[0].mode = \"Select\"\n}\n\nif(\"Deselect\" === e.state.item){\n\tstate.CanvasControlsVariant = \"Created\";\n}\n\nif(\"Group\" === e.state.item){\n\tstate.CanvasControlsVariant = \"MultiUngroup\";\n}\n\nif(\"Ungroup\" === e.state.item){\n\tstate.CanvasControlsVariant = \"MultiGroup\";\n}\nstate.CanvasControls=[];\n",
        "index": 0,
        "publishable": "",
        "publishName": "",
        "id": "CanvasControls"
      }
    ],
    "state": "{\"CanvasControlsVariant\":\"New\",\"CanvasControls\":[],\"Canvas\":[{\"style\":{\"cursor\":\"pointer\"},\"innerHTML\":\"\",\"divs\":[],\"mode\":\"\"}]}",
    "style": "",
    "children": [],
    "id": 707,
    "config": "{\"CanvasControls\":{\"override\":true},\"Canvas\":{\"override\":true}}",
    "trueName": "Editor"
  },
  {
    "name": "CanvasControls",
    "markup": "<div id=\"menu\" style={state.style}>\n    <div id=\"history-control\">\n        <div className={state.undo}>\n            <i className=\"fa fa-undo\"></i>\n            <span>Undo</span>\n\t\t</div>\n        <div className={state.redo}>\n\t\t\t<i className=\"fa fa-redo\"></i>\n        \t<span>Redo</span>\n\t\t</div>\n    </div>\n    <div id=\"content-control\">\n        <div className={state.draw}>\n            <i className=\"fa fa-edit\"></i>\n        \t<span>Draw</span>\n        </div>\n        <div className={state.text}>\n            <i className=\"fa fa-font\"></i>\n        \t<span>Text</span>\n        </div>\n        <div className={state.image}>\n            <i className=\"fas fa-image\"></i>\n        \t<span>Image</span>\n        </div>\n    </div>\n    <div id=\"edit-control\">\n        <div className={state.group}>\n            <i className=\"fa fa-object-group\"></i>\n        \t<span>Group</span>\n        </div>\n        <div className={state.ungroup}>\n            <i className=\"fa fa-object-ungroup\"></i>\n        \t<span>Ungroup</span>\n        </div>\n        <div className={state.duplicate}>\n            <i className=\"fa fa-clone\"></i>\n        \t<span>Duplicate</span>\n        </div>\n        <div className={state.delete}>\n            <i className=\"fa fa-trash\"></i>\n        \t<span>Delete</span>\n        </div>\n    </div>\n    <div id=\"selection-control\">\n        <div className={state.select}>\n        \t<i className=\"fa fa-mouse-pointer\"></i>\n        \t<span>Select</span>\n        </div>\n        <div className={state.deselect}>\n            <i className=\"fa fa-mouse-pointer\"></i>\n        \t<span>Deselect</span>\n        </div>\n    </div>\n</div>",
    "events": [
      {
        "name": "onClick",
        "reducer": "state.item = e.target.innerText;",
        "index": 0,
        "publishable": true,
        "publishName": "onItemSelected",
        "id": "menu"
      }
    ],
    "state": "{\n\t\"undo\":\"undo disabled\",\n    \"redo\":\"redo disabled\",\n\t\"draw\":\"draw enabled\",\n    \"text\":\"text disabled\",\n    \"image\":\"image disabled\",\n\t\"group\":\"group disabled\",\n    \"ungroup\":\"ungroup disabled\",\n\t\"duplicate\":\"duplicate disabled\",\n    \"delete\":\"delete disabled\",\n\t\"select\":\"select disabled\",\n    \"deselect\":\"deselect disabled\",\n    \"style\" : {\n    \t\"top\": \"100px\",\n        \"left\":\"200px\"\n    }\n}",
    "style": "#menu {\n    position: fixed;\n    font-size:10px;\n    user-select: none;\n    color: rgba(255,255,255,0.5);\n    background: rgb(64, 64, 64);\n}\n\n#menu > div > div:hover:not(.disabled){\n    background: rgb(43, 43, 43);\n    color: white;\n}\n\n.disabled{\n    cursor: not-allowed;\n    background: #333333;\n    color: #4a4a4a;\n}\n\n\n\n#menu > div > div span {\n    padding-left: 9px;\n}\n\n#menu > div > div {\n    box-sizing: border-box;\n    padding: 10px;\n    height: 29px;\n}\n\n#history-control {\n    border: 1px solid #2C3134;\n    width: 111px;\n    height: 60px;\n}\n\n#content-control {\n    border: 1px solid #2C3134;\n    width: 111px;\n    height: 90px;\n}\n\n#edit-control {\n    border: 1px solid #2C3134;\n    width: 111px;\n    height: 118px;\n}\n\n#selection-control {\n    border: 1px solid #2C3134;\n    width: 111px;\n    height: 60px;\n}\n",
    "children": [],
    "id": 550,
    "config": "{}",
    "trueName": "CanvasControls"
  },
  {
    "name": "PropertiesControl",
    "markup": "<div class=\"properties\">\n    <div class=\"size\">\n        <div class=\"height\">\n            <span class=\"name\">Height</span>\n            <button class=\"less\"><i class=\"fa fa-minus\"></i></button>\n            <input type=\"text\"/>\n            <button class=\"more\"><i class=\"fa fa-plus\"></i></button>\n        </div>\n        <div class=\"width\">\n            <span class=\"name\">Width</span>\n            <button class=\"less\"><i class=\"fa fa-minus\"></i></button>\n            <input type=\"text\"/>\n            <button class=\"more\"><i class=\"fa fa-plus\"></i></button>\n        </div>\n    </div>\n\n    <div class=\"position\">\n        <div class=\"top\">\n            <span class=\"name\">Top</span>\n            <button class=\"less\"><i class=\"fa fa-minus\"></i></button>\n            <input type=\"text\"/>\n            <button class=\"more\"><i class=\"fa fa-plus\"></i></button>\n        </div>\n        <div class=\"left\">\n            <span class=\"name\">Left</span>\n            <button class=\"less\"><i class=\"fa fa-minus\"></i></button>\n            <input type=\"text\"/>\n            <button class=\"more\"><i class=\"fa fa-plus\"></i></button>\n        </div>\n    </div>\n\n    <div clas=\"border\">\n        <div class=\"borderSize\">\n            <span class=\"name\">Border</span>\n            <button class=\"less\"><i class=\"fa fa-minus\"></i></button>\n            <input type=\"text\"/>\n            <button class=\"more\"><i class=\"fa fa-plus\"></i></button>\n        </div>\n    \n        <div class=\"borderColor\">\n            <span class=\"name\">Color</span>\n            <input type=\"color\"/>\n        </div>\n        <div class=\"borderType\">\n            <span class=\"name\">Type</span>\n            <button class=\"downArrow\"></button>\n        </div>\n    </div>\n\n    <div class=\"space\">\n        <span class=\"name\">Space</span>\n        <button class=\"less\"><i class=\"fa fa-minus\"></i></button>\n        <input type=\"text\"/>\n        <button class=\"more\"><i class=\"fa fa-plus\"></i></button>\n    </div>\n</div>",
    "events": [],
    "state": "{}",
    "style": ".properties {\n    position: absolute;\n left: 400px;\n top: 208px;\nborder: 1px solid #2C3134;\n width: 165px;\n font-size: 10px;\n background: rgb(64, 64, 64);\n color: rgba(255,255,255,0.5);\n}\n\n.properties input{\n    width: 50px;\n    padding: 5px;\n    margin-left: 4px;\n}\n\n.properties > div {\n    border: 1px solid #2C3134;\n    padding: 8px;\n}\n\n.properties > div > div:not(:first-child){\n    margin-top:7px;\n}\n\nspan.name {\n    display: inline-block;\n    width: 40px;\n}\n\n.properties .space{\n border: 1px solid #2C3134;\n}\n\n.less{\n    height: 21px;\n    width: 21px;\n    border: 1px solid #2C3134;\n}\n\n.more{\n    height: 21px;\n    width: 21px;\n    border: 1px solid #2C3134;\n}",
    "children": [],
    "id": 285,
    "config": "{}",
    "trueName": "PropertiesControl"
  }
];

window.sampleFolders = [
  {
      "type":"noFolder",
      "name":"noFolder",
      "contents":["Canvas", "Resizable", "Movable", "Editor", "CanvasControls", "PropertiesControl"]
  }
]