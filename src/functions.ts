import { STATIC_IDENTIFIER } from "./identifiers"


export function getJson(object_containing_classes: any) {
    let keys = Object.keys(object_containing_classes)
    let list = []

    for (let key of keys) {
        if (object_containing_classes[key][STATIC_IDENTIFIER]) {
            const desc = object_containing_classes[key][STATIC_IDENTIFIER]()
            const values = Object.values(desc.props ? desc.props : {})
            const object = {
                ...desc.args,
                properties: values
            }
            list.push(object)
        }
    }

    return list
}

export function getDocPage(title: string, object_containing_classes: any, desc?: string) {
    const json = getJson(object_containing_classes)

    const body = getHtmlfromJson(json, title, desc)
    return body
}


function getHtmlfromJson(json: any, title: string, desc?: string) {

    const body = getBody(json, title, desc)

    let html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8" /><style>${css}</style><title>${title}</title></head>`

    html += body

    html += "</html>"

    return html
}

function getBody(json: any[], title: string, desc?: string) {

    let html = "<body>"
    html += `<script>function f(i){window.location.href = "#";
    window.location.href = "#" + i.toString();}</script>`
    html += `<div class="container"><div class="nav">`
    json.forEach((obj, index) => {
        let onclick = `onclick="f(${index})"`
        html += `<div ${onclick} class="nav-item">${obj.name}</div>`
    })
    html += `</div><div class="wrapper"><div id="right"><div class="marged">
        <h1>${title}</h1>
        <p>${desc ? desc : ""}</p>
    </div><hr class="solid"></hr>`
    json.forEach((obj, index) => {

        const properties = obj.properties
        let rows = [["Name", "Type", "Description", "Note", "Color"]]
        let note = false
        let type = false
        properties.forEach((element: any) => {
            let row = [element.name ? element.name : element.key, element.type ? element.type : "  ", element.description ? element.description  : "  ", element.note ? element.note : "  ", element.color]
            rows.push(row)
            if (element.note) {
                note = true
            }
            if (element.type) {
                type = true
            }
        });

        html += `<div class="marged" 
        id=${index.toString()}>
        <h2>${obj.name}</h2>
        <div class="marged"><p>${obj.description}</p><h4>Properties</h4><div class="grid">`

        rows.forEach((row, index) => {
            html += `<div class="rows">`

            html += `<div class="field row ${index === 0 && "bottom"}
            ${index === rows.length - 1 && "no-bottom"}
            ${row[4] && row[4]}">
                    ${row[0]}
            </div>`

        
            if (type) {
                html += `<div class="field row ${index === 0 && "bottom"}
                ${index === rows.length - 1 && "no-bottom"}
                ${row[4] && row[4]}">
                        ${row[1]}
                </div>`
    
            }

            html += `<div class="large-field row ${index === 0 && "bottom"}
            ${index === rows.length - 1 && "no-bottom"}
            ${row[4] && row[4]}">
                    ${row[2]}
            </div>`

            if (note) {
                html += `<div class="medium-field row 
                    ${index === 0 && "bottom"}
                    ${index === rows.length - 1 && "no-bottom"}
                    ${row[4] && row[4]}">
                        ${row[3]}
                </div>`
            }

            html += `</div>`
        })

        html += `</div></div></div><hr class="solid"></hr>`

    })

    html += `</div></div>`
    html += "</body>"
    return html

}

const css = "body {margin: 0;padding: 0;font-family: sans-serif;}hr.solid {border-top: 3px;}div.marged {margin-left: 16px;margin-right: 16px;}div.grid {border: solid;border-width: 2px 2px 2px 2px;margin-bottom: 20px;display: flex;flex-direction: column;}div.rows {display: flex;flex-direction: row;flex: 1;}div.field {width: 200px;border: solid;border-width: 0px 1px 0px 0px;}div.medium-field {flex: 1;}div.large-field {flex: 1;border: solid;border-width: 0px 1px 0px 0px;}div.row {display: flex;align-items: center;border: solid;border-width: 0px 0px 1px 1px;min-height: 40px;padding: 10px;}div.bottom {border: solid;border-width: 0px 0px 2px 1px;}div.no-bottom {border: solid;border-width: 0px 0px 0px 1px;}div.container {display: flex;flex-direction: row;justify-content: stretch;height: 100vh;overflow: hidden;}#right {display: flex;flex: 1;flex-direction: column;overflow-y: auto;background-color: #E5D0CC;}div.wrapper {display: flex;flex: 1;min-height: 0px;}div.nav {flex-direction: column;display: flex;width: 300px;justify-content: center;background-color: #BFACB5;overflow-y: hidden;border: solid;border-width: 0px 1px 1px 0px;}div.nav-item {text-align: center;margin-top: 5px;margin-bottom: 5px;padding: 10px;background-color: #172121;color: lightgray;font-weight: 900;}div.nav-item:hover {cursor: pointer;}div.one {background-color: rgb(200, 8, 8, 0.5);}div.two {background-color: rgb(229, 110, 35, 0.8);}div.three {background-color: rgb(100, 100, 100, 0.6);}div.no-opa {opacity: 1;}"

//const css = "body {margin: 0;padding: 0;font-family: sans-serif;}hr.solid {border-top: 3px;}div.marged {margin-left: 16px;margin-right: 16px;}div.grid {border: solid;border-width: 2px 2px 2px 2px;margin-bottom: 20px;display: flex;flex-direction: column;}div.rows {display: flex;flex-direction: row;flex: 1;}div.field {min-width: 200px;border: solid;border-width: 0px 1px 0px 0px;}div.medium-field {flex: 1;}div.large-field {flex: 1;border: solid;border-width: 0px 1px 0px 0px;}div.row {display: flex;align-items: center;border: solid;border-width: 0px 0px 1px 1px;min-height: 40px;padding: 10px;}div.bottom {border: solid;border-width: 0px 0px 2px 1px;}div.no-bottom {border: solid;border-width: 0px 0px 0px 1px;}div.container {display: flex;flex-direction: row;justify-content: stretch;height: 100vh;overflow: hidden;}#right {display: flex;flex: 1;flex-direction: column;overflow-y: auto;background-color: #E5D0CC;}div.wrapper {display: flex;flex: 1;min-height: 0px;}div.nav {flex-direction: column;display: flex;width: 300px;justify-content: center;background-color: #BFACB5;overflow-y: hidden;border: solid;border-width: 0px 1px 1px 0px;}div.nav-item {text-align: center;margin-top: 5px;margin-bottom: 5px;padding: 10px;background-color: #172121;color: lightgray;font-weight: 900;}div.nav-item:hover {cursor: pointer;}div.red {background-color: rgb(200, 8, 8, 0.5);}div.orange {background-color: rgb(229, 110, 35, 0.8);}div.grey {background-color: rgb(100, 100, 100, 0.6);}div.no-opa {opacity: 1;}"
