import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageHeader from './HomePageHeader';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Provider store={store}>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />"
      >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </Provider>
  );
}
