import { Link } from 'gatsby';
import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p className="center">
        <Link to="/about">&copy; Hippogriff Web Dev 2020</Link>
      </p>
    </footer>
  );
}
