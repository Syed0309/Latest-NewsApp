import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
   
    constructor(){
    super();
    console.log("Hello I am a constructor from News component")
    this.state={
       articles: [],
       loading: false
    }
}
  async componentDidMount(){
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=0fcd4b52e97247ecbd24e47e158c5c05`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles})
}

handlePrevClick = async()=>{
    console.log("Previous")
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=0fcd4b52e97247ecbd24e47e158c5c05&page=1 ${this.state.page - 1}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
       page: this.state.page - 1,
       articles: parsedData.articles
    })
     
}

handleNextClick = async()=>{
     console.log("Next")
     let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=0fcd4b52e97247ecbd24e47e158c5c05&page=2 ${this.state.page + 1}`;
     let data = await fetch(url);
     let parsedData = await data.json();
     console.log(parsedData);
     this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
     })
}

  render() {
    return (
      <div className="container my-3">
        <h1>NewsMonkey -Top Headlines</h1> 
           
        <div className="row">
        {this.state.articles.map((element)=>{
       return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""}  imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>})}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className=" btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button " className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      

      </div>
    )
  }
}

export default News
