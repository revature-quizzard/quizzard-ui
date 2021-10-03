import { TagFormModel } from "./new-tag-form";

export class  SaveTagFormModel{
   currentTagForm: TagFormModel;
   index: number;

    constructor(currentTagForm: TagFormModel ,   index: number)
    {
        this.currentTagForm = currentTagForm;
        this.index = index;
       
    }
}