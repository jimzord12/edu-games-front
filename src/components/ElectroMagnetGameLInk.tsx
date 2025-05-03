import Link from '@docusaurus/Link';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ElectroMagnetGameLInk = () => {
  const { siteConfig } = useDocusaurusContext();
  const { GITHUB_GAMES_REPO_URL } = siteConfig.customFields as {
    GITHUB_GAMES_REPO_URL: string;
  };

  return (
    <Link href={`${GITHUB_GAMES_REPO_URL}`}>ElectroMagnetism Mini Game</Link>
  );
};

export default ElectroMagnetGameLInk;
