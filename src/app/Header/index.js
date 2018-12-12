import React, { Component } from 'react';
import { connect } from 'react-redux';

import Filters from '../Filters';

import { selectFilter, searchByName } from '../MovieList/actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersOpen: false,
      searchInput: ''
    };

    this.handleDropdown = this.handleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleFilters = this.handleFilters.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.closeDropdown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeDropdown);
  }

  handleDropdown(e) {
    e.stopPropagation();
    this.setState({
      filtersOpen: !this.state.filtersOpen
    });
  }

  closeDropdown() {
    this.setState({
      filtersOpen: false
    });
  }

  handleFilters(filter) {
    if (!filter) {
      this.setState({
        searchInput: ''
      });
      return this.props.selectFilter(filter);
    }

    this.props.selectFilter(filter);
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      searchInput: e.target.value
    });
    this.props.searchByName(e.target.value);
  }

  render() {
    return (
      <div className="header container-fluid py-3">
        <div className="row d-flex justify-content-center">
          <div className="col-auto">
            <div className="dropdown">
              <button className="btn btn-sort" onClick={this.handleDropdown}>
                Sort by...
              </button>
              <Filters
                items={['Year', 'Episode']}
                showing={this.state.filtersOpen}
                selectedFilter={this.props.selectedFilter}
                selectFilter={this.handleFilters}
              />
            </div>
          </div>
          <div className="col col-sm-8 col-md-10">
            <i className="fa fa-search magnifying-glass" />
            <input
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Type to search"
              className="form-control search-bar"
              value={this.state.searchInput}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedFilter: state.movies.selectedFilter,
    searchInput: state.movies.searchInput
  };
}

export default connect(
  mapStateToProps,
  { selectFilter, searchByName }
)(Header);
