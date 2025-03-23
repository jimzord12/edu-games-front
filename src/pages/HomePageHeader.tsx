import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/physics-intro"
          >
            Let the Fun Begin 🚀+🧠
          </Link>
        </div>

        <p className={styles.bodyText}>
          We are very excited to have you here! <strong>Science4All</strong> is
          a platform dedicated to making science{' '}
          <span className={styles.underline}>
            accessible and fun for everyone.
          </span>
          <br />
          Whether you're a student, teacher, or just someone who loves learning,
          we have something for you.
        </p>
      </div>
    </header>
  );
}
