import GlobalNav from '../components/navigation/GlobalNav';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <GlobalNav />
        {children}
      </main>
    </div>
  );
}
