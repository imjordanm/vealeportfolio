import CMS from 'netlify-cms-app';
import { CustomPathImageControl, CustomPathImagePreview } from './customPathImage.js';

CMS.init();
CMS.registerWidget('custompathimage', CustomPathImageControl, CustomPathImagePreview);
