import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import SEO from '../components/SEO';
import { HomePageGrid } from '../styles/grids';
import { useLatestData } from '../utils/useLatestData';

function CurrentWines({ currentWines }) {
  return (
    <div>
      <h2>
        <span className="mark tilt">Featured Wines</span>
      </h2>
      <p>Highlights from the recent past</p>
      {!currentWines && <LoadingGrid count={4} />}
      {currentWines && !currentWines?.length && (
        <p>No one is working right now</p>
      )}
      {currentWines?.length && <ItemGrid items={currentWines} />}
    </div>
  );
}
function VintnerShowcase({ vintnerShowcase }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Featured Vintners</span>
      </h2>
      <p>Fancy farms in fancy places</p>
      {!vintnerShowcase && <LoadingGrid count={4} />}
      {vintnerShowcase && !vintnerShowcase?.length && (
        <p>No vintners to display</p>
      )}
      {vintnerShowcase?.length && <ItemGrid items={vintnerShowcase} />}
    </div>
  );
}

export default function NewWinesPage() {
  const { currentWines, currentVintners } = useLatestData();
  return (
    <>
      <SEO title="About" />
      <div className="center">
        <h1>Welcome to my little wine world</h1>
        <p>Keeping track of things is fun</p>
        <HomePageGrid>
          <CurrentWines currentWines={currentWines} />
          <VintnerShowcase vintnerShowcase={currentVintners} />
        </HomePageGrid>
      </div>
    </>
  );
}
