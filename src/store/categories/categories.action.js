import CATEGORIES_ACTION_TYPES from './categories.types';
import { createAction } from '../../utils/reducer/reducer.utils';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETH_CATEGORIES_START);

export const fectchCategoriesSuccess = (categoriesArray) => 
  createAction(
    CATEGORIES_ACTION_TYPES.FETH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) => 
    createAction(CATEGORIES_ACTION_TYPES.FETH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categoriesArray = await getCategoriesAndDocuments('cateogires');
    fetchCategoriesStart(categoriesArray);
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
  
}
