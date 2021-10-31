// import React, { Component } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Searchbar({onSubmit}){
  const [searchQuery, setSearchQuery] = useState('');

  const  handleNameChange = e => {
    return  setSearchQuery(e.currentTarget.value)
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.info('Enter query!');
      return;
    }

    onSubmit(searchQuery);
    return setSearchQuery('');
  };
  
  return (
          <header className="Searchbar" onSubmit={handleSubmit}>
            <form className="SearchForm">
              <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Searc</span>
              </button>
    
              <input
                className="SearchForm-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={searchQuery}
                onChange={handleNameChange}
              />
            </form>
          </header>
        );
}

// class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleNameChange = e => {
//     this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.searchQuery.trim() === '') {
//       toast.info('Enter query!');
//       return;
//     }

//     this.props.onSubmit(this.state.searchQuery);
//     this.setState({ searchQuery: '' });
//   };

//   render() {
//     return (
//       <header className="Searchbar" onSubmit={this.handleSubmit}>
//         <form className="SearchForm">
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Searc</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.searchQuery}
//             onChange={this.handleNameChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
