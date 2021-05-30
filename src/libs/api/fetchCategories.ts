import { Categories } from 'app/lmem/category';
import { get } from './call';

const fetchCategories = (): Promise<Categories> => get('categories');

export default fetchCategories;
