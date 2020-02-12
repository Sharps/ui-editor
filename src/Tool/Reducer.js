import {writeData} from "../utilities/localStorage";


export function updateEvent (events) {
    // Create new state.
    let newElements = Object.assign({}, this.state).elements;
    let selectedComponent = newElements.find(element=>element.name===this.state.selectedComponent.name)

    selectedComponent.events = events;

    // Set state to the new state.
    this.setState({
        elements: newElements
    });

    writeData("ui-editor", newElements)

}


export function updateConfig(config){
    
    let newElements = Object.assign({}, this.state).elements;
    
    let parent = newElements.find(element=>element.name===config.parentName);
    let child = newElements.find(element=>element.name===config.childName);

    parent.state = JSON.parse(parent.state);

    if(parent.config === undefined){
        parent.config = {};
    }
    else {
        parent.config = JSON.parse(parent.config);
    }
    parent.config[child.name] = config.config;
    
    if(parent.config[child.name].override) {    
        parent.state[child.name] = JSON.parse(child.state);
    } 
    else {
        delete parent.state[child.name];
    }


    parent.state = JSON.stringify(parent.state)
    parent.config= JSON.stringify(parent.config)

    this.setState({
        elements: newElements
    })

    writeData("ui-editor", newElements)
}


export function saveElement (element) {
    
    let components = Array.from(this.state.elements);
    
    // Check if element exist.
    let elementExist = components.find(component=>component.name===element.name);
    let selectedComponent = components.find(component=>component.name===this.state.selectedComponent.name);
    let selectedIndex = components.findIndex(component=>component.name===this.state.selectedComponent.name);
    if(elementExist){
        // Find the element.
        let elementUnderEdit = selectedComponent;

        // Merge.
        elementUnderEdit = Object.assign(elementUnderEdit, element)

        // Push it to original list.
        components[selectedIndex] = elementUnderEdit;
    }

    else {
        let newElement = {
            name: element.name,
            markup: element.markup,
            events: [],
            state: element.state || "{}",
            style: element.style,
            children: [],
            id: Math.ceil(Math.random()*1000),
            config:"{}"
        };

        selectedIndex = components.length-1;
        components.push(newElement);
    }

    this.setState({
        elements: components,
        element: {
            name: element.name,
            markup: element.markup,
            style: element.style,
            state: element.state,
            events: element.events || []
        }
    });

    writeData("ui-editor", components)
}


export function updateSelectedComponent (e) {
    let componentName = e.currentTarget.innerText.split("\n")[0];
    // Find the element from state that matches the currently selected element.
    let selectedComponent = this.state.elements.find(component=>component.name===componentName);

    window.selectedcomponentname = selectedComponent.name;
    // Update the state with selectedElement.
    this.setState({
        selectedComponent
    })
}