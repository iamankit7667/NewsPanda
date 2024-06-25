import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let{title,description,imageUrl,newsUrl, author,time}=this.props;
    return (
      <div>
        <div className="card" >
          <img src={imageUrl?imageUrl:"https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg"} 
          className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}...
            </p>
            <p class="card-text"><small class="text-body-secondary">By <strong>{author}</strong> | {new Date(time).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
