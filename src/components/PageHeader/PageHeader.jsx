import React from 'react';
import './PageHeader.css';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function PageHeader({title, description}) {
  return (
    <section className="position-relative py-6 page-header">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      <div className="container">
        <div className="row page-header-row">
          <div className="col-lg-6">
            <div className="bg-white rounded-lg shadow p-5">
              {/* <strong className="text-uppercase text-secondary d-inline-block mb-2 text-sm">Featured</strong> */}
              <h2 className="mb-3">{title}</h2>
              <p className="text-muted">{description}</p>
              {/* <a className="p-0 btn btn-primary page-header-btn" href="/blog/escape-city-today">More Info... <i className="fa fa-long-arrow-alt-right"></i></a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
