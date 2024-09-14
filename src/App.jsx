import Header from './components/Headers';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import AllNews from './components/AllNews';
import TopHeadlines from './components/TopHeadlines';
import CountryNews from './components/CountryNews';
import Search from './components/Search';

function App() {

  return (
    <>
      <div className="w-full">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<AllNews />} />
            <Route path='/top-headlines/:category' element={<TopHeadlines />} />
            <Route path='/country/:iso' element={<CountryNews />} />
            <Route path='/search/:query' element={<Search />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
