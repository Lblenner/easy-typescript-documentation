import { IDENTIFIER } from "./identifiers";

function setProp(obj: any, _keyPropertie: string, key: string, value: any) {

    obj[IDENTIFIER] = {
        ...obj[IDENTIFIER],
        [key]: value
    }

}

function setKey(obj: any, keyPropertie: string, key: string, value: any) {

    let descriptor = obj[IDENTIFIER]

    if (!descriptor) {
        obj[IDENTIFIER] = {}
    }

    descriptor = obj[IDENTIFIER]

    let val = descriptor[keyPropertie]

    
    if (!val) {
        val = { key: keyPropertie }
    }

    val[key] = value

    obj[IDENTIFIER][keyPropertie] = val

}


export function createClassAnnotation<T0>(key0: string): any;
export function createClassAnnotation<T0, T1>(key0: string, key1?: string): any;
export function createClassAnnotation<T0, T1, T2>(key0: string, key1?: string, key2?: string): any;
export function createClassAnnotation<T0, T1, T2, T3>(key0: string, key1?: string, key2?: string, key3?: string): any;


export function createClassAnnotation<T0, T1, T2, T3>(key0: string, key1?: string, key2?: string, key3?: string) {
    return createAnnotation(setProp, key0, key1, key2, key3)
}

export function createPropertieAnnotation<T0>(key0: string): any;
export function createPropertieAnnotation<T0, T1>(key0: string, key1?: string): any;
export function createPropertieAnnotation<T0, T1, T2>(key0: string, key1?: string, key2?: string): any;
export function createPropertieAnnotation<T0, T1, T2, T3>(key0: string, key1?: string, key2?: string, key3?: string): any;


export function createPropertieAnnotation<T0, T1, T2, T3>(key0: string, key1?: string, key2?: string, key3?: string) {
    return createAnnotation(setKey, key0, key1, key2, key3)
}


function createAnnotation<T0, T1, T2, T3>(func: any, key0: string, key1?: string, key2?: string, key3?: string) {
    if (key3 && key2 && key1) {
        return function (arg0: T0, arg1: T1, arg2: T2, arg3: T3) {
            return function (target: any, key: string) {

                func(target, key, key3, arg3)
                func(target, key, key2, arg2)
                func(target, key, key1, arg1)
                func(target, key, key0, arg0)

            }
        }
    } else if (key2 && key1) {
        return function (arg0: T0, arg1: T1, arg2: T2) {
            return function (target: any, key: string) {

                func(target, key, key2, arg2)
                func(target, key, key1, arg1)
                func(target, key, key0, arg0)

            }
        }
    } else if (key1) {
        return function (arg0: T0, arg1: T1) {
            return function (target: any, key: string) {

                func(target, key, key1, arg1)
                func(target, key, key0, arg0)

            }
        }
    } else {
        return function (arg0: T0) {
            return function (target: any, key: string) {

                func(target, key, key0, arg0)

            }
        }
    }

}
