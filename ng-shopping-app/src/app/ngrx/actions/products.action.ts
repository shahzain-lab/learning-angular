import { createAction, props } from '@ngrx/store'
import { ProductActionType } from '../model/ProductAction.type';


export const createProduct = createAction(
    ProductActionType.create,
    props<{payload: any}>()
    )

// export class ParentAction implements Action{
//     type: string;
//     payload: any
// }

// export class AddProduct implements ParentAction {
//     type = ProductActionType.create;
//     constructor(public payload: any){}
// }