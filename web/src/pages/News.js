import { useSidebar } from '../contexts/NavbarContext'

function News() {
  const { sidebar } = useSidebar(false)
  console.log(sidebar)
  return (
    <div className={sidebar ? 'pageContainer' : 'pageContainer expanded'}>
      <div className="pageContent">
        <h1>News</h1>
      </div>
    </div>
  );
}

export default News;