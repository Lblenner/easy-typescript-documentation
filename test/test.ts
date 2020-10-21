import { ClassDesc, ClassName, Color, Desc, Doc, DOC_COLOR, Name, Type } from "../src/annotations";
import { createClassAnnotation, createPropertieAnnotation } from "../src/annotation_creators";
import { getDocPage, getJson } from "../src/functions";

//Litle module to test out functionalities
//Dirty and not automated but better than nothing

let ClassTest = createClassAnnotation("wouhou", "koy");
let PropTest = createPropertieAnnotation("one", "two")

@Doc
@ClassName("Test")
@ClassDesc("Voici une classe")
@ClassTest("One", "Two")
class Test {

    @Name("Prop !")
    @Desc("This is a description")
    @Color(DOC_COLOR.ORANGE)
    @PropTest("Hu", "Ha")
    @Type("One type")
    prop!: number

    @Type("two type")
    otherProp!: string

}

@Doc
@ClassName("Other")
class Test2 {


    @Name("Prop !")
    @Desc("This is a description")
    @Color(DOC_COLOR.ORANGE)
    @PropTest("Hu", "Ha")
    prop!: number

}

/*
let a = getJson({ a: Test })
//console.log(a[0].properties)

let html = getDocPage("Ma page", { a: Test, b: Test2 })

declare var require: any
let fs = require('fs');
fs.writeFile('test.html', html, function (err: any) {
    if (err) return console.log(err);
    console.log('Done.');
});
*/
