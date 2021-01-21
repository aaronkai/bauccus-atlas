import {MdStore as icon} from "react-icons/md";


export default {
  // Computer Name
  name: 'storeSettings',
  // visible title
  title: 'Settings',
  type: 'document',
  icon: icon,
  fields: [
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'array',
      of: [{type: 'reference', to:[{type: 'wine'}]}]
    },
    {
      name: 'showcaseVintner',
      title: 'Vintner of the Month',
      type: 'array',
      of: [{type: 'reference', to:[{type: 'vintner'}]}]
    },
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
    },
  ]
};
