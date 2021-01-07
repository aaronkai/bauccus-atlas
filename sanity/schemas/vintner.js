import {GiFarmer as icon} from 'react-icons/gi';

export default {
  // Computer Name
  name: 'vintner',
  // visible title
  title: 'Vintner',
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
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
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
      country: 'country',
    },
    prepare: (selection) => {      
      const { title, media, country } = selection
      return {
        title,
        media,
        subtitle: `${country}`
      };
    },
  },
};
