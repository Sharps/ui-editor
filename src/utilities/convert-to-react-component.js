import { codeModifier } from "./codeModifier";
import { getChildComponents } from "../utilities/nestedComponentSetup";

function getComponentString(component, options){

    if(!component.idMarkup[3]){
        return;
    }
    return convertToReactcomponent(component, options);
}

function createComponent(component){
    let componentString = getComponentString(component, {"drag-drop-feature":true});
    // eval does not evaluate class if not exclosed in paranthesis.
    return eval(Babel.transform(componentString, { presets: ['react'], plugins: ["transform-es2015-classes"]  }).code)
}


// Elements to  react component.
function convertToReactcomponent (component, options){

    /**
     * 1. if options.drag-drop-feature = true, use idMarkup as property
     */

    let markup = "markup";
    if(options && options["drag-drop-feature"]){
        markup = "idMarkup"
    }
    component.events.forEach(event=>{
        event.id = event.id.replace("-","");
    })

    let getComponentNameInMarkup= (component)=>{
        return component[markup].replace(">",` data-name='${component.name}'>`)
    }

    let getComponentEventedMarkup = (markup, events)=>{
        events.forEach(event=>{
            let id = `id="${event.id}"`;
            markup = markup.replace(id, `${id} ${event.name}={this.${event.id+event.name}.bind(this)}`);
        });

        // This was a easy to think but hard to write a readable code. I know comments wont help.
        let childComponents = getChildComponents(markup);
        if(childComponents.length>0){
            // For each of child components
            childComponents.forEach(child=>{

                // From each of child events filter the publishable events.
                let publishableEvents = child.events.filter(event=>event.publishable===true);
                // Filter publishable child events that are in parent.
                // For each of publishable events
                // Find which is present in this component.events.name
                if(publishableEvents.length!=0){

                    let eventUsedInParent;
                    publishableEvents.forEach(publishableEvent=>{
                        eventUsedInParent = component.events.find(event=>event.name===publishableEvent.publishName)
                    })
                    let functionDef = codeModifier(eventUsedInParent.reducer, component);
    
                    let props = eventUsedInParent.name+'='+`{function(e){${functionDef}}.bind(this)}`
                    // then do idMarkup.replace
                    markup = component[markup].replace(child.name, child.name+" "+props);
                }

            })
            return markup.split("{state.").join("{this.state.");
        }
    
        return markup.split("{state.").join("{this.state.")
    }

    // checks if state override is on. then adds state prop to child 
    let getStatedMarkup = (markup)=>{
        // for all the config.
        // filter child with overide state is true
        let config = JSON.parse(component.config);
        let childrenConfig = Object.keys(config);
        childrenConfig.forEach(childName=>{
            if(config[childName].overideState){
                markup = markup.replace(childName, childName+` state={this.state.${childName}}`)
            }
        })
        return markup;
    }

    let getComponentReducers = (events) => {
        return events.map(event=>{
            let functionName = event.id+event.name;
            let functionDef = codeModifier(event.reducer, component);

            if(event.publishable===true){
                return `
                    ${functionName} (e) {
                        ${functionDef}
                        e.state = state;
                        debugger;(1)
                        this.props.${event.publishName}? this.props.${event.publishName}(e):null;
                    }
                    `
            }
            return `
                    ${functionName} (e) {
                        ${functionDef}
                    }`
        }).join("\n")
    }
    
    let componentNamedMakrup = getComponentNameInMarkup(component);
    let componentEventedMarkup = getComponentEventedMarkup(componentNamedMakrup, component.events)
    let stateOverideMarkup = getStatedMarkup(componentEventedMarkup)
    let componentReducers = getComponentReducers(component.events)
    let componentName = component.name.split(" ").join("")
    let componentState = component.state
    let ReactComponent = 
    `(
    class ${componentName} extends Component {
    
        constructor(props) {
            super(props);
            this.state = this.props.state || ${componentState};
        }
    
        ${componentReducers}
    
        render() {
    
            return (${stateOverideMarkup})
        }
    })
    `
    return ReactComponent;
}

module.exports = {
    createComponent,
    getComponentString
}