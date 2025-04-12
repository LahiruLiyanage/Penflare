import styles from '@/app/ui/styles/home.module.css';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 relative">
        <div className="bg-white border-2 border-sky-100 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center">
            <h1 className={`text-4xl text-sky-600 font-bold mb-4 {/*${styles.text_sky}*/}`}>Welcome to Penflare</h1>
            <p className="text-lg text-gray-700 mb-4">
              Massa urna magnis dignissim id euismod porttitor vitae etiam viverra nunc at adipiscing sit morbi aliquet mauris porttitor nisi, senectus pharetra, ac porttitor orci.
            </p>
            <a href="/blog/posts" className={`outline outline-offset-2 border-sky-600 text-sky-600 hover:text-white py-2 px-4 rounded hover:bg-sky-600 md:w-auto ${styles.fit_contact}`}>
              Go to Blog
            </a>
          </div>
        </div>
      </div>
      <div className={`bg-sky-600 hidden md:block absolute top-0 right-0 bottom-0 left-2/3 z-0 {/*${styles.bg_sky}*/}`}></div>
    </main>
  );
}
