import { Validators } from "@angular/forms";

export const TODO_FORM = {
    'name':['',[Validators.required]],
    'description':[''],
    'deadLine':[new Date()],
    'priority':['low',[Validators.required]],
}