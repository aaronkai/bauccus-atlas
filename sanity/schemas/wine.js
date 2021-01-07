import {GiWineBottle as icon} from 'react-icons/gi';

export default {
  // Computer Name
  name: 'wine',
  // visible title
  title: 'Wines',
  type: 'document',
  icon: icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: ['Red','White','Orange','Sparking','Rose'],

      }
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
    },
    {
      name: 'vintner',
      title: 'Vintner',
      type: 'reference',
      to: [{type: 'vintner'}],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rate this wine 1 to 5 stars',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us a bit about this wine',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      vintner: 'vintner.name',
      year: 'year',
    },
    prepare: (selection) => {      
      const { title, media, vintner, year } = selection
      return {
        title,
        media,
        subtitle: `${vintner}, ${year}`
      };
    },
  },
};
