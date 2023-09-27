import { useState, useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { Photo } from "../../models/Photo";
import { searchPhotos } from "../../services/PhotoService";
import { PacmanLoader } from "react-spinners";
import ResultCard from "../../components/ResultCard";
import searchIconn from "../../assets/img/search1.png";
import arrowRigth from "../../assets/img/arrow-rigth.png";
import arrowLeft from "../../assets/img/arrow-left.png";
import { UserContext } from "../../context/UserContext";
import DropDown from "../../components/DropDown";

export type setFiltersProps = {
  orderBy: string;
  orientation: string;
};

const Home = () => {
  const [loading, isLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newSearch, isNewSearch] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<string>("relevant");
  const [orientation, setOrientation] = useState<string>("landscape");

  const { lastResult, setLastResult, query, setQuery } =
    useContext(UserContext);

  const searchResults = async () => {
    //trim tira espaço em branco do inicio e no fim
    if (query.trim()) {
      isLoading(true);
      setLastResult({ photos: [], total_pages: 0 });
      const searchResult = await searchPhotos(
        query,
        orderBy,
        currentPage,
        orientation
      );
      setLastResult(searchResult);
      isLoading(false);
    }
  };
  useEffect(() => {
    searchResults();
  }, [currentPage, orientation, orderBy]);

  useEffect(() => {
    if (newSearch) {
      setCurrentPage(1);
      searchResults();
      isNewSearch(false);
    }
  }, [newSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.searchArea}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className={styles.searchInput}
        />

        <button
          onClick={() => isNewSearch(true)}
          className={styles.searchButton}
        >
          Pesquisar
        </button>
        <DropDown setOrderBy={setOrderBy} setOrientation={setOrientation} />
        <button
          onClick={() => isNewSearch(true)}
          className={styles.responsiveSearchButton}
        >
          <img src={searchIconn} alt="Pesquisar" />
        </button>
      </div>
      <PacmanLoader color="#36d7b7" loading={loading} />

      {!loading && lastResult.photos.length > 0 && (
        <>
          <div className={styles.resultsArea}>
            {lastResult.photos.map((p: Photo) => (
              <ResultCard key={p.id} photo={p} />
            ))}
          </div>

          <div>
            {currentPage > 1 && (
              <button
                className={styles.pageButton}
                onClick={() => setCurrentPage((oldNum) => oldNum - 1)}
              >
                <img src={arrowLeft} alt="Anterior" />
              </button>
            )}
            <span className={styles.currentPageLabel}>
              Página {currentPage}
            </span>
            {currentPage < lastResult.total_pages && (
              <button
                className={styles.pageButton}
                onClick={() => setCurrentPage((oldNum) => oldNum + 1)}
              >
                <img src={arrowRigth} alt="Próxima" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
