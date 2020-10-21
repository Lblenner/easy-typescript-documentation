import { createClassAnnotation, createPropertieAnnotation } from "./annotation_creators"
import { IDENTIFIER, STATIC_IDENTIFIER } from "./identifiers"

export enum DOC_COLOR {
    RED = "red",
    ORANGE = "orange",
    GREY = "grey",
    NONE = "none"
}

export const Name = createPropertieAnnotation<string>("name")
export const Desc = createPropertieAnnotation<string>("description")
export const Color = createPropertieAnnotation<DOC_COLOR>("color")
export const Note = createPropertieAnnotation<string>("note")
export const Type = createPropertieAnnotation<string>("type")

export const ClassDesc  = createClassAnnotation<string>("description")
export const ClassName = createClassAnnotation<string>("name")

export function Doc<T extends { new(...args: any[]): {} }>(
    constructor: T,
) {
    return class extends constructor {
        static [STATIC_IDENTIFIER]() {
            let a: any = new constructor();
            return {
                args: (constructor as any)[IDENTIFIER],
                props: a[IDENTIFIER]
            };
        }
    };
}