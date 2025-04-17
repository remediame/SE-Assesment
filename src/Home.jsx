import Navbar from "./NavBar";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Home = () => {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mediaType, setMediaType] = useState("images");
  const userId = sessionStorage.getItem("user_id");
  const [filterTag, setFilterTag] = useState("");
  const [queryHistory, setQueryHistory] = useState([]);
  const [groupedHistory, setGroupedHistory] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };
    getSession();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchQueryHistory();
    }
  }, [userId]);

  useEffect(() => {
    if (query.trim()) {
      searchMedia();
    }
  }, [mediaType]);

  const fetchQueryHistory = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("MediaSurfv1")
      .select("query, created_at")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return;
    }

    const formattedSearches = data.map((s) => {
      const date = new Date(s.created_at);
      console.log(s.created_at);
      return {
        query: s.query,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };
    });
    setQueryHistory(formattedSearches);

    const grouped = formattedSearches.reduce((acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    }, {});

    setGroupedHistory(grouped);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    sessionStorage.removeItem("user_id");
  };

  const searchMedia = async () => {
    if (!userId) {
      return;
    }

    setLoading(true);
    const response = await fetch(
      `https://api.openverse.org/v1/${mediaType}?q=${query}`
    );
    const data = await response.json();
    setResults(data.results || []);
    setLoading(false);

    const { error } = await supabase
      .from("MediaSurfv1")
      .upsert([{ user_id: userId, query }]);

    if (!error) {
      fetchQueryHistory();
    } else {
      console.error("error", error);
    }
  };

  const filteredResults = filterTag
    ? results.filter((item) => item.tags && item.tags.includes(filterTag))
    : results;

  return (
    <div className="container-fluid bg-light min-vh-100 p-0 home">
      <section className="hero-section">
        <Navbar user={user} handleLogout={handleLogout} />
        <div className="search-container">
          <div className="m-auto">
            <div className="d-flex justify-content-center">
              <div className="d-flex content-switch ">
                <button
                  className={`content-btn ${
                    mediaType === "audio" ? "content-btn-active" : ""
                  }`}
                  onClick={() => setMediaType("audio")}
                >
                  Audio
                </button>
                <button
                  className={`content-btn ${
                    mediaType === "images" ? "content-btn-active" : ""
                  }`}
                  onClick={() => setMediaType("images")}
                >
                  Images
                </button>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchMedia();
              }}
            >
              <div className="input-group mt-3">
                <input
                  type="search"
                  className="search-btn"
                  placeholder="Enter keyword or tag"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-nt" type="submit">
                  <i className="bi bi-search me-1"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div
        className="container-fluid py-3 grey-bg"
        style={{ minHeight: "100vh" }}
      >
        <div className="row">
          <div className="col-lg-8">
            <section className="results-container">
              <center className="fw-bold fs-5">Search Feedback</center>
              {loading && (
                <div className="text-center my-3 ">
                  <span className="spinner-border" role="status"></span>
                </div>
              )}
              <div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-2">
                {results.map((item, index) => (
                  <div className="col" key={index}>
                    <div className="col" key={index}>
                      {mediaType === "images" ? (
                        <div className="card image-card position-relative overflow-hidden">
                          <img
                            src={item.url}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body image-details text-center text-white">
                            <h5 className="card-title">{item.title}</h5>
                            <div className="d-block">
                              <Link to="">
                                <button className="btn btn-secondary me-2">
                                  {item.creator}
                                </button>
                              </Link>
                              <Link to={item.foreign_landing_url}>
                                <button className="btn btn-outline-primary">
                                  External Link
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="card p-3">
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="text-muted">
                              By:{" "}
                              <a
                                href={item.creator_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.creator}
                              </a>
                            </p>
                            <audio controls className="w-100">
                              <source src={item.url} type="audio/wav" />
                              Your browser does not support the audio element.
                            </audio>
                            <p className="small mt-2">
                              License:{" "}
                              <a
                                href={item.license_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.license}
                              </a>
                            </p>
                            <a
                              href={item.foreign_landing_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-primary mt-2"
                            >
                              View Source
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="col-lg-4">
            <section className="history-container shadow p-3">
              <center className="fw-bold">Search History</center>

              {Object.entries(groupedHistory).map(([day, entries]) => (
                <div className="history-group" key={day}>
                  <hr />
                  <p className="fw-bold">{day}</p>
                  <ul className="list-unstyled mb-3">
                    {entries.map((e, idx) => (
                      <li className="text-purple" key={idx}>
                        <small className="text-muted me-2">{e.time}</small> •{" "}
                        {e.query}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
