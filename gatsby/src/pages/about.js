import React from 'react';
import SEO from '../components/SEO';

export default function NewWinesPage() {
  return (
    <>
      <SEO title="About" />
      <p>
        Bauccus' Atlas is a project of&nbsp;
        <a href="https://github.com/aaronkai">
          full-stack developer Aaron Hubbard
        </a>
        .
      </p>
      <p>It is written in Javascript using Gatsby and Sanity.</p>
      <p>
        It is based on&nbsp;
        <a href="https://mastergatsby.com/">a course</a>
        &nbsp;taught by the inimitable Wes Bos.
      </p>
    </>
  );
}
