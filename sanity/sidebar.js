import React, { Children } from 'react';
import S from '@sanity/desk-tool/structure-builder';
import {MdStore as icon} from "react-icons/md";

//build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Bauccus' Atlas`)
    .items([
    //create new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
         S.editor()
            .schemaType('storeSettings')
           //make a new document ID, so we dont have alphabet soup in the URL
            .documentId('aaron')
       ),
       //add the rest of our doc items
       ...S.documentTypeListItems().filter(
         item => item.getId() !== 'storeSettings'
         ),
    ]);
}