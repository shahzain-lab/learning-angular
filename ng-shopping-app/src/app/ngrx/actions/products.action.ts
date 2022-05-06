import { createAction, props } from '@ngrx/store'
import { ProductActionType } from '../model/ProductAction.type';


export const createProduct = createAction(
    ProductActionType.create,
    props<{payload: any}>()
    )
