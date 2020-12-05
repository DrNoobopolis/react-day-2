
import React from 'react';
import ReactDOM from 'react-dom';

/* 
fetch -> Frame -> renderSquare -> renderRow -> render

1. use async rather than fetch
2. use an input box?
3. draw up the table
4. use typescript 

add some css?
*/

/*
https://github.com/public-apis/public-apis
https://reactjs.org/tutorial/tutorial.html
https://www.educative.io/blog/react-and-typescript
http://localhost:3000/

npx create-react-app my-app
cd my-app
npm start
*/

// input box and button in main 
// that renders the rest in a table

// 'https://api.jikan.moe/v3/search/anime?q=One piece'
// function input

function Image(props) {
  return (<img src={props.src} alt='' height='84' width='84'></img>);
}

function Frame(props) {
  return (
      <td> <img src={props.value} alt='' height='84' width='84'></img> </td>
  );
}

class Gallery extends React.Component {
  renderSquare(i) {
    const collection = [];

    for(let it=i*10; it<(i+1)*10; it++) {
      collection.push(<Frame value={this.props.images[it]} />);
    }

    return collection;
  }
  
  renderRow(i) {
    const collection = [];

    for(let it=0; it*10<this.props.images.length; it++) {
      collection.push(<tr>{this.renderSquare(it)}</tr>);
    }

    return collection;
  }

  render() {
    //this.props.value

    //Warning: Each child in a list should have a unique "key" prop.

    return (
      <table>
        <tbody>
            {this.renderRow(this.props.value)}
        </tbody>
      </table>
      );
    }
  }

async function anime_search(search_term) {
  
  const response = await fetch('https://api.jikan.moe/v3/search/anime?q=' + search_term);

  // response.status

  const js_objects = await response.json()

  const urls = js_objects.results.map(e => e.image_url)

  return urls
}

/*
write a purely functional component 
try use gallary for this purpose
update state of component by calling it with new values

use typescript?
*/

class Webpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input_text: '', image_urls: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input_text: event.target.value});
  }

  async handleSubmit(event) {
    const urls = await anime_search(this.state.input_text)

    this.setState({image_urls: urls});
  }

  render () {
    return (
    <span>
      Name:

      <br></br>
      <br></br>

      <input type="text" value={this.state.input_text} onChange={this.handleChange} />
        
      <br></br>
      <br></br>

      <button onClick={this.handleSubmit}>Submit</button>

      <br></br>

      <Gallery images={this.state.image_urls}/>

    </span>

    );
  }
}

ReactDOM.render(<Webpage></Webpage>, document.getElementById("root"));

anime_search("bombs")
