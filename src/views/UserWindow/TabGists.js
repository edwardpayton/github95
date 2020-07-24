import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { Cutout } from "react95";

import Pagination from "../../components/Pagination";
import AnchorButton from "../../components/AnchorButton";
import Loading from "../../components/Loading";

import { currentRecordOfType } from "../../store";
import formatDate from "../../utilities/formatDate";
import { USER } from "../../constants";

export default function TabGists({ gists, total, onPageChange }) {
  const currentUser = useRecoilValue(currentRecordOfType(USER));
  const [pageNumber, setPageNumber] = React.useState(0);
  const [paginated, setPaginated] = React.useState([]);

  const handleClickNextPage = (page) => {
    setPageNumber(page);
    if (!paginated[page]) {
      onPageChange();
    }
  };

  const processGists = React.useCallback(() => {
    let reversed = [...gists].reverse();
    const grouped = reversed.reduce((newArray, item, i) => {
      const groupI = Math.floor(i / 20);
      if (!newArray[groupI]) newArray[groupI] = [];
      newArray[groupI].push(item);
      return newArray;
    }, []);
    return grouped;
  }, [gists]);

  React.useEffect(() => {
    if (gists && gists.length) {
      setPaginated(processGists());
    }
  }, [gists, processGists]);

  React.useEffect(() => {
    setPageNumber(0);
  }, [currentUser]);

  const processName = (name) => {
    return name.split(".").slice(0, -1).join(".");
  };

  return (
    <div className="gists">
      <h3>Gists</h3>
      {paginated && paginated.length > 0 ? (
        <>
          {paginated[pageNumber] &&
            paginated[pageNumber].map(
              ({
                cursor,
                node: { url, isFork, updatedAt, stargazers, files },
              }) => {
                const name = processName(files[0].name);
                return (
                  <section className="gist" key={cursor}>
                    <div className="flex items-center gist__header">
                      <h3>{files[0].name}</h3>
                      {isFork && <p className="badge -small">Fork</p>}
                      <p className="badge -small">
                        Updated at: {formatDate(updatedAt)}
                      </p>
                      <p className="badge -small">
                        Number of stars: {stargazers.totalCount}
                      </p>
                    </div>

                    <div className="gist__block">
                      <Cutout className="gist__cutout">
                        <div className="gist__code">
                          <p>
                            C: \ Github95 {">"} cd {name} \
                          </p>
                          <p>
                            C: \ Github95 {">"} print {name}
                            {files[0].extension}
                          </p>
                          <pre>{files[0].text}</pre>
                        </div>
                      </Cutout>
                      <div className="gist__url">
                        <AnchorButton href={url}>
                          Open on gist.github.com
                        </AnchorButton>
                      </div>
                    </div>
                  </section>
                );
              }
            )}

          {total > 10 && (
            <Pagination
              onPageChange={handleClickNextPage}
              totalCount={total}
              perPage={10}
            />
          )}
        </>
      ) : (
        <Loading message="Loading results" />
      )}
    </div>
  );
}
