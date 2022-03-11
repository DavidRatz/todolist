import { Validators } from "@angular/forms";

export const TODO_FORM = {
    'id':['',[Validators.required]],
    'name':['',[Validators.required]],
    'description':[''],
    'deadLine':[new Date()],
    'priority':['low',[Validators.required]],
}