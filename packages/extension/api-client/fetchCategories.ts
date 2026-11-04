import { Categories } from '@dismoi/domain/category';
import { get } from './call';

const fetchCategories = (): Promise<Categories> => get('categories');

export default fetchCategories;
