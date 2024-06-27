import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("Message from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      error: false,
    };
  }

  async updateNews() {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d5212785f5b408692e39cf145ffc25c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        loading: false,
        error: false,
        totalResults: parsedData.totalResults,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false, error: true });
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  nextPage = async () => {
    this.setState({
      page: this.state.page + 1,
      loading: true,
    });
    this.updateNews();
  };

  previousPage = async () => {
    this.setState({
      page: this.state.page - 1,
      loading: true,
    });
    this.updateNews();
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { articles, loading, error } = this.state;
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ fontFamily: "Cambria" }}>
          NewsPanda-Top {this.Capitalize(this.props.category)} Headlines
        </h1>
        {loading && <div>Loading...</div>}
        {error && <div>Error fetching data. Please try again later.</div>}
        <div className="row">
          {!loading &&
            !error &&
            articles.length > 0 &&
            articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageUrl={element.urlToImage ? element.urlToImage : ""}
                    newsUrl={element.url ? element.url : ""}
                    time={element.publishedAt}
                    author={element.author}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.previousPage}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.nextPage}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
