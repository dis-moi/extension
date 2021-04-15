import { get } from './call';
import { Categories } from 'libs/lmem/category';

const fetchCategories = (): Promise<Categories> => get('categories');

export default fetchCategories;
