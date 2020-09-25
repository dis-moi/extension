import { get } from './call';
import { Categories } from 'app/lmem/category';

const fetchCategories = (): Promise<Categories> => get('categories');

export default fetchCategories;
